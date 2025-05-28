module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,    // 设计稿宽度/10（如375设计稿则填37.5）
      propList: ['*'],    // 需要转换的属性，*表示全部
      selectorBlackList: ['.norem'] // 过滤带有.norem的class不转换
    }
  }
}