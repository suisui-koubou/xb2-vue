<template>
    <div>
        <small>User Login: </small>
        <input type="text" placeholder="user name" v-model="username">
        <input type="password" placeholder="password" v-model="password">
        <button @click="login">登录</button>
    </div>
</template>


<script>
import { apiHttpClient } from '@/app.service';

export default {
    data() {
        return {
            username: '', 
            password: ''
        }
    }, 

    methods: {
        async login(){
            try {
                const res = await apiHttpClient.post(
                    '/login', 
                    { name: this.username, password: this.password}
                ); 
                // 登录成功之后，触发的事件login-success 并传入参数 res.data 。
                // 事件 login-success 在 <template> 的组件中定义，
                this.$emit('login-success', res.data); 
            } catch (error) {
                this.errorMassage = error.mesaage; 
                // 
                this.$emit('login-fail', error.response.data); 
            }
        }
    }
}
</script>
