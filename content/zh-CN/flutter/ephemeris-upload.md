---
docId: flutter-ephemeris-upload
locale: zh-CN
title: "Flutter 星历文件上传"
description: "以前台或后台模式更新星历文件。"
platform: Flutter
slug: flutter/ephemeris-upload
order: 8
status: published
version: v2.0
---

# Flutter 星历文件上传

以前台或后台模式更新星历文件。

`isBackground = false` 时任务进入后台队列；用户手动触发时可使用 `isBackground = true`，取消其他上传任务并立即执行。

## 接口示例

SDK 会通过回调请求 GPS 定位数据。

**`updateEphemeris` — 星历文件更新**
 Parameters:

- **model**: CreekEphemerisManageModel
- **`isBackground`**：`Bool = false`，是否使用后台模式。

**Behavior:**

- `isBackground == false`：更新在后台执行；存在其他任务时会进入队列。
- `isBackground == true`：取消其他上传任务并立即执行更新。

**Notes:**

- 监听自动星历更新时，将 `isBackground` 设为 `false`，使任务在后台执行。
- 用户手动触发星历更新时，将 `isBackground` 设为 `true`，使任务立即执行。

```dart
sdkManager.ephemerisUpdateListen(() {
  print("Ask for GPS data");
  CreekEphemerisManageModel model = CreekEphemerisManageModel(
      isVaild: false, latitude: 22790321, longitude: 113879551, altitude: 10);
  sdkManager.updateEphemeris(model,isBackground: false, () {
    CreekLog.info("Ephemeris update successful.");
  }, (e) {
    CreekLog.info(e);
  });
});

sdkManager.getEphemerisUpdateTime().then((e) {
  if (e.offlineEphemeris.isSupported) {
    CreekLog.info("Supports offline ephemeris");
    if (e.offlineEphemeris.needUpdate) {
      CreekLog.info("Offline ephemeris needs to be updated");
    }
    if (e.offlineEphemeris.updateTime == 0) {
      CreekLog.info("Offline ephemeris has never been updated");
    } else {
      DateTime date = DateTime.fromMillisecondsSinceEpoch(e.offlineEphemeris.updateTime * 1000, isUtc: true);
      CreekLog.info("Last offline ephemeris update time::${date.toString()}");
    }
  }
  if (e.onlineEphemeris.isSupported) {
    CreekLog.info("Supports online ephemeris");
    if (e.onlineEphemeris.needUpdate) {
      CreekLog.info("Online ephemeris needs to be updated");
    }
    if (e.onlineEphemeris.updateTime == 0) {
      CreekLog.info("Online ephemeris has never been updated");
    } else {
      DateTime date = DateTime.fromMillisecondsSinceEpoch(e.offlineEphemeris.updateTime * 1000, isUtc: true);
      CreekLog.info("Last online ephemeris update time::${date.toString()}");
    }
  }
});
```
