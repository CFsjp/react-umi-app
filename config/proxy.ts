const env = {
  dev: 'http://192.168.110.168',
  wd: 'http://192.168.120.45:8080',
  sq: 'http://192.168.120.75:8080'
}

const target = env.dev

const proxy = {
  '/apiCore': {
    target,
    changeOrigin: true
  }
}

export default proxy
