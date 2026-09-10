---
docId: ios-getting-started
locale: zh-CN
title: iOS 快速开始
description: 在 iOS 项目中安装并初始化 Creek SDK。
platform: iOS
slug: ios/getting-started
order: 1
status: published
version: v2.0
---

# iOS 快速开始

本指南介绍如何在 Swift 项目中接入 Creek SDK。

## 环境要求

- Xcode 16+
- Swift 5.9+
- iOS 12.0+

## 安装 SDK

通过 Swift Package Manager 添加 Creek SDK。

    .package(
        url: "https://github.com/creek/creek-ios.git",
        from: "2.0.0"
    )

## 初始化

    Creek.initialize(
        appId: "YOUR_APP_ID",
        apiKey: "YOUR_API_KEY"
    )
