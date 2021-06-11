import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: resolve =>
            require(['@/views/Dashboard.vue'], resolve),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/icon',
          name: 'icon',
          component: resolve =>
            require(['@/views/Icon.vue'], resolve),
          meta: {
            title: '图标管理'
          }
        },
        {
          path: '/404',
          name: '404',
          component: resolve =>
            require(['@/views/404.vue'], resolve),
          meta: {
            title: '404'
          }
        },
        {
          path: '/demo',
          name: 'demo',
          component: resolve =>
            require(['@/views/demo/index.vue'], resolve),
          meta: {
            title: 'demo'
          }
        },
      ]
    },
    {
      path: '/',
      name: 'ssoIndex',
      component: resolve => require(['@/views/sso/ssoIndex'], resolve),
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/sso/ssologin'], resolve),
    },
    {
      path: '/brand',
      name: 'brand',
      component: resolve => require(['@/views/sso/brand.vue'], resolve),
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
