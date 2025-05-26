import axios from 'axios'
import instance from './post'
import { Message } from 'element-ui';
// import router from '../../router'

// const config = {
//     baseURL: '',
//     timeout: 60 * 1000000,
// };
// const jsonAxios = axios.create(config)
const jsonAxios = axios.create()

instance.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) { //判断token是否存在
            config.headers.Authorization = sessionStorage.getItem('token')
            //  = 'Bearer f71b0217-6cdc-4f96-b752-6722cc8bf818';  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            sessionStorage.clear()
            Message.error('登录过期，请退出重新登录')
            // return router.replace('/Login');
        } else if (error.response.status === 502) {
            Message.error('服务器响应失败，请稍后重试')
            return Promise.reject(error);
        } else if (error.response.status === 404) {
            Message.error('未找到服务')
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);

export default {instance, jsonAxios}