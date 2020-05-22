/**
 * desc: 画点
 * input:
 * @param {Context} ctx
 * @param {Number} x x 坐标 (注意 square 坐标为左上角，circle 坐标为圆点)
 * @param {Number} y y 坐标
 * @param {Number} size 点的尺寸
 * @param {String} style 'square' 方块, 'circle' 圆点
 */
export const dot = (ctx, x = 0, y = 0, size, style = 'square') => {
  ctx.beginPath();
  const func = {
    square: () => {
      ctx.fillRect(x, y, size, size);
    },
    circle: () => {
      ctx.arc(x, y, size / 2, 0, Math.PI * 2, true);
      ctx.fill();
    },
  };

  func[style]();
};

export default dot;
