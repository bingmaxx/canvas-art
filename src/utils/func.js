/**
* description: canvas 转 blob 对象
* input:
* @param {String || Object} canvas canvas dom id || canvas dom
* @param {String} mimeType 'image/png', 'image/jpeg'
* @param {Number} quality [0,1]
* output: Promise 对象
* @param {Object} then({blob, name})
*/
export const cnavasToBlob = ({ canvas, mimeType = 'image/png', quality = 1 }) => {
  // mimeType = mimeType || 'image/png';
  // quality = quality || 1;
  const elem = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

  return new Promise(resolve => {
    const name = String(new Date().getTime());
    elem.toBlob(blob => {
      resolve({ blob, name });
    }, mimeType, quality);
  });
};

/**
* description: canvas 转 base64
* input:
* @param {String || Object} canvas canvas dom id || canvas dom
* @param {String} mimeType 'image/png', 'image/jpeg'
* @param {Number} quality [0,1]
* output:
* @param {String} URL
*/
export const cnavasToDataURL = ({ canvas, mimeType = 'image/png', quality = 1 }) => {
  // mimeType = mimeType || 'image/png';
  // quality = quality || 1;
  const elem = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
  return elem.toDataURL(mimeType, quality);
};

/**
* description: 读取 Blob 中的内容，返回 data: URL
* input:
* @param {File|Blob} file 使用 File 或 Blob 对象指定要读取的文件或数据
* output: Promise
* @param {String} then(result) data: URL
* @param {-} catch
*/
export const fileToDataURL = ({ file }) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function resolveFunc() {
    resolve(this.result);
  };
  reader.onerror = function rejectFunc() {
    reject();
  };
});

/**
* description: <input type="file"/>
* input:
* @param {Boolean} accept file 类型
* @param {Boolean} multiple 是否允许一个以上 file
* output:
* @param {Array} files
*   @param {File} file File 对象
*/
export const inputFile = ({ accept, multiple }) => new Promise((resolve, reject) => {
  const elem = document.createElement('input');
  elem.type = 'file';
  elem.accept = accept || 'image/*';
  elem.multiple = multiple || false;
  elem.style.display = 'none';

  // change 事件
  const change = function changeFunc() {
    document.body.removeChild(elem);
    if ([...this.files].length > 0) {
      const files = multiple ? [...this.files] : [this.files[0]];
      resolve(files);
    } else {
      reject();
    }
  };
  elem.addEventListener('change', change);

  document.body.appendChild(elem);
  elem.click();
});

/**
* description: 上传图片并获得图片 data: URL - 单图
*/
export const inputImageToDataURL = () => new Promise((resolve, reject) => {
  inputFile({ accept: 'image/*', multiple: false }).then(res => {
    fileToDataURL({ file: res[0] }).then(result => {
      resolve(result);
    }).catch(() => { reject(); });
  }).catch(() => { reject(); });
});
