---
docId: flutter-water-assistant
locale: en-US
title: "Flutter Water Assistant"
description: "Read and configure water-assistant records and settings."
platform: Flutter
slug: flutter/water-assistant
order: 121
status: published
version: v2.0
---

# Flutter Water Assistant

Read and configure water-assistant records and settings.

## SDK Usage

```dart
sdkManager.getWaterAssistant(callBack: (e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
},errCallBack: (e){
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

// Enum for operation type
enum operate_type {
    INVALID = 0;   // Invalid operation
    INQUIRE = 1;   // Inquiry
    SET = 2;       // Set
}

// Message representing a timestamp
message water_assistant_time {
    uint32 year = 1; // Year.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    uint32 hour = 4; // Hour.
    uint32 minute = 5; // Minute.
    uint32 second = 6; // Second.
}

// Message representing a time section for reminders
message water_assistant_time_section {
    uint32 start_hour = 1;     // Start time - hour (1 byte)
    uint32 start_minute = 2;   // Start time - minute (1 byte)
    uint32 end_hour = 3;       // End time - hour (1 byte)
    uint32 end_minute = 4;     // End time - minute (1 byte)
}

// Message for water assistant settings
message water_assistant_setting {
    uint32 user_target = 1;    // User target value (2 bytes)
    uint32 interval = 2;       // Reminder interval in minutes (2 bytes)
    bool switch_flag = 3;      // Reminder on/off switch
    repeated water_assistant_time_section time_section = 4; // Up to 8 reminder time sections
}

// Message for daily water consumption status
message water_assistant_daily_status {
    uint32 year = 1; // Year.
    uint32 month = 2; // Month.
    uint32 day = 3; // Day.
    bool status = 4;           // Completion status
    uint32 drink_value = 5;    // Total drinking amount
    uint32 user_target = 6;    // User-set target
}

// Message for water assistant operation request
message protocol_water_assistant_operate {
    operate_type operate = 1;                         // Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte)
    water_assistant_time last_drink_time = 2;         // Last drink time
    repeated water_assistant_daily_status daily_data = 3; // Drinking data for the past 7 days
    water_assistant_setting setting = 4;              // Settings
    uint32 set_utc_time = 5;                          // UTC time of setting record
}

// Message for water assistant inquiry reply
message protocol_water_assistant_inquire_reply {
    uint32 func_table = 1;                            // Function table (1 byte)
    operate_type operate = 2;                         // Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte)
    water_assistant_time last_drink_time = 3;         // Last drink time
    repeated water_assistant_daily_status daily_data = 4; // Drinking data for the past 7 days
    water_assistant_setting setting = 5;              // Settings
    uint32 set_utc_time = 6;                          // UTC time of setting record
}
```

### Field Reference

#### `water_assistant_time`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `hour` | `uint32` | Hour. |
| `minute` | `uint32` | Minute. |
| `second` | `uint32` | Second. |

#### `water_assistant_time_section`

| Field | Type | Description |
| --- | --- | --- |
| `start_hour` | `uint32` | Start time - hour (1 byte) |
| `start_minute` | `uint32` | Start time - minute (1 byte) |
| `end_hour` | `uint32` | End time - hour (1 byte) |
| `end_minute` | `uint32` | End time - minute (1 byte) |

#### `water_assistant_setting`

| Field | Type | Description |
| --- | --- | --- |
| `user_target` | `uint32` | User target value (2 bytes) |
| `interval` | `uint32` | Reminder interval in minutes (2 bytes) |
| `switch_flag` | `bool` | Reminder on/off switch |
| `time_section` | `repeated water_assistant_time_section` | Up to 8 reminder time sections |

#### `water_assistant_daily_status`

| Field | Type | Description |
| --- | --- | --- |
| `year` | `uint32` | Year. |
| `month` | `uint32` | Month. |
| `day` | `uint32` | Day. |
| `status` | `bool` | Completion status |
| `drink_value` | `uint32` | Total drinking amount |
| `user_target` | `uint32` | User-set target |

#### `protocol_water_assistant_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte) |
| `last_drink_time` | `water_assistant_time` | Last drink time |
| `daily_data` | `repeated water_assistant_daily_status` | Drinking data for the past 7 days |
| `setting` | `water_assistant_setting` | Settings |
| `set_utc_time` | `uint32` | UTC time of setting record |

#### `protocol_water_assistant_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | Function table (1 byte) |
| `operate` | `operate_type` | Operation type: 0 - Invalid, 1 - Inquiry, 2 - Set (1 byte) |
| `last_drink_time` | `water_assistant_time` | Last drink time |
| `daily_data` | `repeated water_assistant_daily_status` | Drinking data for the past 7 days |
| `setting` | `water_assistant_setting` | Settings |
| `set_utc_time` | `uint32` | UTC time of setting record |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid operation |
| `INQUIRE` | `1` | Inquiry |
| `SET` | `2` | Set |
