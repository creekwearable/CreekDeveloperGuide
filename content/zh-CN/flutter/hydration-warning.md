---
docId: flutter-hydration-warning
locale: zh-CN
title: "Flutter 水合预警"
description: "监听水合预警事件。"
platform: Flutter
slug: flutter/hydration-warning
order: 17
status: published
version: v2.0
---

# Flutter 水合预警

监听水合预警事件。

## 接口示例

```dart
sdkManager.hydrationWarningRemindListen((e) {

});
```

## Protobuf 数据模型

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}
```

```protobuf
enum hydration_level {
  HYDRATION_LEVEL_NONE        = 0;  // 未指定
  HYDRATION_LEVEL_ADEQUATE    = 1;  // 适当，喝水量在健康目标的 0.7 ~ 1.5 倍之间
  HYDRATION_LEVEL_INSUFFICIENT = 2; // 不足，喝水量 小于 健康目标的 0.7 倍
  HYDRATION_LEVEL_EXCESSIVE   = 3;  // 过度，喝水量 大于 健康目标的 1.5 倍
}

message protocol_hydration_warning_remind_operate {
  tran_direction_type tran_type           = 1; // 本次操作的发起方。
  hydration_level hydration_level         = 2;  // 喝水状态等级
  uint32 message_push_time                = 3;  // 消息推送时间
}
```

### 字段说明

#### `protocol_hydration_warning_remind_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `hydration_level` | `hydration_level` | 喝水状态等级 |
| `message_push_time` | `uint32` | 消息推送时间 |

### 枚举值

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |

#### `hydration_level`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HYDRATION_LEVEL_NONE` | `0` | 未指定 |
| `HYDRATION_LEVEL_ADEQUATE` | `1` | 适当，喝水量在健康目标的 0.7 ~ 1.5 倍之间 |
| `HYDRATION_LEVEL_INSUFFICIENT` | `2` | 不足，喝水量 小于 健康目标的 0.7 倍 |
| `HYDRATION_LEVEL_EXCESSIVE` | `3` | 过度，喝水量 大于 健康目标的 1.5 倍 |
