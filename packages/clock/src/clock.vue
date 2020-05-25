<template>
  <div class="clock">
    <canvas :id="canvasId" :style="{'width': `${width}px`, 'height': `${height}px`}"></canvas>
  </div>
</template>


<script>
import Canvas from './canvas.class';
import Clock from './clock.class';

export default {
  name: 'ArtClock',

  data() {
    return {
      canvasId: 'clock',
      width: 300, // CSS 像素
      height: 300,
      radio: window.devicePixelRatio,

      clock: {},
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const size = this.getSize();
      this.width = size.width;
      this.height = size.height;

      const canvas = new Canvas({
        canvas: this.canvasId,
        width: this.width * this.radio,
        height: this.height * this.radio,
        radio: this.radio,
      });

      this.clock = new Clock({
        Canvas: canvas,
      });

      setInterval(() => {
        canvas.clear();
        this.clock.refrash();
      }, 1000);
    },

    getSize() {
      const elem = document.querySelector('.clock');
      return {
        width: elem.clientWidth,
        height: elem.clientWidth,
      };
    },
  },

};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .clock {
    @include flex-row(center, center);
  }
</style>
