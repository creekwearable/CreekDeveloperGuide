---
docId: android-ephemeris-upload
locale: en-US
title: Android Ephemeris File Upload
description: Upload the ephemeris file required by the device GPS chipset and capability set.
platform: Android
slug: android/ephemeris-upload
order: 8
status: published
version: v2.0
---

# Android Ephemeris File Upload

Upload the ephemeris file required by the device GPS chipset and capability set.

model: EphemerisGPSModel

```kotlin
CreekManager.sInstance.ephemerisInit

CreekManager.sInstance.initGlobalConfig(keyId, publicKey)

CreekManager.sInstance.ephemerisListen {
  val model =  EphemerisGPSModel(
        isVaild = true,
        altitude = 10,
        latitude = (22.312653 * 1000000).toInt(),
        longitude = (114.027986 * 1000000).toInt()
    )

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
        println("Offline ephemeris is supported")
        if (offline.needUpdate) {
            println("Offline ephemeris needs to be updated")
        }
        if (offline.updateTime == 0) {
            println("Offline ephemeris has not been updated yet")
        } else {
            val date = Date(offline.updateTime.toLong() * 1000)
            println("Offline ephemeris last updated at: ${formatter.format(date)}")
        }
    }
    val online = model.onlineEphemeris
    if (online.isSupported) {
        println("Online ephemeris is supported")
        if (online.needUpdate) {
            println("Online ephemeris needs to be updated")
        }
        if (online.updateTime == 0) {
            println("Online ephemeris has not been updated yet")
        } else {
            val date = Date(online.updateTime.toLong() * 1000) // Date.
            println("Online ephemeris last updated at: ${formatter.format(date)}")
        }
    }
}
```
