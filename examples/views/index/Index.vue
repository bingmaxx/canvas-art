<template>
  <div class="container">
    <p @click="showToast">Art...</p>

    <ElButton>按钮</ElButton>
  </div>
</template>


<script>
export default {
  methods: {
    showToast() {
      this.$toast('chjalsjdflaks');
    },
  },
};
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: $font-size-lg;
      font-weight: 500;
      color: $color-font-extra;
    }
  }
</style>
