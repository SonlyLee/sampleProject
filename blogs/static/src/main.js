// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Element from 'element-ui';
import md5 from 'js-md5';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import marked from 'marked'

import LightTimeline from 'vue-light-timeline';
Vue.config.productionTip = false;



Vue.use(mavonEditor)
Vue.use({
  install: (Vue) => {
    Vue.prototype.$marked = marked;
  }
})
Vue.use(LightTimeline);
Vue.use(Element);
Vue.prototype.$md5 = md5;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
