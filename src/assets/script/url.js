const head='http://test.csmen.cc/services/';
// const head='';

const url={
  // 登录
  logincom:head+'user/loginbyphonenum',//登录企业
  login:head+'user/login',//登录个人

  addUserShop:head+'usershop/addUserShop',//添加店铺post
  shopList:head+'usershop/list4web',//1.1	实体店信息列表接口
  updataShop:head+'usershop/updateUserShop',//修改店铺信息
  delShop:head+'usershop/delete',//删除店铺信息
}


export default url
