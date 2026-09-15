---
docId: ios-health-data-sync
locale: zh-CN
title: iOS 同步健康数据
description: 同步设备中的全部健康数据，并处理同步进度与结果。
platform: iOS
slug: ios/health-data-sync
order: 3
status: published
version: v2.0
---

# iOS 同步健康数据

## 功能说明

同步设备中的全部健康数据，并处理同步进度与结果。

## Swift 示例

```swift
CreekInterFace.instance.sync { progress in
                print("sync \(progress)")
            } syncSuccess: {
                print("syncSuccess")
            } syncFailure: {
                print("syncFailure")
            }
```
