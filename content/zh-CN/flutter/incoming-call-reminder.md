---
docId: flutter-incoming-call-reminder
locale: zh-CN
title: "Flutter 来电提醒"
description: "配置并处理来电提醒。"
platform: Flutter
slug: flutter/incoming-call-reminder
order: 114
status: published
version: v2.0
---

# Flutter 来电提醒

配置并处理来电提醒。

```dart
// 获取来电提醒设置
sdkManager.getCall(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

// 设置来电提醒
protocol_call_switch operate =  protocol_call_switch();
operate.callSwitch = true;
operate.callDelay = 2;
sdkManager.setCall(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## 未接来电快捷回复（Android）
> Demo 监听电话状态。未接来电结束后，SDK 会创建 `Missed_Call` 通知。仅在已授予 SMS 权限时才启用短信快捷回复。

### 初始化与消息 ID
```dart
// 在应用初始化时调用一次。
sdkManager.registerPhoneState();
```

| **字段** | **值** |
|-|-|
| `remindType` | `message_remind_type.Missed_Call` |
| `contactText` | 优先使用联系人名称，无名称时使用电话号码。 |
| `msgContent` | 电话号码。 |
| `appId` | `missed_call` |
| `msgId` | 仅在已授予 SMS 权限时提供，格式为 `{simSlot}{phoneNumber}`。 |

处理 `replyType == MSG_REPLY_CALL` 的快捷回复事件时，SDK 会解析 `msgId`、选择 SIM 卡槽，并通过 Android `SmsManager` 发送 `sendContent`。

### 权限与能力刷新
- 来电状态：需要电话状态与通话记录权限；联系人权限可选，仅用于显示更准确的来电人名称。
- 未接来电短信回复：需要 `SEND_SMS`；多 SIM 卡选择还可能依赖电话状态权限。
- 基于通知动作的 SMS 快捷回复是另一条路径，不需要 `SEND_SMS`。

> **重要：** SDK 每 30 分钟定期检查应用能力表，但 Demo 不应在权限通过后等待该定时器。SMS 权限请求成功时应立即调用 `sdkManager.appTable()`；应用恢复前台且权限从拒绝变为允许时也应调用。

```dart
Future<void> requestSMSPermission() async {
  smsPermissionGranted = await CreekPermission.requestSmstsStatus();
  if (smsPermissionGranted) {
    await sdkManager.appTable();
  }
}

@override
void didChangeAppLifecycleState(AppLifecycleState state) {
  if (state == AppLifecycleState.resumed) {
    refreshSMSPermission();
  }
}
```

`sdkManager.appTable()` 会根据当前 SMS 权限设置 `callMsgReply` 并刷新应用能力表。设备未连接时方法会安全返回；重连后的连接初始化会再次刷新该表。

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0; // 来电已接
    REJECT_CALL = 1; // 来电已拒
}

enum tran_direction_type
{
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}

// Incoming call configuration
message protocol_call_switch
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; // 1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3; // 1bytes 来电延时 单位秒
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; // 1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3; // 1bytes 来电延时 单位秒
}

// Incoming call reminder
message protocol_call_remind
{
    bytes contact_name = 1; // max:64 联系人名字
    bytes phone_number = 2; // max:32 电话号码
}

// Incoming call status
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    call_status status = 2; // 1bytes 来电状态
}
```

### 字段说明

#### `protocol_call_switch`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `call_switch` | `bool` | 1bytes 来电开关 true 开启 false 关闭 |
| `call_delay` | `uint32` | 1bytes 来电延时 单位秒 |

#### `protocol_call_switch_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `call_switch` | `bool` | 1bytes 来电开关 true 开启 false 关闭 |
| `call_delay` | `uint32` | 1bytes 来电延时 单位秒 |

#### `protocol_call_remind`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `contact_name` | `bytes` | max:64 联系人名字 |
| `phone_number` | `bytes` | max:32 电话号码 |

#### `protocol_call_remind_status`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `status` | `call_status` | 1bytes 来电状态 |

### 枚举值

#### `call_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `RECEIVED_CALL` | `0` | 来电已接 |
| `REJECT_CALL` | `1` | 来电已拒 |

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |
