<template>
  <div>
    <h3 v-on:click="onClickName">{{ getName }}</h3>
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
    ...mapGetters(['getName']), 
  }, 

  methods: {
    ...mapMutations(['setName']), 

    onClickName(){
      if (this.$store.state.name === '哔哩哔哩'){
        this.$store.commit('setName', 'Bilibili'); 
      }else{
        this.$store.commit('setName', '哔哩哔哩')
      }
    }
  }
});
</script>

<style>
</style>
