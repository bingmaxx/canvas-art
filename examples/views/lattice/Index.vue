<template>
  <div class="container">
    <art-lattice></art-lattice>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100vh;
    @include flex-row(center, center);
  }

  // @media (max-width: $screen-sm-max) {
  //   .container {
  //   }
  // }
</style>
