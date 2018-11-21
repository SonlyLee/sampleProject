import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/user/index'
import indexHome  from '@/components/user/home/index'
import indexCategoty from '@/components/user/category/index'
import indexView from '@/components/user/specific/index'

import login from '@/components/admin/Login'
import register from '@/components/admin/register'
import management from '@/components/admin/management'
import managementHome from '@/components/admin/managementHome'
import managementPublish from '@/components/admin/managementPublish'
import managementCategory from '@/components/admin/managementCategory'
import managementDate from '@/components/admin/managementDate'
import viewContent from '@/components/admin/viewContent'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/article', redirect: '/article/home'},
    {
      path: '/article',
      name: 'index',
      component: index,
      children:[
        {path:'/article/home',name:'indexHome',component: indexHome},
        {path:'/article/category',name:'indexCategoty',component: indexCategoty},
        {path:'/article/view',name:'indexView',component:indexView}
      ]
    },
    { path: '/', redirect: '/article/home' },    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    { path: '/management', redirect: '/management/home' },
    {
      path: '/management',
      name: 'management',
      component: management,
      children:[
        {path: '/management/home',name:'managementHome',component: managementHome},
        {path: '/management/publish',name:'managementPublish',component: managementPublish},
        {path: '/management/category',name:"managementCategory",component: managementCategory},
        {path: '/management/date',name: "managementDate",component: managementDate},
        {path: '/management/view',name: "viewContent",component: viewContent}
      ]
    }
  ]
})
