<template>
    <div>
        <h3>
            <!-- to 的 name 是 routes 里面的路由地址，同时也告诉了参数的对应关系(routes也有参数) -->
            <router-link :to="{name: 'postShow', params: {postId: item.id}}">
                {{ item.title }}
            </router-link>
        </h3>
        <small>{{ item.user.name }}</small>
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

 