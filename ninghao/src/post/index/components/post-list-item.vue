<template>
    <div>
        <h3>{{ item.title }}</h3><small>{{ item.user.name }}</small>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

//  
export default defineComponent({
    props: {
        item: Object
    }, 
});
</script>

 