// const head='http://test.csmen.cc/services/';
const head='/shop/';

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
  waterGroupList:head+'services/group/list2',//分组下面的列表

  //管理分类
  addType:head+'goodstype/version3/add',
  updataType:head+'goodstype/version3/update',
  delType:head+'goodstype/version3/delete',
  typeList:head+'goodstype/version3/list',


  //商品管理
  addGoods:head+'goods/version3/add',
  updataGoods:head+'goods/version3/update',
  delGoods:head+'services/goods/delete',
  goodsDetail:head+'services/goods/version3/detail',
  goodsList:head+'goods/version3/list4web',

  //添加优惠券
  addCoupon:head+'couponBook/version3/add',//添加优惠券
  updataCoupon:head+'couponBook/version3/update',//跟新优惠券
  delCoupon:head+'couponBook/version3/delete',//删除优惠券
  couponList:head+'couponBook/version3/list',//优惠券列表

  //添加会员卡
  addMemberCard:head+'membershipCard/addMembershipCard',//添加会员卡
  updataMemberCard:head+'membershipCard/updateMembershipCard',//修改会员卡
  delMemberCard:head+'membershipCard/delete',//删除会员卡
  memberCardList:head+'membershipCard/listbyshopId',//所有会员卡列表

  //人员管理





};


export default url
