---
docId: flutter-health-data-sync-by-type
locale: zh-CN
title: "Flutter 按类型同步健康数据"
description: "按指定类型同步一类健康数据。"
platform: Flutter
slug: flutter/health-data-sync-by-type
order: 4
status: published
version: v2.0
---

# Flutter 按类型同步健康数据

按指定类型同步一类健康数据。

当页面只需要一种健康数据时，按类型同步可以减少不必要的数据处理。

## 接口示例

```dart
sdkManager.syncHealthType(sync_type.SYNC_ACTIVITY,success: (){
  Common.toast(label: 'sync success');
},failure: (){
  Common.toast(label: 'sync failure');
},progress: (e){
  print("sync progress:$e");
});
```
