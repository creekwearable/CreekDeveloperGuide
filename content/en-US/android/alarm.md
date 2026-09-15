---
docId: android-alarm
locale: en-US
title: Android Alarms
description: Read, add, update, and remove device alarms.
platform: Android
slug: android/alarm
order: 106
status: published
version: v2.0
---

# Android Alarms

Read, add, update, and remove device alarms.

```kotlin
CreekManager.sInstance.getAlarm({ model: Alarm.protocol_alarm_inquire_reply ->
    var data = Alarm.protocol_alarm_operate()
    data.addAllAlarmItem(model.alarmItemList)
    var item = Alarm.protocol_set_alarm_item()
    item.alarmId = 1;
    item.dispStatus = Enums.disp_status.DISP_ON
    item.type = Enums.alarm_type.GET_UP
    item.hour = 22
    item.minute = 30
    item.addAllRepeat(listOf(true, true, true, true, true, false, false))
    item.switchFlag = false
    item.laterRemindRepeatTimes = 1
    item.vibrateOnOff = true
    item.name = ByteString.copyFrom("abc".toByteArray())
    if(model.fromTable().later_remind_min){
        item.laterRemindMin = 1

    }
    data.addAlarmItem(item)
    if(model.fromTable().custom_name_list){
        data.addCustomNameList(ByteString.copyFrom("hello".toByteArray()))
        data.addCustomNameList(ByteString.copyFrom("hello2".toByteArray()))
    }
  
    CreekManager.sInstance.setAlarm(model = data, {
        responseText.value = "success"
    }, failure = { c, m ->
        responseText.value = m

    })

}, failure = { _, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
}

enum disp_status
{
    DISP_OFF = 0;
    DISP_ON = 1;
}

enum alarm_type
{
    GET_UP = 0; // Wake up
    SLEEP = 1;// Sleep
}

message protocol_set_alarm_item
{
    uint32 alarm_id = 1;// Alarm Id. 1bytes.
    disp_status disp_status = 2;// 1bytes Display status disp_offHidden disp_on Shown
    alarm_type type = 3; // 1bytes AlarmType
    uint32 hour = 4;// 1bytes
    uint32 minute = 5;// 1bytes
    bool switch_flag = 6;// 1bytes Switch
    repeated bool repeat = 7; // Repeat. 7bytes.
    bool later_remind_switch_flag = 8;// Later Remind Switch Flag switch.
    uint32 later_remind_repeat_times = 9;   // Later Remind Repeat Times. 1bytes.
    uint32 later_remind_min = 10;    // 1bytes SnoozeMinute
    bool vibrate_on_off = 11;  // Vibrate On Off switch. 1bytes.
    bytes name = 12;    // max:30 AlarmName
};

message protocol_alarm_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    uint32 num = 2;  // 1bytes AlarmCount
    repeated protocol_set_alarm_item alarm_item = 3;// max: 20
    repeated bytes custom_name_list = 4;// Custom Name List. max:10.
}

message protocol_alarm_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    uint32 alarm_support_max = 2; // 1bytes AlarmSupportedMaximum count
    operate_type operate = 3; // 1bytesOperation type 0: Invalid operation 1: Query 2: Set
    uint32 num = 4;  // 1bytes AlarmCount
    repeated protocol_set_alarm_item alarm_item = 5;// max: 20
    repeated bytes custom_name_list = 6;// Custom Name List. max:10.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether custom snooze minutes are supported, Field: later_remind_min |
| 1 | Whether previously used custom alarm labels are supported, Field: custom_name_list |
| 2 | Whether snooze is unsupported |
