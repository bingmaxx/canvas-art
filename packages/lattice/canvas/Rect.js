/* eslint-disable */
const getVectorLenth = (v1, v2) => {
  const [x1, y1] = v1;
  const [x2, y2] = v2;
  return (x1 * x2 + y1 * y2) / Math.sqrt(x1 * x1 + y1 * y1);
};

/* 矩形类, 记录当前图层矩形框的关键数据
 * 属性:
 *    height / width: 图层的宽高
 *    angle: 旋转角度
 *    center: 中心点 坐标
 *    point: 四个顶点坐标(由 width, height, center 计算得), 只存 angle=0 时的值,旋转后计算
 *    l_point: 定位点, 由 point 和 angle 计算得来
 */
class Rect {
  constructor(width, height, center, angle, range = {}) {
    this.height = height;
    this.width = width;
    this.center = center;
    this.angle = angle;
    this.range = range;

    this.getPoint();
  }

  /**
  * desc: 旋转, height | width | center | point 不变
  * input:
  * @param {Number}   angle 旋转角度
  * output: 计算 angle | l_point
  */
  rotate(angle) {
    this.angle = angle;
    this.getLocalPoint();
  }

  /**
  * desc: 平移, height | width | angle 不变
  * input:
  * @param {Array}   vector 平移向量
  * output: 计算 center | point | l_point
  */
  translate(vector) {
    const [_x, _y] = vector;
    const { w_max, h_max } = this.range;
    let [x, y] = this.center;

    if (w_max && h_max) {
      if (_x < 0) {
        x = x + _x - this.width / 2 < 0 ? this.width / 2 : x + _x;
      } else if (_x > 0) {
        x = x + _x + this.width / 2 > w_max ? w_max - this.width / 2 : x + _x;
      }

      if (_y < 0) {
        y = y + _y - this.height / 2 < 0 ? this.height / 2 : y + _y;
      } else if (_y > 0) {
        y = y + _y + this.height / 2 > h_max ? h_max - this.height / 2 : y + _y;
      }
    } else {
      x += _x;
      y += _y;
    }

    this.center = [x, y];
    this.getPoint();
  }

  /**
  * desc: 双指缩放, center | angle 不变
  * input:
  * @param {Number}   len 缩放的尺寸
  * output: 计算 width | height | point | l_point
  */
  scale(len) {
    const LEN = 200;
    const MIN_WIDTH = 50;
    if (this.width < LEN) {
      len = (this.width * this.width) / (LEN * LEN) * len;
    }
    const sc = this.height / this.width;
    if (this.width < MIN_WIDTH) {
      this.width = MIN_WIDTH;
    } else {
      this.width += len;
    }
    this.height = this.width * sc;
    this.getPoint();

    this.checkPoint();
  }

  /**
  * desc: 缩放, center | angle 不变
  * input:
  * @param {Number}   len 缩放的尺寸
  * output: 计算 width | height | point | l_point
  */
  //
  zoom(status, vector) {
    const _x = parseFloat(vector[0]);
    const _y = parseFloat(vector[1]);
    const _angle = this.angle;
    // 旋转后的 x 轴相对于 canvas 的位置
    let _x_x = Math.sin((_angle + Math.PI / 2));
    let _y_x = Math.cos((_angle + Math.PI / 2));
    // 如果角度为 0 特殊设置，因为有些 Math.cos 不兼容
    if (_angle === 0) {
      _x_x = 1;
      _y_x = 0;
    }
    // 移动向量 vector 在旋转后 x 轴的距离
    const n_x = getVectorLenth([_x_x, _y_x], [_x, -_y]);

    // 旋转后的 y 轴相对于 canvas 的位置
    const _x_y = Math.sin(_angle) * 5;
    const _y_y = Math.cos(_angle) * 5;
    // 移动向量 vector 在旋转后 y 轴的距离
    const n_y = getVectorLenth([_x_y, _y_y], [_x, -_y]);

    // 通过正切计算出顶点的角度
    const tan = Math.atan(this.height / this.width);
    const pointZoom = (_angles) => {
      // 获取在第一个顶点上面的移动距离
      const n_tan = getVectorLenth([-Math.cos(_angles), Math.sin(_angles)], [_x, -_y]);
      this.width += n_tan * Math.cos(tan);
      this.height += n_tan * Math.sin(tan);
      this.center = [
        this.center[0] - n_tan * Math.cos(_angles) / 2,
        this.center[1] - n_tan * Math.sin(_angles) / 2];
    };
    if (status === 'point_1') { // 第1个顶点
      const _angles = tan + _angle;
      pointZoom(_angles);
    } else if (status === 'point_2') { // 第2个顶点
      const _angles = Math.PI - tan + _angle;
      pointZoom(_angles);
    } else if (status === 'point_3') { // 第3个点
      const _angles = Math.PI + tan + _angle;
      pointZoom(_angles);
    } else if (status === 'point_4') { // 第4个点
      const _angles = 2 * Math.PI - tan + _angle;
      pointZoom(_angles);
    } else if (status === 'c_point_1') {
      this.width -= n_x;
      this.center = [
        this.center[0] + n_x * Math.cos(_angle) / 2,
        this.center[1] + n_x * Math.sin(_angle) / 2];
    } else if (status === 'c_point_2') {
      this.height += n_y;
      this.center = [
        this.center[0] + n_y * Math.sin(_angle) / 2,
        this.center[1] - n_y * Math.cos(_angle) / 2];
    } else if (status === 'c_point_3') {
      this.width += n_x;
      this.center = [
        this.center[0] + n_x * Math.cos(_angle) / 2,
        this.center[1] + n_x * Math.sin(_angle) / 2];
    } else if (status === 'c_point_4') {
      this.height -= n_y;
      this.center = [
        this.center[0] + n_y * Math.sin(_angle) / 2,
        this.center[1] - n_y * Math.cos(_angle) / 2];
    }
    this.getPoint();
    this.setWH();

    this.checkPoint();
  }

  // 顶点 => 中心点
  getCenter() {
    const p1 = this.point[0];
    const p3 = this.point[2];
    const x = p1[0] + p3[0];
    const y = p1[1] + p3[1];
    this.center = [x / 2, y / 2];
  }

  // 某点绕中点旋转角度
  rotatePoint(point, angle) {
    const [x, y] = point;
    const [c_x, c_y] = this.center;
    const _x = (x - c_x) * Math.cos(angle) - (y - c_y) * Math.sin(angle) + c_x;
    const _y = (x - c_x) * Math.sin(angle) + (y - c_y) * Math.cos(angle) + c_y;
    return [_x, _y];
  }

  // （宽、高、中心点）=> 4 个顶点
  getPoint() {
    const h = this.height;
    const w = this.width;
    const [c_x, c_y] = this.center;
    const points = [];
    points[0] = [c_x - w / 2, c_y - h / 2];
    points[1] = [c_x + w / 2, c_y - h / 2];
    points[2] = [c_x + w / 2, c_y + h / 2];
    points[3] = [c_x - w / 2, c_y + h / 2];
    this.point = points;
    this.getLocalPoint();
  }

  // (4个顶点、旋转角度) => 定位点
  // [0, PI/2): (3, 0)
  // [PI/2, PI): (2, 3)
  // [PI, 3*PI/2): (1, 2)
  // [3*PI/2, 2*PI): (0, 1)
  getLocalPoint() {
    const points = this.point.map(item => this.rotatePoint(item, this.angle));
    const i = parseInt(2 * this.angle / Math.PI);
    const x_n = 3 - i;
    const y_n = (4 - i) % 4;
    this.l_point = [points[x_n][0], points[y_n][1]];
  }

  // 顶点 => (宽、高)
  setWH() {
    this.height = Math.abs(this.point[0][1] - this.point[3][1]);
    this.width = Math.abs(this.point[0][0] - this.point[1][0]);
  }

  // 矫正超出边界的顶点（angle=0）
  checkPoint() {
    const {
      w_max, h_max, w_min, h_min 
    } = this.range;
    if (w_min && h_min) {
      this.width = this.width < w_min ? w_min : this.width;
      this.height = this.height < h_min ? h_min : this.height;
      this.getPoint();
    }

    if (w_max & h_max) {
      const points = this.point.map((item) => {
        let [x, y] = item;
        x = x < 0 ? 0 : (x > w_max ? w_max : x);
        y = y < 0 ? 0 : (y > h_max ? h_max : y);
        return [x, y];
      });
      this.point = points;
      this.getCenter();
      this.setWH();
      this.getLocalPoint();
    }
  }

  // 判断某点是否在矩形内部
  isPointInRect(point) {
    // 旋转后的位置
    const points = this.point.map(item => this.rotatePoint(item, this.angle));
    const p1 = points[0];
    const p2 = points[1];
    const p3 = points[2];
    const p4 = points[3];
    const x = point[0];
    const y = -point[1];
    // 是否在两个平行线内
    const ratio1 = (function () {
      const a = (p1[1] - p2[1]) / (p2[0] - p1[0]);
      const b = -p1[1] - a * p1[0];
      const c = -p3[1] - a * p3[0];
      if (p2[0] - p1[0] === 0) { // 90度 || 270度
        if ((p1[1] < -y && -y < p2[1]) || (p1[1] > -y && -y > p2[1])) return true;
      }
      if (b > c && a * x + b > y && a * x + c < y) return true;
      if (b < c && a * x + b < y && a * x + c > y) return true;
      return false;
    }());
    // 是否在两个平行线内
    const ratio2 = (function () { // 0度 || 180度
      const a = (p2[1] - p3[1]) / (p3[0] - p2[0]);
      const b = -p2[1] - a * p2[0];
      const c = -p4[1] - a * p4[0];
      if (p3[0] - p2[0] === 0) {
        if ((p1[0] < x && x < p2[0]) || (p1[0] > x && x > p2[0])) return true;
      }
      if (b > c && a * x + b > y && a * x + c < y) return true;
      if (b < c && a * x + b < y && a * x + c > y) return true;
      return false;
    }());
    if (ratio1 && ratio2) return true;
    return false;
  }
}

export default Rect;
