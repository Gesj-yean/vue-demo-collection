# 前言

该项目用于收集前端开发过程中常用的基础组件。

base文件夹下是基础组件的Vue源码；components文件夹下是对应组件的使用方法；blogs文件夹下是组件的封装说明。

注：此项目纯属个人在学习前端过程中的总结，代码或内容有借鉴别人的地方会注明出处。

## 技术栈

vue2 + vuex + vue-router + ES6/7 + stylus + axios

## 目录

- 起步

- Scroll 纵向滚动组件

- Slider 轮播图组件

- Dialog 对话框组件

- Tree 树形控件

- Pagination 分页器

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
