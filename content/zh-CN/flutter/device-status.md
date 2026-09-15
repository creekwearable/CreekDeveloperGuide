---
docId: flutter-device-status
locale: zh-CN
title: "Flutter 设备状态"
description: "读取电量、充电、佩戴及其他设备状态字段。"
platform: Flutter
slug: flutter/device-status
order: 132
status: published
version: v2.0
---

# Flutter 设备状态

读取电量、充电、佩戴及其他设备状态字段。

## 接口示例

```dart
sdkManager.getDeviceStatus(callBack: (e) {
  SmartDialog.dismiss();
}, errCallBack: (e) {
  SmartDialog.dismiss();
});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum device_status_type
{
    sport_status = 0; // 运动状态
}

message protocol_device_status_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2; // 设备状态类型
}

message protocol_device_status_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    device_status_type status_type = 2; // 设备状态类型
    uint32 value = 3; // 0 未开启。1进行中
}
```

### 字段说明

#### `protocol_device_status_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `status_type` | `device_status_type` | 设备状态类型 |

#### `protocol_device_status_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `status_type` | `device_status_type` | 设备状态类型 |
| `value` | `uint32` | 0 未开启。1进行中 |

### 枚举值

#### `device_status_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `sport_status` | `0` | 运动状态 |
