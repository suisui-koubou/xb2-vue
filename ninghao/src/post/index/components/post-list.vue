<template>
    <div>
        <div v-if="loading">加载中...</div>
        <!-- 组件的 item 属性可以在 PostListItem 中使用。(注意 props里面 item , 这里把 post 赋值到item属性)。 -->
        <PostListItem v-for="p in posts" :item="p" :key="p.id"/>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PostListItem from './post-list-item.vue';
import { mapGetters, mapActions } from 'vuex'; 

export default defineComponent({
    async created() {
        this.getPosts(); // 从 mapActions 展开出来的。
    }, 

    // 这下懂了 Store 的作用吧。
    // 因为每个组件都有自己的 data, 所以东一块西一块。
    // 难道我换个页面要重新发送API请求? 傻了。
    computed: {
        // 因为使用了namespace, 所以要指明模块名字。
        // Store数据直接对应computed
        ...mapGetters({
            loading: 'post/index/loading', 
            posts: 'post/index/posts'
        })
    }, 

    methods: {
        // Store里面的actions就是对应methods
        ...mapActions({
            getPosts: 'post/index/getPosts'
        })
    }, 

    components: {
        PostListItem
    }
});
</script>

