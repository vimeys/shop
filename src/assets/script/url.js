// const head='http://test.csmen.cc/services/';
const head='';

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
  waiterList:head+'group/list',//获取成员列表



  //添加优惠券
  addCoupon:head+'couponBook/version3/add',//添加优惠券
  updataCoupon:head+'couponBook/version3/update',//跟新优惠券
  delCoupon:head+'couponBook/version3/delete',//删除优惠券
  couponList:head+'couponBook/version3/list',//优惠券列表

  //添加会员卡
  addMemberCard:head+'membershipCard/addMembershipCard',//添加会员卡
  updataMemberCard:head+'membershipCard/updateMembershipCard',//修改会员卡
  delMemberCard:head+'services/membershipCard/delete',//删除会员卡
  memberCardList:head+'membershipCard/listbyshopId',//所有会员卡列表

  //
}


export default url
