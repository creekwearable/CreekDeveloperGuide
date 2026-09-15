---
docId: android-getting-started
locale: en-US
title: Android Quick Start
description: Register and initialize the Android Creek SDK, then verify device authorization when using a custom connection flow.
platform: Android
slug: android/getting-started
order: 1
status: published
version: v2.0
---

# Android Quick Start

Register and initialize the Android Creek SDK, then verify device authorization when using a custom connection flow.

```kotlin
CreekManager.sInstance.creekRegister(this, completed = {

  CreekManager.sInstance.initSDK()
})

CreekManager.sInstance.authorizationVerificationDevice(success = {
    responseText.value = "Success"
}, failure = {
    responseText.value = "Failure"
}, authorizationFailure = {
    responseText.value = "authorizationFailure"
})
```
