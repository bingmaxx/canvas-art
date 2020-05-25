/**
 * 图片
 */
const imgFiles = require.context('../assets', false);
const imagesObj = {};
const imagesDeal = requireContext => requireContext.keys().forEach(path => {
  // ./logo.png -> logo
  const key = path.replace(/(\.\/)|(\..*$)/g, '');
  const module = requireContext(path);
  imagesObj[key] = module;
});
imagesDeal(imgFiles);
export const images = imagesObj;


export const text = {
  app_name: 'canvasArt',
};

/**
 * 颜色值
 */
export const color = {
  primary: '#00D878',
  success: '#409EFF',
  info: '#909399',
  warning: '#FA9D3F',
  danger: '#FF3C3C',
  theme: '#F7B500',
};

export const packagesList = [
  { key: 'clock', value: '时钟' },
];
