import { images, text } from 'utils/public';
import { browser } from 'utils/index';
// import VConsole from 'vconsole/dist/vconsole.min';

// eslint-disable-next-line no-unused-vars
// const vConsole = new VConsole();
/**
 * App.vue js 逻辑
 */
export class AppClass {
  constructor() {
    this.isMobile = browser.versions.mobile;
    AppClass.faviconCheck();
    AppClass.titleCheck();
  }

  // 动态 link icon 图标
  static faviconCheck() {
    const link = document.querySelector("link[rel*='icon']");
    link.type = 'image/png';
    link.href = images.logo;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  static titleCheck() {
    document.title = text.app_name;
  }
}

export default AppClass;
