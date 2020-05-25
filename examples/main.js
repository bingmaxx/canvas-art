import Vue from 'vue';
import '@/styles/index.scss';

import CanvasArt from 'packages/index';

import App from './App.vue';
import router from './router';

Vue.use(CanvasArt);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
