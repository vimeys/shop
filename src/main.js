// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// axios.interceptors.request.use((config) => {
//   // 以防cookie失效，所以每次发请求都重新获取token
//   if(window.localStorage.getItem('token')) {
//     config.headers.common['Authorization'] = 'token ' + window.localStorage.getItem('token');
//   }
//   return config
// }, (error) => {
//   // Message.error({
//   //   message: '加载超时'
//   // })
//   return Promise.reject(error)
// })

// axios.defaults.headers.common['token']='3K0r1L1P2L2t3i0o0b3V2a2v3G271l3x2s1E3d0Y3Z0Q3U3K1u152R3d1s221x0E1R1e0F2g0x3s0C3r2x1Y1F2a3A0T1010'
Vue.prototype.$http = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base.scss'
import Vant from 'vant';
import  store from './store'
import 'vant/lib/vant-css/index.css';
// 导入 table 和 分页组件
import 'vue-easytable/libs/themes-base/index.css'
// 注册到全局
import {VTable,VPagination} from 'vue-easytable'
import  url from './assets/script/url'
import * as util from './assets/script/util'
// 引入样式

Vue.config.productionTip = false
Vue.prototype.$api=url;//全局注册api
Vue.prototype.$util=util;//全局注册工具
Vue.use(ElementUI);
Vue.use(Vant);
// Vue.use(axios);
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});



