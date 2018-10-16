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
import  fodder  from '@/page/fodderCenter/accountSetting'//素材中心
import  push from '@/page/fodderCenter/push'//平台推送
import  type from '@/page/fodderCenter/fodder/type'//分类页面
import  articleList from '@/page/fodderCenter/fodder/articleList'//文章
import transpond from '@/page/fodderCenter/fodder/transpond'//转发文章
import  pictorial from '@/page/fodderCenter/fodder/pictorial'//画报
import  poster from '@/page/fodderCenter/fodder/poster'//海报
import issued from '@/page/fodderCenter/fodder/issued'//已发布



//****************财务管理*********************
import  moneyManage from '@/page/moneyManage/moneyManage'
import moneyDate from '@/page/moneyManage/moneyData'
import target from '@/page/moneyManage/targetManage'

//******************运营数据**************************


// ***********************消息中心*********************
import  message from '@/page/messages/message'

import  serviceRate from '@/page/dataView/serviceRate'
import  dataView from '@/page/dataView/dataView'
import serviceData from '@/page/dataView/serviceData'
Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path:'/',
      redirect:'/shop/staffSetting',
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
            // 精选商品
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
      path:'/fodderCenter',
      name:'fodderCenter',
      component:fodderCenter,
      children:[
        {
          path:'fodders',
          name:'fodder',
          component:fodder,
          children:[
            {
              path:'fodder',
              name:"type",
              component:type
            },
            {
              path:'articleList',
              name:'articleList',
              component:articleList
            },
            {
              path:'transpond',
              name:'pictorial',
              component:transpond
            },
            {
              path:'pictorial',
              name:'pictorial',
              component:pictorial
            },
            {
              path:'poster',
              name:'poster',
              component:poster
            },
            {
              path:'issued',
              name:'issued',
              component:issued
            }
          ],
          redirect:'/fodderCenter/fodders/fodder'
        },
        {
          path:'push',
          name:'push',
          component:push
        }
      ],
      redirect:'/fodderCenter/fodders'
    },
    //财务管理
    {
      path:'/moneyManage',
      name:'moneyManage',
      component:moneyManage,
      children:[{
        path:'data',
        component:moneyDate
      },{
        path:'target',
        component:target
      }],
      redirect:'/moneyManage/target'
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
        },
        {
          path:'serviceData',
          name:'serviceData',
          component:serviceData
        }
      ],
      redirect:'/dataView/serviceRate'
    },
    //消息中心
    {
      path:'/message',
      component:message,
    }

  ]
})
