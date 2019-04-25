// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import axios from 'axios'
// Import Framework7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

import sitecfg from '@/cfg/sitecfg.js';

import store from './vuex/index.js'

// Init plugin and register all components
Framework7.use(Framework7Vue);


import App from './App'

Vue.config.productionTip = false
axios.defaults.withCredentials=true;
axios.defaults.baseURL=sitecfg.serverURL




/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
