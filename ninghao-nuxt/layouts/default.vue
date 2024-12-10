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
                <div v-if="currentUser">
                    <NuxtLink to="/create">发布</NuxtLink>
                </div>
                <div>
                    <NuxtLink to="/about">关于</NuxtLink>
                </div>
                <div class="login-box">
                    <div v-if="!currentUser">
                        <NuxtLink to="/login" class=''>登录</NuxtLink>
                    </div>
                    <div v-else>
                        当前用户: {{ currentUser.name }} | 
                        <a @click="useLogout" style="text-decoration: underline;">退出</a>
                    </div>
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
const currentUser = useState('currentUser');




</script>


<style>
@import '../assets/styles/default.css';
</style>

