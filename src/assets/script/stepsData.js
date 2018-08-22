
// 店铺管理
 export const shopSetting=[
  {
    name:'门店设置',
    active:true,
    router:'/shopManage/shopSetting'
  },
  {
    name:'员工管理',
    active:false,
    router:'/shopManage/staffSetting'
  },
]
//财务数据
export  const moneyManage=[
  {
    name:'财务管理',
    active:true,
    router:'moneyManage'
  }
]


//客户管理
export const clientManage=[
  {
    name:'预约管理',
    active:true,
    router:'/client/appointmentList'
  },
  {
    name:'客户列表',
    active:false,
    router:'/client/clientList'
  },
  {
    name:'分销人员管理',
    active:false,
    router:'/client/salesmanList'
  },
  {
    name:'订单管理',
    active:false,
    router:'/client/orderManage'
  },
]
//运营管理
export const client=[

  {
    name:'首页',
    active:true,
    router:'/index'
  },
  {
    name:'服务',
    active:false,
    router:'/client/clientList'
  },
  {
    name:'卡券管理',
    active:false,
    router:'/system/cardManage'
  },
  {
    name:"裂变分销",
    active:false,
    router:'/system/activeSale'
  }
]

// 运营数据
export  const dataView=[
  {
    name:'服务数据',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'员工业绩',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'游戏数据',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'分销数据',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'文章及画报数据',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'评价管理',
    active:true,
    router:'/dataView/serviceRate'
  },
  {
    name:'客流增长报表',
    active:false,
    router:'/dataView/serviceRate'
  },
  {
    name:'用户评价统计',
    active:false,
    router:'/dataView/serviceRate'
  },
]


//素材中心
export const  fodderCenter=[
  {
    name:'素材中心',
    active:true,
    router:'/fodderCenter/fodder'
  },
  {
    name:'客户列表',
    active:false,
    router:'/fodderCenter/push'
  }
]


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
