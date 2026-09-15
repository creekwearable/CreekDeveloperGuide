---
docId: ios-data-listeners
locale: zh-CN
title: iOS 数据监听
description: 监听固件通知、系统蓝牙状态和设备日志事件。
platform: iOS
slug: ios/data-listeners
order: 5
status: published
version: v2.0
---

# iOS 数据监听

## 功能说明

通过全局回调监听设备功能通知、需要用户处理的蓝牙异常，以及固件日志事件。

## 固件功能通知

```swift
CreekInterFace.instance.noticeUpdateListen { model in
    switch model.eventId {
    case .EVENT_ID_MUSIC_CONTROL:
        print("Music event: \(model.eventKey), value: \(model.eventValue)")
    case .EVENT_ID_SYNC_DATA:
        print("Synchronization event: \(model.eventKey)")
    default:
        break
    }
}
```

### EVENT_ID_MUSIC_CONTROL

| `event_key` | 含义 |
|---:|---|
| 0 | 播放 |
| 1 | 暂停 |
| 2 | 上一首 |
| 3 | 下一首 |
| 4 | 增大音量 |
| 5 | 减小音量 |
| 6 | 调节音量，具体数值读取 `event_value` |

### EVENT_ID_FINE_PHONE

| `event_key` | 含义 |
|---:|---|
| 0 | 开始寻找手机 |
| 1 | 结束寻找手机 |
| N | 手机固定响铃 N 秒 |

### EVENT_ID_SYNC_DATA

| `event_key` | 含义 |
|---:|---|
| 0x00 | 请求天气 |
| 0x01 | 更新闹钟信息 |
| 0x02 | 更新抬腕亮屏设置 |
| 0x03 | 更新勿扰设置 |
| 0x04 | 更新铃声设置 |
| 0x05 | 更新运动自识别设置 |
| 0x06 | 更新睡眠数据 |
| 0x07 | 更新运动记录 |
| 0x08 | 同步健康数据 |
| 0x09 | Ping 通知 |
| 0x0A | 更新女性健康数据 |
| 0x0B | 更新语音助手语言 |
| 0x0C | 上报 Alexa 空闲状态 |
| 0x0D | 上报 Alexa 闹钟 |
| 0x0E | 上报 Alexa 提醒事件 |
| 0x0F | 更新电量变化 |
| 0x10 | 通知消息更新（动态消息） |
| 0x11 | 通知忽略设备弹窗 |
| 0x12 | 上报运动处方数据 |
| 0x13 | 更新喝水助手 |
| 0x14 | 更新地图坐标 |
| 0x15 | 更新经典蓝牙状态 |
| 0x16 | 更新 MTU 变化 |
| 0x17 | 更新偏好设置 |

### 其他事件

| `event_id` | `event_key` | 含义 |
|---|---:|---|
| `EVENT_ID_FINE_WATCH` | 0 | 结束寻找手表 |
| `EVENT_ID_VOLUME_CHANGE` | N | 当前音量值 |
| `EVENT_ID_CONTROL_CAMERA` | 0 | 控制 iOS 拍照 |
| `EVENT_ID_LOG_CONTROL` | 0 | 无操作 |
| `EVENT_ID_LOG_CONTROL` | 1 | 普通日志 |
| `EVENT_ID_LOG_CONTROL` | 2 | 复位日志 |
| `EVENT_ID_LOG_CONTROL` | 3 | Core dump 二进制日志 |

## 蓝牙异常监听

```swift
CreekInterFace.instance.exceptionListen { message in
    if message.contains("Peer removed pairing information") {
        // 提示用户在 iOS 蓝牙设置中移除旧配对后重试。
    }

    if message.contains("The watch turned on heart rate push") {
        // 提示用户关闭设备的心率推送后重新连接。
    }
}
```

## 固件日志事件

```swift
CreekInterFace.instance.eventReportListen { model in
    print(model.eventId ?? "")
    print(model.subId ?? "")
    print(model.time ?? "")
    print(model.message ?? "")
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum event_id
{
    EVENT_ID_NULL = 0;//无事件
    EVENT_ID_MUSIC_CONTROL = 1;//音乐控制
    EVENT_ID_FINE_PHONE = 2;//寻找手机
    EVENT_ID_SYNC_DATA = 3;//同步或更新数据
    EVENT_ID_FINE_WATCH = 4;//寻找手表
    EVENT_ID_VOLUME_CHANGE = 5;//音量变化
    EVENT_ID_CONTROL_CAMERA = 6;//控制拍照
    EVENT_ID_LOG_CONTROL = 7;//日志传输通知
}

message protocol_notice_update_operate
{
    event_id event_id = 1;//事件类型
    uint32 event_key = 2;//该事件下的具体操作
    uint32 event_value = 3;//事件携带的数值
}

message protocol_event_report
{
    string event_id = 1;//事件 ID
    string event_sub_id = 2;//事件子 ID
    string event_time = 3;//事件发生时间
    string event_message = 4;//事件消息体
}
```
