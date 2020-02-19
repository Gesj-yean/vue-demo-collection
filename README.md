
# 前言

从2019年开始学习Vue，这个博客我想将项目中遇到的好的插件的使用方法、踩坑经历总结下来，便于在以后的项目中使用。
为了更加便于使用，除了在github上可以看到demo的源码，还有在网页中增加了演示的部分。

以后会更新更多我在项目中的踩坑经历、插件使用记录，欢迎来访~

如果觉得我有更多进步的空间，还请包涵和指出喔。

那就先定一个小目标吧~~ 2020年要完成20+篇的总结。

注：此项目纯属个人在学习前端过程中的总结，代码或内容有借鉴别人的地方会注明出处。

## 技术栈

vue2 + vuex + vue-router + ES6/7 + stylus + axios

## 项目运行

```bash
git clone https://github.com/Gesj-yean/vue-demo-collection.git

cd vue-demo-collection

npm install

npm run serve
```

## 目录说明

```bash
├── babel.config.js
├── out.txt
├── package-lock.json
├── package.json
├── public
|  ├── favicon.ico
|  └── index.html
├── README.md
├── src
|  ├── App.vue
|  ├── base
|  |  └── scroll.vue
|  ├── common
|  |  ├── images
|  |  |  ├── arrow-left.png
|  |  |  └── arrow-right.png
|  |  ├── js
|  |  └── stylus
|  |     ├── base.styl
|  |     ├── mixin.styl
|  |     ├── reset.styl
|  |     └── variable.styl
|  ├── components
|  |  ├── scroll-vertical
|  |  |  ├── scroll-vertical-apply.vue
|  |  |  └── scroll-vertical.vue
|  |  └── start
|  |     └── start.vue
|  ├── main.js
|  ├── router
|  |  └── index.js
|  └── views
|     └── home.vue
└── vue.config.js
```
