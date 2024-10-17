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
                console.log(res.data); 
            } catch (error) {
                this.errorMassage = error.mesaage; 
            }
        }
    }
}
</script>
