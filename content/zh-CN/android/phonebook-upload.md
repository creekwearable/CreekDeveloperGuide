---
docId: android-phonebook-upload
locale: zh-CN
title: Android 电话本上传
description: 生成并上传电话本文件到设备。
platform: Android
slug: android/phonebook-upload
order: 10
status: published
version: v2.0
---

# Android 电话本上传

生成并上传电话本文件到设备。

Android 需要申请 `READ_CONTACTS` 权限。SDK 的 `requestPhoneBookPermissions` 方法已废弃，请使用 Android 系统权限 API。

```kotlin
///初始化电话本（内部会有策略，每次连接设备成功的时候会去检查一次）
CreekManager.sInstance.phoneBookInit()

///主动调用检查是否需要同步电话本（可以定在前后台切换的时候去调用）策略自定义
CreekManager.sInstance.monitorPhone()

 ////检查权限是否开启
CreekManager.sInstance.checkPhoneBookPermissions { it ->
    if(!it){
        // requestPhoneBookPermissions 已废弃，改用系统权限 API。
        ActivityCompat.requestPermissions(
            context as Activity, arrayOf(
                "android.permission.READ_CONTACTS",
            ), 1
        )
    }
}
```
