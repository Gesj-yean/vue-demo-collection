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

(```)
git clone https://github.com/Gesj-yean/vue-demo-collection.git

cd vue-demo-collection

npm install

npm run serve
(```)

## 目录说明

├── public
|  ├── favicon.ico                        // 图标
|  └── index.html                         // 入口html
├── src
|  ├── App.vue                            // 入口vue
|  ├── base                               // 放置基础组件
|  |  └── scroll.vue                      // scroll组件
|  ├── common                             // 放置静态资源
|  |  ├── images                          // 图片
|  |  |  ├── arrow-left.png
|  |  |  └── arrow-right.png
|  ├── js                                 // js
|  |  └── stylus                          // 样式
|  |     ├── base.styl                    // 基础样式
|  |     ├── mixin.styl                   // 混入样式
|  |     ├── reset.styl                   // 重置样式
|  |     └── variable.styl                // 统一样式
|  ├── components                         // 应用组件
|  |  ├── scroll-vertical                 // 纵向滚动组件（apply应用，blog页面）
|  |  |  ├── scroll-vertical-apply.vue
|  |  |  └── scroll-vertical.vue
|  |  └── start                           // 开始页面
|  |     └── start.vue
|  ├── main.js                            // 入口js
|  ├── router                             // 路由
|  |  └── index.js                        // 路由入口
|  └── views                              // 页面
|     └── home.vue                        // 主页
├── babel.config.js                       // babel配置
├── out.txt                               // 目录树
├── package-lock.json                     // 详细版本
├── package.json                          // 版本
├── README.md                             // 说明
└── vue.config.js                         // vue配置
