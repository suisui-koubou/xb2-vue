<template>
  <div>
    <h3>{{ greeting }}</h3>
    <div>{{ errorMassage }}</div>
    <div v-for="post in posts" :key="post.id">
      {{ post.title }} - <small>{{ post.user.name }}</small>  
    </div>  
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { apiHttpClient } from '@/app.service'; 

export default defineComponent({
  name: 'App',

  data() {
    return {
      greeting: 'Hello World!', 
      posts: [], 
      errorMassage: '', 
      user: {
        name: 'randoruf', 
        password: '1234'
      }, 
      token: '' 
    }
  }, 

  async mounted(){
    try {
      const res = await apiHttpClient.get('/posts'); 
      this.posts = res.data;    
    } catch (err){
      this.errorMassage = err.message; 
    }

    // 用户登录
    try {
      const res = await apiHttpClient.post('/login', this.user); 
      this.token = res.data.token; 
      console.log('Token: ', this.token); 
    } catch(error) {
      this.errorMassage = error.message; 
    }
  }
});
</script>

<style>
</style>
