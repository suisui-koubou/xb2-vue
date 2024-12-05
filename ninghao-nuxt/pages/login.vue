<template>
    <div>
        <!-- prevent 防止提交的默认行为 -->
        <form @submit.prevent>
            <div v-if="!currentUser">
                <h1>用户登录</h1>
                <div>
                    <input type="text" autocomplete="username" placeholder="用户名" v-model="name"/>
                </div>
                <div>
                    <input type="password" autocomplete="current-password" placeholder="密码" v-model="password" />
                </div>
                <div>
                    <button class="primary" @click="login">登录</button>
                </div>
            </div>
            <div v-else>
                <h1>欢迎回来~</h1>
                <div>
                    <button class="primary">退出</button>
                </div>
            </div>
        </form> 
    </div>
</template>

<script setup>


useHead({
    title: '登录', 
}); 

const name = ref('');
const password = ref(''); 
const currentUser = useState('currentUser');

const login = async () => {
    // console.log('name', name.value); 
    // console.log('password', password.value); 

    const {data} = await useApiFetch('login', {
        method: 'POST', 
        body: {
            name: name.value, 
            password: password.value, 
        }
    }); 

    // console.log(data.value); 
    if (data.value){
        currentUser.value = data.value; 
        useLocalStorage('currentUser', currentUser.value); 
    }
}; 

</script>

