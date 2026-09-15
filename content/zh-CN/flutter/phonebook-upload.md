---
docId: flutter-phonebook-upload
locale: zh-CN
title: "Flutter 电话本上传"
description: "生成电话本文件并上传到设备。"
platform: Flutter
slug: flutter/phonebook-upload
order: 10
status: published
version: v2.0
---

# Flutter 电话本上传

生成电话本文件并上传到设备。

读取系统联系人后构建 `.phone` 文件，再通过 SDK 上传。请在 Android 与 iOS 工程中分别声明联系人权限。

## 接口示例

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
