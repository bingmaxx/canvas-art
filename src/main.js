import Vue from 'vue';
import '@/styles/index.scss';

import { toast } from 'packages/toast/index';

import { currencyFilter, sDate } from 'utils';


import App from './App.vue';
import router from './router';

Vue.filter('currency', currencyFilter);
Vue.filter('datetime', sDate);


Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
