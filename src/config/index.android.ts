import Config from 'react-native-config';
// 配置文件
const devConfig = require('./dev.config');
const proConfig = require('./pro.config');

module.exports = Config.ENV === 'production' ? proConfig : devConfig;
