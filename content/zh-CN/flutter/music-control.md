---
docId: flutter-music-control
locale: zh-CN
title: "Flutter 音乐控制（Android）"
description: "在 Android 上同步媒体状态并处理支持的音乐控制。"
platform: Flutter
slug: flutter/music-control
order: 127
status: published
version: v2.0
---

# Flutter 音乐控制（Android）

在 Android 上同步媒体状态并处理支持的音乐控制。

## SDK 用法
```dart
protocol_music_control_operate operate = protocol_music_control_operate();
operate.switchFlag = true;
operate.status = music_status.MUSIC_STATUS_PLAY;
operate.curTime = 0;
operate.totalTime = 60;
operate.volume = 5;
operate.musicName = utf8.encode("hello");
operate.singerName = utf8.encode("adele");
sdkManager.setMusic(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## 媒体会话自动同步（Android Demo）
> Android Demo 监听活动的 `MediaSession` 实例，并通过 `protocol_music_control_operate` 保持当前播放状态同步。该监听器属于 Demo。

### 监听条件
- 必须开启通知使用权，因为 Demo 通过 `NotificationListenerService` 组件调用 `MediaSessionManager.getActiveSessions()`。
- 为活动会话注册 `MediaController.Callback`，并在元数据或播放状态变化时刷新。
- 优先使用正在播放的会话；如果没有正在播放的会话，则使用第一个活动会话。
- 调用 SDK 前应对完全相同的数据去重。

| **协议字段** | **Android 来源** | **转换规则** |
|-|-|-|
| `switchFlag` | 监听器状态 | 设为 `true`。 |
| `status` | `PlaybackState.state` | `STATE_PLAYING` 映射为 `MUSIC_STATUS_PLAY`，其他状态映射为 `MUSIC_STATUS_PAUSE`。 |
| `curTime` | 播放位置 | 毫秒值除以 1000。 |
| `totalTime` | 元数据时长 | 毫秒值除以 1000。 |
| `volume` | 音乐流音量 | 归一化到 0–100。 |
| `musicName` | 媒体标题 | 使用 UTF-8 编码。 |
| `singerName` | 艺人 / 专辑艺人 | 使用 UTF-8 编码。 |

```dart
sdkManager.setMusic(
  operate: protocol_music_control_operate()
    ..switchFlag = true
    ..status = isPlaying
        ? music_status.MUSIC_STATUS_PLAY
        : music_status.MUSIC_STATUS_PAUSE
    ..curTime = positionMs ~/ 1000
    ..totalTime = durationMs ~/ 1000
    ..volume = volume.clamp(0, 100)
    ..musicName = utf8.encode(title)
    ..singerName = utf8.encode(artist),
);
```

### 媒体控制事件（Android Demo）
> 注册 `sdkManager.noticeUpdateListen` 以接收媒体控制事件。Demo 筛选 `EVENT_ID_MUSIC_CONTROL`，将 `eventKey` 和 `eventValue` 转交 Android，再控制当前活动的 `MediaSession`。

| `eventKey` | 动作 | Android 实现 |
|-|-|-|
| 0 | 播放 | `MediaController.TransportControls.play()` |
| 1 | 暂停 | `MediaController.TransportControls.pause()` |
| 2 | 上一首 | `skipToPrevious()` |
| 3 | 下一首 | `skipToNext()` |
| 4 | 增大音量 | 对 `STREAM_MUSIC` 执行 `AudioManager.ADJUST_RAISE` |
| 5 | 减小音量 | 对 `STREAM_MUSIC` 执行 `AudioManager.ADJUST_LOWER` |
| 6 | 设置音量 | 将 `eventValue` 按 0–100 处理，并转换到 Android 音乐流范围。 |

```dart
// `main.dart`：唯一的全局通知监听注册点。
sdkManager.noticeUpdateListen((notice) {
  CreekLog.info("", "noticeUpdateListen:${notice.toString()}");
  SystemMessageManager.instance.handleFirmwareNotice(notice);
});

// `SystemMessageManager`：仅处理转发后的通知。
void handleFirmwareNotice(protocol_notice_update_operate notice) {
  if (notice.eventId != event_id.EVENT_ID_MUSIC_CONTROL) return;
  unawaited(
    _methods.invokeMethod<bool>('controlMedia', {
      'eventKey': notice.eventKey,
      'eventValue': notice.eventValue,
    }).catchError((Object _) => false),
  );
}
```

- 必须开启通知使用权，否则 Demo 无法查询活动媒体会话。
- Demo 优先选择正在播放的会话，否则退回到第一个活动会话。
- 没有活动媒体会话时，播放、暂停、上一首与下一首不执行动作；音量命令仍会控制 Android 音乐流。
- 执行命令后，Demo 通过 `sdkManager.setMusic(...)` 刷新最新媒体状态。

> **监听器归属：** `noticeUpdateListen` 当前只保存一个回调，因此必须在 `main.dart` 的全局初始化中且仅注册一次。由该回调将事件路由到对应 Demo 管理器。不要在 `SystemMessageManager` 或其他页面再次注册，否则后一次注册会覆盖全局回调。

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum music_status {
    MUSIC_STATUS_INVALID = 0; // 无效
    MUSIC_STATUS_PLAY = 1; // 播放
    MUSIC_STATUS_PAUSE = 2; // 暂停
}

message protocol_music_control_operate {
    bool switch_flag = 1; // 1bytes 音乐控制开关 true 开启,false 关闭
    music_status status = 2; // 1bytes 状态
    uint32 cur_time = 3; // 2bytes 当前的播放时间 单位秒
    uint32 total_time = 4; // 2bytes 总时间 单位秒
    uint32 volume = 5; // 1bytes 音量
    bytes music_name = 6; // max:64 歌曲名
    bytes singer_name = 7; // max:64 歌手名
}
```

### 字段说明

#### `protocol_music_control_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `switch_flag` | `bool` | 1bytes 音乐控制开关 true 开启,false 关闭 |
| `status` | `music_status` | 1bytes 状态 |
| `cur_time` | `uint32` | 2bytes 当前的播放时间 单位秒 |
| `total_time` | `uint32` | 2bytes 总时间 单位秒 |
| `volume` | `uint32` | 1bytes 音量 |
| `music_name` | `bytes` | max:64 歌曲名 |
| `singer_name` | `bytes` | max:64 歌手名 |

### 枚举值

#### `music_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `MUSIC_STATUS_INVALID` | `0` | 无效 |
| `MUSIC_STATUS_PLAY` | `1` | 播放 |
| `MUSIC_STATUS_PAUSE` | `2` | 暂停 |
