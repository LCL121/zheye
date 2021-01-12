module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.module
        .rule('eslint')
        .use('eslint-loader')
        .loader('eslint-loader')
        .tap(options => {
          options.fix = true
          return options
        })
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
