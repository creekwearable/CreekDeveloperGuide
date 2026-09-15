---
docId: flutter-logs
locale: zh-CN
title: "Flutter 日志操作"
description: "获取 SDK 与固件日志，并检查保留文件。"
platform: Flutter
slug: flutter/logs
order: 13
status: published
version: v2.0
---

# Flutter 日志操作

获取 SDK 与固件日志，并检查保留文件。

## 获取固件与 SDK 日志
```dart
SmartDialog.showLoading();
sdkManager.getFirmwareLogPath((e){
  Share.shareXFiles([XFile(e ?? "")], subject: "log").then((value) {
    SmartDialog.dismiss();
  }, onError: (e) {
    SmartDialog.dismiss();
  });
});
```

## 检查 7 天内保留的文件
注意：每次都需要手动检查返回的文件。

```dart
sdkManager.checkLogFile();
```
