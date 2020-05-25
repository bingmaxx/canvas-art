import Vue from 'vue';
import Router from 'vue-router';
import { packagesList } from 'utils/public';

Vue.use(Router);

const Import = file => () => import(`@/views/${file}.vue`);

const packagesRouter = list => list.map(item => ({
  path: `/${item.key}`,
  name: item.value,
  component: Import(`${item.key}/Index`),
}));

export default new Router({
  routes: [
    { path: '/', name: '/', redirect: '/index' },
    { path: '/index', name: '首页', component: Import('index/Index') },
    ...packagesRouter(packagesList),
  ],
});
