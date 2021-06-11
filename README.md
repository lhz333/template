## 安装步骤

```
git clone 项目地址
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 开启服务器，浏览器访问 http://localhost:8080
npm run dev 或者 npm run serve
// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build           生产包

```

## 本地开发代理配置

```
vue.config.js   文件  配置代理地址

devServer: {
    port: 8080, //端口号
    proxy: {
      '/admin': {
        target:'', //目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/admin': '' //这里重写路径
        }
      }
    }
  }
```
