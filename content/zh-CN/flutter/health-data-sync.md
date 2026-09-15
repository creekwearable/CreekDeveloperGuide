---
docId: flutter-health-data-sync
locale: zh-CN
title: "Flutter 健康数据同步"
description: "同步已连接设备中的全部健康数据。"
platform: Flutter
slug: flutter/health-data-sync
order: 3
status: published
version: v2.0
---

# Flutter 健康数据同步

同步已连接设备中的全部健康数据。

在设备连接并绑定成功后执行同步。完整同步会返回 SDK 健康数据模型，并由 SDK 负责保存可持久化的数据。

## 接口示例

```dart
sdkManager.sync(success: (){
  Common.toast(label: 'sync success');
},failure: (){
  Common.toast(label: 'sync failure');
},progress: (e){
  print("sync progress:$e");
});
```
