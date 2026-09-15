---
docId: ios-ephemeris-upload
locale: zh-CN
title: iOS 星历文件上传
description: 向设备上传适配芯片类型的星历文件。
platform: iOS
slug: ios/ephemeris-upload
order: 8
status: published
version: v2.0
---

# iOS 星历文件上传

## 功能说明

向设备上传适配芯片类型的星历文件。

### 使用要点

SDK会通过闭包询问的方式，要求提供GPS定位数据

updateEphemeris  星历文件更新

参数：

model：EphemerisGPSModel

isBackground ：Bool = false    是否后台挂起

isBackground  == false，后台挂起，有其他任务的情况下，放到队列中进行排队

isBackground == true， 强制取消其他上传任务，直接执行。

注意：在监听到星历更新的时候，isBackground 设置为false ，放到后台去更新。

## Swift 示例

```swift
///旧的方法：废弃
      CreekInterFace.instance.ephemerisInit
     
     ///全局配置key
      CreekInterFace.instance.initGlobalConfig(keyId: keyId, publicKey: publicKey)
      
      ///监听星历更新
      CreekInterFace.instance.ephemerisListen {
           /// Received a notification indicating that the ephemeris file needs to be updated
            let model = EphemerisGPSModel()
            model.altitude = 10
            model.latitude = Int(22.312653 * 1000000)
            model.longitude = Int(114.027986 * 1000000)
            model.isVaild = true
            ///主动去更新星历文件
            CreekInterFace.instance.updateEphemeris(model: model) {
               print("ephemeris update success")
            } failure: { code, message in
               print(message)
            }
        }
       ///查询星历的更新时间
      CreekInterFace.instance.getEphemerisUpdateTime { model in
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
            formatter.timeZone = TimeZone.current
            if model.offlineEphemeris.isSupported{
               print("支持离线星历")
               if model.offlineEphemeris.needUpdate{
                  print("离线星历需要更新")
               }
               if model.offlineEphemeris.updateTime == 0{
                  print("未更新过离线星历")
               }else{
                  let date = Date(timeIntervalSince1970: TimeInterval(model.offlineEphemeris.updateTime))
                  print("离线星历最后更新的时间:\(formatter.string(from: date))")
               }
            }
            if model.onlineEphemeris.isSupported{
               print("支持在线星历")
               if model.onlineEphemeris.needUpdate{
                  print("在线星历需要更新")
               }
               if model.onlineEphemeris.updateTime == 0{
                  print("未更新过在线星历")
               }else{
                  let date = Date(timeIntervalSince1970: TimeInterval(model.onlineEphemeris.updateTime))
                  print("在线星历最后更新的时间:\(formatter.string(from: date))")
               }
            } 
        }
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table online_gnss = 15;//在线星历能力。
    function_table offline_gnss = 16;//离线星历能力。
}
```
