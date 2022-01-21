# 浏览器兼容性记录

## 1. 如何同时打开不同版本的 Chrome 浏览器？
- 保留两者镜像，应用程序中重命名分别为 Google Chrome、Google Chrome49。

- command + 空格打开脚本编辑器，输入以下代码：
```
do shell script "/Applications/Google\\ Chrome49.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/Users/$USER/Library/Application\\ Support/Google/Chrome49 > /dev/null 2>&1 &"
```

- 保存脚本，储存为：chrome49；位置：应用程序；格式：应用程序。

- 在启动台中找到 chrome49程序，点击即可打开。
## 2. 历史版本下载地址

https://www.slimjet.com/chrome/google-chrome-old-version.php

## 记录

- Chrome49

|现象|	解决办法	|结论
|--|--|--|
|页面元素高度为0|min-height: calc(100vh - 200px);| |
|由于flat()方法在 Chrome49 中不支持，组件不展示。|flat() 最先支持的 Chrome 版本为69，替换为：arr.reduce((acc, val) => acc.concat(val),[])|不使用flat() 拍平数组，使用代替方法。|
|点击链接后，路由丢失，页面空白。直接输入预警阻断平台的其他模块路由，页面正常，仅预警统计中心页面空白。排查发现，Lottie 动画不支持。|Lottie-player组件做二次封装，采用异步组件的方式引用，当版本 >Chrome63，使用组件，否则不引用。||


- Chrome89

|现象|	解决办法	|结论
|--|--|--|
|/deep/ 下样式不生效 |Chrome89不再支持/deep/的使用 ||

