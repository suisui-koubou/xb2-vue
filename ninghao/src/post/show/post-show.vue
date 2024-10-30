<template>
    <div>
        <div v-if="readyToShowPost">
            <h1>{{ post.title }}</h1>
            <small> {{ post.user.name }} </small>
            <p>
                {{ post.content }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    // 将路由地址参数传递给组件的属性。
    props: {
        postId: String, 
    }, 

    created() {
        this.getPostById(this.postId); 
    },

    computed: {
        // 从store里面拆解的。
        // 在 template 可以直接访问 mapGetter 展开的方法(已经定义了post)
        ...mapGetters({
            loading: 'post/show/loading', 
            post: 'post/show/post', 
        }), 

        readyToShowPost(){
            return !this.loading && this.post; 
        }
    }, 


    methods: {
        ...mapActions({
            getPostById: 'post/show/getPostById', 
        })
    }
}); 

</script>
