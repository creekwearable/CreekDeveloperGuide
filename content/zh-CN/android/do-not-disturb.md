---
docId: android-do-not-disturb
locale: zh-CN
title: Android 勿扰
description: 读取并设置设备勿扰模式。
platform: Android
slug: android/do-not-disturb
order: 107
status: published
version: v2.0
---

# Android 勿扰

读取并设置设备勿扰模式。

手机上设置定时勿扰不会在手表上显示，手表上的勿扰开关是最高级的，手表上开启的话，就是全开，手表上关的话，手机上设置的定时勿扰就能生效。

```kotlin
CreekManager.sInstance.getDisturb({ model: Disturb.protocol_disturb_inquire_reply ->
   }, failure = { _, m ->
   
})

var model = Disturb.protocol_disturb_operate()
model.disturbOnOff = true
CreekManager.sInstance.setDisturb(model = model, {
   
}, failure = { _, m ->
    
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

enum switch_type
{
    SWITCH_NULL = 0;//NULL
    SWITCH_ON = 1;//开启
    SWITCH_OFF = 2;//关闭
}

//设置勿扰定时数据子项数据
message protocol_set_disturb_item
{
    uint32 disturb_id = 1;//1bytes 勿扰定时id 从0开始
    uint32 start_hour = 2; //1bytes 开始时间
    uint32 start_minute = 3;//1bytes 
    uint32 end_hour = 4;//1bytes 结束时间
    uint32 end_minute = 5; //1bytes 
    repeated bool repeat = 6; //7bytes 重复 周一~周日
    bool switch_flag = 7;//1bytes 开关  
};

message protocol_disturb_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 2;  //1bytes 勿扰数量
    bool disturb_on_off = 3;  //1bytes //停用 勿扰开关 true 开启,false 关闭 
    repeated protocol_set_disturb_item disturb_item = 4;//max: 5
    switch_type disturb_switch = 5;  //1bytes 勿扰模式功能开关 true 开启,false 关闭
}

message protocol_disturb_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    uint32 disturb_max = 2; //1bytes 勿扰定时支持最大数量
    operate_type operate = 3; //1bytes操作类型 0：无效操作 1：查询 2：设置
    uint32 num = 4;  //1bytes 勿扰定时数量
    bool disturb_on_off = 5;  //1bytes //停用 勿扰状态开关 true 开启,false 关闭
    repeated protocol_set_disturb_item disturb_item = 6;//max: 5
    switch_type disturb_switch = 7;  //1bytes 勿扰模式功能开关 true 开启,false 关闭
}
```
