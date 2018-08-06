import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import steps from '@/components/steps'
import ysIndex from '@/page/systemCenter/index/index'
import ysActive from '@/page/systemCenter/active/index'
import  ysCard from '@/page/systemCenter/card/card'
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
      component:ysIndex
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
