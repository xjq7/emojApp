import CameraRoll from '@react-native-community/cameraroll';
import {PermissionsAndroid, Platform} from 'react-native';
import {DocumentDirectoryPath, downloadFile, writeFile} from 'react-native-fs';

/**
 * @param {string} uri - 图片路径
 */
function iosSave(uri = '') {
  return CameraRoll.save(uri, {type: 'photo'});
}

const IMAGE_FAIL = '图片下载失败';
const PERMISSION_FAILE = '授权失败';

const getFileNameByPath = (path: string) => {
  // @ts-ignore
  return path.split(/\#|\?/)[0].split('/').pop().trim();
};

const hasExtByName = (name: string) => {
  return name.split('.').length === 2;
};

const fetchImage = (imgUrl: string, saveUrl: string) =>
  new Promise((resolve, reject) => {
    downloadFile({fromUrl: imgUrl, toFile: saveUrl}).promise.then(res => {
      if (res && res.statusCode === 200) {
        resolve(saveUrl);
      } else {
        reject(new Error(IMAGE_FAIL));
      }
    });
  });

const writeBase64 = (imgUrl: string, saveUrl: string) =>
  new Promise((resolve, reject) => {
    writeFile(saveUrl, imgUrl, 'base64').then(res => {
      resolve(saveUrl);
    });
  });

const requestPermission = () => {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    )
      .then(res => {
        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(res);
        } else {
          reject(new Error(PERMISSION_FAILE));
        }
      })
      .catch(() => {
        reject(new Error(PERMISSION_FAILE));
      });
  });
};

/**
 * @param {string} uri - 图片路径
 * @param {object} options - 可选参数
 */
export function androidSave(uri = '') {
  return Promise.resolve(requestPermission())
    .then(res => {
      const storeLocation = DocumentDirectoryPath;
      const fileName = getFileNameByPath(uri);
      const hasExt = hasExtByName(fileName);
      const downloadPath = hasExt
        ? `${storeLocation}/${fileName}`
        : `${storeLocation}/${fileName}.jpg`;
      if (uri.indexOf('http') === 0) {
        // 远程路径图片
        return fetchImage(uri, downloadPath);
      } else if (uri.indexOf('file') === 0) {
        // 本地路径图片
        return uri;
      } else if (uri.indexOf('data') === 0) {
        // base64格式
        const imageDatas = uri.split('base64,');
        const imageData = imageDatas[1];
        return writeBase64(imageData, downloadPath);
      } else {
        return writeBase64(uri, downloadPath);
      }
    })
    .then(localImageUrl => {
      return CameraRoll.save(localImageUrl as string, {type: 'photo'});
    });
}

export default Platform.OS === 'android' ? androidSave : iosSave;
