module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'LCL专栏'
        return args
      })

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
