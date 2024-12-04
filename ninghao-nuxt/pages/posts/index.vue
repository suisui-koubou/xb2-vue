<template>
    <div>
        <h1>内容列表</h1>
        <div>
            <button @click="backward">上一页</button>
            <button @click="forward">下一页</button>
        </div>
        <div v-if="pending">加载中...</div>
        <div v-if="posts !== null">
            <div v-for="post in posts" :key="post.id">
                <div>{{ post.title }}</div>
                <div>- <small>{{ post.user.name }}</small></div>
            </div>
        </div>
    </div>
</template>

<script setup>

const page = ref(1); // 组合模式下的响应数据
const backward = () => {
    page.value--; 
    refresh(); 
}; 
const forward = () => {
    page.value++;
    refresh(); 
}; 

const {
    data:posts, // 获取的数据data重命名为posts
    pending, 
    refresh, 
    error
} = await useAsyncData('posts', () => 
    $fetch(`http://localhost:3001/posts?page=${page.value}`),
    { lazy: true } // 惰性加载(未加载时不会阻止导航)。
); 

</script>
