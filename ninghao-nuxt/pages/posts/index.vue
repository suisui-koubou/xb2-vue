<template>
    <div>
        <h1>内容列表</h1>
        <div v-for="post in posts" :key="post.id">
            <div>{{ post.title }}</div>
            <div>- <small>{{ post.user.name }}</small></div>
        </div>
    </div>
</template>

<script setup>
const posts = await $fetch('http://localhost:3001/posts'); 
console.log(posts); 
</script>
