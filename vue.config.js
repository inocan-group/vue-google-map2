module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false)
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  configureWebpack: config => {
    config.devtool = process.env.NODE_ENV === 'production' ? '' : 'source-map'
  },
}
