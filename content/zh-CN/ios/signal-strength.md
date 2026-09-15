---
docId: ios-signal-strength
locale: zh-CN
title: iOS 信号强度
description: 读取当前蓝牙 RSSI 信号值。
platform: iOS
slug: ios/signal-strength
order: 145
status: published
version: v2.0
---

# iOS 信号强度

## 功能说明

读取当前蓝牙 RSSI 信号值。

## Swift 示例

```swift
CreekInterFace.instance.readRssi { model in
            self.view.hideRemark()
            self.textView.text = "\(model)"
         }
```
