import _ from 'lodash';
import themeMap from './themeMap';
import scalePx from './scalePx';
import {StyleSheet} from 'react-native';

type Style<T> = StyleSheet.NamedStyles<T>;

// 转换忽略属性
const scaleIgnore = ['flex', 'opacity'];
const scaleIgnoreSet = new Set(scaleIgnore);

const themeMapSet: Set<string> = new Set(Object.keys(themeMap));

// 递归缩放样式中的数字类型
function scaleStyle<T>(obj: Style<T>): Style<T> {
  if (!_.isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    const value = obj[key];

    if (scaleIgnoreSet.has(key)) {
      continue;
    } else if (themeMapSet.has(key)) {
      obj[key] = themeMap[key as keyof typeof themeMap] as unknown as T;
    } else if (_.isNumber(value) && value > 1) {
      obj[key] = scalePx(value) as unknown as T;
    } else {
      scaleStyle(value as unknown as Style<T>);
    }
  }
  return obj;
}

export default scaleStyle;
