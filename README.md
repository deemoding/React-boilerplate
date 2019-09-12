React脚手架
========

# Feature:

* 支持 `eslint` ，预置一些规则

* 配置了 `babel7` 及其他配置

* 真正的 `antd` 按需加载

* 预置 `webpack` 配置（包括开发和生产环境配置），包括了几个
常用的loader，terser

* 支持 `HMR`

* 使用2空格缩进

* git commit 使用 [AngularJS commit conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

* 使用 `husky` 保证提交都必须通过 `eslint` 和 `commit` 检查

* 支持 `less` + `css module`

* 支持一键生成Changelog

* 支持自动打开浏览器窗口

# 使用方法

## 预览本示例项目

```bash
  npm i
  npm start
```

## 开始项目

```bash
git clone https://github.com/deemoding/React-boilerplate
cd React-boilerplate
rm -rf .git
git init
npm i
```

记得修改 `package.json` 内的初始化信息

如果你不需要markdown预览组件，请自己 `npm remove showdown`

## 提交代码

```bash
  git add $yourfile
  npm run cz
```

## 生成changelog

```bash
  npm run changelog
```

## 使用husky

husky已经预先设置了常用的hook。原理：安装husky后，它在`.git`目录下生成一些`hook script`，当满足条件（比如pre-commit），它会查找`.huskyrc`内是否包含对应的配置，如果有就执行。本脚手架的强制eslint和
commit message检查就是这样实现的。因此，想自定义hook，可以自己在
`.huskyrc`内添加就可以了。

# 注意

1. 如果你使用antd的话，必须保留 `src/antd/icon.js` 。如果你需要使用图标库，请参照样例添加需要的图标

2. 升级到`1.7.0`后，要先移除`.eslintcache`，然后重新`npm run lint:fix`。如果报告如下错误

```bash
TypeError: Cannot read property 'range' of null
```

则进行[如下尝试](https://github.com/babel/babel-eslint/issues/530#issuecomment-447511293)

3. `showdown`依赖低版本的`mem`，不需要md预览功能的，移除`showdown`即可解决安全警告

4. `momentjs`太大了？罪魁祸首是[这个](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/index.tsx#L3)
