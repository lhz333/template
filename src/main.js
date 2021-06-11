import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { axios } from './utils/http'

import querystring from 'querystring'

import api from './utils/api'
import './utils/filter' // 过滤
import common from './utils/common'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import '../src/assets/css/main.css'
import '../src/assets/css/eladmin.less'
import './assets/css/icon.css'
import 'babel-polyfill'

Vue.config.productionTip = false

//全局修改默认配置，点击空白处不能关闭弹窗
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI, {
  size: 'small'
})

// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.prototype.API = api
Vue.prototype.$axios = axios
Vue.prototype.common = common
Vue.prototype.$querystring = querystring
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
