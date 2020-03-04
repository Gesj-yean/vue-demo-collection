module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        base: '@/base',
        common: '@/common',
        components: '@/components',
        views: '@/views',
        blogs: '@/blogs'
      }
    }
  },
  devServer: {
    port: 9000
  }
}
