(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{735:function(e,t,a){"use strict";a.r(t);var s=a(58),v=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"vuepress-开发个人博客进阶之自定义主题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-开发个人博客进阶之自定义主题"}},[e._v("#")]),e._v(" VuePress 开发个人博客进阶之自定义主题")]),e._v(" "),a("p",[a("code",[e._v("VuePress")]),e._v(" 是一个以 Vue 驱动的主题系统的简约静态网站生成工具，最初的目的是用来支持 "),a("code",[e._v("Vue")]),e._v(" 子项目的文档。但现在很多开发者都想要利用 "),a("code",[e._v("VuePress")]),e._v(" 来搭建自己的博客，特别是对于 vue 的开发者来说，因为 "),a("code",[e._v("Vuepress")]),e._v(" 的博客主题就是基于 "),a("code",[e._v("Vue")]),e._v(" 的语法去开发的。")]),e._v(" "),a("p",[e._v("官方提供的默认主题非常简洁，不能满足开发者定制个性化博客的需求，那怎么样自己写一个 "),a("code",[e._v("VuePress")]),e._v(" "),a("code",[e._v("theme")]),e._v("  呢？相信有很多开发者已经尝试着去开发一个自定义主题，但由于vuepress的文档并不健全，很多地方没有说明，往往只能放弃。")]),e._v(" "),a("p",[e._v("而本文介绍了如何开发 "),a("code",[e._v("VuePress")]),e._v(" 自定义主题以及如何发布主题到 "),a("code",[e._v("npm")]),e._v(" 上，帮你踩了 "),a("code",[e._v("Vuepress")]),e._v(" 自定义主题开发博客的坑。")]),e._v(" "),a("h2",{attrs:{id:"效果展示"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#效果展示"}},[e._v("#")]),e._v(" 效果展示")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d39d11ceced407f912ff31bd71b22d2~tplv-k3u1fbpfcp-zoom-1.image",alt:""}}),e._v(" "),a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3edd012ed81a4f59a129ddb55044b2ff~tplv-k3u1fbpfcp-zoom-1.image",alt:""}}),e._v(" "),a("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ba54119a774662aefcf986d8ed7ec6~tplv-k3u1fbpfcp-zoom-1.image",alt:""}}),e._v(" "),a("img",{attrs:{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d0c4b2ab21c4086b5fc7faad6e66337~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),a("p",[e._v("以上效果是我的个人博客中用到的主题样式 "),a("code",[e._v("vuepress-theme-mount")]),e._v("，后续会继续完善并开放出来。如果有同学感兴趣，这里是项目的 "),a("a",{attrs:{href:"https://github.com/Gesj-yean/vuepress-theme-mount",target:"_blank",rel:"noopener noreferrer"}},[e._v("github地址"),a("OutboundLink")],1),e._v("。有很多东西还没补充上去，愿意看的同学可以把它当成 "),a("code",[e._v("demo")]),e._v("。")]),e._v(" "),a("h2",{attrs:{id:"开始"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开始"}},[e._v("#")]),e._v(" 开始")]),e._v(" "),a("ol",[a("li",[e._v("新建 "),a("code",[e._v("vuepress")]),e._v(" 文件夹。")]),e._v(" "),a("li",[e._v("按照官方文档中 "),a("a",{attrs:{href:"https://vuepress.docschina.org/guide/getting-started.html#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85",target:"_blank",rel:"noopener noreferrer"}},[e._v("在已有项目中安装"),a("OutboundLink")],1),e._v(" 方法安装。")]),e._v(" "),a("li",[e._v("对项目进行 "),a("a",{attrs:{href:"https://vuepress.docschina.org/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-config-file",target:"_blank",rel:"noopener noreferrer"}},[e._v("配置"),a("OutboundLink")],1),e._v("。")])]),e._v(" "),a("p",[e._v("由于这一部分官方文档中说的很清楚，按照指引即可完成，不做赘述啦。完成上述步骤后，你的目录结构应该如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("vuepress\n├─ docs\n│  └─ README.md\n├─ node_modules\n├─ package-lock.json\n└─ package.json\n")])])]),a("p",[e._v("接着使用命令 "),a("code",[e._v("vuepress dev docs")]),e._v(" 运行，显示的是包含 "),a("code",[e._v("hello Vuepress")]),e._v(" 的页面和包含一个搜索框的 "),a("code",[e._v("header")]),e._v(" 部分，以及根目录下 "),a("code",[e._v("README.md")]),e._v(" 的内容。")]),e._v(" "),a("h2",{attrs:{id:"自定义主题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义主题"}},[e._v("#")]),e._v(" 自定义主题")]),e._v(" "),a("p",[e._v("接着我们要开始进入正题：写 "),a("code",[e._v("theme")]),e._v(" 自定义的部分。")]),e._v(" "),a("h3",{attrs:{id:"构建目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建目录"}},[e._v("#")]),e._v(" 构建目录")]),e._v(" "),a("p",[e._v("接着，我们根据官方文档中 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84",target:"_blank",rel:"noopener noreferrer"}},[e._v("开发主题/目录结构"),a("OutboundLink")],1),e._v(" 构建目录。")]),e._v(" "),a("ol",[a("li",[e._v("文档根目录下创建一个 "),a("code",[e._v(".vuepress/theme")]),e._v(" 目录，然后创建它的子目录。")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("theme\n├── global-components //该目录下的组件都会被自动注册为全局组件\n│   └── xxx.vue\n├── components        // Vue 组件\n│   └── xxx.vue\n├── layouts           // 布局组件，其中 Layout.vue 是必需的\n│   ├── Layout.vue (必要的)\n│   └── 404.vue\n├── styles            // 全局的样式和调色板\n│   ├── index.styl\n│   └── palette.styl\n├── index.js         // 主题文件的入口文件\n└── enhanceApp.js    // 主题水平的客户端增强文件\n")])])]),a("p",[e._v("建好以上目录后（注意没有"),a("code",[e._v("package.json")]),e._v(" 和 "),a("code",[e._v("template")]),e._v(" 文件夹），运行一下 "),a("code",[e._v("vuepress dev docs")]),e._v(" 发现是空白的，说明我们的 "),a("code",[e._v("layout.vue")]),e._v(" 已经生效了。")]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("在 "),a("code",[e._v("theme/index.js")]),e._v(" 中加入：")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n   // ...\n}\n")])])]),a("h3",{attrs:{id:"开发-layout-vue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开发-layout-vue"}},[e._v("#")]),e._v(" 开发 layout.vue")]),e._v(" "),a("p",[e._v("接下来，我们就可以按照自己想要的布局在 "),a("code",[e._v("layout.vue")]),e._v(" 中开发了。需要用到的组件都写到 "),a("code",[e._v("theme/components")]),e._v(" 下，在 "),a("code",[e._v("layout.vue")]),e._v(" 中引入即可。")]),e._v(" "),a("p",[e._v("例如，我想要我的整体布局分成 "),a("code",[e._v("main")]),e._v("、"),a("code",[e._v("content")]),e._v("、"),a("code",[e._v("footer")]),e._v(" 部分。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("theme\n├── components        // Vue 组件\n│   ├── Header.vue \n│   └── Footer.vue\n\n")])])]),a("p",[e._v("在 "),a("code",[e._v("layout.vue")]),e._v(" 正常引入即可：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<template>\n  <div>\n    <Header />\n    <Content />\n    <Footer />\n  </div>\n</template>\n\n<script>\nimport Header from "../components/Header"\nimport Footer from "../components/Footer"\n\nexport default {\n  components: {\n    Header,\n    Footer\n  }\n};\n<\/script>\n')])])]),a("p",[e._v("写好后， 运行 "),a("code",[e._v("npm run docs:dev")]),e._v(" 即可看见你的页面。接下来就像写一个正常的 "),a("code",[e._v("vue")]),e._v(" 项目一样，开始写你自己的博客主题了。")]),e._v(" "),a("h3",{attrs:{id:"将第三方-ui-集成到主题中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#将第三方-ui-集成到主题中"}},[e._v("#")]),e._v(" 将第三方 UI 集成到主题中")]),e._v(" "),a("p",[e._v("这里以开发顶部导航栏为例，示范安装第三方库 "),a("code",[e._v("element-ui")]),e._v(" 及使用。")]),e._v(" "),a("p",[e._v("cd 到 theme 目录下，运行命令安装："),a("code",[e._v("npm i element-ui -S")]),e._v("。")]),e._v(" "),a("p",[e._v("这里推荐按需引入，需要安装 "),a("code",[e._v("babel-plugin-component")]),e._v("，运行命令安装 :"),a("code",[e._v("npm install babel-plugin-component -D")]),e._v("。")]),e._v(" "),a("p",[e._v("然后，"),a("code",[e._v("theme")]),e._v(" 目录下新建 "),a("code",[e._v(".babelrc")]),e._v(" 并修改为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n  "presets": [["es2015", { "modules": false }]],\n  "plugins": [\n    [\n      "component",\n      {\n        "libraryName": "element-ui",\n        "styleLibraryName": "theme-chalk"\n      }\n    ]\n  ]\n}\n')])])]),a("p",[e._v("接下来，如果你只希望引入部分组件，比如 "),a("code",[e._v("Menu")]),e._v(" ，那么需要在 "),a("code",[e._v("enhanceApp.js")]),e._v(" 中写入以下内容：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import {\n  Menu,\n  Submenu,\n  MenuItem,\n  MenuItemGroup\n} from 'element-ui';\nimport 'element-ui/lib/theme-chalk/index.css';\nexport default ({\n  Vue, // VuePress 正在使用的 Vue 构造函数\n  options, // 附加到根实例的一些选项\n  router, // 当前应用的路由实例\n  siteData // 站点元数据\n}) => {\n  Vue.use(Menu)\n  Vue.use(Submenu)\n  Vue.use(MenuItem)\n  Vue.use(MenuItemGroup)\n}\n")])])]),a("p",[e._v("以上步骤安装好之后，就可以在组件中使用，方法和普通的 "),a("code",[e._v("vue")]),e._v(" 项目一样。")]),e._v(" "),a("h3",{attrs:{id:"使用vuepress-官方插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用vuepress-官方插件"}},[e._v("#")]),e._v(" 使用vuepress 官方插件")]),e._v(" "),a("p",[e._v("这里以开发顶部导航栏为例，示范安装插件 "),a("code",[e._v("search")]),e._v(" 框及使用。插件的安装在 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/zh/plugin/official/plugin-search.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("官方文档"),a("OutboundLink")],1),e._v(" 中已经说明的很清楚，这里示范一下。")]),e._v(" "),a("h4",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[e._v("#")]),e._v(" 安装")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("yarn add -D @vuepress/plugin-search\n# OR npm install -D @vuepress/plugin-search\n")])])]),a("h4",{attrs:{id:"配置插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置插件"}},[e._v("#")]),e._v(" 配置插件")]),e._v(" "),a("p",[e._v("在 "),a("code",[e._v(".vuepress/config.js")]),e._v(" 中：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// .vuepress/config.js or themePath/index.js\nmodule.exports = {\n  plugins: [\n    ['@vuepress/search', {\n      searchMaxSuggestions: 10\n    }]\n  ]\n}\n")])])]),a("h4",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[e._v("#")]),e._v(" 使用")]),e._v(" "),a("p",[a("code",[e._v("search")]),e._v(" 插件将自动注入指向搜索组件的 "),a("code",[e._v("webpack")]),e._v(" 别名 "),a("code",[e._v("@SearchBox")]),e._v("，可以直接在 "),a("code",[e._v("layout")]),e._v(" 组件中使用它：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<template>\n  <div class=\"foo-layout\">\n    <header>\n      <SearchBox/>\n    </header>\n    <main>\n      ...\n    </main>\n  </div>\n</template>\n\n<script>\nimport SearchBox from '@SearchBox'\n\nexport default {\n  components: { SearchBox }\n}\n<\/script>\n")])])]),a("h3",{attrs:{id:"自定义主题需要手动引入markdown样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自定义主题需要手动引入markdown样式"}},[e._v("#")]),e._v(" 自定义主题需要手动引入Markdown样式")]),e._v(" "),a("p",[e._v("在 "),a("code",[e._v("<Content>")]),e._v(" 中显示的Markdown文件是没有任何样式的，这需要我们自己写一个Markdown样式，但是这样真的太费力气。我们不如去找一份自己喜欢的样式。于是在 "),a("code",[e._v("typora")]),e._v(" 上找到一份主题 "),a("a",{attrs:{href:"http://theme.typora.io/theme/Maize/",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("Maize")]),a("OutboundLink")],1),e._v("，添加到 "),a("code",[e._v("style")]),e._v(" 文件夹下并引入后效果对比：")]),e._v(" "),a("blockquote",[a("p",[a("code",[e._v("vuepress")]),e._v(" 自定义主题时，帮我们去掉了所有 "),a("code",[e._v("Markdown")]),e._v(" 相关的样式。所以 "),a("code",[e._v("Markdown样式")]),e._v(" 需要自己引入。")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cec868e280940018ddf93f2c014e82c~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),a("p",[e._v("引入后可以显示样式，确实好看了很多：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39fe1bab554e496fbd9684d42e5e61fc~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"如何进行页面路由跳转"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何进行页面路由跳转"}},[e._v("#")]),e._v(" 如何进行页面路由跳转")]),e._v(" "),a("p",[e._v("关于页面间路由跳转，这个点应该是大多数同学放弃的原因。要踩的坑真的巨大，其实是这样的：在你的文档下 "),a("code",[e._v("README.md")]),e._v(" 是默认的页面，那么我们就需要思考其他 "),a("code",[e._v("md")]),e._v(" 文件该如何去显示。")]),e._v(" "),a("p",[e._v("官方的文档中是这样子的：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b8a414353924b1383ee03dd01c98d6c~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),a("p",[e._v("也就是说当我们想要进入 "),a("code",[e._v("非README.md")]),e._v(" 的文件时，以 "),a("code",[e._v("config.md")]),e._v(" 为例，我们需要跳转到 "),a("code",[e._v("/guide/config.md")]),e._v("，前提是你知道 "),a("code",[e._v("README.md")]),e._v("的路径是"),a("code",[e._v("/guide/")]),e._v("。那这就好办了，"),a("code",[e._v("vuepress")]),e._v(" 对于 "),a("code",[e._v("$router")]),e._v(" 是支持的，就是说我们可以直接使用 "),a("code",[e._v("vue")]),e._v(" 的路由跳转，不同是我们不用再去写"),a("code",[e._v("router.js")]),e._v(" 文件规划路由。")]),e._v(" "),a("p",[e._v("那么用 "),a("code",[e._v("this.$router.push('/guide/config.md')")]),e._v(" 即可跳转到其他文件的页面。")]),e._v(" "),a("p",[e._v("上述的路径则通过 "),a("code",[e._v("this.$site.pages")]),e._v(" 可以获取，具体每个页面的内容可以通过 "),a("code",[e._v("this.$page")]),e._v(" 获取。")]),e._v(" "),a("p",[e._v("由于默认进入的是文件夹下 "),a("code",[e._v("README.md")]),e._v(" 设置的 "),a("code",[e._v("layout")]),e._v(" 布局，想要在这个布局里获取其他文件的信息，只能够 "),a("code",[e._v("Front Matter")]),e._v(" 通过透传，如下所示：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("---\nlayout: RecordLayout\ndescription: '这里有一些技巧，可以帮助你更好地优化 JavaScript 代码，从而提高性能。'\n---\n")])])]),a("blockquote",[a("p",[e._v("在 "),a("code",[e._v("非README.md")]),e._v(" 中的 "),a("code",[e._v("Front Matter")]),e._v(" 输入信息，然后在 "),a("code",[e._v("README.md")]),e._v(" 设置的布局中的 "),a("code",[e._v("frontmatter")]),e._v(" 对象拿到信息。")])]),e._v(" "),a("h3",{attrs:{id:"更换-favicon-icon"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更换-favicon-icon"}},[e._v("#")]),e._v(" 更换 "),a("code",[e._v("favicon.icon")])]),e._v(" "),a("p",[e._v("在 "),a("code",[e._v("config.js")]),e._v(" 中添加以下代码，并在 "),a("code",[e._v("public")]),e._v(" 文件夹中添加 "),a("code",[e._v("favicon.ico")]),e._v(" 图标，注意这里不要使用其他格式的图片，否则会显示不出来。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("\n  head: [\n    ['link', { rel: 'shortcut icon', type: \"image/x-icon\", href: \"/favicon.ico\" }]\n  ]\n")])])]),a("h3",{attrs:{id:"文章最后更新时间"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文章最后更新时间"}},[e._v("#")]),e._v(" 文章最后更新时间")]),e._v(" "),a("p",[e._v("如果你使用默认主题，你无需安装本插件，因为 VuePress 的 core 中已经包含此插件。这里需要安装：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm i @vuepress/last-updated\n")])])]),a("ul",[a("li",[e._v("在config.js中添加引入：")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n  plugins: ['@vuepress/last-updated']\n}\n")])])]),a("p",[e._v("关于最新更新时间插件的实现方式，这里有 "),a("a",{attrs:{href:"https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("传送门"),a("OutboundLink")],1),e._v("。")]),e._v(" "),a("h3",{attrs:{id:"简述-components-和-global-components-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简述-components-和-global-components-的区别"}},[e._v("#")]),e._v(" 简述 components 和 global-components 的区别")]),e._v(" "),a("p",[e._v("这里简述一下 "),a("code",[e._v("components")]),e._v(" 和 "),a("code",[e._v("global-components")]),e._v(" 的区别："),a("code",[e._v("components")]),e._v(" 所定义的组件仅在 "),a("code",[e._v("theme")]),e._v(" 下生效，而 "),a("code",[e._v("global-components")]),e._v(" 下定义的组件不仅局限于 "),a("code",[e._v("theme")]),e._v(" 而且在 "),a("code",[e._v("docs")]),e._v(" 目录下的 "),a("code",[e._v("md")]),e._v(" 文件中可以直接使用。")]),e._v(" "),a("p",[e._v("例如，"),a("code",[e._v("docs/README.md")]),e._v(" 中：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# Hello VuePress!\n<ComponentsTest />         // 不显示\n<GlobalComponentsTest />   // 显示\n")])])]),a("h3",{attrs:{id:"一个项目中多个布局"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一个项目中多个布局"}},[e._v("#")]),e._v(" 一个项目中多个布局")]),e._v(" "),a("p",[e._v("如果你的首页和博客页想应用不同主题，需要在 "),a("code",[e._v("theme/layouts")]),e._v(" 下定义多个布局如 "),a("code",[e._v("HomeLayout.vue")]),e._v("，但 "),a("code",[e._v("Layout.vue")]),e._v(" 必须保留。默认会应用 "),a("code",[e._v("Layout.vue")]),e._v(" 布局。那如何使用 "),a("code",[e._v("HomeLayout.vue")]),e._v(" 中的布局呢？")]),e._v(" "),a("p",[e._v("例如，"),a("code",[e._v("docs/README.md")]),e._v(" 中这样写即可：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("---\nlayout: HomeLayout\n---\n# Hello VuePress!\n")])])]),a("h3",{attrs:{id:"如何发布你的主题到npm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何发布你的主题到npm"}},[e._v("#")]),e._v(" 如何发布你的主题到npm")]),e._v(" "),a("p",[e._v("发布主题到"),a("code",[e._v("npm")]),e._v(":")]),e._v(" "),a("ul",[a("li",[e._v("将你的主题推送到 "),a("code",[e._v("github")]),e._v(" 仓库，这里的主题是指 "),a("code",[e._v(".vuepress")]),e._v(" 文件夹下所有内容需要推送到 "),a("code",[e._v("github")]),e._v("。")]),e._v(" "),a("li",[e._v("在 npm 上注册 "),a("code",[e._v("https://www.npmjs.com/")]),e._v("，填入信息并验证邮箱。")]),e._v(" "),a("li",[e._v("进入要发布的项目根目录 "),a("code",[e._v(".vuepress")]),e._v("，初始化为 "),a("code",[e._v("npm")]),e._v(" 包：")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm init\n")])])]),a("ul",[a("li",[e._v("依次按提示填入包名、版本、描述、"),a("code",[e._v("github")]),e._v(" 地址、关键字、license等，你的主题命名可以是 "),a("code",[e._v("vuepress-theme-")]),e._v(" 开头的，这样别人引用时可以简写成 "),a("code",[e._v("vuepress-theme-")]),e._v(" 后面的字段。")]),e._v(" "),a("li",[e._v("在本地登录你的 "),a("code",[e._v("npm")]),e._v(" 账号，并输入账号信息：")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm login\n")])])]),a("ul",[a("li",[e._v("将你的包发布，成功的话就可以在npm上搜索到你发布的包了~")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm publish\n")])])]),a("ul",[a("li",[e._v("这样就可以搜索到我的主题 "),a("code",[e._v("vuepress-theme-mount")]),e._v(" ：\n"),a("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c633d5bbad554de4b97e81ca9f560c77~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})])]),e._v(" "),a("h3",{attrs:{id:"如何使用自定义主题-以-vuepress-theme-mount-为例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何使用自定义主题-以-vuepress-theme-mount-为例"}},[e._v("#")]),e._v(" 如何使用自定义主题，以 "),a("code",[e._v("vuepress-theme-mount")]),e._v(" 为例")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("在本地新建文件夹 "),a("code",[e._v("vuepress-starter")]),e._v("，包含以下目录结构：\n"),a("img",{attrs:{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42f5baaaac694f0098013cae237b8812~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})])]),e._v(" "),a("li",[a("p",[e._v("在目录下安装包：")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("npm init\nnpm i vuepress-theme-mount\n")])])]),a("ul",[a("li",[e._v("在config.js中输入：")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// .vuepress/config.js\nmodule.exports = {\n  theme: 'mount'  // or 'vuepress-theme-mount'\n}\n")])])]),a("ul",[a("li",[e._v("在 package.json 中加入，并使用命令 "),a("code",[e._v("vuepress dev docs")]),e._v(" 运行项目，即可打开你的博客。")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n  "scripts": {\n    "docs:dev": "vuepress dev docs",\n    "docs:build": "vuepress build docs"\n  }\n}\n')])])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),a("p",[e._v("如果不是像我一样想尝试 "),a("code",[e._v("vuepress")]),e._v(" 搭建博客，建议还是使用成熟的博客系统，因为 "),a("code",[e._v("vuepress")]),e._v(" 真的不是很适合用来搭建博客系统，需要踩的坑非常多，比如关于路由跳转的问题文档没有明确说明。如果还有其他关于自定义主题的问题可以留言。")]),e._v(" "),a("p",[e._v("最后，踩坑不易，欢迎鼓励。")])])}),[],!1,null,null,null);t.default=v.exports}}]);