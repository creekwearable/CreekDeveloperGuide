---
docId: android-music-control
locale: en-US
title: Android Music Control
description: Listen for and synchronize music playback state on Android.
platform: Android
slug: android/music-control
order: 130
status: published
version: v2.0
---

# Android Music Control

Listen for and synchronize music playback state on Android.

Set the music-control switch, playback state, progress, volume, and track metadata.

```kotlin
val operate = Music.protocol_music_control_operate()
operate.switchFlag = true
operate.status = Enums.music_status.MUSIC_STATUS_PLAY;
operate.curTime = 0
operate.totalTime = 60
operate.volume = 5
operate.musicName = ByteString.copyFrom("Nunchucks".toByteArray())
operate.singerName = ByteString.copyFrom("Jay Chou".toByteArray())
CreekManager.sInstance.setMusic(model = operate, success = {

}, failure = { _, _ ->

})
```

When the device triggers a music-control event, interpret `event_key` as follows:

| `event_key` | Meaning |
| --- | --- |
| `0` | Play |
| `1` | Pause |
| `2` | Previous track |
| `3` | Next track |
| `4` | Increase volume |
| `5` | Decrease volume |
| `6` | Set the volume to `event_value` |

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum music_status
{
    MUSIC_STATUS_INVALID = 0;// Invalid
    MUSIC_STATUS_PLAY = 1;// Play
    MUSIC_STATUS_PAUSE = 2;// Pause
}
 
message protocol_music_control_operate
{
    bool switch_flag = 1; // 1bytes Music controlSwitch true On,false Off
    music_status status = 2;         // 1bytes State
    uint32 cur_time = 3;    // Cur Time. 2bytes.
    uint32 total_time = 4; // Total Time. 2bytes.
    uint32 volume = 5; // Volume. 1bytes.
    bytes music_name = 6;     // Music Name. max:64.
    bytes singer_name = 7;   // Singer Name. max:64.
}
```
