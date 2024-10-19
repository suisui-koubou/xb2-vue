<template>
  <div>
    <h3>{{ greeting }}</h3>

    <UserLogin v-if="!isUserLoggerIn" @login-success="onLoginSuccess" @login-fail="onLoginFail"/>
    <div>{{ errorMassage }}</div>

    <div v-if="currentUser">
      用户名: {{ currentUser.name }}
    </div>

    <div v-if="isUserLoggerIn">
      <h3>创建内容</h3>
      <small>Title: </small><input type="text" v-model="title" @keyup.enter="createPost">
    </div>

    <div>
      <h3>内容列表</h3>
      <div v-for="post in posts" :key="post.id">
      <!-- 这里的 $event 是什么意思呢??? -->
      <div>
        <div v-if="!publishedByCurrentUser(post.user.id)">
          {{ post.title }} <small> - {{ post.user.name }}</small>  
        </div>
        <div v-if="isUserLoggerIn && publishedByCurrentUser(post.user.id)">
          <input type="text" :value="post.title" @keyup.enter="updatePost($event, post.id)">  
          <button @click="deletePost(post.id)">Delete</button>
        </div>
      </div>
    </div>  
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
      token: '', 
      currentUser: null
    }
  }, 

  computed: {
    isUserLoggerIn(){
      return this.token ? true : false; 
    }
  }, 

  async mounted(){
    this.getPosts(); 
  },

  methods: {

    publishedByCurrentUser(userId) {
      return this.currentUser ? this.currentUser.id == userId : false;  
    }, 

    // 用户的登录状态通过 token 和 userId 保存在 localStorage 里面。
    // 所以要知道用户名，还需要额外再发一次请求
    async getCurrentUser(userId){
      try {
        const res = await apiHttpClient.get(`/users/${userId}`); 
        this.currentUser = res.data; 
      }catch(error){
        this.errorMassage = error.message; 
      }
    },  

    onLoginSuccess(data) { // 源自 response.data
      this.token = data.token; 
      this.getCurrentUser(data.id);
    }, 

    onLoginFail(data){ // 源自 error.response.data
      this.errorMassage = data.message; 
    }, 


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
