// 国家电网 技术监督平台
// Created by Ming on 2021/06/08.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false;
Vue.use(ViewUI);

import './assets/iconfont/iconfont.css'
import {get,post} from './request/request.js';
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
