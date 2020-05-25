<template>
  <div class="lattice-nums">
    <canvas :id="canvasID" :style="{'width': `${width/2}px`, 'height': `${height/2}px`}" />
  </div>
</template>

<script>
import { rectInit } from '../canvas/utils/logic';
import Canvas from '../canvas/Canvas';

export default {
  data() {
    return {
      n: 3,
      size: 6,
      space: 1,
      m_r: 10, // 右边距
      m_b: 10, // 下边距

      width: 720,
      height: 1280,
      canvas: null,
      canvasID: 'lattice-nums',
    };
  },

  computed: {
    w() {
      return this.n * this.size + (this.n - 1) * this.space;
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.canvas = new Canvas({
        width: this.width,
        height: this.height,
        canvas: this.canvasID,
      });

      const x = this.width - this.w - 2 * this.m_r;
      const y = this.height - 8 * this.w - 9 * this.m_b;
      this.someNums('2019-1021', x, y, 'column');
      this.canvas.draw();
    },

    /**
     * desc: 创建点阵图层
     * input:
     * @param {Array || Number} num 点阵数据
     * @param {Number} x
     * @param {Number} y
     */
    addLattice(num, x, y) {
      const {
        n, size, space, w,
      } = this;
      const data = {
        type: 'lattice',
        data: {
          list: num,
        },
        style: {
          n,
          size,
          space,
        },
        rect: rectInit(x, y, w, w),
      };
      this.canvas.addLayer(data);
    },

    /**
     * desc: 创建一串数字
     * @param {String} numStr 数字字符串
     * @param {Number} x0
     * @param {Number} y0
     * @param {String} direct 'row', 'column'
     */
    someNums(numStr, x0, y0, direct = 'row') {
      const { w, m_r, m_b } = this;
      let x = x0;
      let y = y0;
      numStr.split('').forEach(item => {
        const num = Number(item);
        if (!Number.isNaN(num)) {
          this.addLattice(num, x, y);
          if (direct === 'column') {
            y += w + m_b;
          } else if (direct === 'row') {
            x += w + m_r;
          }
        } else if (direct === 'column') {
          y += m_b;
        } else if (direct === 'row') {
          x += m_b;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.lattice-nums {
  background-color: white;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.1);
}
</style>
