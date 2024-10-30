<template>
    <div>
        <p>PostIndex</p>
    </div>
</template>

<script>
import { apiHttpClient } from '@/app/app.service';


export default {
    // 请求node后端。
    async created(){
        const response = await apiHttpClient.get('/posts'); 
        
    }
}
</script>

