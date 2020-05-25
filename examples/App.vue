<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { images } from 'utils/public';

export default {
  mounted() {
    this.faviconCheck();
  },

  methods: {
    faviconCheck() {
      const link = document.querySelector("link[rel*='icon']");
      link.type = 'image/png';
      link.href = images.logo;
      document.getElementsByTagName('head')[0].appendChild(link);
    },
  },
};
</script>


<style lang="scss" scoped>
  .desc {
    text-align: center;
    margin-top: 100px;
  }
</style>
