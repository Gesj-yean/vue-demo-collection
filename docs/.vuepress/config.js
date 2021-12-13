module.exports = {
  title: 'Vue-Demo-Collection',
  base: '/vue-demo-collection/',
  description: 'A documentation of the excellent components encountered in VUE development',
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/base/' },
      { text: '博客', link: '/blog/' },
      { text: '笔记', link: '/note/' },
      { text: '随笔', link: '/essays/' },
      { text: 'Github', link: 'https://github.com/Gesj-yean/vue-demo-collection' },
    ],
    sidebar: {
      '/base/': [
        {
          title: 'Vue 组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/breadcrumb', '面包屑 Breadcrumb'],
            ['/base/dialog', '对话框 Dialog'],
            ['/base/pagination', '分页器 Pagination'],
            ['/base/slider', '轮播图 Slider'],
            ['/base/scroll', '无滚动条组件 Scroll'],
            ['/base/tree', '树形控件 Tree (Vue递归组件)'],
            ['/base/star', '评分组件 Rating'],
            ['/base/banner', '横向滚动通知栏 Banner'],
            ['/base/price-input', '表单金额输入框（element-ui）PriceInput'],
            ['/base/cascader', '级联选择器（element-ui）Cascader'],
            ['/base/loading-btn', '加载按钮 LoadingButton'],
            ['/base/table-pagination', '表格-分页器 TablePagination'],
          ]
        },
        {
          title: 'Vue 指令',   // 必要的
          path: '/base/directive',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/directive/expandClick', '元素点击范围扩展指令 v-expandClick'],
            ['/base/directive/ellipsis', '文字超出省略 v-ellipsis'],
            ['/base/directive/tooltip', '元素说明指令 v-tooltip'],
            ['/base/directive/copy', '文本内容复制指令 v-copy'],
            ['/base/directive/screenfull', '元素全屏指令 v-screenfull'],
            ['/base/directive/backtop', '回到顶部指令 v-backtop'],
            ['/base/directive/empty', '空状态指令 v-empty'],
            ['/base/directive/badge', '徽标指令 v-badge'],
          ]
        },
        {
          title: 'CSS 相关组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/line-text', 'flex实现中间文字，两边横线（1px）'],
            ['/base/css-style', '结合《CSS揭秘》整理的可实用代码笔记']
          ]
        },
        {
          title: 'Echarts 相关组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/tooltip', 'Tooltip 进阶之交互']
          ]
        },

      ],
      '/blog/': [
        {
          title: '博客',
          path: '/blog/',
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/blog/ECMAScript2021', 'ECMAScript 2021新特性'],
            ['/blog/page-exit-block', 'Vue 拦截离开页面操作'],
            ['/blog/edit-svg', '实现Vue 中可编辑的 SVG  Icon 组件'],
            ['/blog/encapsulate-components', '前端如何修改组件库源码来封装符合自己需求的组件？'],
            ['/blog/table-checkbox-show-tooltip', 'element-ui 多选表格，当复选框禁用，鼠标覆盖显示 tooltip']
          ]
        },
      ],
      '/note/': [{
        title: '笔记',
        path: '/note/',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          ['/note/browser-compatibility', '浏览器兼容性记录2021-04-21 '],
          ['/note/custom-vuepress', 'VuePress 之自定义主题'],
          ['/note/new-begin', '前端装机必备教程'],
        ]
      }, {
        title: 'Vue2 源码学习',
        path: '/note/vue2/',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          ['/note/vue2/part1-start', 'part1 - 基本知识：Flow'],
          ['/note/vue2/part2-build', 'part2 - Vue + Rollup 构建过程'],
          ['/note/vue2/part3-entry', 'part3 - Vue.js 入口文件分析']
        ]
      }, {
        title: 'Javascript 高级程序设计',
        path: '/note/js/',
        collapsable: true,
        sidebarDepth: 0,
        children: [
          ['/note/js/garbage-collection', '垃圾回收'],
          ['/note/js/map', 'Map'],
        ]
      }],

      '/essays/': [{
        title: '随笔',
        path: '/essays/',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
        ]
      },]
    }
  }
}