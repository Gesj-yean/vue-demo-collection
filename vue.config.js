module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        base: '@/base',
        common: '@/common',
        components: '@/components',
        views: '@/views'
      }
    }
  },
  devServer: {
    port: 9000
  }
}
