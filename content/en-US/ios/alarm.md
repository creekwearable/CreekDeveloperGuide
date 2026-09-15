---
docId: ios-alarm
locale: en-US
title: iOS Alarms
description: Retrieve, add, update, and remove device alarms.
platform: iOS
slug: ios/alarm
order: 106
status: published
version: v2.0
---

# iOS Alarms

Retrieve the current alarm list before updating it. To delete an alarm, omit it from the submitted list; to add one, append a new item.

## Retrieve and Update Alarms

```swift
/// Before setting, first retrieve the existing information, then change only the values that need to be updated.

/// For example, alarmItem contains alarms [1, 2, 3]. To delete alarm 2, set only [1, 3]. Adding works similarly: [1, 2, 3, 4].
///

/// Get
CreekInterFace.instance.getAlarm { model in
    var data = protocol_alarm_operate()
    data.alarmItem = model.alarmItem
    var item = protocol_set_alarm_item()
    item.alarmID = 1;
    item.dispStatus = .dispOn
    item.type = .getUp
    item.hour = 22
    item.minute = 30
    item.repeat = [true,true,true,true,true,false,false]
    item.switchFlag = false
    item.laterRemindRepeatTimes = 1
    item.vibrateOnOff = true
    item.name = "abc".data(using: .utf8)!
    data.alarmItem.append(item)
    if model.fromTable().custom_name_list{
        data.customNameList.append("hello".data(using: .utf8)!)
        data.customNameList.append("hello2".data(using: .utf8)!)
    }
    if model.fromTable().later_remind_min{
        item.laterRemindMin = 1
    }

    /// Set
    CreekInterFace.instance.setAlarm(model:data){
        self.view.hideRemark()
        self.textView.text = "success"
    } failure: { code, message in
        self.view.hideRemark()
        self.textView.text = message
    }

} failure: { code, message in

}
```

---

## Alarm Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//Query
    SET = 2;//Set
}

enum disp_status
{
    DISP_OFF = 0;
    DISP_ON = 1;
}

enum alarm_type
{
    GET_UP = 0; //Get up
    SLEEP = 1;//Sleep
}

//Alarm item data for setting an alarm
message protocol_set_alarm_item
{
    uint32 alarm_id = 1;//1bytes Alarm ID, starting from 0
    disp_status disp_status = 2;//1bytes Display status: disp_off means hidden; disp_on means displayed
    alarm_type type = 3; //1bytes Alarm type
    uint32 hour = 4;//1bytes 
    uint32 minute = 5;//1bytes
    bool switch_flag = 6;//1bytes Switch  
    repeated bool repeat = 7; //7bytes Repeat, Monday through Sunday  
    bool later_remind_switch_flag = 8;//Snooze switch
    uint32 later_remind_repeat_times = 9;   //1bytes Number of repeated snooze alarms
    uint32 later_remind_min = 10;    //1bytes Snooze minutes
    bool vibrate_on_off = 11;  //1bytes Alarm vibration switch: 0 off, 1 on
    bytes name = 12;    //max:30 Alarm name
};

message protocol_alarm_operate
{
    operate_type operate = 1; //1bytes Operation type: 0 invalid operation, 1 query, 2 set
    uint32 num = 2;  //1bytes Number of alarms
    repeated protocol_set_alarm_item alarm_item = 3;//max: 20
    repeated bytes custom_name_list = 4;//Previously used custom alarm label options max:10
}

message protocol_alarm_inquire_reply
{
    uint32 func_table = 1;//1bytes Function table
    uint32 alarm_support_max = 2; //1bytes Maximum number of supported alarms
    operate_type operate = 3; //1bytes Operation type: 0 invalid operation, 1 query, 2 set
    uint32 num = 4;  //1bytes Number of alarms
    repeated protocol_set_alarm_item alarm_item = 5;//max: 20
    repeated bytes custom_name_list = 6;//Previously used custom alarm label options max:10
}
```

| `func_table` bit | Description | Corresponding field |
| --- | --- | --- |
| `bit0` | Whether custom modification of snooze minutes is supported | `later_remind_min` |
| `bit1` | Whether previously used custom alarm label options are supported | `custom_name_list` |
| `bit2` | Whether snooze is not supported | — |
