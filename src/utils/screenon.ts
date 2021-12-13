import {NativeModules} from 'react-native';
const {KeepScreenOn} = NativeModules;
/**
 * 可用方法
 * setKeepScreenOn(mode) true:常亮;false:关闭常亮;
 */
export default KeepScreenOn;
