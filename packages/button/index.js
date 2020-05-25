import ArtButton from './src/button.vue';

/* istanbul ignore next */
ArtButton.install = function (Vue) {
  Vue.component(ArtButton.name, ArtButton);
};

export default ArtButton;
