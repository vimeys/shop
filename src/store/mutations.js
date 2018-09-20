import * as types from './mutation-types'
export default {
  [types.SET_SHOP](state, shop) {
    state.shop = shop;
    localStorage.setItem('shop',shop);
    console.log(state.shop);
  }
}
