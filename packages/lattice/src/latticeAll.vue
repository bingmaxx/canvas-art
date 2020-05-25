<template>
  <div class="lattice-all">
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
      size: 8,
      space: 1,
      m_r: 10, // 右边距
      m_b: 10, // 下边距
      row: 16, // 列数

      point: [],
      canvas: null,
      canvasID: 'lattice-all',
    };
  },

  computed: {
    w() {
      return this.n * this.size + (this.n - 1) * this.space;
    },

    // n * n 点阵，点的数目
    dot_nums() {
      return this.n * this.n;
    },

    // n * n 点阵，状态数目
    state_nums() {
      return 2 ** (this.n * this.n);
    },

    width() {
      return this.row * this.w + (this.row + 1) * this.m_r;
    },

    height() {
      const col = Math.ceil(this.state_nums / this.row);
      return col * this.w + (col + 1) * this.m_b;
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.point = [this.m_r, this.m_b];
      this.canvas = new Canvas({
        width: this.width,
        height: this.height,
        canvas: this.canvasID,
      });

      this.createLayers();
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
     * desc: 创建 n*n 点阵图层
     */
    createLayers() {
      const {
        // n,
        // size,
        // space,
        w,
        m_r,
        m_b,
      } = this;

      for (let i = 0; i < this.state_nums; i++) {
        const result = []; // 点阵数据
        for (let j = this.dot_nums - 1; j >= 0; j--) {
          result.push((i >> j) & 0x01);
        }

        let [x, y] = this.point;
        this.addLattice(result, x, y);
        x += w + m_r;
        if (x > this.width - w) {
          x = this.m_r;
          y += w + m_b;
        }
        this.point = [x, y];
      }
    },
  },
};
</script>

<style lang="scss">
.lattice-all {
  // width: 100%;
  padding: 8px;
  // border-radius: 4px;
  background-color: white;
  box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.1);
}
</style>
