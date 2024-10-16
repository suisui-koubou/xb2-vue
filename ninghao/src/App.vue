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
      errorMassage: ''
    }
  }, 

  async mounted(){
    try {
      const res = await apiHttpClient.get('/posts'); 
      this.posts = res.data;    
    } catch (err){
      this.errorMassage = err.message; 
    }
  }
});
</script>

<style>
</style>
