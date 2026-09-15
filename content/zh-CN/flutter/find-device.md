---
docId: flutter-find-device
locale: zh-CN
title: "Flutter 寻找设备"
description: "启动或停止寻找设备。"
platform: Flutter
slug: flutter/find-device
order: 125
status: published
version: v2.0
---

# Flutter 寻找设备

启动或停止寻找设备。

## 接口示例

```dart
var operate = protocol_find_phone_watch_operate();
operate.findWatchSwitch = true;
operate.findWatchFlag = true;
sdkManager.setFindPhoneWatch(operate: operate,callBack: (){
  Common.toast(label: S.of(Get.context!).successful);
},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_find_phone_watch_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool find_watch_switch = 2; // 1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_flag = 3; // 1bytes 寻找手表 0 停止 1:开始
    bool find_phone_close_flag = 4; // 1bytes 寻找手机关闭 1关闭
}

message protocol_find_phone_watch_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2; // 功能表
    bool find_watch_switch = 3; // 1bytes 寻找手表开关 true 开启,false 关闭
    bool find_watch_support = 4; // 是否支持寻找手表
}
```

### 字段说明

#### `protocol_find_phone_watch_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `find_watch_switch` | `bool` | 1bytes 寻找手表开关 true 开启,false 关闭 |
| `find_watch_flag` | `bool` | 1bytes 寻找手表 0 停止 1:开始 |
| `find_phone_close_flag` | `bool` | 1bytes 寻找手机关闭 1关闭 |

#### `protocol_find_phone_watch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `func_table` | `uint32` | 功能表 |
| `find_watch_switch` | `bool` | 1bytes 寻找手表开关 true 开启,false 关闭 |
| `find_watch_support` | `bool` | 是否支持寻找手表 |
