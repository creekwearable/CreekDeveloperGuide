---
docId: android-ota-upgrade
locale: zh-CN
title: Android OTA 固件升级
description: 使用 OTA 文件、ZIP 资源包或后台升级配置更新设备固件。
platform: Android
slug: android/ota-upgrade
order: 6
status: published
version: v2.0
---

# Android OTA 固件升级

使用 OTA 文件、ZIP 资源包或后台升级配置更新设备固件。

## 升级方式一:(.ota文件格式)

### 文件类型：空升固件文件(.ota)

说明：  
1、根据设备ID从服务器获取固件版本，不同的设备ID不允许获取固件版本  
2、OTA有电量限制，＜30%电量可以检测到新版本，但是升级时会提示电量不足  
3、需要根据FLASH版本在服务器上配置固件，如果需要升级的固件和手表的固件FLASH一致，服务器上配置单固件包即可，如果FLASH不一致需要配置全资源包

### 获取ota文件方式

现阶段是以人工的方式提供：

里面的信息包含

     固件包里面包含全资源包和固件包：比如cw01_v2.6.0_23101301_res.ota 全资源包 、   cw01_v2.6.0_23101301.ota固件包

### 配置OTA升级

1、把.ota文件放到服务器

2、app端根据规则获取固件包还是全资源包（规则是在上面提到的FLASH版本）

      比如：字库版本（即FLASH版本）

                1、 当前手表FLASH版本是203，固件版本是：2.6.0

                2、服务器上FLASH版本是203，固件版本是：2.6.1

               3、服务器上FLASH版本是204，固件版本是：2.6.1

              1和2 代表：只需要升级固件包

              1和3代表：需要升级全资源包

3、上传到手表（调用SDK提供的方法）

### 固件升级（.ota）-》文件流

```kotlin
///安卓
CreekManager.sInstance.upload(
    "res.ota",
    decimalArray,
    uploadProgress = { progress ->
        print(progress)
    },
    uploadSuccess = {},
    uploadFailure = { c, m -> })
```

### 固件升级（.ota）-》本地文件路径

如果文件太大，文件流的方式会导致线程卡死，改成把文件路径传递

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

## 升级方式二：(.zip文件格式)

zip升级模式在兼容单包升级的前提下，支持分区升级

zip文件详情：可以自由配置单包和多包的升级。我们会配置好zip给到你们,不要去随意更改里面的文件。

### 获取当前OTA升级解析版本

```kotlin
CreekManager.sInstance.getOTAUpgradeVersion {
    Log.w("OTA", "OTA version:$it")
}
```

### 获取当前OTA资源包状态

model.totalResource ：当前升级的资源总包数

model.step：当前执行的步骤（第几步）

```kotlin
CreekManager.sInstance.getOTAUpgradeState(fileName = "titan.zip", fileData = decimalArray, model = {
    model: UpgradeModel ->
    Log.w("ota", "totalResource:${model.totalResource ?: 0}  step:${model.step ?: 0}")
} , failureArgument = {
    code, message ->
    Log.w("ota", "$message")
})
```

### 上传文件

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

### OTA升级

注意：1、升级流程完成的判断 -》上传完成成功的时候判断 model.totalResource == model.step （3/3），才代表升级流程完成

            2、升级过程中如果总包数model.totalResource是3，每一个包上传成功手表都会重启一次，所以当用户在升级页面中的时候，自动连接成功后

                 需要主动把流程走一遍，自动触发。

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

## 升级方式三 :  小澈后台管理OTA文件

### 检查固件是否有更新

```kotlin
CreekManager.sInstance.queryFirmwareUpdate(model = {
        model: NetWork.firmware_update_response ->
    println(model.toString())
    if (model.code == 200){
        if (model.data.firmwareUrl != ""){
          ///有更新
        }else{
         ///没有更新
        }
    }

}, failure = {
        c,m ->
})
```

### 开始固件升级

```kotlin
CreekManager.sInstance.startFirmwareUpdate(url = model.data.firmwareUrl,
    downProgress = {
            progress: Int ->
        println("下载进度${progress}")
    },
    downSuccess = {
        println("下载成功")
    },
    downFailure = {
            code, message ->
        println("下载错误${message}")
    },
    uploadProgress = {
            progress: Int ->
        println("上传进度${progress}")
    },
    uploadSuccess = {
        println("上传成功")
    }, uploadFailure = {
            code, message ->
        println("上传错误${message}")
    }
)
```
