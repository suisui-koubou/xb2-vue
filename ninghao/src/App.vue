<template>
  <div>
    <h3>{{ greeting }}</h3>
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
    }
  }, 

  mounted(){
    axios.get('http://localhost:3000/posts').then(res=>{
      this.greeting = res.data[0].title;
      
		}); 
  }
});
</script>

<style>
</style>
