---
docId: android-ephemeris-upload
locale: zh-CN
title: Android 星历文件上传
description: 根据设备 GPS 芯片和能力上传对应的星历文件。
platform: Android
slug: android/ephemeris-upload
order: 8
status: published
version: v2.0
---

# Android 星历文件上传

根据设备 GPS 芯片和能力上传对应的星历文件。

SDK会通过闭包询问的方式，要求提供GPS定位数据

updateEphemeris  星历文件更新

参数：

        model：EphemerisGPSModel 

        isBackground ：Bool = false    是否后台挂起   

 isBackground  == false，后台挂起，有其他任务的情况下，放到队列中进行排队

isBackground == true， 强制取消其他上传任务，直接执行。

注意：在监听到星历更新的时候，isBackground 设置为false ，放到后台去更新。

           如果是用户主动点击更新星历，isBackground设置为true，直接前台更新。

```kotlin
///旧的方法：废弃
CreekManager.sInstance.ephemerisInit

 ///全局配置key
CreekManager.sInstance.initGlobalConfig(keyId, publicKey)

///监听星历更新
CreekManager.sInstance.ephemerisListen {
  val model =  EphemerisGPSModel(
        isVaild = true,
        altitude = 10,
        latitude = (22.312653 * 1000000).toInt(),
        longitude = (114.027986 * 1000000).toInt()
    )
     ///主动去更新星历文件
    CreekManager.sInstance.updateEphemeris(model = model, success = {
        Log.w("123456", "updateEphemeris success")
    }, failure = {
        c,m ->
        Log.w("123456", "updateEphemeris failure")
    })
}

CreekManager.sInstance.getEphemerisUpdateTime { model ->
    val formatter = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
    formatter.timeZone = TimeZone.getDefault()
    val offline = model.offlineEphemeris
    if (offline.isSupported) {
        println("支持离线星历")
        if (offline.needUpdate) {
            println("离线星历需要更新")
        }
        if (offline.updateTime == 0) {
            println("未更新过离线星历")
        } else {
            val date = Date(offline.updateTime.toLong() * 1000)
            println("离线星历最后更新的时间: ${formatter.format(date)}")
        }
    }
    val online = model.onlineEphemeris
    if (online.isSupported) {
        println("支持在线星历")
        if (online.needUpdate) {
            println("在线星历需要更新")
        }
        if (online.updateTime == 0) {
            println("未更新过在线星历")
        } else {
            val date = Date(online.updateTime.toLong() * 1000) // // 秒转毫秒
            println("在线星历最后更新的时间: ${formatter.format(date)}")
        }
    }
}
```
