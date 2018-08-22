import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//  公共步骤条
import steps from '@/components/steps'
// **************后台中心分页--运营管理************
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

// 服务商品列表
import  goodsList from '@/page/systemCenter/goodsList'



//******后台中心卡券管理******
import  cardManage from "@/page/systemCenter/cardManage/cardManage"
//优惠券
import  vipCard  from '@/page/systemCenter/cardManage/vipCard'
//会员卡
import  priceCard from '@/page/systemCenter/cardManage/priceCard'
//裂变分销
import  activeSale from '@/page/systemCenter/activeSales'


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
import  shop from '@/page/shopManage/index'
//门店管理
import shopSetting from '@/page/shopManage/shopSetting'
//员工管理
import  staffSetting from '@/page/shopManage/staffSetting'

//*************素材管理**********
import  fodderCenter from '@/page/fodderCenter/fodder'
// 平台推荐
import  push from '@/page/fodderCenter/push'



//****************财务管理*********************
import  moneyManage from '@/page/moneyManage/moneyManage'


//******************运营数据**************************
import  serviceRate from '@/page/dataView/serviceRate'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path:'/',
      redirect:'shop',
      component:shop
    },
    //首页
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
          name:cardList,
          component:cardList
        },

      ]
    },
    //卡券管理
    {
      path: '/system/cardManage',
      name: 'cardManage',
      component: cardManage,
      children: [
        {
          path: 'system/priceCard',
          name: 'priceCard',
          component: priceCard
        },
        {
          path: 'system/vipCard',
          name: 'vipCard',
          component: vipCard
        },
      ]
    },
    //服务商品列表
    {
      path:'/system/goodsList',
      name:goodsList,
      component:goodsList
    },
    {
        path:'/system/activeSale',
      name:'activeSale',
      component:activeSale
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
    {
      path:'/shop',
      component:shop,
      children:[
        //门店管理
        {
          path:'/shopManage/shopSetting',
          name:'shopSetting',
          component:shopSetting
        },
        //员工管理
        {
          path:'/shopManage/staffSetting',
          name:'staffSetting',
          component:staffSetting
        },
      ],
      // redirect:'/shopManage/staffSetting'
    },

    //素材中心
    {
      path:'/fodderCenter/fodder',
      name:'fodder',
      component:fodderCenter
    },
    //平台推荐
    {
      path:'/fodderCenter/push',
      name:'push',
      component:push
    },
    //财务管理
    {
      path:'/moneyManage',
      name:'moneyManage',
      component:moneyManage
    },
    //服务评价
    {
      path:'/dataView/serviceRate',
      name:'serviceRate',
      component:serviceRate
    }
  ]
})
