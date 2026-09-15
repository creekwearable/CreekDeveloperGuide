---
docId: android-health-data-sync
locale: zh-CN
title: Android 同步健康数据
description: 同步设备中的全部健康数据，并处理进度、完成和失败回调。
platform: Android
slug: android/health-data-sync
order: 3
status: published
version: v2.0
---

# Android 同步健康数据

同步设备中的全部健康数据，并处理进度、完成和失败回调。

```kotlin
CreekManager.sInstance.sync(syncSuccess = {
    Log.w("Sync", "syncSuccess")
}, syncFailure = {
    Log.w("Sync", "syncFailure")
}, syncProgress = { progress: Int ->
    Log.w("Sync", "$progress")
})
```
