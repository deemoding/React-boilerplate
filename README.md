React脚手架
========

# Feature:

* 支持eslint，预置一些规则

* 预置webpack配置（包括开发和生产环境配置），包括了几个
常用的loader，antd和lodash按需加载，babel，uglify，
no-console

* 支持HotModule

* 使用2空格缩进

* git commit 使用 [AngularJS commit conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

* 使用githook保证提交都必须通过eslint和commit检查

* 支持一键生成Changelog

# 使用方法

直接clone本项目，删去`.git`文件夹，不必要的package dependency和初始文件，然后

```bash
  git init
  yarn
```
