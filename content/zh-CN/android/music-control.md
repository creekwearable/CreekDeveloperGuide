---
docId: android-music-control
locale: zh-CN
title: Android 音乐控制
description: 在 Android 中监听并同步音乐播放状态。
platform: Android
slug: android/music-control
order: 130
status: published
version: v2.0
---

# Android 音乐控制

在 Android 中监听并同步音乐播放状态。

设置音乐控制开关、播放状态、进度、音量和曲目信息。

```kotlin
val operate = Music.protocol_music_control_operate()
operate.switchFlag = true
operate.status = Enums.music_status.MUSIC_STATUS_PLAY;
operate.curTime = 0
operate.totalTime = 60
operate.volume = 5
operate.musicName = ByteString.copyFrom("双节棍".toByteArray())
operate.singerName = ByteString.copyFrom("周杰伦".toByteArray())
CreekManager.sInstance.setMusic(model = operate, success = {

}, failure = { _, _ ->

})
```

设备触发音乐控制事件时，`event_key` 含义如下：

| `event_key` | 说明 |
| --- | --- |
| `0` | 播放 |
| `1` | 暂停 |
| `2` | 上一首 |
| `3` | 下一首 |
| `4` | 增大音量 |
| `5` | 减小音量 |
| `6` | 将音量调整为 `event_value` |

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum music_status
{
    MUSIC_STATUS_INVALID = 0;//无效
    MUSIC_STATUS_PLAY = 1;//播放
    MUSIC_STATUS_PAUSE = 2;//暂停
}
 
message protocol_music_control_operate
{
    bool switch_flag = 1; //1bytes 音乐控制开关 true 开启,false 关闭
    music_status status = 2;         //1bytes 状态  
    uint32 cur_time = 3;    //2bytes 当前的播放时间 单位秒
    uint32 total_time = 4; //2bytes 总时间 单位秒
    uint32 volume = 5; //1bytes 音量
    bytes music_name = 6;     //max:64 歌曲名
    bytes singer_name = 7;   //max:64 歌手名
}
```
