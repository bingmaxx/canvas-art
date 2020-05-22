import Vue from 'vue';

export const bus = new Vue();

/**
 * sessionStorage 封装
 */
export const storage = {
  getSession: key => JSON.parse(sessionStorage.getItem(key)),
  setSession: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  removeSession: key => sessionStorage.removeItem(key),

  getLocal: key => JSON.parse(localStorage.getItem(key)),
  setLocal: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeLocal: key => localStorage.removeItem(key),
};

/**
 * 日期格式化
 */
export const dateS = date => (date ? parseInt(new Date(date).getTime() / 1000) : parseInt(new Date().getTime() / 1000));
export const sDate = s => (s ? new Date(s * 1000 + 28800000).toISOString().replace(/[ZT]/g, ' ').substring(0, 19) : '--');
export const sYMD = s => (s ? new Date(s * 1000 + 28800000).toISOString().substring(0, 10).replace(/[ZT]/g, ' ') : '--');
export const sMD = s => (s ? new Date(s * 1000 + 28800000).toISOString().substring(5, 10).replace(/[ZT]/g, ' ') : '--');
export const dateMs = date => (date ? parseInt(new Date(date).getTime()) : parseInt(new Date().getTime()));
export const msDate = s => (s ? new Date(s + 28800000).toISOString().replace(/[ZT]/g, ' ').substring(0, 19) : '--');

/**
 * 数据格式化: 保留 num 的 n 位小数
 */
export const numFix = (num, n = 2) => (typeof num === 'number' ? Math.round(num * (10 ** n)) / (10 ** n) : 0);

/**
 * 手机号格式化: 非 '86' 则显示国家码
 */
export const mobileFilter = (value = '--', code) => (code === '86' || !code ? value : `+${code} ${value}`);

/**
 * 默认显示 - 格式化
 */
export const defFilter = (value, text) => (!value ? text : value);

/**
 * 货币格式化
 */
export const currencyFilter = (value, zero = 0) => {
  if (!value) return zero;
  const list = [];
  const str = Number(value).toFixed(2);
  [...str].forEach((item, i) => {
    list.push(item);
    if ((i < str.length - 4) && (str.length - 4 - i) % 3 === 0) {
      list.push(',');
    }
  });
  return list.join('');
};

/**
 * 获取 url 中的参数(hash 路由无效)
 * @param {String} name 参数名称
 * @return {String|Number} value 参数值
 */
export const getQueryString = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 将对象转为浏览器地址中可用参数,不含首个 &,例: {index: 0, size: 15} -> index=0&size=15
 * @param {Object} query 参数对象
 * @return {String} params 参数字符串
 */
export const queryToParams = query => {
  let param = '';
  Object.keys(query).forEach(key => (param += `&${key}=${query[key]}`));
  return param ? param.slice(1) : '';
};

/**
 * 深拷贝
 */
/* eslint-disable */
export const deepCopy = source => {
  const sourceCopy = source instanceof Array ? [] : {};
  for (const item in source) {
    sourceCopy[item] = source[item] !== null && !(source[item] instanceof Date) && typeof source[item] === 'object' ? deepCopy(source[item]) : source[item];
  }
  return sourceCopy;
};
/* eslint-enable */

/**
 * 按给定键值拷贝对象 - 浅拷贝
 * @param {Object} obj 目标对象
 * @param {Array} list 待拷贝 键名 的列表
 * @return {Object} out 拷贝后对象
 */
export const copyByKey = (obj, list) => {
  const out = {};
  list.forEach(key => (out[key] = obj[key]));
  return out;
};

/**
 * 对象数组按指定方式转为 Map
 * @param {Array} list
 * @param {Object}
      @param {String} key
      @param {String} value
      @param {String} def
 * @return {Map} map
 */
export const listToMap = (list = [], { key, value, def } = { key: 'key', value: 'value', def: null }) => {
  const map = new Map();
  list.forEach(item => {
    map.set(item[key], item[value]);
  });
  if (def) {
    map.set('', def);
    map.set(null, def);
    map.set(undefined, def);
  }
  return map;
};

/**
 * a 标签下载功能
 * @param {String} URL 下载内容, URL || blob: URL || data: URL(base64)
 * @param {String} name 下载后的文件名称
 */
export const downloadByTagA = ({ URL, name }) => {
  const eleLink = document.createElement('a');
  eleLink.download = name || new Date().getTime();
  eleLink.style.display = 'none';
  eleLink.href = URL;

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
};

/**
 * 下载 blob 文件
 * @param {String} content 下载内容，string || blob
 * @param {String} name 下载后的文件名称
 */
export const downloadBlob = ({ content, name = new Date().getTime() }) => {
  let blob = content;
  if (typeof content === 'string') {
    blob = new Blob([content]);
  }

  // eslint-disable-next-line no-use-before-define
  const URL = URL.createObjectURL(blob);
  downloadByTagA({ URL, name });
};

/**
 * 浏览器判别
 */
export const browser = {
  // eslint-disable-next-line func-names
  versions: (function () {
    const u = navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.indexOf('QQ/') > -1, // 是否QQ内置浏览器
      // qq: u.toLowerCase().match(/QQ/i) == "qq" //是否QQ
    };
  }()),
};
