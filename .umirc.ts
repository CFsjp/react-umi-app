import { defineConfig } from 'umi'
import routes from './config/routes'
import proxy from './config/proxy'
import theme from './config/theme'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dayjs from 'dayjs'

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'


const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

export default defineConfig({
  title: 'demo',
  hash: true, //生成hash文件名
  favicon: '/favicon.png',
  history: {
    //hash路由
    type: 'hash'
  },
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __ONLINE_ENV__: process.env.ONLINE_ENV, // daily, prepub, prod
    __DAILY_ONLINE_ENV__: process.env.ONLINE_ENV === 'daily', // 日常环境
    __PREPUB_ONLINE_ENV__: process.env.ONLINE_ENV === 'prepub', // 预发环境
    __PROD_ONLINE_ENV__: process.env.NODE_ENV === 'prod', // 正式环境
    publishDate: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
    gitVersion: gitRevisionPlugin.version().split('-')[0],
    gitCommit: gitRevisionPlugin.commithash(),
    gitBranch: gitRevisionPlugin.branch(),
  },
  dynamicImport: {
    loading: '@/components/loading'
  },
  fastRefresh: {},
  antd: {
    config: {
      locale: zhCN,
      input: {
        autoComplete: 'off'
      }
    }
  },
  headScripts: [ // js 的 cdn
    // '//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js',
  ],
  styles: [
    // iconfont 的 cdn
    '//at.alicdn.com/t/font_2326520_7fzficvi23x.css',
  ],
  analyze: {
    analyzerPort: 8888
  },
  nodeModulesTransform: {
    type: 'none'
  },
  routes,
  proxy,
  chainWebpack(config: any) {
    config.resolve.modules.merge([
      path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src/pages'),
      path.resolve(__dirname, 'src'),
      'node_modules'
    ])

    if (!isDev) {
      // PWA 当服务器挂了之后，你依然能够访问这个网页
      config.plugin('WorkboxPlugin').use(WorkboxPlugin)
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    }
  },
  alias: {
    pages: 'src/pages',
    components: 'src/components'
  },
  cssLoader: {
    localsConvention: 'camelCase'
  },
  // lessLoader: {
  //   options: {
  //     paths: [path.resolve(__dirname, "~@/styles/_theme.less")]
  //   }
  // },
  theme,
  dva: {
    immer: true,
    hmr: false,
  },
  plugins: []
})
