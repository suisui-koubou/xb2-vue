<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle"> Transition & Animation </div>
      </div>
      <div class="card__content">
        <div class="emoji"> {{ animatedNumber }} </div>
      </div>
      <div class="card__action">
        <button @click="number = number + 100" :class="{ 'active': isActive }">请按这里</button>
      </div>
    </div>
    <div class="status"><small>isActive: {{ isActive }}</small></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import _ from 'lodash'; 
import gsap from 'gsap';  


export default defineComponent({
  data() {
    return {
      name: '宁浩网',  
      isActive: false,
      emojiList: ['♠️', '♣️', '♥️', '♦️'], 
      number: 0, 
      tweenedNumber: 0, 
    }
  },

  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0); 
    }
  }, 

  watch: {
    // 观察 this.$data.number 这个变量
    number(newVal){
      gsap.to(this.$data, {duration: 0.5, tweenedNumber: newVal}); 
    }
  }, 

  methods: {
    shuffle() {
      this.emojiList = _.shuffle(this.emojiList); 
    }, 

    pop() {
      this.emojiList.pop(); 
    }
  }
});
</script>

<style>
@import './styles/app.css';
@import './styles/card.css';
@import './styles/animate.css';
</style>
