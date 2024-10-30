import axios from 'axios'; 

// axios 是请求后端的组件
export const apiHttpClient = axios.create({
    baseURL: 'http://localhost:3000'
});

