import ArtLattice from './src/lattice.vue';

/* istanbul ignore next */
ArtLattice.install = function (Vue) {
  Vue.component(ArtLattice.name, ArtLattice);
};

export default ArtLattice;
