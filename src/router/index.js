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

//后台中心卡券管理
import  cardManage from "@/page/systemCenter/cardManage/cardManage"
//后台中心卡券管理优惠券
import  vipCard  from '@/page/systemCenter/cardManage/vipCard'
//中心卡券会员卡
import  priceCard from '@/page/systemCenter/cardManage/priceCard'

//*******客户管理********
//订单管理
import   orderManage from '@/page/clientManage/orderManage'
//销售人员管
import  salesmanList from '@/page/clientManage/salesmanList'
//预约单列表
import appointmentList from "@/page/clientManage/appointmentList"
//客户列表
import clientList from '@/page/clientManage/clientList'

//***********门店员工管理*******************
//门店管理
import shopSetting from '@/page/shopManage/shopSetting'



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
              path:'/:id',
              component:cardList
            }
          ]
        },
        // 促销活动里面的卡券
        {
          path:'/cardList',
          component:cardList
        },

      ]
    },
    {
      path:'/123/cardManage',
      name:'cardManage',
      component:cardManage,
    },
    //订单管理
    {
      path:'/client/orderManage',
      name:'orderManage',
      component:orderManage
    },
    //销售人员管
    {
      path:'/client/salesmanList',
      name:'salesmanList',
      component:salesmanList
    },
    //预约单列表
    {
      path:'/client/appointmentList',
      name:'appointmentList',
      component:appointmentList
    },
    //客户列表
    {
      path:'/client/clientList',
      name:'clientList',
      component:clientList
    },
    //门店管理
    {
      path:'/shopManage/shopSetting',
      name:'shopSetting',
      component:shopSetting
    }
  ]
})
