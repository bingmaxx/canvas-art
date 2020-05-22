import Rect from '../Rect';

/**
* description: 图片样式数据检查
* input:
* @param {Object} item 图片样式
* output:
* @param {Object} out 校验后的图片样式
*/
const imgStyleCheck = (item = {}) => {
  let { alpha = 1 } = item;
  alpha = Number(alpha);

  const out = { ...item };
  out.alpha = alpha;
  return out;
};

/* 描述: 图片类
 * 属性:
  {
    load: () ={}, // 加载完成的回调函数

    id: '',
    type: 'img',
    lock: false, // 锁定图层
    data: {
      name: '',
      img: '', // 图片资源, 支持 url、Image() 对象
      key: '', // 云端存储的图片唯一 key
      suffix: '', // 后缀
    },
    style: {
      color: null,
      alpha: null,
    },
    rect,
  }
 * 方法:
 */
class Img {
  constructor(options) {
    const {
      _this,
      load,
      id,
      lock,
      data,
      style,
      rect,
    } = options;
    this.load = load;

    this.id = id || new Date().getTime();
    this.type = 'img';
    this.lock = Boolean(lock);
    this.data = data;
    this.style = imgStyleCheck(style);
    this.rect = rect;

    const { canvas, context } = _this;
    this.canvas = canvas;
    this.context = context;

    if (rect) {
      const { center, angle } = this.rect;
      const [x, y] = center;
      const { width, height } = this.rect;
      this.rect = new Rect(width, height, [x, y], angle, this.range);
    }

    this.pre();
  }

  // 根据 传入的图片类型，图片加载完成后 init()
  pre() {
    if (typeof this.data.img !== 'string') {
      this.image = this.data.img;
      this.init();
    } else {
      let isLoad = false;
      this.image = new Image();
      this.image.crossOrigin = '';
      this.image.onload = () => {
        if (isLoad) return;
        isLoad = true;
        this.init();
      };
      this.image.src = this.data.img;
      if (this.image.complete) {
        if (isLoad) return;
        isLoad = true;
        this.init();
      }
    }
  }

  // 图片加载完成，执行 initI()
  init() {
    if (!this.rect) {
      const { width, height } = this.image;
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      this.rect = new Rect(width, height, [x, y], 0, this.range);
    }

    if (this.load) this.load();
  }

  draw() {
    const {
      image, context, rect, style,
    } = this;
    const { color, alpha } = style;
    const points = rect.point;
    const [c_x, c_y] = rect.center;
    const [x_0, y_0] = points[0];

    context.save();
    context.translate(c_x, c_y);
    context.rotate(rect.angle);
    context.globalAlpha = alpha;
    if (color) {
      context.fillStyle = color;
      context.fillRect(x_0 - c_x, y_0 - c_y, rect.width, rect.height);
    } else {
      const radio = image.width / image.height;
      const ra = rect.width / rect.height;
      let { width, height } = image;
      let sx = 0;
      let sy = 0;
      if (radio > ra) { // 水平方向超出
        width = height * ra;
        sx = (image.width - width) / 2;
        sy = 0;
      } else {
        height = width / ra;
        sx = 0;
        sy = (image.height - height) / 2;
      }
      context.drawImage(image, sx, sy, width, height, x_0 - c_x, y_0 - c_y, rect.width, rect.height);
    }
    context.restore();
  }
}

export default Img;
