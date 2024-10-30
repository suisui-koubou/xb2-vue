<template>
    <div>
        <!-- 组件的 item 属性可以在 PostListItem 中使用。(注意 props里面 item , 这里把 post 赋值到item属性)。 -->
        <PostListItem v-for="p in posts" :item="p" :key="p.id"/>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PostListItem from './post-list-item.vue';
import { apiHttpClient } from '@/app/app.service';

export default defineComponent({
    data(){
        return {
            posts: []
        }
    }, 

    async created(){
        const response = await apiHttpClient.get('/posts'); 
        this.posts = response.data; 
    }, 

    components: {
        PostListItem
    }
});
</script>

