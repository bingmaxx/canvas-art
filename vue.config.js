/* eslint-disable no-unused-vars */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  productionSourceMap: false,

  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('utils', resolve('examples/utils'))
      .set('packages', resolve('packages'));

    // 扩展 webpack 配置，使 packages 加入编译
    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => options);
  },

  // 自动化导入
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './examples/styles/variables.scss'),
        path.resolve(__dirname, './examples/styles/mixin.scss'),
      ],
    },
  },
};
