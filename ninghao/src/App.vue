<template>
  <div>
    <h3 v-on:click="onClickName">{{ name }}</h3>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex'; 

export default defineComponent({
  data() {
    return { }
  },

  created() {
    // this.$store.dispatch('getName');
    this.getName(); // 在 methods 里面的 mapActions 解构出来了。
  }, 

  computed: {
    ...mapGetters(['name']), 
  },

  methods: {
    ...mapMutations(['setName']), 

    ...mapActions({
      getName: 'getName'
    }), 

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
