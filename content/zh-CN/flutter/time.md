---
docId: flutter-time
locale: zh-CN
title: "Flutter 时间"
description: "同步手机时间并读取设备时间。"
platform: Flutter
slug: flutter/time
order: 102
status: published
version: v2.0
---

# Flutter 时间

同步手机时间并读取设备时间。

## 接口示例

```dart
/// Synchronize the phone time to the watch. This method can be called without the need for manual invocation. The internal synchronization of time will occur automatically during the synchronization of health data.
sdkManager.syncTime(callBack: () {

},errCallBack: (msg){

});

/// Get the watch time
sdkManager.getTime(callBack: (e) {

}, errCallBack: (e) {

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type {
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

message protocol_time {
    uint32 year = 1; // 2bytes
    uint32 month = 2; // 1bytes
    uint32 day = 3; // 1bytes
    uint32 hour = 4; // 1bytes
    uint32 minute = 5; // 1bytes
    uint32 second = 6; // 1bytes
    uint32 week = 7; // 1bytes 0~6 星期一~星期日
    uint32 utc_time = 8; // 4bytes
    uint32 time_zone = 9; // 4bytes 用24时区的，手机端的获取时区是整数，0-12东，13-24西 单位分钟，例如东八区：8*60
}

message protocol_device_time_operate {
    operate_type operate = 1; // 操作类型 0：无效操作 1：查询 2：设置
    protocol_time time = 2; // 时间戳的日期与时间分量。
}

message protocol_device_time_inquire_reply {
    operate_type operate = 1; // 操作类型 0：无效操作 1：查询 2：设置
    protocol_time time = 2; // 时间戳的日期与时间分量。
}
```

### 字段说明

#### `protocol_time`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `year` | `uint32` | 2bytes |
| `month` | `uint32` | 1bytes |
| `day` | `uint32` | 1bytes |
| `hour` | `uint32` | 1bytes |
| `minute` | `uint32` | 1bytes |
| `second` | `uint32` | 1bytes |
| `week` | `uint32` | 1bytes 0~6 星期一~星期日 |
| `utc_time` | `uint32` | 4bytes |
| `time_zone` | `uint32` | 4bytes 用24时区的，手机端的获取时区是整数，0-12东，13-24西 单位分钟，例如东八区：8*60 |

#### `protocol_device_time_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 0：无效操作 1：查询 2：设置 |
| `time` | `protocol_time` | 时间戳的日期与时间分量。 |

#### `protocol_device_time_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 0：无效操作 1：查询 2：设置 |
| `time` | `protocol_time` | 时间戳的日期与时间分量。 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |
