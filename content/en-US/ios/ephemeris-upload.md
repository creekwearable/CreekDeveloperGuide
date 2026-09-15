---
docId: ios-ephemeris-upload
locale: en-US
title: iOS Ephemeris File Upload
description: Upload the ephemeris file required by the device GNSS chipset.
platform: iOS
slug: ios/ephemeris-upload
order: 8
status: published
version: v2.0
---

# iOS Ephemeris File Upload

## Overview

Upload the ephemeris file required by the device GNSS chipset.

## Swift example

```swift
      CreekInterFace.instance.ephemerisInit
     
     // key
      CreekInterFace.instance.initGlobalConfig(keyId: keyId, publicKey: publicKey)
      
      CreekInterFace.instance.ephemerisListen {
           // Received a notification indicating that the ephemeris file needs to be updated
            let model = EphemerisGPSModel()
            model.altitude = 10
            model.latitude = Int(22.312653 * 1000000)
            model.longitude = Int(114.027986 * 1000000)
            model.isVaild = true
            CreekInterFace.instance.updateEphemeris(model: model) {
               print("ephemeris update success")
            } failure: { code, message in
               print(message)
            }
        }
       // query time
      CreekInterFace.instance.getEphemerisUpdateTime { model in
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
            formatter.timeZone = TimeZone.current
            if model.offlineEphemeris.isSupported{
               print("Offline ephemeris is supported")
               if model.offlineEphemeris.needUpdate{
                  print("Offline ephemeris needs an update")
               }
               if model.offlineEphemeris.updateTime == 0{
                  print("Offline ephemeris has never been updated")
               }else{
                  let date = Date(timeIntervalSince1970: TimeInterval(model.offlineEphemeris.updateTime))
                  print("Offline ephemeris last updated at: \(formatter.string(from: date))")
               }
            }
            if model.onlineEphemeris.isSupported{
               print("Online ephemeris is supported")
               if model.onlineEphemeris.needUpdate{
                  print("Online ephemeris needs an update")
               }
               if model.onlineEphemeris.updateTime == 0{
                  print("Online ephemeris has never been updated")
               }else{
                  let date = Date(timeIntervalSince1970: TimeInterval(model.onlineEphemeris.updateTime))
                  print("Online ephemeris last updated at: \(formatter.string(from: date))")
               }
            } 
        }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table online_gnss = 15;// Online ephemeris capability.
    function_table offline_gnss = 16;// Offline ephemeris capability.
}
```
