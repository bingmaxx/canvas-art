# canvasArt

**npm 安装**
```shell
npm i canvas-art -S
```

**完整引入**
在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import CanvasArt from 'canvas-art';
import App from './App.vue';

Vue.use(CanvasArt);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
