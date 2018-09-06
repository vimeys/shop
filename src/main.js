// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base.scss'
import Vant from 'vant';
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
  components: { App },
  template: '<App/>'
})



