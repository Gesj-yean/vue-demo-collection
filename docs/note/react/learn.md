# React 项目配置

## 创建项目
创建一个 typescript 的 react 项目：
```
create-react-app jira --template typescript
```

## 安装 Prettier

Prettier 文档：https://prettier.io/docs/en/install.html
安装：
```
npm install --save-dev --save-exact prettier
```
创建配置文件和 ignore 文件：
```
echo {}> .prettierrc.json
echo {}> .prettierignore
```
默认安装了 eslint，但是它与 prettier 有冲突，需要安装 eslint-config-prettier
```
npm install --save-dev eslint-config-prettier
```
安装好后修改 package.json，保证不会有冲突:
```js
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
    "prettier"
  ]
},
```
## 配置 Git hooks

### commit 之前格式化代码

git commit时触发pre-commit钩子，运行lint-staged命令，对*.js执行eslint命令。
```
npx mrm@2 lint-staged
```
运行完成后在 package.json 中会有👇，但是我们还需要加上 ts, tsx
```
"lint-staged": {
  "*.{js,css,md,ts,tsx}": "prettier --write" // *.{js,css,md}
}
```
还会生成 .husky 文件夹和 pre-commit hook。这样在 commit 时候就会自动执行格式化。
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 规范 commit msg

安装 commitlint： https://github.com/conventional-changelog/commitlint
```
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
```
# Add hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
遵循的提交规则：https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional

## Mock 方案
本地 node 服务器：json-server:https://github.com/typicode/json-server/
```
npm install -g json-server
```

创建一个 mock 文件夹，并创建 db.json 文件。

在 package.json 中 script 加入 “json-server: json-server mock/db.json --watch”

然后就可以使用命令行： npm run json-server

