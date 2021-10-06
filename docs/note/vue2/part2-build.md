# Vue.js + Rollup 构建

> 此部分为 `Vue.js` 源码学习过程中的总结，建议对照源码中 `scripts/build.js` 一起看~

当你输入 `npm run build` 命令， `Vue.js` 构建过程就会从运行 `"build": "node scripts/build.js"` 开始，它的入口为 `scripts/build.js` 文件。我们一起从 `build.js` 开始分析，点这里打开源码 [build.js](https://github.com/vuejs/vue/blob/dev/scripts/build.js) 。


## build.js

在看文件的源码时建议先去看引入了哪些模块，有个印象，然后读代码时会更快的理解。

首先在 `build.js` 文件的开头来看看引入了哪些变量。
```js
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const terser = require('terser')
```
`fs` 是 node.js 中的文件系统；`path` 模块提供了用于处理文件和目录的路径的实用工具；`zlib` 模块提供了使用 Gzip、Deflate/Inflate、以及 Brotli 实现的压缩功能；`Rollup` 是一个 JavaScript 模块打包器；`Terser` 用于压缩生产环境下的输出结果。


```js
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}
```
接着，执行了上述代码，判断了是否存在 `dist` 目录，如果不存在就创建一个 `dist` 目录。之后是获取打包的资源：

```js
let builds = require('./config').getAllBuilds()
```
`getAllBuilds` 是 `config.js` 文件的方法，目的是输出所有 `build` 键值对对应的数组，数组中的每个对象是 `rollup` 构建时需要的参数对象。也就是说 `builds` 获得了全部情况下打包对象的数组合集。具体对象的内容在下文 `config.js` 中有描述，先不多说啦。

在获取到全部构建信息后，就可以根据你输入的命令来判断该生成什么样的打包文件。

**这里先了解一些预备知识**：`process` 对象提供有关当前 Node.js 进程的信息并对其进行控制。`process.argv` 属性返回数组，其中包含启动 `Node.js` 进程时传入的命令行参数。 第一个元素将是 `process.execPath`。第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

再来看看下面的代码：
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

**也就是说当我们执行 `npm run build` 走的是 `else` 中的逻辑，会帮我们过滤掉 weex 的打包，不会生成 weex 的打包文件。当我们执行 `build:ssr` 或 `build:weex` 的话，实际在 `package.json` 中执行的是 npm run build -- web-runtime-cjs,web-server-renderer 和 npm run build -- weex，就会走 `if` 中的逻辑，得到 ssr 或 weex 的 rollup 打包信息数组。**


最终获得的 `builds` 数组信息格式如下👇：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63aa952163af4c4888d4da7e21934dcc~tplv-k3u1fbpfcp-watermark.image?)

先记住上面 `build` 对象中包含了 **input、external、plugins、output（file、format、banner、name）、onwarn** 这些信息。接下来就轮到 `Rollup` 上场开始逐一打包构建的过程 👇。

`build` 依次调用了 `buildEntry` 方法，`buildEntry` 方法中使用了 `rollup.rollup API`。
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
```

看上面的 `buildEntry` 方法，[rollup.rollup](https://www.rollupjs.com/guide/javascript-api) 函数返回一个 `Promise`，它解析了一个 `bundle` 对象，再调用 `bundle.generate` 生成 `code`（code 是一个对象，文件名为 key， 源码为 value）如果是生产环境，会交给 `terser.minify()` 获得压缩后的代码。

内部还调用了 write、getSize、logError、blue 等一些其他方法：

```js
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
`write` 方法接受三个参数：目标文件 dest，内容 code，开启压缩 zip。`fs.writeFile` 异步地将数据写入文件，如果文件已经存在，则替换该文件。其中还定义了一些方法便于查看 `log` 信息，`getSize` 和 `blue` 会在运行命令时的控制台打印出蓝色的 log 日志。

到这里整体的构建执行过程就分析好了，在控制台就可看到输出了蓝色打包文件的日志👌。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6eb5a710ce94fb49847e2ee412043ed~tplv-k3u1fbpfcp-watermark.image?)

那么打包时具体的入口文件和打包后生成的文件是什么呢？这里就要来看 `config.js` 的内容。
## config.js

可以先点这里打开 [config.js](https://github.com/vuejs/vue/blob/dev/scripts/config.js) 源码。 `builds` 数组定义了多个键值对包含入口文件 `entry`、输出文件 `dest`、输出格式 `format`、输出文件头部信息 `banner` 等，**`genConfig` 方法负责将这些信息转化成 `rollup` 需要的格式**。贴一个文件格式的区别：

-   `amd` – 异步模块定义，用于像RequireJS这样的模块加载器
-   `cjs` – CommonJS，适用于 Node 和 Browserify/Webpack
-   `esm` – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入
-   `iife` – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
-   `umd` – 通用模块定义，以`amd`，`cjs` 和 `iife` 为一体
-   `system` - SystemJS 加载器格式

`config.js` 的文件开头引入了一些关于 `rollup` 的 `plugin`，了解一下这些 `rollup plugin` 的作用：
```js
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')
```
- **rollup-plugin-buble** 是 rollup 的 ES6 编译插件，功能如同简化版 babel；
- **rollup-plugin-alias** 用于配置别名；
- **rollup-plugin-commonjs** 转化 CommonJS 到 ES6；
- **rollup-plugin-replace** 替换文件中的目标字符；
- **rollup-plugin-node-resolve** 配合 **rollup-plugin-commonjs** 解析第三方模块；
- **rollup-plugin-flow-no-whitespace** 清除 flow 语法，防止打包报错。

我们从 👆 build 中举一个 `Runtime only` 打包信息的例子看看，对比一下 vue.js 中定义的打包信息和 rollup 中需要的打包信息：

`vue.js` 定义的内容：
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
`rollup` 接收的内容：

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
```
可以看到 `genConfig` 方法做了一些格式的转化。而除了转化格式之外，还添加了一些环境变量 👇。
```js
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

## Runtime only 和 Runtime + compiler

回过头来再看 `Vue.js` 中定义的具体的打包信息。在 `config.js` 的 `build` 模式中定义了多种构建的入口文件。其中最多的入口文件是 **`web/entry-runtime-with-compiler.js`（Runtime+compiler）** 和 **`web/entry-runtime.js`（Runtime only 使用）**。

那么 `Runtime only` 和 `Runtime + compiler` 是什么呢？

整体来说，`Runtime + compiler` 模式的流程是 template -> ast -> render -> vdom -> UI，而 `Runtime only` 模式的流程只有 render -> vdom -> UI。


```js
// 这种情况需要 compiler
new Vue({
    template:'<div>{{ h }}</div>'
})
// 这种情况不需要 compiler，用 Runtime only
new Vue({
    render (h) {
        return b('div', this.h) 
    }
})
```


它们区别在于 `Runtime + compiler` 是包含编译过程的，把编译代码放在运行时做。`Runtime only` 需要结合 `vue-template-compiler` 事先将模版编译成 `render` 函数再执行（👇 下面的源码可以看出）。
因为缺少一些编译过程，`Runtime only` 运行起来会更快一些。

`vue-cli` 默认也采用了 `only` 的方式，在 `main.js` 中生成的代码就可以体现，另外 `package.json` 中也帮我们安装了 `vue-template-complier`。

我们来比较 `entry-runtime-with-compiler.js` 和 `entry-runtime.js` 这两个文件，他们都从 `/runtime/index` import 了相同的 Vue，而 complier 多做了一些处理。

`entry-runtime-with-compiler.js`的内容：
```js
/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index' // warn可以发出[Vue warn]: 警告信息。cached是创建一个纯函数方法的缓存。
import { mark, measure } from 'core/util/perf' // 浏览器性能相关：创建时间戳和测量(measure)。

import Vue from './runtime/index'
import { query } from './util/index' // 查询元素，如果是dom元素直接返回。
import { compileToFunctions } from './compiler/index' // 编译模版 parse template -> ast -> optimize -> generate -> render
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat' // 检查当前环境是否需要对字符进行编码

const idToTemplate = cached(id => {
  const el = query(id) // 根据选择器查询元素
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function ( // Vue.prototype.$mount 返回一个 Component。
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  // 判断挂在的元素是否为 html 或 body，发出警告。
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  // 将 template/el 转化成 render 函数
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    // 获取完成 template 序列化后的 HTML 片段。
    if (template) {
      /* istanbul ignore if */
      // 打一个名为 compile 的时间戳。
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      // 解析 template 获得 render
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      // 获取整个编译过程的性能
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 * 获取描述元素（包括其后代）的序列化HTML片段，例如'<div id="d"><p>Content</p><p>Further Elaborated</p></div>'。
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions // 获得 {ast, render, staticRenderFns}

export default Vue
```
`entry-runtime.js` 只有这些内容：
```js
/* @flow */

import Vue from './runtime/index'

export default Vue
```

详细的编译过程可以去 `/src/util/compat` 文件下看 `compileToFunctions` 方法的实现。大致的过程是从 `parse template` -> `ast` -> `optimize` -> `generate` -> `render`。

## 总结
`Vue.js + Rollup` 的构建流程就是这样啦，主要定义了一些入口文件和出口文件信息，以及判断了在不同环境下模块的打包方式。需要弄清楚的是 `Runtime only` 和 `Runtime + compiler` 方式的不同。

因为最近在看 `Vue.js` 的源码，所有学习过程中的笔记和总结都会记录在我的 [GitHub](https://github.com/Gesj-yean/vue-demo-collection) 中，感谢关注。

## 参考文档

- [**Node.js 中文网**](http://nodejs.cn/api/process.html)
- [**rollup.js 中文文档**](https://www.rollupjs.com/)