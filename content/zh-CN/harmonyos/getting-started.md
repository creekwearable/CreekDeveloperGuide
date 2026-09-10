---
docId: harmonyos-getting-started
locale: zh-CN
title: HarmonyOS 快速开始
description: 在 HarmonyOS 项目中接入 Creek SDK。
platform: HarmonyOS
slug: harmonyos/getting-started
order: 1
status: published
version: v2.0
---

# HarmonyOS 快速开始

本指南介绍如何在 ArkTS 项目中安装 Creek SDK。

## 环境要求

- DevEco Studio 5.0+
- HarmonyOS API 9+
- ArkTS

## 安装 SDK

    ohpm install @creek/sdk

## 初始化

    Creek.initialize({
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY'
    })
