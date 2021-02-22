# umi-plugin-localtunnel

## 使用

#### 安装

1. 安装插件

```bash
$ npm install @music/umi-plugin-localtunnel
```

2. umi 会自动识别插件并注册

   （无需在 plugin 中显式声明，不然会报重复注册的 error）

#### 运行

程序运行后，终端会打印信息`Tunnel is running on: https://umi-xxxxxx.tunnel.igame.163.com`。点击链接即可使用 tunnel。

## FAQ

Q: 在 cms 开发时使用了该插件，登陆成功跳转回来显示：

> # 该网页无法正常运作
>
> **umi-xxxxxx.tunnel.igame.163.com** 未发送任何数据。

A: 这是因为跳转回来的链接是 http 链接，在导航栏的地址前补上`https://`即可正常跳转

## 开发

### Install

```bash
# or yarn
$ npm install
```

```bash
$ npm run build --watch
$ npm run start
```

### Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: ['path/to/your/local/umi-plugin-localtunnel'],
};
```

详见：https://umijs.org/docs/plugin
