# VuePress 开发个人博客进阶之自定义主题


`VuePress` 是一个以 Vue 驱动的主题系统的简约静态网站生成工具，最初的目的是用来支持 `Vue` 子项目的文档。但现在很多开发者都想要利用 `VuePress` 来搭建自己的博客，特别是对于 vue 的开发者来说，因为 `Vuepress` 的博客主题就是基于 `Vue` 的语法去开发的。

官方提供的默认主题非常简洁，不能满足开发者定制个性化博客的需求，那怎么样自己写一个 `VuePress` `theme`  呢？相信有很多开发者已经尝试着去开发一个自定义主题，但由于vuepress的文档并不健全，很多地方没有说明，往往只能放弃。

而本文介绍了如何开发 `VuePress` 自定义主题以及如何发布主题到 `npm` 上，帮你踩了 `Vuepress` 自定义主题开发博客的坑。
## 效果展示
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d39d11ceced407f912ff31bd71b22d2~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3edd012ed81a4f59a129ddb55044b2ff~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ba54119a774662aefcf986d8ed7ec6~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d0c4b2ab21c4086b5fc7faad6e66337~tplv-k3u1fbpfcp-zoom-1.image)

以上效果是我的个人博客中用到的主题样式 `vuepress-theme-mount`，后续会继续完善并开放出来。如果有同学感兴趣，这里是项目的 [github地址](https://github.com/Gesj-yean/vuepress-theme-mount)。有很多东西还没补充上去，愿意看的同学可以把它当成 `demo`。


## 开始
1. 新建 `vuepress` 文件夹。
2. 按照官方文档中 [在已有项目中安装](https://vuepress.docschina.org/guide/getting-started.html#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85) 方法安装。
3. 对项目进行 [配置](https://vuepress.docschina.org/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-config-file)。

由于这一部分官方文档中说的很清楚，按照指引即可完成，不做赘述啦。完成上述步骤后，你的目录结构应该如下：
```
vuepress
├─ docs
│  └─ README.md
├─ node_modules
├─ package-lock.json
└─ package.json
```
接着使用命令 `vuepress dev docs` 运行，显示的是包含 `hello Vuepress` 的页面和包含一个搜索框的 `header` 部分，以及根目录下 `README.md` 的内容。

## 自定义主题
接着我们要开始进入正题：写 `theme` 自定义的部分。

### 构建目录

接着，我们根据官方文档中 [开发主题/目录结构](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84) 构建目录。

1. 文档根目录下创建一个 `.vuepress/theme` 目录，然后创建它的子目录。
```
theme
├── global-components //该目录下的组件都会被自动注册为全局组件
│   └── xxx.vue
├── components        // Vue 组件
│   └── xxx.vue
├── layouts           // 布局组件，其中 Layout.vue 是必需的
│   ├── Layout.vue (必要的)
│   └── 404.vue
├── styles            // 全局的样式和调色板
│   ├── index.styl
│   └── palette.styl
├── index.js         // 主题文件的入口文件
└── enhanceApp.js    // 主题水平的客户端增强文件
```

建好以上目录后（注意没有`package.json` 和 `template` 文件夹），运行一下 `vuepress dev docs` 发现是空白的，说明我们的 `layout.vue` 已经生效了。

2. 在 `theme/index.js` 中加入：
```
module.exports = {
   // ...
}
```

### 开发 layout.vue
接下来，我们就可以按照自己想要的布局在 `layout.vue` 中开发了。需要用到的组件都写到 `theme/components` 下，在 `layout.vue` 中引入即可。

例如，我想要我的整体布局分成 `main`、`content`、`footer` 部分。
```
theme
├── components        // Vue 组件
│   ├── Header.vue 
│   └── Footer.vue

```
在 `layout.vue` 正常引入即可：
```
<template>
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header"
import Footer from "../components/Footer"

export default {
  components: {
    Header,
    Footer
  }
};
</script>
```
写好后， 运行 `npm run docs:dev` 即可看见你的页面。接下来就像写一个正常的 `vue` 项目一样，开始写你自己的博客主题了。

### 将第三方 UI 集成到主题中

这里以开发顶部导航栏为例，示范安装第三方库 `element-ui` 及使用。

cd 到 theme 目录下，运行命令安装：`npm i element-ui -S`。

这里推荐按需引入，需要安装 `babel-plugin-component`，运行命令安装 :`npm install babel-plugin-component -D`。

然后，`theme` 目录下新建 `.babelrc` 并修改为：
```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
接下来，如果你只希望引入部分组件，比如 `Menu` ，那么需要在 `enhanceApp.js` 中写入以下内容：
```
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
}
```

以上步骤安装好之后，就可以在组件中使用，方法和普通的 `vue` 项目一样。

### 使用vuepress 官方插件
这里以开发顶部导航栏为例，示范安装插件 `search` 框及使用。插件的安装在 [官方文档](https://vuepress.vuejs.org/zh/plugin/official/plugin-search.html) 中已经说明的很清楚，这里示范一下。
#### 安装
```
yarn add -D @vuepress/plugin-search
# OR npm install -D @vuepress/plugin-search
```
#### 配置插件
在 `.vuepress/config.js` 中：
```
// .vuepress/config.js or themePath/index.js
module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ]
}
```
#### 使用
`search` 插件将自动注入指向搜索组件的 `webpack` 别名 `@SearchBox`，可以直接在 `layout` 组件中使用它：
```
<template>
  <div class="foo-layout">
    <header>
      <SearchBox/>
    </header>
    <main>
      ...
    </main>
  </div>
</template>

<script>
import SearchBox from '@SearchBox'

export default {
  components: { SearchBox }
}
</script>
```

### 自定义主题需要手动引入Markdown样式
在 `<Content>` 中显示的Markdown文件是没有任何样式的，这需要我们自己写一个Markdown样式，但是这样真的太费力气。我们不如去找一份自己喜欢的样式。于是在 `typora` 上找到一份主题 [`Maize`](http://theme.typora.io/theme/Maize/)，添加到 `style` 文件夹下并引入后效果对比：

> `vuepress` 自定义主题时，帮我们去掉了所有 `Markdown` 相关的样式。所以 `Markdown样式` 需要自己引入。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cec868e280940018ddf93f2c014e82c~tplv-k3u1fbpfcp-zoom-1.image)

引入后可以显示样式，确实好看了很多：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39fe1bab554e496fbd9684d42e5e61fc~tplv-k3u1fbpfcp-zoom-1.image)

### 如何进行页面路由跳转
关于页面间路由跳转，这个点应该是大多数同学放弃的原因。要踩的坑真的巨大，其实是这样的：在你的文档下 `README.md` 是默认的页面，那么我们就需要思考其他 `md` 文件该如何去显示。

官方的文档中是这样子的：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b8a414353924b1383ee03dd01c98d6c~tplv-k3u1fbpfcp-zoom-1.image)

也就是说当我们想要进入 `非README.md` 的文件时，以 `config.md` 为例，我们需要跳转到 `/guide/config.md`，前提是你知道 `README.md`的路径是`/guide/`。那这就好办了，`vuepress` 对于 `$router` 是支持的，就是说我们可以直接使用 `vue` 的路由跳转，不同是我们不用再去写`router.js` 文件规划路由。

那么用 `this.$router.push('/guide/config.md')` 即可跳转到其他文件的页面。

上述的路径则通过 `this.$site.pages` 可以获取，具体每个页面的内容可以通过 `this.$page` 获取。

由于默认进入的是文件夹下 `README.md` 设置的 `layout` 布局，想要在这个布局里获取其他文件的信息，只能够 `Front Matter` 通过透传，如下所示：
```
---
layout: RecordLayout
description: '这里有一些技巧，可以帮助你更好地优化 JavaScript 代码，从而提高性能。'
---
```
>在 `非README.md` 中的 `Front Matter` 输入信息，然后在 `README.md` 设置的布局中的 `frontmatter` 对象拿到信息。



### 更换 `favicon.icon`
在 `config.js` 中添加以下代码，并在 `public` 文件夹中添加 `favicon.ico` 图标，注意这里不要使用其他格式的图片，否则会显示不出来。
```

  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: "/favicon.ico" }]
  ]
 ```

### 文章最后更新时间
如果你使用默认主题，你无需安装本插件，因为 VuePress 的 core 中已经包含此插件。这里需要安装：

```
npm i @vuepress/last-updated
```
- 在config.js中添加引入：
```
module.exports = {
  plugins: ['@vuepress/last-updated']
}
```
关于最新更新时间插件的实现方式，这里有 [传送门](https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html)。


### 简述 components 和 global-components 的区别

这里简述一下 `components` 和 `global-components` 的区别：`components` 所定义的组件仅在 `theme` 下生效，而 `global-components` 下定义的组件不仅局限于 `theme` 而且在 `docs` 目录下的 `md` 文件中可以直接使用。

例如，`docs/README.md` 中：
``` 
# Hello VuePress!
<ComponentsTest />         // 不显示
<GlobalComponentsTest />   // 显示
```

### 一个项目中多个布局

如果你的首页和博客页想应用不同主题，需要在 `theme/layouts` 下定义多个布局如 `HomeLayout.vue`，但 `Layout.vue` 必须保留。默认会应用 `Layout.vue` 布局。那如何使用 `HomeLayout.vue` 中的布局呢？

例如，`docs/README.md` 中这样写即可：
``` 
---
layout: HomeLayout
---
# Hello VuePress!
```

### 如何发布你的主题到npm
发布主题到`npm`:
- 将你的主题推送到 `github` 仓库，这里的主题是指 `.vuepress` 文件夹下所有内容需要推送到 `github`。
- 在 npm 上注册 `https://www.npmjs.com/`，填入信息并验证邮箱。
- 进入要发布的项目根目录 `.vuepress`，初始化为 `npm` 包：
```
npm init
```
- 依次按提示填入包名、版本、描述、`github` 地址、关键字、license等，你的主题命名可以是 `vuepress-theme-` 开头的，这样别人引用时可以简写成 `vuepress-theme-` 后面的字段。
- 在本地登录你的 `npm` 账号，并输入账号信息：
```
npm login
```
- 将你的包发布，成功的话就可以在npm上搜索到你发布的包了~
```
npm publish
```
- 这样就可以搜索到我的主题 `vuepress-theme-mount` ：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c633d5bbad554de4b97e81ca9f560c77~tplv-k3u1fbpfcp-zoom-1.image)

### 如何使用自定义主题，以 `vuepress-theme-mount` 为例

- 在本地新建文件夹 `vuepress-starter`，包含以下目录结构：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42f5baaaac694f0098013cae237b8812~tplv-k3u1fbpfcp-zoom-1.image)

- 在目录下安装包：

```
npm init
npm i vuepress-theme-mount
```
- 在config.js中输入：
```
// .vuepress/config.js
module.exports = {
  theme: 'mount'  // or 'vuepress-theme-mount'
}
```
- 在 package.json 中加入，并使用命令 `vuepress dev docs` 运行项目，即可打开你的博客。

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```


## 总结

如果不是像我一样想尝试 `vuepress` 搭建博客，建议还是使用成熟的博客系统，因为 `vuepress` 真的不是很适合用来搭建博客系统，需要踩的坑非常多，比如关于路由跳转的问题文档没有明确说明。如果还有其他关于自定义主题的问题可以留言。

最后，踩坑不易，欢迎鼓励。