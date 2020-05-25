<template>
  <div class="container">
    <lattice-nums></lattice-nums>

    <lattice-all></lattice-all>
    <lattice-type></lattice-type>
  </div>
</template>

<script>
import latticeNums from './latticeNums.vue';
import latticeAll from './latticeAll.vue';
import latticeType from './latticeType.vue';

export default {
  name: 'ArtLattice',

  components: {
    latticeNums,
    latticeAll,
    latticeType,
  },

  data() {
    return {

    };
  },

  methods: {

  },
};
</script>

<style lang="scss">
.container {
  // background-color: #333639;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .lattice-type {
    margin-top: 20px;
  }
  // .lattice-all, .lattice-type {
    // display: none;
  // }
}

@media (max-width: $screen-xs-max) {
  // .container {

  // }
}
</style>
