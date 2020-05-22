<template>
  <div class="container">
    <canvas id="canvas" />
  </div>
</template>

<script>
let canvas = null;
let ctx = null;
let loop;

export default {
  data() {
    return {
      bit: 6,
      gap: 2,

      vpx: null,
      vpy: null,
      width: null,
      height: null,
      offsetX: 4,
      dotNum: 160,
      dots: [],
    };
  },

  mounted() {
    this.canvasInit();
  },

  destroyed() {
    cancelAnimationFrame(loop);
  },

  methods: {
    draw() {
      // ctx.fillStyle = color.primary;
      ctx.fillStyle = 'red';
      ctx.translate(0, this.vpy);
      for (let i = 0; i <= this.dotNum; i++) {
        const x = (i * this.width) / this.dotNum;
        const y = (this.height / 2) * Math.sin((i * 2 * Math.PI) / this.dotNum);
        this.dots.push({ x, y });
        this.dot(x, y, 'round');
      }
    },

    // 画点
    dot(x = 0, y = 0) {
      ctx.beginPath();
      ctx.arc(x, y, this.bit / 2, 0, Math.PI * 2, true);
      ctx.fill();
    },

    animate() {
      ctx.clearRect(0, -this.vpy, canvas.width, canvas.height);
      // this.moveX();
      this.moveY();

      for (let i = 0; i < this.dots.length; i++) {
        this.dot(this.dots[i].x, this.dots[i].y);
      }
      loop = requestAnimationFrame(this.animate);
    },

    moveX() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].x = (this.dots[i].x + this.offsetX) % this.width;
      }
    },

    moveY() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].y = this.dots[(i + 1) % this.dots.length].y;
      }
    },

    canvasInit() {
      canvas = document.getElementById('canvas');
      canvas.width = window.innerWidth * 0.8;
      canvas.height = 1000;

      if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        this.vpx = canvas.width / 2;
        this.vpy = canvas.height / 2;
        this.width = canvas.width;
        this.height = canvas.height / 3;

        this.draw();
        this.animate();
      }
    },
  },
};
</script>

<style lang="scss">
 .container {
  padding-top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  canvas {
    margin: 50px 0;
    border: 1px solid rgb(240, 240, 240);
  }
}
</style>
