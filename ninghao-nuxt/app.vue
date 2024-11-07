<template>
  <NuxtPage></NuxtPage>
</template>


<script setup>
  useHead({
    titleTemplate(title){
      return title ? `${title} - 比特蠕动` : '比特蠕动'; 
    }
  })
</script>