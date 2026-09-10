---
docId: android-getting-started
locale: zh-CN
title: Android 快速开始
description: 在 Android 项目中安装并初始化 Creek SDK。
platform: Android
slug: android/getting-started
order: 1
status: published
version: v2.0
---

# Android 快速开始

本指南将帮助你在 Android 项目中完成 Creek SDK 的安装与初始化。

## 环境要求

- Android Studio Ladybug 或更高版本
- Kotlin 1.9+
- Android minSdk 21+

## 安装 SDK

在项目中添加 Creek SDK 依赖：

    dependencies {
        implementation("com.creek:sdk:2.0.0")
    }

## 初始化

在 Application 的 onCreate 方法中初始化 SDK：

    Creek.init(
        context = this,
        appId = "YOUR_APP_ID",
        apiKey = "YOUR_API_KEY"
    )

> 请勿在客户端代码仓库中提交正式环境密钥。

## 下一步

初始化完成后，可以继续阅读设备连接与数据同步指南。
