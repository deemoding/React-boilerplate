React脚手架
========

# Feature:

* 支持eslint，预置一些规则

* 配置了babel，加入antd和lodash的按需加载及其他配置

* 预置webpack配置（包括开发和生产环境配置），包括了几个
常用的loader，uglify，no-console

* 支持HotModule

* 使用2空格缩进

* git commit 使用 [AngularJS commit conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

* 使用githook保证提交都必须通过eslint和commit检查

* 支持一键生成Changelog

# 使用方法

## 预览本示例项目

```bash
  yarn
  yarn start
```

## 开始项目

1. 直接clone本项目，删去`.git`文件夹

1. 修改`package.json`，配置你需要的依赖，修改开源许可证等配置

1. 修改`LICENSE`

1. 去掉默认的`CHANGELOG.md`

1. 初始化项目

  ```bash
    # 必须按顺序执行
    git init
    yarn
  ```

1. 删掉`src`下多余的文件（建议保留`index.jsx`和`index.css`），开始自己的项目

## 提交代码

```bash
  git add $yourfile
  yarn run commit
```

## 生成changelog

```bash
  yarn run changelog
```

## 使用git hook

husky已经预先设置了常用的hook。原理：安装husky后，它在`.git`目录下生成一些`hook script`，当满足条件（比如precommit），它会查找`package.json`内是否包含对应的script，如果有就执行。本脚手架的强制eslint和
commit message检查就是这样实现的。因此，想自定义hook，可以自己在
`package.json`内添加script就可以了。
