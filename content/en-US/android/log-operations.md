---
docId: android-log-operations
locale: en-US
title: Android Log Operations
description: Retrieve SDK logs and inspect locally retained log files.
platform: Android
slug: android/log-operations
order: 13
status: published
version: v2.0
---

# Android Log Operations

Retrieve SDK logs and inspect locally retained log files.

## Get Logs

```kotlin
CreekManager.sInstance.getFirmwareLogPath {
    val file = File(it)
    if (file.exists()) {
        val uri = FileProvider.getUriForFile(this, "${BuildConfig.APPLICATION_ID}.provider", file)
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "application/zip"
        intent.putExtra(Intent.EXTRA_STREAM, uri)
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION) // Grant URI permission
        startActivity(Intent.createChooser(intent, ""))
    }
}
```

## Inspect Retained Log Files

```kotlin
CreekManager.sInstance.checkLogFile()
```
