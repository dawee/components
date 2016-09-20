module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3005,
  url: {
    up: process.env.UP_URL || 'https://up-staging.coorpacademy.com',
    store: process.env.STORE_URL || 'https://store-staging.coorpacademy.com',
    api: process.env.API_URL || 'https://catalog-staging.coorpacademy.com'

  },
  log: {
    /** winston log level (transport independant)*/
    level: 'info'
  },
  logmatic: {
    token: 'JVJqtuwxQVqMZvzZgZsP6w',
    name: 'www-static'
  },
  cache: {
    'main.strategy': {
      priority: 1, // lower is more important
      rules: [
        {
          method: 'get',
          path: '.*',
          cache: {
            proxy: 'public',
            unit: 'second',
            duration: process.env.CACHE_CONTROL || 0
          }

        }
      ]
    }
  }
};
