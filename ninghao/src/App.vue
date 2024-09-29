<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle"> Transition & Animation </div>
      </div>
      <div class="card__content">
        <transition-group>
          <!-- :key 是用来操作元素的，所以不建议key绑定 index -->
          <div class="emoji" v-for="emoji in emojiList" :key="emoji"> 
            {{ emoji }}
          </div>
        </transition-group>
      </div>
      <div class="card__action">
        <button @click="shuffle" :class="{ 'active': isActive }">请按这里</button>
      </div>
    </div>
    <div class="status"><small>isActive: {{ isActive }}</small></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import _ from 'lodash'; 


export default defineComponent({
  data() {
    return {
      name: '宁浩网',  
      isActive: false,
      emojiList: ['♠️', '♣️', '♥️', '♦️']
    }
  },

  methods: {
    shuffle() {
      this.emojiList = _.shuffle(this.emojiList); 
    }
  }
});
</script>

<style>
@import './styles/app.css';
@import './styles/card.css';
@import './styles/animate.css';
</style>
