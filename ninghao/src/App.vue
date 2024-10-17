<template>
  <div>
    <h3>{{ greeting }}</h3>

    <UserLogin />

    <small>Title: </small><input type="text" v-model="title" @keyup.enter="createPost">
    <div>{{ errorMassage }}</div>
    <div v-for="post in posts" :key="post.id">
      <!-- 这里的 $event 是什么意思呢??? -->
      <input type="text" :value="post.title" @keyup.enter="updatePost($event, post.id)">  
      <button @click="deletePost(post.id)">Delete</button>
      {{ post.title }} - <small>{{ post.user.name }}</small>  
    </div>  
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { apiHttpClient } from '@/app.service'; 
import UserLogin from '@/components/user/user-login.vue';

export default defineComponent({
  name: 'App',

  data() {
    return {
      greeting: '樱花动漫', 
      posts: [], 
      errorMassage: '', 
      token: '' 
    }
  }, 

  async mounted(){
    this.getPosts(); 
  },

  methods: {
    async deletePost(postId){
      try {
        const res = await apiHttpClient.delete(
          `/posts/${postId}`, 
          { headers: { Authorization: `Bearer ${this.token}` } }
        ); 
      }catch (error){
        this.errorMassage = '[[ 错误 ]]: 删除API是故意没有被实现。'; 
        // this.errorMassage = error.message; 
      }
    }, 


    async updatePost(event, postId){
      try {
        const res = await apiHttpClient.patch(
          `/posts/${postId}`, 
          { title: event.target.value }, 
          { headers: { Authorization: `Bearer ${this.token}` } }
        ); 
        this.getPosts(); 
      } catch (err) {
        this.errorMassage = err.message; 
      }
    }, 

    async getPosts() {
      try {
        const res = await apiHttpClient.get('/posts'); 
        this.posts = res.data;    
      } catch (err){
        this.errorMassage = err.message; 
      }
    }, 

    async createPost() {
      try {
        const res = await apiHttpClient.post(
          '/posts', 
          { title: this.title, }, 
          { headers: {
            Authorization: `Bearer ${this.token}`, 
          }}
        );
        console.log(res.data); 
        this.title = ''; // 清空网页上的表单内容(表单title)
        this.getPosts(); 
      } catch (error){
        this.errorMassage = error.message; 
      }
    }
  }, 

  components: {
    UserLogin, 
  }
});
</script>

<style>
@import "./styles/app.css"; 
</style>
