---
docId: android-signal-strength
locale: en-US
title: Android Signal Strength
description: Read the RSSI value of the current connection.
platform: Android
slug: android/signal-strength
order: 145
status: published
version: v2.0
---

# Android Signal Strength

Read the RSSI value of the current connection.

```kotlin
CreekManager.sInstance.readRssi { model ->
    responseText.value = model.toString()
}
```
