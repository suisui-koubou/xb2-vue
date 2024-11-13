<template>
    <div>
        <AppHome />
    </div>
</template>

<script setup> // 如果此处不加上 'setup', 就会出现 Nuxt: A composable that requires access to the Nuxt instance was called outside of a plugin...
useHead({
    title: '首页', 
}); 
</script>
