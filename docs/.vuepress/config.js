module.exports = {
  title: 'Vue-Demo-Collection',
  description: 'A documentation of the excellent components encountered in VUE development',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/base/' },
      { text: 'Github', link: 'https://github.com/Gesj-yean/vue-demo-collection' },
    ],
    sidebar: [
      {
        title: 'Vue 组件',   // 必要的
        path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/base/breadcrumb', '面包屑 Breadcrumb'],
          ['/base/dialog', '对话框 Dialog'],
          ['/base/pagination', '分页器 Pagination'],
          ['/base/slider', '轮播图 Slider'],
          ['/base/scroll', '无滚动条组件 Scroll'],
          ['/base/tree', '树形控件 Tree (Vue递归组件)'],
          ['/base/star', '评分组件 Rating'],
          ['/base/banner', '横向滚动通知栏 Banner'],
        ]
      },
      {
        title: 'CSS 相关组件',   // 必要的
        path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/base/line-text', 'flex实现中间文字，两边横线（1px）']
        ]
      },
      {
        title: 'Echarts 相关组件',   // 必要的
        path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/base/tooltip', 'Tooltip 进阶之交互']
        ]
      },
    ]
  }
}