---
docId: flutter-hydration-warning
locale: en-US
title: "Flutter Hydration Warning"
description: "Listen for hydration warning events."
platform: Flutter
slug: flutter/hydration-warning
order: 17
status: published
version: v2.0
---

# Flutter Hydration Warning

Listen for hydration warning events.

## SDK Usage

```dart
sdkManager.hydrationWarningRemindListen((e) {

});
```

## Protobuf Data Model

```protobuf
enum tran_direction_type {
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}
```

```protobuf
enum hydration_level {
  HYDRATION_LEVEL_NONE        = 0;  // unspecified.
  HYDRATION_LEVEL_ADEQUATE    = 1;  // adequate; water intake is 0.7–1.5 times the health target.
  HYDRATION_LEVEL_INSUFFICIENT = 2; // insufficient; water intake is less than 0.7 times the health target.
  HYDRATION_LEVEL_EXCESSIVE   = 3;  // excessive; water intake is greater than 1.5 times the health target.
}

message protocol_hydration_warning_remind_operate {
  tran_direction_type tran_type           = 1; // Origin of this operation.
  hydration_level hydration_level         = 2;  // hydration level.
  uint32 message_push_time                = 3;  // message push time.
}
```

### Field Reference

#### `protocol_hydration_warning_remind_operate`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `hydration_level` | `hydration_level` | hydration level. |
| `message_push_time` | `uint32` | message push time. |

### Enum Values

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |

#### `hydration_level`

| Value | Number | Description |
| --- | --- | --- |
| `HYDRATION_LEVEL_NONE` | `0` | unspecified. |
| `HYDRATION_LEVEL_ADEQUATE` | `1` | adequate; water intake is 0.7–1.5 times the health target. |
| `HYDRATION_LEVEL_INSUFFICIENT` | `2` | insufficient; water intake is less than 0.7 times the health target. |
| `HYDRATION_LEVEL_EXCESSIVE` | `3` | excessive; water intake is greater than 1.5 times the health target. |
