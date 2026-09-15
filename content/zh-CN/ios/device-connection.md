---
docId: ios-device-connection
locale: zh-CN
title: iOS 设备连接
description: 介绍设备扫描、连接、切换、绑定、解绑和已绑定设备查询。
platform: iOS
slug: ios/device-connection
order: 2
status: published
version: v2.0
---

# iOS 设备连接

## 设备连接

连接前先扫描设备。连接成功后必须完成绑定；只有绑定成功才算连接完成。若绑定失败，请主动断开连接。

```swift
///扫描
CreekInterFace.instance.scan(timeOut: 15) { data in
    self.devides = data
    self.tableView.reloadData()
} endScan: {
    print("结束扫描")
}

///连接
CreekInterFace.instance.connect(id: a.device?.id ?? "") { isBool in
    self.view.hideRemark()
    CreekAlert.alertMsg(exception: isBool ? "connect" : "disconnect")
    if isBool{
        self.connectDeviceID = a.device?.id
    }
    dispatch_main_sync_safe {
        tableView.reloadData()
    }
}
}
```

## 外部连接（当用自己的蓝牙扫描时，可以用这个方法连接）

```swift
CreekInterFace.instance.externalConnect(id: "941DC185-BAEF-A1EC-2CCA-4275239E8D07") { isBool in
    if isBool{
    }
}
```

## 扫码连接(扫描手表)

手表上的二维码格式：

`https://app.cheyfit.com/#/code/caB8?mac=F4:4E:FD:34:56:D9&device_id=3021`

解析出mac地址：

`F4:4E:FD:34:56:D9`

倒序得出最终的要传入的地址：

`D9:56:34:FD:4E:F4`

```swift
CreekInterFace.instance.scanConnect(id: "D9:56:34:FD:4E:F4") { model in
    CreekInterFace.instance.connect(id: model.device?.id) { connectState in
        CreekInterFace.instance.bindingDevice(bindType: .binNormal, id: nil, code: nil) {
            print("Success")
        } failure: {
            print("Failure")
        }
    } failure: { code, message in

    }
```

## 切换设备、手动连接(必须是绑定的设备)

```swift
CreekInterFace.instance.inTransitionDevice(id: "") { connectState in
    ///  connectState  true  连接成功 false 连接失败
}
```

## 绑定设备

直接绑定：

```swift
CreekInterFace.instance.bindingDevice(bindType: .binNormal, id: nil, code: nil) {
    print("Success")
} failure: {
    print("Failure")
}
```

验证码绑定：

第一步获取验证码 （手表会弹出验证吗）

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindPairingCode, id: nil, code: nil) {
    ///
} failure: {

}
```

第二步输入验证码

`code`：验证码

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindPairingCode, id: nil, code: textField.text) {
    print("Success")
} failure: {
    print("Failure")
}
```

## 解除绑定

```swift
CreekInterFace.instance.bindingDevice(bindType: .bindRemove, id: device.id, code: nil) {
    ///
} failure: {

}
```

## 获取绑定过的设备

```swift
CreekInterFace.instance.getBindDevice { model in
    model.forEach { device in
        ///lastBind == true 为当前正在使用的设备
        device.lastBind = true

    }
}
```

---

## 绑定数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0;//授权码验证
    BIND_NORMAL = 1;//直接绑定
    BIND_REMOVE = 2;//解除绑定
    BIND_PAIRING_CODE = 3;//配对码绑定
    BIND_CONFIRM = 4;//确认绑定
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0;//表示请求绑定
    BIND_FLAG_FAILED = 1;//失败
    BIND_FLAG_SUCCESS = 2;//成功
    BIND_FLAG_BOUND = 3;//已绑定
    BIND_FLAG_SAVE_DATA = 4;//保存数据
    BIND_ACCOUNT = 5;//绑定账号信息
    BIND_FLAG_NEED_CHARGERING = 6;//充电才可配对，app提示用户充电
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
    bytes userid = 4;//用户ID
    bytes accountid = 5;//账号
}

message protocol_bind_reply
{
    bind_method bind_method = 1;//绑定方式
    bind_flag bind_flag = 2;//绑定标志位 
    bytes competent_data = 3;//授权码
    bytes pairing_code = 4;//配对码
}
```
