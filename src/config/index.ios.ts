// 配置文件
const devConfig = require('./dev.config');
const proConfig = require('./pro.config');

module.exports = global.__DEV__ ? devConfig : proConfig;
