import * as types from './mutation-types'
//设置缓存
function storeLocalStore (state) {
  window.localStorage.setItem("userMsg",JSON.stringify(state));
}
//设置店铺信息
export default {
  [types.SET_SHOP](state, shop) {
    state.shop = shop;
    localStorage.setItem('shop',JSON.stringify(state));
    // console.log(state.shop);
  },
  //设置店铺信息
  [types.SET_ROLE](state,shopRole){
    state.shopRole=shopRole
  },
  //设置用户信息
  [types.SET_USER](state,userInfo){
    state.userInfo=userInfo
  }
}


