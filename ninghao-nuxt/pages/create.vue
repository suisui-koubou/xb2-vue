<template>
    <form @submit.prevent>
        <div v-if="imagePreviewUrl">
            <img style="max-width: 400px;" :src="imagePreviewUrl" alt="图像预览"/>
        </div>
        <div>
            <button class="bordered" 
                @click="($refs.fileInput as HTMLInputElement).click()">选择图像文件</button>
            <input type="file" 
                hidden 
                accept="image/png, image/jpeg, image/jpg"
                ref="fileInput"
                @change="onChangeFile"
            />
        </div>
        <div>
            <input type="text" placeholder="标题" v-model="title"/>
        </div>
        <div>
            <textarea placeholder="正文" v-model="content"></textarea>
        </div>
        <div>
            <button class="primary" @click="createPost">发布</button>
        </div>
    </form>
</template>


<script setup lang="ts"> 

useHead({title: '创建内容'}); 
const title = ref('');
const content = ref(''); 

// 文件的响应式数据
const file = ref<File>();
// 读取上传的文件
const onChangeFile = (event:Event) => {
    const {files} = event.target as HTMLInputElement; 
    if (files) {
        file.value = files[0]; 
    }
    if (file.value){
        createImagePreview(file.value); 
    }
}
// 预览文件
const imagePreviewUrl = ref<string>(); 
const createImagePreview = (file: File) => {
    const reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.onload = (event) => {
        imagePreviewUrl.value = event.target!.result as string; 
    } 
}
// 上传文件
const createFile = async (postId: number) => {
    const formData = new FormData();
    formData.append('file', file.value!); // 表单插入文件
    // 在封装的 useApiFetch 里面已经包含了用户授权。如果想显示图片也要验证，也可以换成 async useApiFetch 的组合。
    const {data} = await useApiFetch(`files?post=${postId}`, {
        method: 'POST', 
        body: formData, 
    }); 

    if (data.value){
        imagePreviewUrl.value = ''; 
    }
}

const createPost = async () => {
    const {data} = await useApiFetch('posts', {
        method: 'POST', 
        body: {
            title: title.value, 
            content: content.value
        }
    }); 

    await createFile((data.value as any).insertId); 

    if (data.value){
        title.value = ''; 
        content.value = ''; 
    }
}; 

</script>
