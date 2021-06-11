const path = require('path')
const IS_PROD = ['development'].includes(process.env.NODE_ENV)
const productionSourceMap = !IS_PROD
const filenameHashing = true
const assetsDir = ''
function resolve (dir) {
  return path.join(__dirname, dir)
}
function getAssetPath (assetsDir, filePath) {
  return assetsDir ? path.posix.join(assetsDir, filePath) : filePath
}
module.exports = {
  runtimeCompiler: true,
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: filenameHashing,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@crud': resolve('src/components/Crud'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'router': resolve('src/router'),
        'utils': resolve('src/utils'),
        'static': resolve('src/static'),
        'store': resolve('src/store')
      }
    },
    devtool: '#eval-source-map'
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    })
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      const isLegacyBundle =
        process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
      const filename = getAssetPath(
        assetsDir,
        `js/[name]${isLegacyBundle ? `-legacy` : ``}${filenameHashing ? '.[hash:8]' : ''
        }.js`
      )
      config
        .mode('development')
        .devtool(productionSourceMap ? 'source-map' : false)
        .output.filename(filename)
        .chunkFilename(filename)
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development', // 本地开发时开启eslint规范
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: !IS_PROD,
  },
  devServer: {
    port: 10000, //端口号
    proxy: {
      '/sso': {
        target: 'http://sso.yilimaizi.club',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/sso': '/'
        }
      },
      '/admin': {
        target: 'http://192.168.138.189:8181', //test
        timeout: 6 * 60 * 1000,
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/admin': '', //这里重写路径
        },
      }
    }
  }
}

