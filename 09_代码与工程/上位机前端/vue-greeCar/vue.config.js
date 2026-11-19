const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
 
 
  chainWebpack: config => {
    // 关键修复：强制指定 element-ui 路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('element-ui$', resolve('node_modules/element-ui')) // 新增此行
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 双重路径保险
        'element-ui/lib/theme-chalk': resolve('node_modules/element-ui/lib/theme-chalk')
      }
    }
  },
};