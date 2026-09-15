---
docId: android-alarm
locale: zh-CN
title: Android 闹钟
description: 读取、添加、更新和删除设备闹钟。
platform: Android
slug: android/alarm
order: 106
status: published
version: v2.0
---

# Android 闹钟

读取、添加、更新和删除设备闹钟。

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

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
}

enum disp_status
{
    DISP_OFF = 0;
    DISP_ON = 1;
}

enum alarm_type
{
    GET_UP = 0; //起床
    SLEEP = 1;//睡觉
}

//设置闹钟数据子项数据
message protocol_set_alarm_item
{
    uint32 alarm_id = 1;//1bytes 闹钟id 从0开始
    disp_status disp_status = 2;//1bytes 显示状态 disp_off不显示 disp_on 显示
    alarm_type type = 3; //1bytes 闹钟类型
    uint32 hour = 4;//1bytes 
    uint32 minute = 5;//1bytes
    bool switch_flag = 6;//1bytes 开关  
    repeated bool repeat = 7; //7bytes 重复 周一~周七  
    bool later_remind_switch_flag = 8;//延迟提醒开关
    uint32 later_remind_repeat_times = 9;   //1bytes 稍后提醒重复闹铃次数
    uint32 later_remind_min = 10;    //1bytes 稍后提醒分钟
    bool vibrate_on_off = 11;  //1bytes 闹钟震动开关 0关闭 1开启
    bytes name = 12;    //max:30 闹钟名称
};

message protocol_alarm_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 2;  //1bytes 闹钟数量
    repeated protocol_set_alarm_item alarm_item = 3;//max: 20
    repeated bytes custom_name_list = 4;//闹钟自定义曾用选项名字 max:10
}

message protocol_alarm_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    uint32 alarm_support_max = 2; //1bytes 闹钟支持最大数量
    operate_type operate = 3; //1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 4;  //1bytes 闹钟数量
    repeated protocol_set_alarm_item alarm_item = 5;//max: 20
    repeated bytes custom_name_list = 6;//闹钟自定义曾用选项名字 max:10
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持稍后提醒分钟自定义修改，字段：later_remind_min |
| 1 | 是否支持闹钟自定义标签曾用选项，字段：custom_name_list |
| 2 | 是否不支持延迟提醒 |
