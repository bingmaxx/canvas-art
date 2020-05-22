<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { AppClass } from '@/logic/app.class';

export default {
  data() {
    return {
      appClass: {},
    };
  },
  mounted() {
    this.appClass = new AppClass();
  },
};
</script>


<style lang="scss" scoped>
  .desc {
    text-align: center;
    margin-top: 100px;
  }
</style>
