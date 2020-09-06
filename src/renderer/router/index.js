import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/SiteList',
      name: 'siteList',
      component: require('@/components/SiteList').default
    },
    {
      path: '/NavList',
      name: 'navList',
      component: require('@/components/NavList').default
    },
    {
      path: '/ColorList',
      name: 'colorList',
      component: require('@/components/ColorList').default
    },
    {
      path: '/SiteDetial/:siteId',
      name: 'siteDetial',
      component: require('@/components/SiteDetial').default
    },
    {
      path: '/Login',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path: '/MemberList',
      name: 'memberList',
      component: require('@/components/MemberList').default
    },
    {
      path: '/TypeList',
      name: 'typeList',
      component: require('@/components/TypeList').default
    },
    {
      path: '/CreateJoinCode',
      name: 'createJoinCode',
      component: require('@/components/CreateJoinCode').default
    },
    {
      path: '/NewsDetial',
      name: 'newsDetial',
      component: require('@/components/NewsDetial').default
    },
    {
      path: '/OperationRecord',
      name: 'operationRecord',
      component: require('@/components/OperationRecord').default
    },
    {
      path: '*',
      redirect: '/Login'
    }
  ]
})
export default router
