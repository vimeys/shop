import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//  公共步骤条
import steps from '@/components/steps'
// 后台中心分页
import ysIndex from '@/page/systemCenter/index/index'

import ysAddBg from '@/page/systemCenter/index/components/bg'
//后台中心的logo
import ysLogo from '@/page/systemCenter/index/components/logo'
//后台中心的自定义图片
import diyImage from '@/page/systemCenter/index/components/diyImage'
//促销活动的卡券
import activity from '@/page/systemCenter/index/components/activity'

// 促销活动里面的卡券
import  cardList from '@/page/systemCenter/index/components/cardList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/steps',
      name:'steps',
      component:steps
    },
    {
      path:'/index',
      name:'index',
      component:ysIndex,//后台中心的首页主页面
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
          component:activity,
          children: [
            {
              path:'/abc',
              component:cardList
            }
          ]
        },
        // 促销活动里面的卡券
        {
          path:'/cardList',
          component:cardList
        }
      ]
    }
  ]
})
