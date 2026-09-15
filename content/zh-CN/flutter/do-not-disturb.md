---
docId: flutter-do-not-disturb
locale: zh-CN
title: "Flutter 勿扰"
description: "读取并配置设备勿扰设置。"
platform: Flutter
slug: flutter/do-not-disturb
order: 107
status: published
version: v2.0
---

# Flutter 勿扰

读取并配置设备勿扰设置。

## 接口示例

在手机端设置定时勿扰后，手表不会显示该时段。手表上的勿扰开关优先级更高：开启时为全天勿扰，关闭时才会按手机端设置的定时勿扰生效。

```dart
/// Retrieve Do Not Disturb
sdkManager.getDisturb(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

/// Set Do Not Disturb
protocol_disturb_operate operate =  protocol_disturb_operate();
operate.disturbOnOff = true;
sdkManager.setDisturb(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum switch_type
{
    SWITCH_NULL = 0; // NULL
    SWITCH_ON = 1; // 开启
    SWITCH_OFF = 2; // 关闭
}

// Set Do Not Disturb (DND) timing data item
message protocol_set_disturb_item
{
    uint32 disturb_id = 1; // 1bytes 勿扰定时id 从0开始
    uint32 start_hour = 2; // 1bytes 开始时间
    uint32 start_minute = 3; // 1bytes
    uint32 end_hour = 4; // 1bytes 结束时间
    uint32 end_minute = 5; // 1bytes
    repeated bool repeat = 6; // 7bytes 重复 周一~周日
    bool switch_flag = 7; // 1bytes 开关
};

message protocol_disturb_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 2; // 1bytes 勿扰数量
    bool disturb_on_off = 3; // 1bytes //停用 勿扰开关 true 开启,false 关闭
    repeated protocol_set_disturb_item disturb_item = 4; // max: 5
    switch_type disturb_switch = 5; // 1bytes 勿扰模式功能开关 true 开启,false 关闭
}

message protocol_disturb_inquire_reply
{
    uint32 func_table = 1; // 1bytes 功能表
    uint32 disturb_max = 2; // 1bytes 勿扰定时支持最大数量
    operate_type operate = 3; // 1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 4; // 1bytes 勿扰定时数量
    bool disturb_on_off = 5; // 1bytes //停用 勿扰状态开关 true 开启,false 关闭
    repeated protocol_set_disturb_item disturb_item = 6; // max: 5
    switch_type disturb_switch = 7; // 1bytes 勿扰模式功能开关 true 开启,false 关闭
}
```

### 字段说明

#### `protocol_set_disturb_item`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `disturb_id` | `uint32` | 1bytes 勿扰定时id 从0开始 |
| `start_hour` | `uint32` | 1bytes 开始时间 |
| `start_minute` | `uint32` | 1bytes |
| `end_hour` | `uint32` | 1bytes 结束时间 |
| `end_minute` | `uint32` | 1bytes |
| `repeat` | `repeated bool` | 7bytes 重复 周一~周日 |
| `switch_flag` | `bool` | 1bytes 开关 |

#### `protocol_disturb_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `num` | `uint32` | 1bytes 勿扰数量 |
| `disturb_on_off` | `bool` | 1bytes //停用 勿扰开关 true 开启,false 关闭 |
| `disturb_item` | `repeated protocol_set_disturb_item` | max: 5 |
| `disturb_switch` | `switch_type` | 1bytes 勿扰模式功能开关 true 开启,false 关闭 |

#### `protocol_disturb_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `disturb_max` | `uint32` | 1bytes 勿扰定时支持最大数量 |
| `operate` | `operate_type` | 1bytes操作类型 0：无效操作 1：查询 2：设置 |
| `num` | `uint32` | 1bytes 勿扰定时数量 |
| `disturb_on_off` | `bool` | 1bytes //停用 勿扰状态开关 true 开启,false 关闭 |
| `disturb_item` | `repeated protocol_set_disturb_item` | max: 5 |
| `disturb_switch` | `switch_type` | 1bytes 勿扰模式功能开关 true 开启,false 关闭 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `switch_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SWITCH_NULL` | `0` | NULL |
| `SWITCH_ON` | `1` | 开启 |
| `SWITCH_OFF` | `2` | 关闭 |
