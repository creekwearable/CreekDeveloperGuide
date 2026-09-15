---
docId: android-medicine-reminder
locale: zh-CN
title: Android 吃药提醒
description: 读取并设置吃药提醒。
platform: Android
slug: android/medicine-reminder
order: 140
status: published
version: v2.0
---

# Android 吃药提醒

读取并设置吃药提醒。

```kotlin
// 获取吃药提醒数据
// 返回 Medicine.protocol_medicine_remind_inquire_reply
CreekManager.sInstance.getMedicineRemind(model = {model ->
    println(model.toString())
}, failure = {c,d->
    println("errCode: $c, errDesc: $d")
})
```

```kotlin
// 设置吃药提醒
/*
24 // 小时格式，开始时间要早于结束时间
startHour，startMinute： // 开始时间：设置小时，设置分钟  例子设置是 11点32分
endHour，endMinute： // 结束时间：设置小时，设置分钟  例子设置是 23点58分
repeatList： // 每周重复星期，七个布尔值，代表从周一到周日 例子中提醒 周一，周三，周五，周日 吃药
interval： // 提醒时间间隔
* */
val medicineOperate = Medicine.protocol_medicine_remind_operate()
medicineOperate.startHour = 11
medicineOperate.startMinute = 32

medicineOperate.endHour = 23
medicineOperate.endMinute = 58

val repeatArr : List<Boolean> = listOf(true, false, true, false,true, false, true)
medicineOperate.repeatList.addAll(repeatArr)
medicineOperate.interval = 5
CreekManager.sInstance.setMedicineReMind(model = medicineOperate, success = {
    println("setMedicineRemind success")
}, failure = {c,d ->
    println("errCode: $c, errDesc: $d")
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

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

message protocol_medicine_remind_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 提醒开关 true 开启,false 关闭
    notify_type notify_flag = 3;//1bytes 通知类型
    uint32 start_hour = 4; //提醒开始时间
    uint32 start_minute = 5;
    uint32 end_hour = 6;   //提醒结束时间
    uint32 end_minute = 7;
    repeated bool repeat = 8; //1bytes 重复周期 周一~周日
    uint32 interval = 9;  //2bytes 提醒间隔,单位分钟
}

message protocol_medicine_remind_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 3; //1bytes 提醒开关 true 开启,false 关闭
    notify_type notify_flag = 4;//1bytes 通知类型 
    uint32 start_hour = 5; //提醒开始时间
    uint32 start_minute = 6;
    uint32 end_hour = 7;   //提醒结束时间
    uint32 end_minute = 8;
    repeated bool repeat = 9; //1bytes 重复周期 周一~周日
    uint32 interval = 10;  //2bytes 提醒间隔,单位分钟
}
```
