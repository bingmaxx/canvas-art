// 文本样式相关
export const textPub = {
  style: {
    color: '#000000',
    alpha: 1,
    size: 14,
    family: 'Microsoft YaHei',
    italic: 'normal',
    weight: 'normal',
    align: 'left',
    letter_spacing: 0,
    line_height: 1,
    shadow: false,
    shadow_color: '#000000',
    shadow_blur: 5,
    shadow_x: 5,
    shadow_y: 5,
    stroke: false,
    stroke_color: '#ff0000',
    stroke_width: 0,
  },
};

// 点阵样式相关
export const latticePub = {
  style: {
    n: 3,
    size: 8,
    space: 1,
    color_0: '#DCDFE6',
    color_1: '#409EFF',
  },
};

// 点阵数据
export const latticeDataList = [
  [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
  ], // 0
  [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
  ], // 1
  [
    1, 0, 0,
    0, 0, 0,
    0, 0, 1,
  ], // 2
  [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ], // 3
  [
    0, 0, 0,
    0, 1, 1,
    0, 1, 1,
  ], // 4
  [
    1, 0, 0,
    0, 1, 1,
    0, 1, 1,
  ], // 5
  [
    1, 1, 0,
    1, 0, 1,
    0, 1, 1,
  ], // 6
  [
    1, 1, 0,
    1, 1, 1,
    0, 1, 1,
  ], // 7
  [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1,
  ], // 8
  [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
  ], // 9
];
