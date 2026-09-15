---
docId: ios-logs
locale: zh-CN
title: iOS 日志相关操作
description: 获取 SDK 日志并按保留策略检查日志文件。
platform: iOS
slug: ios/logs
order: 13
status: published
version: v2.0
---

# iOS 日志相关操作

## 功能说明

获取 SDK 日志并按保留策略检查日志文件。

### 使用要点

注意：需要每次主动去检查文件

## Swift 示例

```swift
//创建分享视图控制器
 self.view.showRemark(msg: "")
 CreekInterFace.instance.getFirmwareLogPath { path in
        self.view.hideRemark()
       let activityViewController = UIActivityViewController(activityItems: [NSURL(fileURLWithPath: path)], applicationActivities: nil)
        self.present(activityViewController, animated: true, completion: nil)
  }
```

```swift
CreekInterFace.instance.checkLogFile()
```
