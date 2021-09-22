# 基本知识：Flow

## 静态类型检查工具 Flow

`Javascript` 是动态类型语言。静态类型语言 vs 动态类型语言：静态类型语言（statically-typed languages）会在编译时（compile time）进行类型检查，而动态语言（dynamically-typed）则是在运行时进行类型检查（runtime）。

什么是类型检查？

类型检查会强制确保你的变量类型和定义时的类型相符合。静态类型检查会在编译时就检查你的类型是否正确，如果不正确则始终通不过编译。而动态类型检查是在程序运行了一次时才会发现错误，也就是说有错误也可以通过编译。

用什么工具检查？

`Flow` 和 `Typescript` 。对于 `Flow` 需要在文件头部加入 `@flow`，对于 `Typescript` 需要将文件后缀有由 `.js` 改成 `.ts``。Flow` 是检查库，而 `Typescript` 是编译器。

## 使用 Flow

我选择基于 `npm + babel` 来 [安装 Flow](https://flow.org/en/docs/install/)。

第一步需要安装 `babel` 的一些包： `@babel/core` `@babel/cli` `@babel/preset-flow`。因为 `JavaScript` 是不支持 `Flow` 语法的，所以在编译时需要使用 `@babel/preset-flow` 把这些 `Flow` 代码去除。

```
npm install --save-dev @babel/core @babel/cli @babel/preset-flow
```
接着修改 `.babelrc` 文件，添加代码：

```
{
  "presets": ["@babel/preset-flow"]
}
```
第二步安装 `Flow`，`--save-dev` 可以保证只在开发环境下使用 `Flow` 来检查你的代码：
```
npm install --save-dev flow-bin
```

添加 `Flow script` 到 `package.json`：
```
{
  "name": "my-flow-project",
  "version": "1.0.0",
  "devDependencies": {
    "flow-bin": "^0.160.0"
  },
  "scripts": {
    "flow": "flow"
  }
}
```
在项目下运行命令来初始化 `Flow` ，生成配置文件 `.flowconfig`。关于配置文件的文档，可以查看 [如何配置 Flow](https://flow.org/en/docs/config/)。

```
npm run flow init
```

```
[ignore] // 忽略检查的文件

[include] // 需要检查的文件

[libs] // 库定义，默认在 flow-typed 文件夹下。Vue 配置的是 Flow，表示库定义都在 Flow 文件夹内。

[lints] // 一些代码中不符合规范代码的报错配置

[options] // 一些配置选项

[strict] // 官网没找到说明。。
```
第三步使用 `npm run flow` 就可以运行 `Flow`，查看是否有报错了。
```
npm run flow
```
👇👇👇

No errors!

接下来就可以为自己的代码添加 [类型注释](https://flow.org/en/docs/types/)。

## 参考文档

- [为什么要在javascript中进行静态类型检查.Part1[译]](https://www.jianshu.com/p/bda750e2d15e)
- [Flow 文档](https://flow.org/)
