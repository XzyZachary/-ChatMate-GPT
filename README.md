# ChatMate-GPT

[![Build Status][build-status-image]][build-status]
[![license][license-image]][repository-url]
[![GitHub repo size][repo-size-image]][repository-url]
[![Release Date][rle-image]][rle-url]
[![GitHub last commit][last-commit-image]][repository-url]
[![tag][tag-image]][rle-url]

ChatMate 是一个基于 Open AI GPT-3 的聊天应用。使用 React Native 开发，支持 Android 和 iOS。

## TODO

- [x] Android 适配优化
- [ ] 新版本提示
- [ ] 置顶会话

## Features

- 以对话的形式跟 GPT 聊天
- 支持多种语言设置
- 支持多种界面主题设置
- 内置 [ChatGPT-Shortcut](https://github.com/rockbenben/ChatGPT-Shortcut) 提示词库
- 支持聊天会话自定义设置
- 高度自定义的 API 设置
- 支持流式消息回复
- 支持对回复消息 MarkDown 渲染
- 支持对消息内容进行内容朗读
- 支持对消息内容进行导出 CSV
- 支持对聊天会话进行 iCloud 同步
- 支持设置多 API Server 设置
- 支持查询 API 花费
- 支持 URL Scheme
- 支持消息会话列表排序
- 支持聊天字体大小设置
- 支持实时消息会话 Token、Cost 显示
- 聊天提示词支持多个关键词设置
- 支持回复消息代码块渲染、复制
- ...

## Screenshots

![chatmate](https://raw.githubusercontent.com/funnyzak/ChatMate-GPT/main/.github/assets/screenshots/chatmate-gpt-ios.jpg)

## Development

```bash

# clone repos
$ git clone https://github.com/funnyzak/ChatMate-GPT.git && cd ChatMate-GPT

# deps install
$ yarn

# 依赖包额外补丁
yarn postinstall

# ios pod install
yarn pod

# start react-native-debugger（only mac）
yarn debug

# iOS simulator start
yarn ios

# Android simulator start
yarn android

# plop generate template
yarn p

# print rn info
npx react-native info

# upgrade rn version
npx react-native upgrade

# iOS debug info start
npx react-native run-ios --verbose

# iOS release build
npx react-native run-ios --configuration Release

# iOS debug use special device
react-native run-ios --simulator="iPhone 14 Pro"

# Android debug info start
npx react-native run-android --verbose

# Testing the release build
npx react-native run-android --variant=release

# build android release apk
cd android
# aab file
./gradlew bundleRelease
# apk file
./gradlew assembleRelease

npx react-native run-android --variant release

```

## Structure

```plain
├── src                      # 源码目录
│   ├── App.tsx              # app根组件
│   ├── actions              # actions
│   ├── assets               # 静态资源
│   ├── components           # 组件
│   ├── config               # 配置文件
│   ├── helper               # 应用服务类
│   ├── hooks                # 钩子
│   ├── i18n                 # 多语言支持
│   ├── navigation           # 路由导航
│   ├── reducers             # reducers
│   ├── store                # store
│   ├── theme                # 主题
│   ├── types                # 类型定义
│   ├── utils                # 工具类
│   └── api                  # API库
├── .editorconfig            # 编辑器配置
├── .eslintrc.js             # eslint的配置文件
├── .gitignore               # 配置git提交需要忽略的文件
├── .husky                   # git钩子配置
├── .prettierrc.js           # 代码格式化规则
├── .watchmanconfig          # Watchman的配置文件，用于监控bug文件和文件变化，并且可以出发指定的操作
├── __tests__                # 测试
├── android                  # Android文件所在目录，包含AndroidStudio项目环境文件；
├── app.json                 #
├── babel.config.js          # Babel的配置文件
├── global.d.ts              # ts全局声明文件
├── index.js                 # 程序入口文件
├── ios                      # iOS文件所在目录，包含XCode项目环境；
├── metro.config.js
├── package.json             # 项目基本信息（比如名称、版本、许可证等元数据）以及依赖信息（npm install安装的模块）等
├── tsconfig.json            # typescript编译配置文件
└── yarn.lock                # 依赖版本锁定文件
```
