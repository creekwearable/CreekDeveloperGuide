---
docId: android-signal-strength
locale: zh-CN
title: Android 信号值
description: 读取当前连接的 RSSI 信号值。
platform: Android
slug: android/signal-strength
order: 145
status: published
version: v2.0
---

# Android 信号值

读取当前连接的 RSSI 信号值。

```kotlin
CreekManager.sInstance.readRssi { model ->
    responseText.value = model.toString()
}
```
