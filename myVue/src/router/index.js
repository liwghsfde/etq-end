import Vue from 'vue'
import Router from 'vue-router'
import zwStore from '@/components/zwStore'
import zwHome from '@/components/zwHome'
import Member from '@/components/Member'
import zwEmployees from '@/components/zwEmployees'
import imformation from '@/components/imformation'
import data from '@/components/data'
import luoindex from '@/components/luoindex'
import order from '@/components/order'
import zwData from '@/components/zwData'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/zwStore',
      name: 'zwStore',
      component: zwStore
    },
    {
      path: '/zwHome',
      name: 'zwHome',
      component: zwHome
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member
    },
    {
      path: '/imformation',
      name: 'imformation',
      component: imformation
    },
    {
      path: '/zwEmployees',
      name: 'zwEmployees',
      component: zwEmployees
    },
    {
      path: '/',
      name: 'data',
      component: data
    },
    {
      path: '/luoindex',
      name: 'luoindex',
      component: luoindex
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/zwData',
      name: 'zwData',
      component: zwData
    },

  ]
})
