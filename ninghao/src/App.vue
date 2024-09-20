<template>
  <div>
    <h3 v-on:click="onClickName">{{ getName }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { mapGetters, mapMutations } from 'vuex'; 

let $store; 

export default defineComponent({
  setup(){
    $store = getCurrentInstance()?.appContext.config.globalProperties.$store;
    console.log($store);
  }, 


  data() {
    return { }
  },

  computed: {
    ...mapGetters(['getName']), 
  }, 

  methods: {
    ...mapMutations(['setName']), 

    onClickName(){
      if (this.$store.state.name === '哔哩哔哩'){
        this.$store.state.name = 'Bilibili'; 
      }else{
        this.$store.state.name = '哔哩哔哩'; 
      }
    }
  }
});
</script>

<style>
</style>
