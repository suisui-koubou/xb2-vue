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

  created() {
    this.$store.dispatch('getName');
  }, 

  computed: {
    ...mapGetters(['name']), 
  },

  methods: {
    ...mapMutations(['setName']), 

    onClickName(){
      if (this.$store.state.name === '宁浩网'){
        this.setName('Bilibili'); 
      }else{
        this.setName('宁浩网'); 
      }
    }
  }
});
</script>

<style>
</style>
