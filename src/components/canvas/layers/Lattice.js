import { latticePub, latticeDataList } from '../utils/public';
import { dot } from '../utils/func';
import Rect from '../Rect';

/* 描述: 点阵类
 * 属性:
  {
    id: '',
    type: 'lattice',
    lock: false, // 锁定图层
    data: {
      list: [] || 0, // 点阵一维数组 or 数字 0 - 9
    }
    style: {
      n: 3, // n * n 点阵
      size: 8, // 点尺寸
      space: 1, // 点间距
      color_0: '#DCDFE6', // 空白色
      color_1: '', // 填充色
    },
    rect: {
      x: 0, // 左上角 x 坐标
      y: 0, // 左上角 y 坐标
      w: 0, // 计算得
      h: 0, // 计算得
    }
  }
 * 方法:
 */
class Lattice {
  constructor(options) {
    const {
      _this,
      id,
      lock,
      data,
      style,
      rect,
    } = options;
    this.id = id || new Date().getTime();
    this.type = 'lattice';
    this.lock = Boolean(lock);
    this.data = data || {};
    this.style = style || {};
    this.rect = rect;

    const { canvas, context } = _this;
    this.canvas = canvas;
    this.context = context;

    this.init();
  }

  init() {
    if (this.rect) {
      const {
        width, height, center, angle,
      } = this.rect;
      const [x, y] = center;
      this.rect = new Rect(width, height, [x, y], angle);
    } else {
      const {
        n = latticePub.style.n,
        size = latticePub.style.size,
        space = latticePub.style.space,
      } = this.style;
      const leng = n * size + (n - 1) * space;
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      this.rect = new Rect(leng, leng, [x, y], 0);
    }
  }

  /**
   * desc: 根据图层参数绘制点阵
   */
  draw() {
    const {
      context, data, style, rect,
    } = this;
    const list = Array.isArray(data.list) ? data.list : latticeDataList[data.list] || [];
    const {
      n = latticePub.style.n,
      size = latticePub.style.size,
      space = latticePub.style.space,
      color_0 = latticePub.style.color_0,
      color_1 = latticePub.style.color_1,
    } = style;

    const { point } = rect;
    const [x, y] = point[0];

    context.save();
    list.forEach((item, i) => {
      const row = Math.trunc(i / n);
      const col = i % n;
      context.fillStyle = item ? color_1 : color_0;
      dot(context, x + row * (size + space), y + col * (size + space), size);
    });
    context.restore();
  }
}

export default Lattice;
