/* eslint-disable no-unused-vars */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const devServer = () => {
  const url = 'https://www.bingmax.xyz';

  const proxyList = ['/api'];
  const proxy = {};
  proxyList.forEach(key => {
    proxy[key] = {
      target: url,
      // secure: false,
      // ws: true,
      changeOrigin: true,
    };
  });

  return { proxy };
};

module.exports = {
  publicPath: '/',
  productionSourceMap: false,

  // 代理
  devServer: devServer(),

  // alias 别名
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       utils: '@/utils',
  //       api: '@/api',
  //       components: '@/components',
  //     },
  //   },
  // },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('utils', resolve('src/utils'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('packages', resolve('packages'));

    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .include
      .add('/src/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {});
  },

  // 自动化导入
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/mixin.scss'),
      ],
    },
  },
};
