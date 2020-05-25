import Lattice from './layers/Lattice';
import Text from './layers/Text';
import Img from './layers/Img';

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
    this.loaded = 0; // 添加异步的图片时自增，图片异步完成时自减
    this.layers = []; // 画布的层
    this.curIndex = -1; // 当前选中图层

    this.data = data || [];
    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    this.setSize(width, height);
    this.context = this.canvas.getContext('2d');

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
   * desc: 实例化一个图层对象
   *       实例化图片，图片加载完成后会立即重绘所有图层
   *       实例会其它非异步图层，不触发重绘，手动指定重绘时机
   * input:
   * @param {Object} layer 图层对象参数
   *   @param {String} type 'img', 'text', 'lattice'
   * output:
   * @param {Object} layer 实例化后的图层对象
   */
  newLayer(layer) {
    const data = { ...layer, _this: this };
    const func = {
      lattice: () => new Lattice(data),
      text: () => new Text(data),
      img: () => {
        this.loaded += 1;
        const load = () => {
          setTimeout(() => {
            this.loaded -= 1;
            if (this.loaded < 1) {
              this.draw();
            }
          }, 100);
        };
        return new Img({ ...data, load });
      },
    };
    return typeof func[layer.type] === 'function' ? func[layer.type]() : null;
  }

  /**
   * desc: 添加图层至图层列表
   * input:
   * @param {Object} layer 图层对象参数
   *   @param {String} type 'img', 'text', 'lattice'
   * output:
   * @param {Object} layer 实例化后的图层对象
   */
  addLayer(layer) {
    const lay = this.newLayer(layer);
    if (lay) {
      this.layers.push(lay);
      this.curIndex = this.layers.length - 1;
    }
  }

  /**
   * desc: 替换图片
   * @param {Object} data Img 对象参数中的 data 字段
   */
  replaceImg(data) {
    if (this.curIndex < 0) return;

    const layer = this.layers[this.curIndex];
    layer.data = data;
    const lay = this.newLayer(layer);
    this.layers[this.curIndex] = lay;
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
