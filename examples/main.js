import Vue from 'vue';
import '@/styles/index.scss';

import Art from 'packages/index';

import App from './App.vue';
import router from './router';

Vue.use(Art);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
