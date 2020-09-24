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
        sidebarDepth: 2,    // 可选的, 默认值是 1
        children: [
          ['/base/breadcrumb/breadcrumb', '面包屑']
          // ['/base/dialog/dialog', '对话框']
        ]
      },
    ]
  }
}