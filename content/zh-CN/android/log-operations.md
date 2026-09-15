---
docId: android-log-operations
locale: zh-CN
title: Android 日志操作
description: 获取 SDK 日志并检查本地日志文件。
platform: Android
slug: android/log-operations
order: 13
status: published
version: v2.0
---

# Android 日志操作

获取 SDK 日志并检查本地日志文件。

## 获取日志

```kotlin
CreekManager.sInstance.getFirmwareLogPath {
    val file = File(it)
    if (file.exists()) {
        val uri = FileProvider.getUriForFile(this, "${BuildConfig.APPLICATION_ID}.provider", file)
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "application/zip"
        intent.putExtra(Intent.EXTRA_STREAM, uri)
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION) // // 授予 URI 权限
        startActivity(Intent.createChooser(intent, ""))
    }
}
```

## 检测文件，保留7天数据

注意：需要每次主动去检查文件

```kotlin
CreekManager.sInstance.checkLogFile()
```
