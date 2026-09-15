---
docId: flutter-world-clock
locale: zh-CN
title: "Flutter 世界时钟"
description: "读取并配置世界时钟条目。"
platform: Flutter
slug: flutter/world-clock
order: 118
status: published
version: v2.0
---

# Flutter 世界时钟

读取并配置世界时钟条目。

## 接口示例

```dart
sdkManager.getMonitor(healthType: health_type.HEART_RATE,callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

 protocol_world_time_operate operate =  protocol_world_time_operate();
 protocol_world_time_item  item = protocol_world_time_item();
 item.cityName = utf8.encode('shenzheng');
 item.offestMin = 180;
sdkManager.setWorldTime(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message protocol_world_time_item {
    int32 offset_min = 1; // 4bytes Offset in 分钟
    bytes city_name = 2; // max:32 城市名称
}

message protocol_world_time_operate {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    repeated protocol_world_time_item world_time_item = 2; // 世界时间
}

message protocol_world_time_inquire_reply {
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 world_time_support_max = 2; // 1bytes Maximum number of supported world time displays
    repeated protocol_world_time_item world_time_item = 3; // 世界时间
}
```

### 字段说明

#### `protocol_world_time_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `offset_min` | `int32` | 4bytes Offset in 分钟 |
| `city_name` | `bytes` | max:32 城市名称 |

#### `protocol_world_time_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `world_time_item` | `repeated protocol_world_time_item` | 世界时间 |

#### `protocol_world_time_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `world_time_support_max` | `uint32` | 1bytes Maximum number of supported world time displays |
| `world_time_item` | `repeated protocol_world_time_item` | 世界时间 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持自定义时差值分钟，用于展示 |
