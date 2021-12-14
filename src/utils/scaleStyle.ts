import _ from 'lodash';
import themeMapStyle from './themeMapStyle';
import scalePx from './scalePx';
import {StyleSheet} from 'react-native';

type Style<T> = StyleSheet.NamedStyles<T>;

// 转换忽略属性
const scaleIgnore = ['flex', 'opacity'];
const scaleIgnoreSet = new Set(scaleIgnore);

const themeMapStyleSet: Set<string> = new Set(Object.keys(themeMapStyle));

// 递归缩放样式中的数字类型
function scaleStyle<T>(obj: Style<T>): Style<T> {
  if (!_.isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    const value = obj[key];
    if (scaleIgnoreSet.has(key)) {
      continue;
    } else if (themeMapStyleSet.has(key)) {
      obj[key] = themeMapStyle[key];
    } else if (_.isNumber(value) && value > 1) {
      obj[key] = scalePx(value) as unknown as T;
    }
  }
  return obj;
}

export default scaleStyle;
