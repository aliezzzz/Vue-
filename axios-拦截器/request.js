import axios from 'axios'
import store from '@/store'
// import { Message } from 'element-ui' // 消息提示

import Toast from 'muse-ui-toast';
import router from '../router/index.js' // 跳转登录

const baseURL = 'https://longheng.baizitech.cn/longheng'


const refreshRequest = error => {
  return new Promise((resolve, reject) => {
    service({
      url: '/auth/refreshToken',
      params: { refreshToken: localStorage.getItem('refreshToken') }
    }).then(res => {
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      const newToken = `bearer;${localStorage.getItem('accessToken')}`
      const config = error.config
      config.headers.Authorization = newToken
      resolve(service(config))
    }).catch(err => {
      reject(err)
    })
  })
}

// service
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  method: 'post'
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('isLogin')) {
      // 判断是否登录，登录则每个http header都加上token
      // console.log(localStorage.getItem('accessToken'));
      config.headers.Authorization = `bearer;${localStorage.getItem('accessToken')}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
service.interceptors.response.use(
  res => {
    if (res.data.code && res.data.code !== 200) {
      if (res.data.code === 201){
        Toast.message('请先注册用户信息')
        router.push('/common-register')
        return Promise.reject(res.data.msg);
      }else{
        Toast.message(res.data.msg)
        return Promise.reject(res.data.msg)
      }
    }
    if (res.data.code === 200){
      return res.data.data
    }
    return res.data
  },
  error => {
    let res = error.response
    switch (res.status) {
      case 401:
		    if (store.state.loginStatus){
          return refreshRequest(res)
        }else{
          console.log('未登录')
          Toast.message('请先登录')
          setTimeout(() => {
            router.push('/login')
          },100)
        }
        break;
      case 403:
        console.log('403-push')
        router.push('/login')
        // Message({
        //   type: 'info',
        //   message: '请重新登录'
        // })
        break
      case 500:
        console.log('服务器错误')
        break
      // alert('服务器错误');
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default service
