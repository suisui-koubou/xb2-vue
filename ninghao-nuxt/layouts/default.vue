<template>
    <div class="app">
        <header>
            <div>
                <span>🎄</span> {{ name }}
            </div>
            <nav></nav>
        </header>
        <main>
            <!-- 插槽用来显示组件 -->
            <slot></slot>
        </main>
    </div>
</template>

<!-- 这里的 setup 是必须的。但是为什么呢??? setup有用吗?-->
<script setup>
const {name} = useAppConfig(); 

</script>


<style>
@import '~/assets/styles/default.css';
</style>

