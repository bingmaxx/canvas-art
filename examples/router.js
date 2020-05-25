import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Import = file => () => import(`@/views/${file}.vue`);

export default new Router({
  routes: [
    { path: '/', name: '/', redirect: '/index' },
    { path: '/index', name: '首页', component: Import('index/Index') },
    { path: '/clock', name: '时钟', component: Import('clock/Index') },
  ],
});
