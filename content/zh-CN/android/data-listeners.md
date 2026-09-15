---
docId: android-data-listeners
locale: zh-CN
title: Android 数据监听
description: 监听固件通知、系统蓝牙状态和固件日志。
platform: Android
slug: android/data-listeners
order: 5
status: published
version: v2.0
---

# Android 数据监听

监听固件通知、系统蓝牙状态和固件日志。

## 设备事件通知

```kotlin
CreekManager.sInstance.noticeUpdateListen {
    Log.w("123456", it.toString())
}
```

### `EVENT_ID_MUSIC_CONTROL`

| event_key | 说明 |
|-|-|
| 0 | 播放 |
| 1 | 暂停 |
| 2 | 上一首 |
| 3 | 下一首 |
| 4 | 音量增大 |
| 5 | 音量减少 |
| 6 | 音量调节（event_value） |

### `EVENT_ID_FINE_PHONE`

| event_key | 说明 |
|-|-|
| 0 | 开始 |
| 1 | 结束 |
| N | 固定响铃N秒 |

### `EVENT_ID_SYNC_DATA`

| event_key | 说明 |
|-|-|
| 0 | 请求天气 |
| 0x01 | 更新闹钟信息 |
| 0x02 | 更新抬腕亮屏 |
| 0x03 | 更新勿扰设置 |
| 0x04 | 更新铃声设置 |
| 0x05 | 更新运动自识别 |
| 0x06 | 更新睡眠 |
| 0x07 | 更新运动记录 |
| 0x08 | 同步健康数据 |
| 0x09 | 通知 ping |
| 0x0a | 更新女性健康 |
| 0x0b | 更新语音助手语言 |
| 0x0c | 更新上报alexa空闲状态 |
| 0x0d | 更新上报alexa闹钟 |
| 0x0e | 更新上报alexa提醒事件 |
| 0x0f | 更新电量变化 |
| 0x10 | 更新动态消息数据 |
| 0x11 | 忽略设备弹窗 |
| 0x12 | 更新运动处方数据 |
| 0x13 | 更新喝水助手 |
| 0x14 | 更新地图坐标 |
| 0x15 | 更新bt蓝牙状态 |
| 0x16 | 更新获取mtu变化 |
| 0x17 | 更新偏好设置 |

### `EVENT_ID_FINE_WATCH`

| event_key | 说明 |
|-|-|
| 0 | 结束 |

### `EVENT_ID_CONTROL_CAMERA`

| event_key | 说明 |
|-|-|
| 0 | 拍照 |

## 系统蓝牙监听

```kotlin
///安卓        
  CreekManager.sInstance.exceptionListen {
    
   }
```

## 固件日志上报

监听固件异常的日志

```kotlin
CreekManager.sInstance.eventReportListen { 
    
}
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum event_id
{
    EVENT_ID_NULL = 0;
    EVENT_ID_MUSIC_CONTROL = 1;//音乐控制
    EVENT_ID_FINE_PHONE = 2; //寻找手机
    EVENT_ID_SYNC_DATA = 3;//通知更新数据
    EVENT_ID_FINE_WATCH = 4;//寻找手表
    EVENT_ID_VOLUME_CHANGE = 5;//音量变化(alexa需要)
}

message protocol_notice_update_operate
{
    event_id event_id = 1; //1bytes 事件id 
    uint32 event_key = 2; //1bytes 具体事件键值
    uint32 event_value = 3;//具体事件数值
}
```
