<template>
  <div>
    <h3>Hello World!</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '比特蠕动'
    }; 
  }, 

  created() {
    console.log(this.$store.state); 
  }
}


</script>

<style>
</style>
