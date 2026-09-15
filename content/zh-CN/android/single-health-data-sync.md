---
docId: android-single-health-data-sync
locale: zh-CN
title: Android 同步单项健康数据
description: 按指定健康数据类型执行同步。
platform: Android
slug: android/single-health-data-sync
order: 4
status: published
version: v2.0
---

# Android 同步单项健康数据

按指定健康数据类型执行同步。

```kotlin
CreekManager.sInstance.syncHealthType(type = Enums.sync_type.SYNC_ACTIVITY, syncSuccess = {
    responseText.value = "Success"
}, syncFailure = {
    responseText.value = "Failure"
}, syncProgress = { progress: Int ->
    responseText.value = "progress :$progress"
})
```
