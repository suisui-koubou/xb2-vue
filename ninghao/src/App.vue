<template>
  <div>
    <h3>{{ greeting }}</h3>
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
      posts: []
    }
  }, 

  mounted(){
    axios
      .get('http://localhost:3000/posts1')
      .then(res => {
        this.posts = res.data; 
      })
      .catch(err =>{
        console.log(err.response);
        console.log(err.message);  
      }); 
  }
});
</script>

<style>
</style>
