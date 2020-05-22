/**
 * desc: rect 对象参数变换, 旋转角度默认是 0
 * input:
 * @param {Number} x 左上角 x 坐标
 * @param {Number} y 左上角 y 坐标
 * @param {Number} w 长
 * @param {Number} h 高
 */
export const rectInit = (x, y, w, h) => ({
  width: w,
  height: h,
  center: [x + w / 2, y + h / 2],
  angle: 0,
});

export default rectInit;
