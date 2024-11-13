<template>
    <div>
        <h1>文章 {{ id }}</h1>
    </div>
</template>

<script setup>
const { params: {id} } = useRoute(); // 提取路由里面的参数。
</script>

