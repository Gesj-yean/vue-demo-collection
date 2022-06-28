module.exports = {
  title: 'Vue-Demo-Collection',
  base: '/vue-demo-collection/',
  description: 'A documentation of the excellent components encountered in VUE development',
  themeConfig: {
    lastUpdated: '上次更新',
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/base/' },
      { text: '笔记', link: '/note/' },
      { text: '随笔', link: '/essays/' },
      { text: 'Github', link: 'https://github.com/Gesj-yean/vue-demo-collection' },
    ],
    sidebar: {
      '/base/': [
        {
          title: 'Vue 组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/component/breadcrumb', '面包屑 Breadcrumb'],
            ['/base/component/dialog', '对话框 Dialog'],
            ['/base/component/pagination', '分页器 Pagination'],
            ['/base/component/slider', '轮播图 Slider'],
            ['/base/component/scroll', '无滚动条组件 Scroll'],
            ['/base/component/tree', '树形控件 Tree (Vue递归组件)'],
            ['/base/component/star', '评分组件 Rating'],
            ['/base/component/banner', '横向滚动通知栏 Banner'],
            ['/base/component/price-input', '表单金额输入框（element-ui）PriceInput'],
            ['/base/component/cascader', '级联选择器（element-ui）Cascader'],
            ['/base/component/loading-btn', '加载按钮 LoadingButton'],
            ['/base/component/table-pagination', '表格-分页器 TablePagination'],
          ]
        },
        {
          title: 'Vue 指令',   // 必要的
          path: '/base/directive',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true
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
          title: 'Echarts ',   // 必要的
          path: '/base/echart',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/echart/tooltip', 'Tooltip 进阶之交互'],
            ['/base/echart/markline', 'Markline 添加时间阶段标注']
          ]
        },
        // {
        //   title: 'CSS 相关组件',   // 必要的
        //   path: '/base/css',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //   collapsable: true, // 可选的, 默认值是 true,
        //   sidebarDepth: 0,    // 可选的, 默认值是 1
        //   children: [
        //     ['/base/css/line-text', 'flex实现中间文字，两边横线（1px）'],
        //     ['/base/css/css-style', '结合《CSS揭秘》整理的可实用代码笔记']
        //   ]
        // },
      ],
      '/note/': [{
        title: 'Vue2 源码学习',
        path: '/note/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          ['/note/vue2/part1-start', 'part1 - 基本知识：Flow'],
          ['/note/vue2/part2-build', 'part2 - Vue + Rollup 构建过程'],
          ['/note/vue2/part3-entry', 'part3 - Vue.js 入口文件分析'],
          ['/note/vue2/part3-observe', 'part3 - Vue.js 响应式系统依赖收集过程分析'],
        ]
      }, {
        title: 'Javascript 高级程序设计',
        path: '/note/js/',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          ['/note/js/garbage-collection', '垃圾回收'],
          ['/note/js/map', 'Map'],
          ['/note/js/set', 'Set'],
        ]
      }, {
        title: 'React 学习',
        path: '/note/react/',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          ['/note/react/hook', 'React Hook 学习'],
          ['/note/react/learn', 'React 项目配置'],
        ]
      }],

      '/essays/': [{
        title: '随笔',
        path: '/essays/',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          ['/essays/other/browser-compatibility', '浏览器兼容性记录2021-04-21 '],
          ['/essays/other/new-begin', '前端装机必备教程'],
          ['/essays/other/encapsulate-components', '前端如何修改组件库源码来封装符合自己需求的组件？'],
          ['/essays/other/2021', '2021 年终总结'],
        ]
      }, {
        title: '其他',
        path: '/essays/blog',
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          ['/essays/blog/line-text', 'CSS: flex 实现中间文字，两边横线（1px）'],
          ['/essays/blog/css-style', 'CSS: 《CSS揭秘》可实用代码笔记'],
          ['/essays/blog/ECMAScript2021', 'ECMAScript 2021新特性'],
          ['/essays/blog/table-checkbox-show-tooltip', 'Element-ui: 多选表格，当复选框禁用，鼠标覆盖显示 tooltip'],
          ['/essays/blog/page-exit-block', 'Vue 拦截离开页面操作'],
          ['/essays/blog/edit-svg', 'Vue 中可编辑的 SVG  Icon 组件'],
          ['/essays/blog/custom-vuepress', 'VuePress 之自定义主题'],
        ]
      }]
    }
  }
}