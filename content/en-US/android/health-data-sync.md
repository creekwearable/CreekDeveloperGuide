---
docId: android-health-data-sync
locale: en-US
title: Android Health Data Sync
description: Synchronize all health data from the device and handle progress, completion, and failure callbacks.
platform: Android
slug: android/health-data-sync
order: 3
status: published
version: v2.0
---

# Android Health Data Sync

Synchronize all health data from the device and handle progress, completion, and failure callbacks.

```kotlin
CreekManager.sInstance.sync(syncSuccess = {
    Log.w("Sync", "syncSuccess")
}, syncFailure = {
    Log.w("Sync", "syncFailure")
}, syncProgress = { progress: Int ->
    Log.w("Sync", "$progress")
})
```
