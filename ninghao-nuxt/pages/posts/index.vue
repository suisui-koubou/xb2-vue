<template>
    <div>
        <Head>
            <Title>{{ page >= 1 ? `内容列表 / 第${page}页` : '内容列表' }}</Title>
        </Head>
        <h1>内容列表</h1>
        <div>
            <button @click="backward">上一页</button>
            <button @click="forward">下一页</button>
        </div>
        <div v-if="pending">加载中...</div>
        <div v-if="posts !== null">
            <div v-for="post in posts" :key="post.id">
                <div>{{ post.title }}</div>
                <div>- <small>{{ post.user.name }}</small></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter} from 'vue-router';
import { ref, watch } from 'vue';
import { useApiFetch } from '../../composables/use-api-fetch';
import type { PostList } from '../../types/post.type';

/* 
    在刷新页面的时候可以观察到，页面不会停留，会回到最开始的地方。
    想刷新的时候保存当前页码，可以将页码插入到路由地址里(URL)。
    
*/

const {query: {page: pageNumber}} = useRoute(); // 解构出来重命名为 PageNumber。

const router = useRouter(); 
const updateQuery = () => {
    router.push({query: {page: page.value}});
}; 


const page = ref(pageNumber ? parseInt(`${pageNumber}`, 10) : 1); // 组合模式下的响应数据。（根据情况设置初始值)
const backward = () => {
    if (page.value > 1) {
        page.value--; 
    }
    // refresh(); 由于 useApiFetch(() => `posts?page=${page.value}`) 可以根据 page.value 动态改变(函数的好处)，所以已经不需要刷新了。
    updateQuery(); // 页码(或称 状态)会被插入到URL地址框内。
}; 
const forward = () => {
    page.value++;
    // refresh(); 同上
    updateQuery(); 
}; 

const {
    data: posts, // 获取的数据data重命名为posts
    pending, 
    refresh, 
    error
} = await useApiFetch<PostList>(
    // useFetch 相当于 useAsyncData 和 $fetch 组合。
    // 还有 useLazyFetch 相当于 useAsyncData 和 $fetch 组合，只不过设置 lazy=true。
    () => `posts?page=${page.value}`, 
); 

/* 
可以发现再次点击 '内容' 时，页面不会刷新。
在请求内容列表的之后，要刷新页面，并且观察如果Router有变化，也要更新 Page.value 的值。
*/
refresh(); 
watch(useRoute(), ({query}) => {
    if (query.page === undefined){
        page.value = 1; 
    }
})
</script>

