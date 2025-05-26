const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  assetsDir: '',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        target: 'https://dls.4dlp.com.cn:7102',
        // target: 'http://10.73.60.92:8092',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
      },
    },
  }
})
