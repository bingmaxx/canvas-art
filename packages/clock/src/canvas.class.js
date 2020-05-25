/**
 * Canvas 类
 * 属性：
 * 方法：
 */
class Canvas {
  constructor(options) {
    const {
      canvas,
      width,
      height,
      radio,
    } = options;

    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    this.ctx = this.canvas.getContext('2d');
    this.radio = radio;
    this.setSize(width, height);
  }

  /**
   * desc: 设置 canvas 尺寸
   * @param {Number} width
   * @param {Number} height
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * desc: 清除画布
   */
  clear() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
}
export default Canvas;
