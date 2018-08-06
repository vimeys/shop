import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import steps from '@/components/steps'
import ysIndex from '@/page/systemCenter/index/index'
import ysActive from '@/page/systemCenter/active/index'
import  ysCard from '@/page/systemCenter/card/card'
import ysAddBg from '@/page/systemCenter/index/components/bg'
import ysLogo from '@/page/systemCenter/index/components/logo'
import diyImage from '@/page/systemCenter/index/components/diyImage'
import activity from '@/page/systemCenter/index/components/activity'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/steps',
      name:'steps',
      component:steps
    },{
      path:'/index',
      name:'index',
      component:ysIndex,
      children:[
        {
          path:'/bg',
          component:ysAddBg
        },
        {
          path:'/logo',
          component:ysLogo
        },
        {
          path:'/diyImage',
          component:diyImage
        },
        {
          path:'/activity',
          component:activity
        }
      ]
    },
    {
      path:'/active',
      name:'active',
      component:ysActive
    },
    {
      path:'/card',
      name:'card',
      component:ysCard
    }
  ]
})
