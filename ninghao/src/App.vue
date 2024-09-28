<template>
  <div class="page">
    <div class="card">
      <div class="card__header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle"> Transition & Animation </div>
      </div>
      <div class="card__content">
        <!-- v-if使得普通组件失去动画效果，如果想做切入和切出的动画，可以用 transition 包装，
         移除和加入会出现 v-enter-active v-enter-to 等类(自动添加的，也可自己定义) -->
        <transition name="tree"
          enter-active-class="animate__animated animate__flip"
          leave-active-class="animate__animated animate__fadeOutTopLeft"
        >
          <div v-if="isActive" :class="['emoji', { pulse : !isActive}]">🌲</div>
        </transition> 
      </div>
      <div class="card__action">
        <button @click="isActive = !isActive" :class="{ 'active': isActive }">请按这里</button>
      </div>
    </div>
    <div class="status"><small>isActive: {{ isActive }}</small></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      name: '宁浩网',  
      isActive: false, 
    }
  }
});
</script>

<style>
@import './styles/app.css';
@import './styles/card.css';
@import './styles/animate.css';
</style>
