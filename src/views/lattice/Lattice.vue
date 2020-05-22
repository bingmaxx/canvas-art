<template>
  <div class="container">
    <lattice-nums></lattice-nums>

    <lattice-all></lattice-all>
    <lattice-type></lattice-type>
  </div>
</template>

<script>
import LatticeNums from './LatticeNums.vue';
import LatticeAll from './LatticeAll.vue';
import LatticeType from './LatticeType.vue';

export default {
  components: {
    LatticeNums,
    LatticeAll,
    LatticeType,
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
  .lattice-all, .lattice-type {
    // display: none;
  }
}

@media (max-width: $screen-xs-max) {
  // .container {

  // }
}
</style>
