<template>
    <div>
        <h3>{{ item.title }}</h3><small>{{ item.user.name }}</small>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

// 在 post-list.vue 文件的 :item='post' 会将每一次的post交给item属性。
// 在这里就可以直接使用item属性。
export default defineComponent({
    props: {
        item: Object
    }, 
});
</script>

 