# 前言

从2019年开始学习Vue，这个博客我想将项目中遇到的好的插件的使用方法、踩坑经历总结下来，便于在以后的项目中使用。
为了更加便于使用，除了在github上可以看到demo的源码，还有在网页中增加了演示的部分。

以后会更新更多我在项目中的踩坑经历、插件使用记录，欢迎来访~

如果觉得我有更多进步的空间，还请包涵和指出喔。

那就先定一个小目标吧~~ 2020年要完成20+篇的总结。

注：此项目纯属个人在学习前端过程中的总结，代码或内容有借鉴别人的地方会注明出处。

## 技术栈

vue2 + vuex + vue-router + ES6/7 + stylus + axios

## 目录

- 起步

- Scroll 组件纵向滚动演示

- Slider 轮播图组件演示

- Dialog 对话框组件

- Tree 树形控件

- tree-cli 使用记录

- flex实现中间文字，两边横线（1px）

- 《CSS揭秘》-总结47个Css技巧（更新中）

## 项目运行

```bash
git clone https://github.com/Gesj-yean/vue-demo-collection.git

cd vue-demo-collection

npm install

npm run serve
```

## 项目目录说明

```bash

├── public
|  ├── favicon.ico                         // 图标
|  └── index.html                          // 入口html
├── src
|  ├── App.vue                             // 入口vue
|  ├── base                                // 基础组件
|  |  ├── dialog.vue
|  |  ├── line-text.vue
|  |  ├── scroll.vue
|  |  ├── slider.vue
|  |  └── tree.vue
|  ├── common
|  |  ├── images                           // 图
|  |  |  ├── arrow-left.png
|  |  |  └── arrow-right.png
|  |  ├── js                               // js
|  |  └── stylus
|  |     ├── base.styl                     // 基础样式
|  |     ├── mixin.styl                    // 混入样式
|  |     ├── reset.styl                    // 重置样式
|  |     └── variable.styl                 // 主题样式
|  ├── components                          // 应用组件
|  |  ├── css-demo.vue
|  |  ├── dialog-apply.vue
|  |  ├── line-text-apply.vue
|  |  ├── scroll-apply.vue
|  |  ├── slider-apply.vue
|  |  └── tree-apply.vue
|  ├── main.js                             // 入口main.js
|  ├── router                              // 路由配置
|  |  └── index.js
|  └── blogs                               // 博客页面
|   ├── css-demo.vue
|   ├── dialog.vue
|   ├── line-text.vue
|   ├── slider.vue
|   ├── scroll.vue
|   ├── start.vue
|   ├── tree-cli.vue
|   └── tree.vue
├── babel.config.js                        // babel配置
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js                          // vue配置
```

## 项目截图

![项目示例](https://github.com/Gesj-yean/vue-demo-collection/raw/master/src/common/images/part1.png)
![项目示例](https://github.com/Gesj-yean/vue-demo-collection/raw/master/src/common/images/part2.png)
![项目示例](https://github.com/Gesj-yean/vue-demo-collection/raw/master/src/common/images/part3.png)
