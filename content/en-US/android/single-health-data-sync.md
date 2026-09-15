---
docId: android-single-health-data-sync
locale: en-US
title: Android Single-Type Health Data Sync
description: Synchronize one selected health-data type.
platform: Android
slug: android/single-health-data-sync
order: 4
status: published
version: v2.0
---

# Android Single-Type Health Data Sync

Synchronize one selected health-data type.

```kotlin
CreekManager.sInstance.syncHealthType(type = Enums.sync_type.SYNC_ACTIVITY, syncSuccess = {
    responseText.value = "Success"
}, syncFailure = {
    responseText.value = "Failure"
}, syncProgress = { progress: Int ->
    responseText.value = "progress :$progress"
})
```
