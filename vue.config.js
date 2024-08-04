const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 80
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
})
