<template>
  <h3>{{ appName }}</h3>
</template>

<script lang="ts">

import { mapState } from 'vuex';

export default {
  data() {
    return { }
  }, 

  computed: {
    ...mapState({
      appName: 'name'
    }) // 获取 state 里面的 name 属性
  }
};
</script>

<style>
</style>
