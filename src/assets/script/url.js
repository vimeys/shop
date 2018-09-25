  // const head='http://test.csmen.cc/services/';//线上
  const head='/shop/';//跨域
  // const head='http://192.168.0.135:8073/services/';//陈林本地

  const url={
    // 登录
    logincom:head+'user/loginbyphonenum',//登录企业
    login:head+'user/login',//登录个人


    //添加店铺
    addUserShop:head+'usershop/addUserShop',//添加店铺post
    shopList:head+'usershop/list4web',//1.1	实体店信息列表接口
    updataShop:head+'usershop/updateUserShop',//修改店铺信息
    delShop:head+'usershop/delete',//删除店铺信息

    //店铺成员管理
    addWaiter:head+'user/reg2',//添加成员
    groupList:head+'group/list',//获取分组列表
    waterGroupList:head+'group/list2',//分组下面的列表
    freeze:head+'user/stop',//冻结成员
    active:head+'user/active',//冻结成员
    moveGroup:head+'user/movebatch',//移动人员
    delPerson:head+'user/deletebatch',//删除人员
    updataPerson:head+'user/updateusername',//更新权限名字职位


    //店铺分组
    addGroup:head+'group/add',//添加分组
    updateGroup:head+'group/update',//修改分组
    delGroup:head+'group/delete',//删除分组


    //管理分类
    addType:head+'goodstype/version3/add',
    updataType:head+'goodstype/version3/update',
    delType:head+'goodstype/version3/delete',
    typeList:head+'goodstype/version3/list',


    //商品管理
    addGoods:head+'goods/version3/add',
    updataGoods:head+'goods/version3/update',
    delGoods:head+'goods/delete',
    delAllGoods:head+'goods/batchdelete',//批量删除
    goodsDetail:head+'goods/version3/detail',
    goodsList:head+'goods/version3/list4web',
    moveGoods:head+'goods/version3/batchmove',//移动
    sortGoods:head+'goods/setorder',//排序
    hotGoods:head+'goods/version3/updateGoodsByIsSelected',//精选商品
    hotGoodsList:head+'goods/version3/webgoodsByIsSelected',//精选商品


    //添加优惠券
    addCoupon:head+'couponBook/version3/add',//添加优惠券
    updataCoupon:head+'couponBook/version3/update',//跟新优惠券
    delCoupon:head+'couponBook/version3/delete',//删除优惠券
    couponList:head+'couponBook/version3/list',//优惠券列表

    //添加会员卡
    addMemberCard:head+'membershipCard/add',//添加会员卡
    updataMemberCard:head+'membershipCard/updateMembershipCard',//修改会员卡
    delMemberCard:head+'membershipCard/delete',//删除会员卡
    memberCardList:head+'membershipCard/listbyshopId',//所有会员卡列表

    //分销商
    getSalesman:head+'gameusershop/list',//经销商列表
    getSalesmanDetail:head+'gameusershop/setstate',//经销商是否通过

    //活动管理----拆红包
     isRedPack:head+'usergame/version3/isexsitredpack',//是否存在红包
    openRedPack:head+'usergame/version3/openredpack',//开通红包
    closeRedPack:head+'usergame/version3/closeredpack',//关闭红包

    //客户管理页面
    openVipCard:head+'membershipCard/version3/addMembershipCard',//开新会员卡
    getVipList:head+'gameuser/version3/list4web',//获取会员列表
    getVipCardList:head+'membershipCard/currentUserVip',//获取单个会员卡片
    //挂单
    serverList:head+'settleAccounts/version3/goodsList',//获取服务列表
    serverPeopleList:head+'settleAccounts/version3/userList',//获取服务员列表

    //订单管理
    getOrderList:head+'goodsorderform/version3/list',//订单列表
    orderDetail:head+'goodsorderform/detail',//订单详情
    getAppOrderList:head+'subscribe/list ',//预约订单
    delAppOrder:head+'subscribe/delete',//删除预约订单
    appOrderDetail:head+'subscribe/detail ',//预约详情


    //添加活动
    activeList:head+'usergame/list',//新建活动列表
      //一元买卷
    addOne:head+'usergame/version3/addtype3',

    //目标管理
    addTarget:head+'SalesTarget/add',//新增目标
    targetList:head+'SalesTarget/version3/salesTarget',//目标列表
    hasTargetYear:head+'SalesTarget/version3/IsExistYear',//获取年份
    updataTarget:head+'SalesTarget/version3/updateSalesTarge',//更新
    targetDetail:head+'SalesTarget/version3/salesTargedetails',//详情



    //获取评价信息
    getGoodsCheck:head+"evaluate/version3/list4serverperson",//单个已审核商品评价
    doGoodsCheck:head+"evaluate/version3/updatestate",//对商品进行审核
    // getPeople:head+'Users/version/shopByuser',//获取当前店铺下所有员工
    getPeople:head+'user/version/userByPics',//获取当前店铺下所有员工
  };





export default url
