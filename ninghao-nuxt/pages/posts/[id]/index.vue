<template>
    <div>
        <Head>
            <Title>{{ post?.title }}</Title>
        </Head>
        <div v-for="img in post.files" :key="img.id">
            <img style="max-height: 100%;" 
            :src="`${apiBaseUrl}/files/show/${img.id}?size=large`" 
            alt="post.title"/>
        </div>
        <h1>{{ post?.title }}</h1>
        <div><small>Author: </small><span style="font-style: italic;">{{ post?.user.name }}</span></div>
        <div>{{ post?.content }}</div>
    </div>
</template>


<script setup lang="ts">
import { type Post } from '~/types/post.type'; 

const {
    params: { id }, 
} = useRoute(); 

const {
    public: { apiBaseUrl }, 
} = useRuntimeConfig(); 

const { data: post } = await useApiFetch<Post>(`posts/${id}`); 

// 如果找不到文件就 404 
if (!post.value){   
    showError({statusCode: 404, message: '没有找到内容页面'}); 
}

</script>