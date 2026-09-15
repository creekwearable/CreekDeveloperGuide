---
docId: android-phonebook-upload
locale: en-US
title: Android Phonebook Upload
description: Generate and upload a phonebook file to the device.
platform: Android
slug: android/phonebook-upload
order: 10
status: published
version: v2.0
---

# Android Phonebook Upload

Generate and upload a phonebook file to the device.

Android requires the `READ_CONTACTS` permission. The SDK's `requestPhoneBookPermissions` method is deprecated; use the Android system permission API.

```kotlin
CreekManager.sInstance.phoneBookInit()

CreekManager.sInstance.monitorPhone()

CreekManager.sInstance.checkPhoneBookPermissions { it ->
    if(!it){
        // requestPhoneBookPermissions is deprecated; use the system permission API.
        ActivityCompat.requestPermissions(
            context as Activity, arrayOf(
                "android.permission.READ_CONTACTS",
            ), 1
        )
    }
}
```
