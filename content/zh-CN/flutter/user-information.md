---
docId: flutter-user-information
locale: zh-CN
title: "Flutter 用户信息与偏好"
description: "读取并更新用户资料与偏好字段。"
platform: Flutter
slug: flutter/user-information
order: 103
status: published
version: v2.0
---

# Flutter 用户信息与偏好

读取并更新用户资料与偏好字段。

## 接口示例

```dart
/// 每次设置用户信息前都应先读取现有信息，再修改需要变更的字段。
sdkManager.getUserInfo(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_user_info_operate operate = protocol_user_info_operate();
operate.personalInfo.year = 2024;
operate.perferences.airTempUnit = 1;
sdkManager.setUserInfo(operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // 无效或未指定的值。
    INQUIRE = 1; // 查询
    SET = 2; // 设置
}

enum gender_type
{
    GENDER_MALE = 0; // 男性
    GENDER_FEMALE = 1; // 女性
    GENDER_OTHER = 2; // 其他
}

enum notify_type
{
    ALLOW = 0; // 允许通知
    SILENT = 1; // 静默通知
    CLOSE = 2; // 关闭通知
}

message protocol_personal_info
{
    uint32 height = 1; // 1bytes 身高
    uint32 weight = 2; // 2bytes 体重  kg有小数点，设定值为实际体重的扩大一百倍
    gender_type gender = 3; // 1bytes 性别 0: 男性 1:女性
    uint32 year = 4; // 2bytes //生日年份
    uint32 month = 5; // 1bytes
    uint32 day = 6; // 1bytes
}

message protocol_perferences
{
    uint32 dist_unit = 1; // 1bytes  距离单位0x00：无效 0x01：km， 0x02:mi
    uint32 weight_unit = 2; // 1bytes  体重单位： 0x00：无效，0x01：kg， 0x02:lb， 0x03:英石）
    uint32 air_temp_unit = 3; // 1bytes  天气温度单位 0x00：无效 0x01:℃， 0x02:℉
    uint32 skin_temp_unit = 4; // 1bytes 体温温度单位 0x00：无效 0x01:℃， 0x02:℉
    uint32 is_12hour_format = 5; // 1bytes 时间制式（0x00：无效<br>0x01：24小时制，0x02：12小时制）
    uint32 week_start_day = 6; // 1bytes 周起始日 0x00 星期1,0x01 星期天,,0x02 星期6
    uint32 calorie_unit = 7; // 1bytes 卡路里单位设置 0 无效，  1：默认千卡； 2：大卡； 3：千焦
    uint32 swim_pool_unit = 8; // 1bytes 泳池单位设置 0 无效，  1：默认米； 2：码
    uint32 cycling_unit = 9; // 1bytes 骑行的单位（公里/英里） 0 无效； 1：km 公里； 2：英里 ；
    uint32 walking_running_unit = 10; // 1bytes 步行或者跑步的单位（公里/英里）设置  0 无效； 1：km 公里； 2：英里；
    uint32 stride_unit = 11; // 1bytes 步幅单位
    uint32 height_unit = 12; // 1bytes 身高单位 0x00：无效 0x01，厘米cm 0x02,英寸ft
    uint32 altitude_unit = 13; // 1bytes 海拔高度单位 0x00：无效 0x01，米m 0x02,英尺ft
    uint32 wind_speed_unit = 14; // 1bytes 风速单位 0x00：无效 0x01，米/秒（m/s） 0x02,千米/小时（km/h）
    uint32 visibility_unit = 15; // 1bytes 能见度单位 0x00：无效 0x01,米（m） 0x02,千米（km） 0x03,英里（mi）
}

message protocol_goal_setting
{
    uint32 exercise_min = 1; // 1bytes 锻炼时长目标
    uint32 standing_hour = 2; // 1bytes 站立小时目标
    uint32 kcal = 3; // 2bytes 卡路里目标
    uint32 steps = 4; // 4bytes 步数目标
    uint32 distance = 5; // 4bytes 距离目标 单位米
    uint32 workout_day = 6; // 1bytes 运动天数目标
    bool notify_switch_flag = 7; // 1bytes 目标提醒开关 true 开启,false 关闭
    notify_type notify_flag = 8; // 1bytes 通知类型
}

message protocol_user_info_operate
{
    operate_type operate = 1; // 操作类型 0：无效操作 1：查询 2：设置
    protocol_personal_info personal_info  = 2 ; // 个人信息
    protocol_perferences perferences = 3; // 单位设置
    protocol_goal_setting goal_setting = 4; // 目标设置
}

message protocol_user_info_inquire_reply
{
    uint32 func_table = 1; // 1bytes 功能表
    operate_type operate = 2; // 操作类型 0：无效操作 1：查询 2：设置
    protocol_personal_info personal_info  = 3 ; // 个人信息
    protocol_perferences perferences = 4; // 单位设置
    protocol_goal_setting goal_setting = 5; // 目标设置
}
```

### 字段说明

#### `protocol_personal_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `height` | `uint32` | 1bytes 身高 |
| `weight` | `uint32` | 2bytes 体重  kg有小数点，设定值为实际体重的扩大一百倍 |
| `gender` | `gender_type` | 1bytes 性别 0: 男性 1:女性 |
| `year` | `uint32` | 2bytes //生日年份 |
| `month` | `uint32` | 1bytes |
| `day` | `uint32` | 1bytes |

#### `protocol_perferences`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `dist_unit` | `uint32` | 1bytes  距离单位0x00：无效 0x01：km， 0x02:mi |
| `weight_unit` | `uint32` | 1bytes  体重单位： 0x00：无效，0x01：kg， 0x02:lb， 0x03:英石） |
| `air_temp_unit` | `uint32` | 1bytes  天气温度单位 0x00：无效 0x01:℃， 0x02:℉ |
| `skin_temp_unit` | `uint32` | 1bytes 体温温度单位 0x00：无效 0x01:℃， 0x02:℉ |
| `is_12hour_format` | `uint32` | 1bytes 时间制式（0x00：无效<br>0x01：24小时制，0x02：12小时制） |
| `week_start_day` | `uint32` | 1bytes 周起始日 0x00 星期1,0x01 星期天,,0x02 星期6 |
| `calorie_unit` | `uint32` | 1bytes 卡路里单位设置 0 无效，  1：默认千卡； 2：大卡； 3：千焦 |
| `swim_pool_unit` | `uint32` | 1bytes 泳池单位设置 0 无效，  1：默认米； 2：码 |
| `cycling_unit` | `uint32` | 1bytes 骑行的单位（公里/英里） 0 无效； 1：km 公里； 2：英里 ； |
| `walking_running_unit` | `uint32` | 1bytes 步行或者跑步的单位（公里/英里）设置  0 无效； 1：km 公里； 2：英里； |
| `stride_unit` | `uint32` | 1bytes 步幅单位 |
| `height_unit` | `uint32` | 1bytes 身高单位 0x00：无效 0x01，厘米cm 0x02,英寸ft |
| `altitude_unit` | `uint32` | 1bytes 海拔高度单位 0x00：无效 0x01，米m 0x02,英尺ft |
| `wind_speed_unit` | `uint32` | 1bytes 风速单位 0x00：无效 0x01，米/秒（m/s） 0x02,千米/小时（km/h） |
| `visibility_unit` | `uint32` | 1bytes 能见度单位 0x00：无效 0x01,米（m） 0x02,千米（km） 0x03,英里（mi） |

#### `protocol_goal_setting`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `exercise_min` | `uint32` | 1bytes 锻炼时长目标 |
| `standing_hour` | `uint32` | 1bytes 站立小时目标 |
| `kcal` | `uint32` | 2bytes 卡路里目标 |
| `steps` | `uint32` | 4bytes 步数目标 |
| `distance` | `uint32` | 4bytes 距离目标 单位米 |
| `workout_day` | `uint32` | 1bytes 运动天数目标 |
| `notify_switch_flag` | `bool` | 1bytes 目标提醒开关 true 开启,false 关闭 |
| `notify_flag` | `notify_type` | 1bytes 通知类型 |

#### `protocol_user_info_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 操作类型 0：无效操作 1：查询 2：设置 |
| `personal_info` | `protocol_personal_info` | 个人信息 |
| `perferences` | `protocol_perferences` | 单位设置 |
| `goal_setting` | `protocol_goal_setting` | 目标设置 |

#### `protocol_user_info_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `func_table` | `uint32` | 1bytes 功能表 |
| `operate` | `operate_type` | 操作类型 0：无效操作 1：查询 2：设置 |
| `personal_info` | `protocol_personal_info` | 个人信息 |
| `perferences` | `protocol_perferences` | 单位设置 |
| `goal_setting` | `protocol_goal_setting` | 目标设置 |

### 枚举值

#### `operate_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效或未指定的值。 |
| `INQUIRE` | `1` | 查询 |
| `SET` | `2` | 设置 |

#### `gender_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `GENDER_MALE` | `0` | 男性 |
| `GENDER_FEMALE` | `1` | 女性 |
| `GENDER_OTHER` | `2` | 其他 |

#### `notify_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ALLOW` | `0` | 允许通知 |
| `SILENT` | `1` | 静默通知 |
| `CLOSE` | `2` | 关闭通知 |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持风速单位wind_speed_unit |
| 1 | 是否支持能见度单位visibility_unit |
| 2 | 是否不支持海拔高度单位altitude_unit |
| 3 | 是否支持用户头像user_icon_width，user_icon_height |
| 4 | 是否不支持血压单位blood_pressure_unit |
