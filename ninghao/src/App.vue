<template>
  <div>
    <h3 v-on:click="onClickName">{{ name }}</h3>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex'; 

export default defineComponent({
  data() {
    return { }
  },

  computed: {
    ...mapGetters(['name']), 
  }, 

  methods: {
    ...mapMutations(['setName']), 

    onClickName(){
      if (this.$store.state.name === '哔哩哔哩'){
        this.setName('Bilibili'); 
      }else{
        this.setName('哔哩哔哩'); 
      }
    }
  }
});
</script>

<style>
</style>
