<template>
    <div>
        <h1>从零开始的 Vue.js 学习</h1>
        <div>艾米莉亚碳</div>
        <footer>
            <hr>
            <div style="text-decoration: underline" @click="router.push('/about')">关于我们 ➡️</div>
        </footer>
    </div>    
</template>


<script setup>
const router = useRouter(); 

</script>