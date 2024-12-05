<template>
    <div class="app">
        <header>
            <div>
                <span>🎄</span> <NuxtLink to="/">{{ name }}</NuxtLink>
            </div>
            <nav>
                <div>
                    <NuxtLink to="/posts">内容</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/about">关于</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/login" class=''>登录</NuxtLink>
                </div>
            </nav>
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

