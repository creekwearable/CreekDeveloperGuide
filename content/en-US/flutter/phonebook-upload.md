---
docId: flutter-phonebook-upload
locale: en-US
title: "Flutter Phone Book Upload"
description: "Build and upload a phone-book file to the device."
platform: Flutter
slug: flutter/phonebook-upload
order: 10
status: published
version: v2.0
---

# Flutter Phone Book Upload

Build and upload a phone-book file to the device.

## SDK Usage

```dart
///Initialize the phone book (there will be an internal policy, which will be checked every time the device is successfully connected)
     sdkManager.phoneBookInit();
      ///Actively call to check whether the phone book needs to be synchronized (can be called when switching between front and back) Strategy customization
      sdkManager.monitorPhone()
      ////Check whether permission is enabled
      sdkManager.checkPhoneBookPermissions();
      ///Request permission
     sdkManager.requestPhoneBookPermissions();
```
