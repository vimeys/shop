import Vue from 'vue'
import Router from 'vue-router'

//  公共步骤条
import steps from '@/components/steps'
// **************后台中心分页--运营管理************
import indexPage from '@/page/systemCenter/index/indexPage'

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


//运营管理总页面
import centerIndex from '@/page/systemCenter/centerIndex'


//******后台中心卡券管理******
import  cardManage from "@/page/systemCenter/cardManage/cardManage"
//优惠券
import  vipCard  from '@/page/systemCenter/cardManage/vipCard'
//会员卡
import  priceCard from '@/page/systemCenter/cardManage/priceCard'
//裂变分销
import  activeSale from '@/page/systemCenter/activeSales'


//*******客户管理********
import  clientIndex from '@/page/clientManage/clientCenter'
//订单管理
import   orderManage from '@/page/clientManage/orderManage'
//销售人员管
import  salesmanList from '@/page/clientManage/salesmanList'
//预约单列表
import appointmentList from "@/page/clientManage/appointmentList"
//客户列表
import clientList from '@/page/clientManage/clientList'



//***********门店/员工管理*******************
import  shop from '@/page/shopManage/shopIndex'
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
import moneyDate from '@/page/moneyManage/moneyData'
import target from '@/page/moneyManage/targetManage'

//******************运营数据**************************
import  serviceRate from '@/page/dataView/serviceRate'
import  dataView from '@/page/dataView/dataView'

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path:'/',
      redirect:'/shop/shopSetting',
    },
    // 运营管理总页面
    {
      path:'/centerIndex',
      component:centerIndex,
      children:[
        //首页
        {
          path:'indexPage',
          name:'indexPage',
          component:indexPage,//后台中心的首页主页面
          children:[
            {
              path:'bg',
              component:ysAddBg
            },
            {
              path:'logo',
              component:ysLogo
            },
            {
              path:'diyImage',
              component:diyImage
            },
            {
              path:'activity',
              component:activity,
              // children: [
              //   {
              //     path:'/:id',
              //     component:cardList
              //   }
              // ]
            },
            // 促销活动里面的卡券
            {
              path:'cardList',
              name:cardList,
              component:cardList
            },
          ],
          redirect:'/centerIndex/indexPage/bg'
        },
        //卡券管理
        {
          path: 'cardManage',
          name: 'cardManage',
          component: cardManage,
          children: [
            {
              path: 'priceCard',
              name: 'priceCard',
              component: priceCard
            },
            {
              path: 'vipCard',
              name: 'vipCard',
              component: vipCard
            },

          ],
          redirect:'/centerIndex/cardManage/priceCard',
        },
        //服务商品列表
        {
          path:'goodsList',
          name:'goodsList',
          component:goodsList
        },
        //裂变分销
        {
          path:'activeSale',
          name:'activeSale',
          component:activeSale
        }
      ],
      redirect:'/centerIndex/indexPage'
    },

    //客户中心
    {
      path:'/clientIndex',
      component:clientIndex,
      children: [
        //订单管理
        {
          path:'orderManage',
          name:'orderManage',
          component:orderManage
        },
        //销售人员管
        {
          path:'salesmanList',
          name:'salesmanList',
          component:salesmanList
        },
        //预约单列表
        {
          path:'appointmentList',
          name:'appointmentList',
          component:appointmentList
        },
        //客户列表
        {
          path:'clientList',
          name:'clientList',
          component:clientList
        },
      ],
      redirect: '/clientIndex/appointmentList'
    },


    // 店铺/员工总路由
    {
      path:'/shop',
      name:'shop',
      component:shop,
      children:[
        //门店管理
        {
          path:'shopSetting',
          name:'shopSetting',
          component:shopSetting
        },
        //员工管理
        {
          path:'staffSetting',
          name:'staffSetting',
          component:staffSetting
        },
      ],
      redirect:'/shop/shopSetting'
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
      component:moneyManage,
      children:[{
        path:'/moneyManage/data',
        component:moneyDate
      },{
        path:'/moneyManage/target',
        component:target
      }],
      redirect:'/moneyManage/data'
    },
    // //服务评价
    // {
    //   path:'/dataView/serviceRate',
    //   name:'serviceRate',
    //   component:serviceRate
    // },
    //运营数据
    {
      path:'/dataView',
      component:dataView,
      children:[
        {
          path:'serviceRate',
          name:'serviceRate',
          component:serviceRate
        }
      ]
    }

  ]
})
