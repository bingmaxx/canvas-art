<template>
  <div class="container">
    <art-clock></art-clock>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  mounted() {
    console.log('打印this: ', this);
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
