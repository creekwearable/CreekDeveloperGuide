---
docId: flutter-music-control
locale: en-US
title: "Flutter Music Control (Android)"
description: "Publish media state and handle supported music controls on Android."
platform: Flutter
slug: flutter/music-control
order: 127
status: published
version: v2.0
---

# Flutter Music Control (Android)

Publish media state and handle supported music controls on Android.

## SDK Usage
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

## Automatic Media Session Synchronization (Android Demo)
> The Android Demo observes active `MediaSession` instances and keeps the current player state synchronized through `protocol_music_control_operate`. This listener belongs to the Demo.

### Listening conditions
- Notification Access must be enabled because `MediaSessionManager.getActiveSessions()` is queried through the Demo's `NotificationListenerService` component.
- Register `MediaController.Callback` for active sessions and refresh when metadata or playback state changes.
- Prefer the currently playing session; if none is playing, use the first active session.
- Deduplicate identical payloads before calling the SDK.

| **Protocol field** | **Android source** | **Conversion** |
|-|-|-|
| `switchFlag` | Listener state | Set to `true`. |
| `status` | `PlaybackState.state` | `STATE_PLAYING` → `MUSIC_STATUS_PLAY`; otherwise `MUSIC_STATUS_PAUSE`. |
| `curTime` | Playback position | Milliseconds ÷ 1000. |
| `totalTime` | Metadata duration | Milliseconds ÷ 1000. |
| `volume` | Music stream volume | Normalize to 0–100. |
| `musicName` | Media title | UTF-8 encoded. |
| `singerName` | Artist / album artist | UTF-8 encoded. |

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

### Media Control Events (Android Demo)
> Register `sdkManager.noticeUpdateListen` to receive media-control events. The Demo filters `EVENT_ID_MUSIC_CONTROL`, forwards `eventKey` and `eventValue` to Android, and controls the active `MediaSession`.

| eventKey | Action | Android implementation |
|-|-|-|
| 0 | Play | `MediaController.TransportControls.play()` |
| 1 | Pause | `MediaController.TransportControls.pause()` |
| 2 | Previous track | `skipToPrevious()` |
| 3 | Next track | `skipToNext()` |
| 4 | Volume up | `AudioManager.ADJUST_RAISE` on `STREAM_MUSIC` |
| 5 | Volume down | `AudioManager.ADJUST_LOWER` on `STREAM_MUSIC` |
| 6 | Set volume | Treat `eventValue` as 0–100 and convert it to the Android music-stream range. |

```dart
// main.dart: the only global firmware-notice registration.
sdkManager.noticeUpdateListen((notice) {
  CreekLog.info("", "noticeUpdateListen:${notice.toString()}");
  SystemMessageManager.instance.handleFirmwareNotice(notice);
});

// SystemMessageManager: receives only the forwarded notice.
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

- Notification Access must be enabled; otherwise the Demo cannot query active media sessions.
- The Demo selects the playing session first and falls back to the first active session.
- Play, pause, previous, and next return no action when there is no active media session. Volume commands still control the Android music stream.
- After a command, the Demo refreshes the latest media state with `sdkManager.setMusic(...)`.

> **Listener ownership:** `noticeUpdateListen` currently stores one callback, so it must be registered only once in the global initialization in `main.dart`. Route each notice from that callback to the relevant Demo manager. Do not register `noticeUpdateListen` inside `SystemMessageManager` or another page, because a later registration replaces the global callback.

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum music_status {
    MUSIC_STATUS_INVALID = 0; // Invalid
    MUSIC_STATUS_PLAY = 1; // Play
    MUSIC_STATUS_PAUSE = 2; // Pause
}

message protocol_music_control_operate {
    bool switch_flag = 1; // Music control switch (true: on, false: off)
    music_status status = 2; // Status (1 byte)
    uint32 cur_time = 3; // Current playback time in seconds (2 bytes)
    uint32 total_time = 4; // Total time in seconds (2 bytes)
    uint32 volume = 5; // Volume (1 byte)
    bytes music_name = 6; // Music name, max length: 64
    bytes singer_name = 7; // Singer name, max length: 64
}
```

### Field Reference

#### `protocol_music_control_operate`

| Field | Type | Description |
| --- | --- | --- |
| `switch_flag` | `bool` | Music control switch (true: on, false: off) |
| `status` | `music_status` | Status (1 byte) |
| `cur_time` | `uint32` | Current playback time in seconds (2 bytes) |
| `total_time` | `uint32` | Total time in seconds (2 bytes) |
| `volume` | `uint32` | Volume (1 byte) |
| `music_name` | `bytes` | Music name, max length: 64 |
| `singer_name` | `bytes` | Singer name, max length: 64 |

### Enum Values

#### `music_status`

| Value | Number | Description |
| --- | --- | --- |
| `MUSIC_STATUS_INVALID` | `0` | Invalid |
| `MUSIC_STATUS_PLAY` | `1` | Play |
| `MUSIC_STATUS_PAUSE` | `2` | Pause |
