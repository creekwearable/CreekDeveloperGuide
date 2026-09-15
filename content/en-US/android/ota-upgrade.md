---
docId: android-ota-upgrade
locale: en-US
title: Android OTA Firmware Upgrade
description: Upgrade device firmware with an OTA file, ZIP resource package, or managed upgrade configuration.
platform: Android
slug: android/ota-upgrade
order: 6
status: published
version: v2.0
---

# Android OTA Firmware Upgrade

Upgrade device firmware with an OTA file, ZIP resource package, or managed upgrade configuration.

## Method 1: OTA File

Description:

```kotlin
CreekManager.sInstance.upload(
    "res.ota",
    decimalArray,
    uploadProgress = { progress ->
        print(progress)
    },
    uploadSuccess = {},
    uploadFailure = { c, m -> })
```

```kotlin
val filePath = "/data/user/0/com.creek.dial/app_flutter/creek/ewr01_noise_fw_ota_2025060522_v0.0.11_no_music.ota"
CreekManager.sInstance.uploadWithFilePath(
    fileName = "ewr01_noise_fw_ota_2025060522_v0.0.11_no_music.ota",
    filePath = "/data/user/0/com.creek.dial/app_flutter/creek/ewr01_noise_fw_ota_2025060522_v0.0.11_no_music.ota",
    uploadProgress = { progress ->
        responseText.value = "progress :$progress"
    },
    uploadSuccess = {
        responseText.value = "Success"
    },
    uploadFailure = { c, m ->
        responseText.value = "Failure"

    })
```

## Method 2: ZIP Package

```kotlin
CreekManager.sInstance.getOTAUpgradeVersion {
    Log.w("OTA", "OTA version:$it")
}
```

```kotlin
CreekManager.sInstance.getOTAUpgradeState(fileName = "titan.zip", fileData = decimalArray, model = {
    model: UpgradeModel ->
    Log.w("ota", "totalResource:${model.totalResource ?: 0}  step:${model.step ?: 0}")
} , failureArgument = {
    code, message ->
    Log.w("ota", "$message")
})
```

### UploadFile

```kotlin
CreekManager.sInstance.upload(
            "titan.zip",
            decimalArray,
            uploadProgress = { progress ->
                responseText.value = "progress :$progress"
            },
            uploadSuccess = {
                responseText.value = "Success"
            },
            uploadFailure = { c, m ->
                responseText.value = "Failure"

            })
```

```kotlin
try {
    val inputStream = context.assets.open("titan.zip")
    var fileData: ByteArray = inputStream.readBytes()
    val decimalArray: IntArray =
        fileData.map { it.toInt() and 0xFF }.toIntArray()

    CreekManager.sInstance.getOTAUpgradeState(fileName = "titan.zip", fileData = decimalArray, model = {
        model: UpgradeModel ->
        Log.w("ota", "totalResource:${model.totalResource ?: 0}  step:${model.step ?: 0}")
        CreekManager.sInstance.upload(
            "titan.zip",
            decimalArray,
            uploadProgress = { progress ->
                responseText.value = "progress :$progress"
            },
            uploadSuccess = {
                responseText.value = "Success"
            },
            uploadFailure = { c, m ->
                responseText.value = "Failure"

            })
    } , failureArgument = {
        code, message ->
        Log.w("ota", "$message")
    })

    inputStream.close()
} catch (e: IOException) {
    e.printStackTrace()
}
```

## Method 3: Managed OTA File

```kotlin
CreekManager.sInstance.queryFirmwareUpdate(model = {
        model: NetWork.firmware_update_response ->
    println(model.toString())
    if (model.code == 200){
        if (model.data.firmwareUrl != ""){

        }else{

        }
    }

}, failure = {
        c,m ->
})
```

```kotlin
CreekManager.sInstance.startFirmwareUpdate(url = model.data.firmwareUrl,
    downProgress = {
            progress: Int ->
        println("Download progress: ${progress}")
    },
    downSuccess = {
        println("Download succeeded")
    },
    downFailure = {
            code, message ->
        println("Download error: ${message}")
    },
    uploadProgress = {
            progress: Int ->
        println("Upload progress: ${progress}")
    },
    uploadSuccess = {
        println("Upload succeeded")
    }, uploadFailure = {
            code, message ->
        println("Upload error: ${message}")
    }
)
```
