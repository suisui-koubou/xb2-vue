<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
const {name} = useAppConfig(); 

useHead({
  titleTemplate(title){
    return title ? `${title} - ${name}` : name; 
  }
})
</script>