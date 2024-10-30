<template>
  <div>
    <h3>
      <!-- router-link 类似 a 标签，可以指向路由地址 -->
      <router-link to="/"> {{ name }} </router-link>
    </h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '比特蠕动'
    }; 
  }, 
}


</script>

<style>
</style>
