import axios from 'axios';
import { getToken, setToken } from './auth';

/**
 * http请求函数
 * http成功 && 接口未报错: 返回resolve()
 * http失败 || http成功但接口报错: 返回reject()
 * @param {Object} options 请求 地址/方法/参数
 * @param {Object} headers http 请求头参数
 */
axios.defaults.timeout = 30000;
export function fetch(options, headers = {}) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    const data = token ? { headers: { token, ...headers } } : { headers: { ...headers } };
    const instance = axios.create(data);

    instance(options).then(response => {
      const res = response.data;
      if (response.headers.token) {
        setToken(response.headers.token);
      }
      if (res.errno === 0) {
        resolve(res);
      } else {
        reject();
      }
    }).catch(error => {
      console.log('http请求失败: ', error);
      reject();
    });
  });
}

/**
 * 调用第三方接口, 不处理数据结构, 不加 token
 * @param {Object} options 请求 地址/方法/参数
 */
export function fetchOther(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create();
    instance(options).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log('http请求失败: ', error);
      reject();
    });
  });
}
