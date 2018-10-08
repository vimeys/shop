
// 店铺管理
 export const shopSetting=[
  {
    name:'门店设置',
    active:true,
    router:'/shop/shopSetting'
  },
  {
    name:'员工管理',
    active:false,
    router:'/shop/staffSetting'
  },
]
//财务数据
// export  const moneyManage=[
//   {
//     name:'财务管理',
//     active:true,
//     router:'moneyManage'
//   }
// ]


//客户管理
export const clientManage=[
  {
    name:'预约管理',
    active:true,
    router:'/clientIndex/appointmentList'
  },
  {
    name:'客户列表',
    active:false,
    router:'/clientIndex/clientList'
  },
  {
    name:'分销人员管理',
    active:false,
    router:'/clientIndex/salesmanList'
  },
  {
    name:'订单管理',
    active:false,
    router:'/clientIndex/orderManage'
  },
]
//运营管理
export const client=[

  {
    name:'首页',
    active:true,
    router:'/centerIndex/indexPage'
  },
  {
    name:'服务',
    active:false,
    router:'/centerIndex/goodsList'
  },
  {
    name:'卡券管理',
    active:false,
    router:'/centerIndex/cardManage'
  },
  {
    name:"裂变分销123",
    active:false,
    router:'/centerIndex/activeSale'
  }
]

// 运营数据
export  const dataView=[
  {
    name:'服务数据',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'员工业绩',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'游戏数据',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'分销数据',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'文章及画报数据',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'评价管理',
    active:true,
    router:'/dataView/serviceRate'
  },
  {
    name:'客流增长报表',
    active:false,
    router:'/dataView/serviceData'
  },
  {
    name:'用户评价统计',
    active:false,
    router:'/dataView/serviceData'
  },
]


//素材中心
export const  fodderCenter=[
  {
    name:'素材中心',
    active:true,
    router:'/fodderCenter/fodders'
  },
  {
    name:'客户列表',
    active:false,
    router:'/fodderCenter/push'
  }
]

//财务管理
export  const  moneyManage=[{
  name:'财务管理',
  active:true,
  router:'/moneyManage/data'
},{
  name:'目标管理',
  active:false,
  router:'/moneyManage/target'
}];



//账号管理
export const accountSetting=[
  {
    name:'账号设置',
    active:true,
    router:'/shopManage/shopSetting'
  },
  {
    name:'通知中心',
    active:false,
    router:'/shopManage/staffSetting'
  },
  {
    name:'使用帮助',
    active:false,
    router:'/shopManage/staffSetting'
  },
  {
    name:'余额管理',
    active:false,
    router:'/shopManage/staffSetting'
  },
]
