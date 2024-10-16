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
import axios from 'axios'; 

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
      const res = await axios.get('/posts', 
        { baseURL: 'http://localhost:3000' });
      this.posts = res.data;    
    } catch (err){
      this.errorMassage = err.message; 
    }
  }
});
</script>

<style>
</style>
