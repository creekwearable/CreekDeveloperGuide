---
docId: ios-getting-started
locale: zh-CN
title: iOS 快速开始
description: 初始化 iOS Creek SDK，并在自定义自动连接后校验设备授权。
platform: iOS
slug: ios/getting-started
order: 1
status: published
version: v2.0
---

# iOS 快速开始

## 初始化 SDK

```swift
CreekInterFace.instance.setupInit{
    cancelAutoConnect:///默认自动连接，.cancel 是取消自动连接
    CreekInterFace.instance.initSDK()
}
```

## 校验设备授权

如果使用自己实现的自动连接逻辑，请在连接成功后校验手表是否已被其他手机绑定。校验失败时，需要根据产品逻辑删除该设备或重新绑定。

```swift
CreekInterFace.instance.authorizationVerificationDevice {
    print("成功")
} failure: {
    print("失败")
} authorizationFailure: {
    print("校验失败")
}
```
