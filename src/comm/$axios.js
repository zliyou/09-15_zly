import axios from 'axios';
import router from "@/router";
let $axios = axios.create({
  baseURL: '/api',
  timeout: 3000
});

// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(config.url == '/userlogin'){

    return config;
  }else{
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    config.headers.authorization = userInfo.token;
    return config;
  }
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code ==403 &&response.data.code ==404){
    router.replace('/login');
    return response.data;
  }else{
    return response.data;

  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default $axios;