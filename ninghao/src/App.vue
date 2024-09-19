<template>
  <h3>{{ name }}</h3>
</template>

<script lang="ts">

import { mapState, mapGetters} from 'vuex';

export default {
  data() {
    return { }
  }, 

  computed: {
    ...mapGetters(['name'])
  }
};
</script>

<style>
</style>
