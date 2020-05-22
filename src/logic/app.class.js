import { images, text } from 'utils/public';

/**
 * App.vue js 逻辑
 */
export class AppClass {
  constructor() {
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
