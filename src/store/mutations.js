import * as types from './mutation-types'
function storeLocalStore (state) {
  window.localStorage.setItem("userMsg",JSON.stringify(state));
}

export default {
  [types.SET_SHOP](state, shop) {
    state.shop = shop;
    localStorage.setItem('shop',JSON.stringify(state));
    console.log(state.shop);
  }
}
