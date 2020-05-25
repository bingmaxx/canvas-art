import ArtClock from './src/clock.vue';

/* istanbul ignore next */
ArtClock.install = function (Vue) {
  Vue.component(ArtClock.name, ArtClock);
};

export default ArtClock;
