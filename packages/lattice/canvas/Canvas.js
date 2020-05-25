import Lattice from './Lattice';

/* Canvas 类
 * 属性：
 * 方法：
 */
class Canvas {
  constructor(options) {
    const {
      data, // 图层模版数据
      canvas,
      width,
      height,
    } = options;
    this.layers = []; // 画布的层
    this.curIndex = -1; // 当前选中图层

    this.data = data || [];
    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    this.context = this.canvas.getContext('2d');

    this.setSize(width, height);
    this.init();
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

  // 初始化，如果有模版数据 data，则绘制
  init() {
    this.clear();
    this.layers = [];
    this.data.forEach(layer => {
      this.addLayer(layer);
    });
    this.curIndex = -1;
  }

  /**
   * 实例化一个图层对象, 不触发重绘, 手动指定重绘时机
   * @param {Object} layer 图层对象参数
   *   @param {String} type 'lattice'
   * @return {Object} layer 实例化后的图层对象
   */
  newLayer(layer) {
    const data = { ...layer, _this: this };
    const func = {
      lattice: () => new Lattice(data),
    };
    return typeof func[layer.type] === 'function' ? func[layer.type]() : null;
  }

  /**
   * 添加图层至图层列表
   * @param {Object} layer 图层对象参数
   * @return {Object} layer 实例化后的图层对象
   */
  addLayer(layer) {
    const lay = this.newLayer(layer);
    if (lay) {
      this.layers.push(lay);
      this.curIndex = this.layers.length - 1;
    }
  }

  /**
   * desc: 清除画布
   */
  clear() {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  /**
   * desc: 重绘全部图层
   */
  draw() {
    this.clear();
    this.layers.forEach(item => {
      item.draw();
    });
  }
}
export default Canvas;
