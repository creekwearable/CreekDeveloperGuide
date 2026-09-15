---
docId: flutter-device-connection
locale: zh-CN
title: "Flutter 设备连接"
description: "扫描、连接、绑定、切换与解绑设备。"
platform: Flutter
slug: flutter/device-connection
order: 2
status: published
version: v2.0
---

# Flutter 设备连接

扫描、连接、绑定、切换与解绑设备。

先扫描设备再建立连接。连接成功后必须完成绑定；绑定失败时应主动断开。手动切换设备仅适用于已经绑定的设备。

## 设备连接（扫描与连接）
```dart
///scan
sdkManager.scan((element) {
  if (element != null && element.isNotEmpty) {
    final uniqueDevices = element.toSet().toList();
    listDevice = uniqueDevices;
    listDevice?.sort((a, b) => (b.rssi ?? 0).compareTo(a.rssi ?? 0));
    searchDeviceList.clear();
    listDevice?.forEach((e) {
      searchDeviceList.add(e);
      searchDeviceListTemp = List.from(searchDeviceList);
    });
  }
  update();
}, endScan: () async {
  update();
});

 ///Connecting
sdkManager.connect(blueDevice.device!,connectStateListen: (e){

});
```

## 扫码连接（扫描手表二维码）
```dart
// The QR code on the smartwatch follows a standard format：
// https://app.cheyfit.com/#/code/caB8?mac=F4:4E:FD:34:56:D9&device_id=3021
// Extracting the MAC Address: Decode the QR code to reveal the MAC address, which is initially presented as F4:4E:FD:34:56:D9. Reverse the order to obtain the final address to be transmitted, which is D9:56:34:FD:4E:F4.

sdkManager.scanConnect("D9:56:34:FD:4E:F4",scanBack: (e){
  sdkManager.connect(e.device!,connectStateListen: (e){
     if(e){
       sdkManager.bindingDevice(bind_method.BIND_NORMAL,success: (){
         print("Success");
       },failure: (){
         print("Failure");
       });
     }
  });
},failure: (){

});
```

## 切换设备与手动连接（仅限已绑定设备）
```dart
sdkManager.inTransitionDevice(device,connectStateListen: (e){

});
```

## 设备绑定
```dart
///Direct Binding
sdkManager.bindingDevice(
    bind_method.BIND_NORMAL,
    success: () {
      Common.toast(label: 'Binding successful');
    },
    failure: () {
      Common.toast(label: 'Binding failed');
    });

///Pairing Code Binding
// Step 1 (Obtaining Code)
sdkManager.bindingDevice(bind_method.BIND_PAIRING_CODE,success: (){

},failure: (){

});
// Step 2 (Entering Code)
sdkManager.bindingDevice(bind_method.BIND_PAIRING_CODE,pairCode: utf8.encode("1234").toList(),success: (){

},failure: (){

});
```

## 解绑设备
```dart
sdkManager.bindingDevice(
    bind_method.BIND_REMOVE,
    deviceId: Global.blueDeviceInfo!.device!.id!.id,
    success: () {
      Common.toast(label: 'Unbinding successfully');
      Global.blueDeviceInfo = null;
    },
    failure: () {
      Common.toast(label: 'Unbinding failed');
    });
```

## 获取已绑定设备
```dart
List<BlueDeviceInfo> bindList = await sdkManager.getBindDevice();
```

## 停止扫描
```dart
sdkManager.stopScan();
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum bind_method
{
    BIND_ENCRYPTED = 0; // 授权码验证
    BIND_NORMAL = 1; // 直接绑定
    BIND_REMOVE = 2; // 解除绑定
    BIND_PAIRING_CODE = 3; // 配对码绑定
}

enum bind_flag
{
    BIND_FLAG_REQUEST = 0; // 表示请求绑定
    BIND_FLAG_FAILED = 1; // 失败
    BIND_FLAG_SUCCESS = 2; // 成功
    BIND_FLAG_BOUND = 3; // 已绑定
    BIND_FLAG_SAVE_DATA = 4; // 保存数据
}

enum bind_phone_type
{
    ANDROID = 0; // 安卓
    IOS = 1; // IOS手机
}

message protocol_bind_operate
{
    bind_method bind_method = 1; // 绑定方式
    bind_flag bind_flag = 2; // 绑定标志位
    bind_phone_type bind_phone = 3; // 绑定手机型号
}

message protocol_bind_reply
{
    bind_method bind_method = 1; // 绑定方式
    bind_flag bind_flag = 2; // 绑定标志位
    bytes competent_data = 3; // 授权码
    bytes pairing_code = 4; // 配对码
}
```

### 字段说明

#### `protocol_bind_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `bind_method` | `bind_method` | 绑定方式 |
| `bind_flag` | `bind_flag` | 绑定标志位 |
| `bind_phone` | `bind_phone_type` | 绑定手机型号 |

#### `protocol_bind_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `bind_method` | `bind_method` | 绑定方式 |
| `bind_flag` | `bind_flag` | 绑定标志位 |
| `competent_data` | `bytes` | 授权码 |
| `pairing_code` | `bytes` | 配对码 |

### 枚举值

#### `bind_method`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `BIND_ENCRYPTED` | `0` | 授权码验证 |
| `BIND_NORMAL` | `1` | 直接绑定 |
| `BIND_REMOVE` | `2` | 解除绑定 |
| `BIND_PAIRING_CODE` | `3` | 配对码绑定 |

#### `bind_flag`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `BIND_FLAG_REQUEST` | `0` | 表示请求绑定 |
| `BIND_FLAG_FAILED` | `1` | 失败 |
| `BIND_FLAG_SUCCESS` | `2` | 成功 |
| `BIND_FLAG_BOUND` | `3` | 已绑定 |
| `BIND_FLAG_SAVE_DATA` | `4` | 保存数据 |

#### `bind_phone_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ANDROID` | `0` | 安卓 |
| `IOS` | `1` | IOS手机 |
