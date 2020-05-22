import { textPub } from '../utils/public';
import Rect from '../Rect';

/* 描述: 文本类
 * 属性:
  {
    id: '',
    type: 'text',
    lock: false, // 锁定图层
    data: {
      text: '',
    },
    style: {
      italic: '',
      weight: '',
      size: '',
      family: '',
      align: '',
      color: '',
      alpha: '',
      line_height: '',
      letter_spacing,
    },
    rect,
  }
 * 方法:
 */
class Text {
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
    this.type = 'text';
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
      const { data, style } = this;
      const num = [...data.text].length;
      const { size = textPub.style.size } = style;
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      this.rect = new Rect(size * num, size, [x, y], 0);
    }
  }

  /**
   * desc: 根据 text 参数绘制文本, 绘制时字号放大两倍为实际像素数
   */
  draw() {
    const {
      context, data, style, rect,
    } = this;
    const { text } = data;
    const {
      italic = textPub.style.italic,
      weight = textPub.style.weight,
      size = textPub.style.size,
      family = textPub.style.family,
      align = textPub.style.align,
      color = textPub.style.color,
      alpha = textPub.style.alpha,
    } = style;

    const points = rect.point;
    const [c_x, c_y] = rect.center;
    const x = points[0][0] - c_x;
    const y = points[0][1] - c_y;

    context.save();
    context.translate(c_x, c_y);
    context.rotate(rect.angle);
    context.fillStyle = color;
    context.globalAlpha = alpha;
    context.font = `${italic} ${weight} ${size}px ${family}`;
    context.textBaseline = 'top';
    context.textAlign = align;
    context.fillText(text, x, y);
    context.restore();
  }
}

export default Text;
