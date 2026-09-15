---
docId: android-device-connection
locale: zh-CN
title: Android 设备连接
description: 扫描、连接、切换、绑定、解绑并查询已绑定设备。
platform: Android
slug: android/device-connection
order: 2
status: published
version: v2.0
---

# Android 设备连接

扫描、连接、切换、绑定、解绑并查询已绑定设备。

## 设备连接（先扫描到设备再连接）,连接成功后必须绑定设备，只有绑定成功后才算连接设备，绑定不成功，需要主动去断开连接。

```kotlin
///扫描
CreekManager.sInstance.scan(timeOut = 15, devices = { model: List<ScanDeviceModel> ->
    // 处理设备列表
    listScanDeviceModel= model.toList()
   // addpter.setDeviceModel(model.toList())
    var addpter = CustomAdapter(this,listScanDeviceModel)
    listView!!.adapter = addpter
} ,endScan = {
  Log.w("endScan","endScan")
})

///连接
CreekManager.sInstance.connect(item.device?.id ?: "", connect = {
        connectState: Boolean ->
    if (connectState){
        viewHolder.connectDeviceView.text = "disConnect"
    }
})
```

## 外部连接（当用自己的蓝牙扫描时，可以用这个方法连接）

```kotlin
CreekManager.sInstance.externalConnect(id = "D9:56:34:FD:4E:F4", connect = {
    
})
```

## 扫码连接(扫描手表)

```kotlin
// 与上面相同的过程
CreekManager.sInstance.scanConnect(id = "D9:56:34:FD:4E:F4", device = {
    
}, failure = {
    _,_ ->
})
```

## 切换设备、手动连接(必须是绑定的设备)

```kotlin
CreekManager.sInstance.inTransitionDevice(id = item.device?.id ?: "", inTransitionDevice = {
    _ ->  
})
```

## 绑定设备

```kotlin
///直接绑定
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_NORMAL,
    id = null,
    code = null,
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })
    
///验证码绑定
// 第一步获取验证码 （手表会弹出验证吗）
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_PAIRING_CODE,
    id = null,
    code = null,
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })
// 第二步输入验证码
code： // 验证码
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_PAIRING_CODE,
    id = null,
    code = editText.text.toString(),
    success = {
        print("Binding success")

    },
    failure = {
        print("Binding failure")
    })
```

## 解除绑定

```kotlin
CreekManager.sInstance.bindingDevice(
    bindType = Enums.bind_method.BIND_REMOVE,
    id = device.id,
    code = null,
    success = {
       

    },
    failure = {
       
    })
```

## 获取绑定过的设备

```kotlin
CreekManager.sInstance.getBindDevice {model ->  
    model.forEach(
        action = {
            ///lastBind == true 为当前正在使用的设备
            it.lastBind = true
        }
    )
}
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0;//授权码验证
    BIND_NORMAL = 1;//直接绑定
    BIND_REMOVE = 2;//解除绑定
    BIND_PAIRING_CODE = 3;//配对码绑定
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0;//表示请求绑定
    BIND_FLAG_FAILED = 1;//失败
    BIND_FLAG_SUCCESS = 2;//成功
    BIND_FLAG_BOUND = 3;//已绑定
    BIND_FLAG_SAVE_DATA = 4;//保存数据
}

enum bind_phone_type
{
    ANDROID = 0;//安卓
    IOS = 1;//IOS手机
}

message protocol_bind_operate
{
    bind_method bind_method = 1;//绑定方式
    bind_flag bind_flag = 2;//绑定标志位
    bind_phone_type bind_phone = 3;//绑定手机型号
}

message protocol_bind_reply
{
    bind_method bind_method = 1;//绑定方式
    bind_flag bind_flag = 2;//绑定标志位 
    bytes competent_data = 3;//授权码
    bytes pairing_code = 4;//配对码
}
```
