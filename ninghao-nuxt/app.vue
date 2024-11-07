<template>
  <NuxtPage></NuxtPage>
</template>


<script setup>
const {name} = useAppConfig(); 

useHead({
  titleTemplate(title){
    return title ? `${title} - ${name}` : name; 
  }
})
</script>