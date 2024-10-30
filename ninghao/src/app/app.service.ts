import axios from 'axios'; 
import { API_BASE_URL } from './app.config';


// axios 是请求后端的组件
export const apiHttpClient = axios.create({
    baseURL: API_BASE_URL,
});
