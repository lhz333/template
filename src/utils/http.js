// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import router from '../router/index'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from '@/utils/loading'
import { Message } from 'element-ui'

axios.interceptors.request.use(
  config => {
    if (config.headers.isLoading !== false) {
      // 如果配置了isLoading: false，则不显示loading
      showFullScreenLoading()
    }
    // config.headers['loginName'] = localStorage.getItem('username')
    // config.headers['Authorization'] = localStorage.getItem('token')
    return config
  },
  error => {
    tryHideFullScreenLoading()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  data => {
    tryHideFullScreenLoading()
    if(data.data.StatusCode == '401') {
      Message.error({
        message: '登录已过期，请您重新登录！'
      })
      localStorage.clear()
      router.push({
        path: '/login'
      })
    }
    return data
  },
  error => {
    //当返回信息为未登录或者登录失效的时候重定向为登录页面
    if (error.response.status == '401') {
      Message.error({
        message: '登录已过期，请您重新登录！'
      })
      localStorage.clear()
      router.push({
        path: '/login'
      })
    }

    if (error.response.status == '405') {
      Message.error({
        message: '您没有此功能的操作权限！'
      })
    }
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)

export { axios }
