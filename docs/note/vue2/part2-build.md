# Vue + Rollup 构建过程

`Vue` 构建过程从运行 `"build": "node scripts/build.js"` 开始，入口为 `scripts/build.js` 文件。

## build.js

那么从 `build.js` 开始分析：

首先是引入变量，`fs` 是 node.js 中的文件系统；`path` 模块提供了用于处理文件和目录的路径的实用工具；`zlib` 模块提供了使用 Gzip、Deflate/Inflate、以及 Brotli 实现的压缩功能；`Rollup` 是一个 JavaScript 模块打包器；`Terser` 压缩生产环境下的输出结果。

```js
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const terser = require('terser')
```

判断是否存在 `dist` 目录，如果不存在就创建一个 `dist` 目录。
```js
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}
```
`getAllBuilds` 是 `config.js` 文件的方法，目的是输出所有 `build` 键值对应的数组，数组中的每个对象是 `rollup` 构建时需要的参数对象。也就是说 `builds` 获得了全部情况下的打包对象的数组合集。对象的内容可以见下方 `config.js` 的分析。
```js
let builds = require('./config').getAllBuilds()
```

接下来会根据你输入的命令判断该生成什么样的打包文件。

`process` 对象提供有关当前 Node.js 进程的信息并对其进行控制。`process.argv` 属性返回数组，其中包含启动 `Node.js` 进程时传入的命令行参数。 第一个元素将是 `process.execPath`。第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

也就是说当我们执行 `npm run build` 走的是 `else` 中的逻辑，会帮我们过滤掉 weex 的打包，不会生成 weex 的打包文件。当我们执行 `build:ssr` 或 `build:weex` 的话，实际在 `package.json` 中执行的是 npm run build -- web-runtime-cjs,web-server-renderer 和 npm run build -- weex，就会走 `if` 中的逻辑，得到 ssr 或 weex 的 rollup 打包信息数组。

```js
// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}
```
最终获得的 `builds` 数组信息格式如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63aa952163af4c4888d4da7e21934dcc~tplv-k3u1fbpfcp-watermark.image?)

接下来开始根据构建信息逐一打包构建的过程。先记住上面 `build` 对象包含了 **input、external、plugins、output（file、format、banner、name）、onwarn** 信息。
```js
build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}
```
[rollup.rollup](https://www.rollupjs.com/guide/javascript-api) 函数返回一个 `Promise`，它解析了一个 `bundle` 对象，再调用 `bundle.generate` 生成 `code`（code 是一个对象，文件名为 key， 源码为 value）如果是生产环境，会交给 `terser.minify()` 获得压缩后的代码。

`write` 方法接受三个参数：目标文件，内容，开启压缩。`fs.writeFile` 异步地将数据写入文件，如果文件已经存在，则替换该文件。其中还定义了一些方法便于查看 `log` 信息，`getSize` 和 `blue` 会在运行命令时的控制台打印出蓝色的 log 日志。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6eb5a710ce94fb49847e2ee412043ed~tplv-k3u1fbpfcp-watermark.image?)

```js
function buildEntry (config) {
  const output = config.output
  const { file, banner } = output
  const isProd = /(min|prod)\.js$/.test(file)
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      if (isProd) {
        const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
          toplevel: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        return write(file, minified, true)
      } else {
        return write(file, code)
      }
    })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
```
到这里整体的构建执行过程就分析好了。那么打包时具体的入口文件和打包后生成的文件是什么呢？来看 `config.js` 的内容。

## config.js

`builds` 数组定义了多个键值对包含入口文件 `entry`、输出文件 `dest`、输出格式 `format`、输出文件头部信息 `banner` 等，`genConfig` 将这些信息转化成 `rollup` 需要的格式。贴一个文件格式的区别：

-   `amd` – 异步模块定义，用于像RequireJS这样的模块加载器
-   `cjs` – CommonJS，适用于 Node 和 Browserify/Webpack
-   `esm` – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入
-   `iife` – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
-   `umd` – 通用模块定义，以`amd`，`cjs` 和 `iife` 为一体
-   `system` - SystemJS 加载器格式
其中了解一下 `rollup plugin` 的作用：
```
const buble = require('rollup-plugin-buble') // 是 rollup 的 ES6 编译插件，功能如同简化版 babel
const alias = require('rollup-plugin-alias') // 配置别名
const cjs = require('rollup-plugin-commonjs') // 转化 CommonJS 到 ES6
const replace = require('rollup-plugin-replace') // 替换文件中的目标字符串
const node = require('rollup-plugin-node-resolve') // 配合 rollup-plugin-commonjs 解析第三方模块
const flow = require('rollup-plugin-flow-no-whitespace') // 清除 flow 语法，防止打包报错
```
```js
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
}
```
除了转化格式，还添加了一些环境变量。
```js
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}
```
`Vue + Rollup` 的构建流程就是这样啦，主要定义了一些入口文件和出口文件信息，以及判断了在不同环境下模块的打包方式。

## 参考文档

- [**Node.js 中文网**](http://nodejs.cn/api/process.html)
- [**rollup.js 中文文档**](https://www.rollupjs.com/)