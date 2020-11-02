module.exports = {
  title: 'vue-demo-collection',
  description: 'A documentation of the excellent components encountered in VUE development',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/base/' },
      { text: 'Github', link: 'https://github.com/Gesj-yean/vue-demo-collection' },
    ],
    sidebar: [
      {
        title: '组件',   // 必要的
        path: '/base/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/base/breadcrumb', '面包屑'],
          ['/base/dialog', '对话框'],
          ['/base/line-text', 'flex实现中间文字，两边横线（1px）'],
          ['/base/pagination', '分页器'],
          ['/base/slider', 'better-scroll实现轮播图组件'],
          ['/base/scroll', '移动端scroll组件的抽象及应用'],
          ['/base/tree', '理解Vue递归组件，实现Tree树形控件实例~'],
          ['/base/star', 'Vue评分组件'],
        ]
      },
    ]
  }
}