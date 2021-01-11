module.exports = {
  title: 'Vue-Demo-Collection',
  description: 'A documentation of the excellent components encountered in VUE development',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/base/' },
      { text: '博客', link: '/blog/' },
      { text: 'Github', link: 'https://github.com/Gesj-yean/vue-demo-collection' },
    ],
    sidebar: {
      '/base/':[
        {
          title: 'Vue 组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
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
          ]
        },
        {
          title: 'CSS 相关组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/base/line-text', 'flex实现中间文字，两边横线（1px）'],
            ['/base/css-style', '结合《CSS揭秘》整理的可实用代码笔记']
          ]
        },
        {
          title: 'Echarts 相关组件',   // 必要的
          path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
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
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['/blog/ECMAScript2021', 'ECMAScript 2021新特性'],
            ['/blog/custom-vuepress','VuePress 之自定义主题'],
            ['/blog/edit-svg','实现Vue 中可编辑的 SVG  Icon 组件']
          ]
        },
      ]
    }
  }
}