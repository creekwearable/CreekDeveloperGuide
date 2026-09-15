---
docId: android-user-information
locale: zh-CN
title: Android 用户信息和偏好设置
description: 读取并更新用户资料、目标和单位偏好。
platform: Android
slug: android/user-information
order: 103
status: published
version: v2.0
---

# Android 用户信息和偏好设置

读取并更新用户资料、目标和单位偏好。

```kotlin
CreekManager.sInstance.getUserInfo({ model: Userinfo.protocol_user_info_operate ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.getUserInfo({ model: Userinfo.protocol_user_info_operate ->
    model.personalInfo.year = 2024
    model.personalInfo.month = 11
    model.goalSetting.workoutDay = 7
    model.goalSetting.steps = 100
    model.goalSetting.notifyFlag = Enums.notify_type.CLOSE
    CreekManager.sInstance.setUserInfo(model = model, {
        textView.text = "success"
    }, failure = { c, m ->
        textView.text = m

    })

}, failure = { _, m ->
    textView.text = m
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

enum gender_type
{
    GENDER_MALE = 0;//男性
    GENDER_FEMALE = 1;//女性
    GENDER_OTHER = 2;//其他
}

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

message protocol_personal_info
{
    uint32 height = 1;     //1bytes 身高
    uint32 weight = 2;    //2bytes 体重  kg有小数点，设定值为实际体重的扩大一百倍
    gender_type gender = 3;    //1bytes 性别 0: 男性 1:女性
    uint32 year = 4;      //2bytes //生日年份
    uint32 month = 5;     //1bytes
    uint32 day = 6;       //1bytes
}

message protocol_perferences
{
    uint32 dist_unit = 1;//1bytes  距离单位0x00：无效 0x01：km， 0x02:mi
    uint32 weight_unit = 2; //1bytes  体重单位： 0x00：无效，0x01：kg， 0x02:lb， 0x03:英石）
    uint32 air_temp_unit = 3;  //1bytes  天气温度单位 0x00：无效 0x01:℃， 0x02:℉
    uint32 skin_temp_unit = 4;  //1bytes 体温温度单位 0x00：无效 0x01:℃， 0x02:℉
    uint32 is_12hour_format = 5;//1bytes 时间制式（0x00：无效<br>0x01：24小时制，0x02：12小时制）
    uint32 week_start_day = 6; //1bytes 周起始日 0x00 星期1,0x01 星期天,,0x02 星期6
    uint32 calorie_unit = 7;//1bytes 卡路里单位设置 0 无效，  1：默认千卡； 2：大卡； 3：千焦
    uint32 swim_pool_unit = 8;//1bytes 泳池单位设置 0 无效，  1：默认米； 2：码
    uint32 cycling_unit = 9;//1bytes 骑行的单位（公里/英里） 0 无效； 1：km 公里； 2：英里 ；
    uint32 walking_running_unit = 10; //1bytes 步行或者跑步的单位（公里/英里）设置  0 无效； 1：km 公里； 2：英里；
    uint32 stride_unit = 11; //1bytes 步幅单位
    uint32 height_unit = 12;//1bytes 身高单位 0x00：无效 0x01，厘米cm 0x02,英寸ft
    uint32 altitude_unit = 13;//1bytes 海拔高度单位 0x00：无效 0x01，米m 0x02,英尺ft
    uint32 wind_speed_unit = 14;//1bytes 风速单位 0x00：无效 0x01，米/秒（m/s） 0x02,千米/小时（km/h）
    uint32 visibility_unit = 15;//1bytes 能见度单位 0x00：无效 0x01,米（m） 0x02,千米（km） 0x03,英里（mi）
    uint32 blood_pressure_unit = 16;//1bytes 血压单位 0x00：无效 0x01,毫米汞柱（mmhg）0x02,千帕（kpa）
}

message protocol_goal_setting
{
    uint32 exercise_min = 1;//1bytes 锻炼时长目标
    uint32 standing_hour = 2;//1bytes 站立小时目标
    uint32 kcal = 3;//2bytes 卡路里目标
    uint32 steps = 4;//4bytes 步数目标
    uint32 distance = 5;//4bytes 距离目标 单位米
    uint32 workout_day = 6;//1bytes 运动天数目标
    bool notify_switch_flag = 7;//1bytes 目标提醒开关 true 开启,false 关闭
    notify_type notify_flag = 8;//1bytes 通知类型
}

message protocol_user_info_operate
{
    operate_type operate = 1; //操作类型 0：无效操作 1：查询 2：设置
    protocol_personal_info personal_info  = 2 ;//个人信息
    protocol_perferences perferences = 3;//单位设置
    protocol_goal_setting goal_setting = 4;//目标设置
}

message protocol_user_info_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    operate_type operate = 2; //操作类型 0：无效操作 1：查询 2：设置
    protocol_personal_info personal_info  = 3 ;//个人信息
    protocol_perferences perferences = 4;//单位设置
    protocol_goal_setting goal_setting = 5;//目标设置
    uint32 user_icon_width = 6;//用户图片宽度
    uint32 user_icon_height = 7;//用户图片高度
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持风速单位wind_speed_unit |
| 1 | 是否支持能见度单位visibility_unit |
| 2 | 是否不支持海拔高度单位altitude_unit |
| 3 | 是否支持用户头像user_icon_width，user_icon_height  |
| 4 | 是否不支持血压单位blood_pressure_unit |
