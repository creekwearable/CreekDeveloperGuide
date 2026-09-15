---
docId: android-getting-started
locale: zh-CN
title: Android 快速开始
description: 注册并初始化 Android Creek SDK，并在自定义自动连接后校验设备授权。
platform: Android
slug: android/getting-started
order: 1
status: published
version: v2.0
---

# Android 快速开始

注册并初始化 Android Creek SDK，并在自定义自动连接后校验设备授权。

```kotlin
CreekManager.sInstance.creekRegister(this, completed = {
  /// cancelAutoConnect:默认自动连接，.cancel 是取消自动连接
  CreekManager.sInstance.initSDK()
})

 ///当你用的是自己写的自动连接方法时，在连接成功的时候你需要验证一下手表是否被其他手机绑定
 ///当校验失败的时候，你要删除这台设备，或者重新绑定，逻辑可以自己去定
CreekManager.sInstance.authorizationVerificationDevice(success = {
    responseText.value = "Success"
}, failure = {
    responseText.value = "Failure"
}, authorizationFailure = {
    responseText.value = "authorizationFailure"
})
```
