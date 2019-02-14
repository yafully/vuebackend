/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-12 11:25:04
 * @version $Id$
 */

const glob = require('glob')
let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

/** 获取多页的入口脚本和模板 */
const getPages = (() => {
  const [globPathHtml, globPathJs, pages, tempSet] = [
    ['./src/views/**/*.html', 'template'], // 入口模板正则
    ['./src/views/**/app.js', 'entry'], // 入口脚本正则
    Object.create(null),
    new Set()
  ]
  const getMultiPageConf = (globPath, keyName) => {
    let [fileList, tempArr, modName] = [glob.sync(globPath), [], null]
    if (fileList.length !== 0) {
      for (let entry of fileList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]
        if (tempSet.has(modName)) {
          Object.assign(pages[modName], { [keyName]: entry, 'filename': `${modName}.html` })
        } else {
          Reflect.set(pages, modName, { [keyName]: entry }) && tempSet.add(modName)
        }
      }
      return true
    } else {
      if (keyName === 'template') {
        throw new Error('无法获取多页入口模板')
      } else if (keyName === 'entry') {
        throw new Error('无法获取多页入口脚本')
      } else {
        throw new Error('无法获取多页信息')
      }
    }
  }
  try {
    while (getMultiPageConf(...globPathHtml) && getMultiPageConf(...globPathJs)) return pages
  } catch (err) {
    console.log('获取多页数据错误：', err)
  }
})()
console.log('pages: ', getPages)


module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */

  // 项目部署的基础路径

  // 我们默认假设你的应用将会部署在域名的根部,

  // 例如 https://www.my-app.com/

  // 如果你的应用部署在一个子路径下，那么你需要在这里

  // 指定子路径。比如将你的应用部署在

  // https://www.foobar.com/my-app/

  // 那么将这个值改为 '/my-app/'

  publicPath: "/project", // 构建好的文件输出到哪里

  outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败

  lintOnSave: true,//process.env.NODE_ENV !== 'production', // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only

  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖

  transpileDependencies: [
    /* string or regex */
  ], // 是否为生产环境构建生成sourceMap?

  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
// 构建多页面应用，页面的配置
	pages: getPages,
	// pages: {
	//     index: {
	//         // page 的入口
	//         entry: 'src/index/main.js',
	//         // 模板来源
	//         template: 'public/index.html',
	//         // 在 dist/index.html 的输出
	//         filename: 'index.html',
	//         // 当使用 title 选项时，
	//         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
	//         title: 'Index Page',
	//         // 在这个页面中包含的块，默认情况下会包含
	//         // 提取出来的通用 chunk 和 vendor chunk。
	//         chunks: ['chunk-vendors', 'chunk-common', 'index']
	//     },
	//     // 当使用只有入口的字符串格式时，
	//     // 模板会被推导为 `public/subpage.html`
	//     // 并且如果找不到的话，就回退到 `public/index.html`。
	//     // 输出文件名会被推导为 `subpage.html`。
	//     subpage: 'src/subpage/main.js'
	// },
  //webpack 配置设置自定义路径
  chainWebpack: config => {
  	//路径转义
  	config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  	config.resolve.alias.set('@css', resolve('src/assets/css'))
  	config.resolve.alias.set('@img', resolve('src/assets/images'))
  },

  configureWebpack: () => {}, // CSS 相关选项
  // configureWebpack: (config) => {
  //   config.module.rules.push({ test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
  //       loader: 'file-loader?name=./assets/fonts/[name].[ext]' })
  // },

  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
	//向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
        css: {},
        less: {}
    },
    // 当为true时(会引起element-ui因为font无法编译)，css文件名可省略 module 默认为 false
    modules: false
  },

  parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  pwa: {}, // configure webpack-dev-server behavior

  devServer: {

    disableHostCheck: false,

    https: false,

    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy

    port: 8888, // 本地端口号

    host: 'localhost',

    https: false, // https:{type:Boolean}

    open: true, //配置自动启动浏览器

    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
        '/api': {
            target: 'http://localhost:8888',
            pathRewrite: {
                '^/api': '/mock'
            },
            ws: true,
            changeOrigin: true
        }
        // ,
        // '/foo': {
        //     target: '<other_url>'
        // }
    }

    // before: app => {}
  }, // 第三方插件配置

  pluginOptions: {
    // ...
  }
};

