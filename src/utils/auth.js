import { storage } from './index';

/**
 * token 信息
 */
const TOKEN = 'CAT';

export function getToken() {
  return storage.getLocal(TOKEN);
}
export function setToken(data) {
  storage.setLocal(TOKEN, data);
}
export function removeToken() {
  storage.removeLocal(TOKEN);
}

export const tokenMock = () => {
  // setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6IjVkNDk0YzA4NmU3N2JiMjViNzIwNDBmYSIsImNyZWF0ZV90aW1lIjoxNTY1MDg0NjgwLCJmcm9tIjoiYXBwIn0sImlhdCI6MTU4OTE2MTU1MCwiZXhwIjoxNTkxNzUzNTUwfQ.55e58SaO6DHdj4TeVo5QSHae7DgLbybjzS4-lZAzjfg');
};
