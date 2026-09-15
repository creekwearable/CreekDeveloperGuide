---
docId: ios-single-health-data-sync
locale: zh-CN
title: iOS 同步单项健康数据
description: 按健康数据类型发起单项同步。
platform: iOS
slug: ios/single-health-data-sync
order: 4
status: published
version: v2.0
---

# iOS 同步单项健康数据

## 功能说明

按健康数据类型发起单项同步。

## Swift 示例

```swift
CreekInterFace.instance.syncHealthType(type: .syncActivity) { progress in
            self.textView.text = "progress\(progress)"
         } syncSuccess: {
            self.view.hideRemark()
            self.textView.text = "success"
         } syncFailure: {
            self.view.hideRemark()
            self.textView.text = "failure"
         }
```
