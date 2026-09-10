---
docId: flutter-getting-started
locale: zh-CN
title: Flutter 快速开始
description: 在 Flutter 应用中接入 Creek SDK。
platform: Flutter
slug: flutter/getting-started
order: 1
status: published
version: v2.0
---

# Flutter 快速开始

Creek Flutter 插件提供统一的 Dart API，并封装 Android 与 iOS 原生能力。

## 安装插件

    dependencies:
      creek_sdk: ^2.0.0

## 初始化

    await CreekSdk.initialize(
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
    );

## 平台配置

- Android 项目需要声明蓝牙权限。
- iOS 项目需要填写蓝牙使用说明。
