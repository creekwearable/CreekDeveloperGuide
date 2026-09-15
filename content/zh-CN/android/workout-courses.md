---
docId: android-workout-courses
locale: zh-CN
title: Android 运动课程
description: 上传、查询和删除设备运动课程。
platform: Android
slug: android/workout-courses
order: 135
status: published
version: v2.0
---

# Android 运动课程

上传、查询和删除设备运动课程。

### 上传课程

```kotlin
var model = CourseModel()

model.fileSize = fileData.size
model.fileData = fileData
model.name = "户外跑步"

CreekManager.sInstance.uploadSportCourse(courseModels = listOf(model), uploadProgress = {
    
}, uploadSuccess = {
    
}, uploadFailure = {
    code, message ->
})
```

### 获取课程

```kotlin
CreekManager.sInstance.getCourse(model = {
    
}, failure = {
    code, message ->
})
```

### 删除课程

```kotlin
var operate = Sport.protocol_exercise_course_list_operate()
///item 的对象去获取里面拿
var item = Sport.course_list_item()
operate.listItemsList.add(item)
CreekManager.sInstance.delCourse(model = operate, success = {
    
}, failure = {
    code, message ->
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum operate_course_list_type
{
    INVALID = 0;
    INQUIRE = 1; //查询
    DELETE = 2;  //删除
}

enum course_target_support_type
{
    CONTINUING_TARGET_MANUALLY_LAP = 0;//持续目标 - 手动计圈
    CONTINUING_TARGET_TIME = 1;//持续目标 - 时间
    CONTINUING_TARGET_DISTANCE = 2;//持续目标 - 距离
    CONTINUING_TARGET_CALORIES = 3;//持续目标 - 卡路里
    CONTINUING_TARGET_HEART_RATE = 4;//持续目标 - 心率
    STRENGTH_TARGET_OPEN = 5;//强度目标 - 开放式
    STRENGTH_TARGET_PACE = 6;//强度目标 - 配速
    STRENGTH_TARGET_CADENCE = 7;//强度目标 - 步频
    STRENGTH_TARGET_HEART_RATE_ZONE = 8;//强度目标 心率 - 心率区间
    STRENGTH_TARGET_CUSTOM_RATE_ZONE = 9;//强度目标 -心率 - 自定义心率
    STRENGTH_TARGET_POWER_ZONES = 10;//强度目标 - 功率区间
    STRENGTH_TARGET_RATE_ZONE_RESERVE = 11;//强度目标 -心率 - 储备心率
    STRENGTH_TARGET_RATE_ZONE_MAX = 12;//强度目标 -心率 - 最大心率
    STRENGTH_TARGET_POWER = 13;//强度目标 -功率
}
 
//设置课程数据子项数据
message course_list_item
{
    uint32 id = 1;//课程唯一标识
    uint32 Branch_id = 2;//分支标识
    uint32 Creator_id = 3;//创建者ID
};
 
message protocol_exercise_course_list_operate
{
    operate_course_list_type operate = 1; //1bytes 操作类型 
    repeated course_list_item list_items = 2;
}
 
message protocol_exercise_course_list_inquire_reply
{
    operate_course_list_type operate = 1;     //1bytes操作类型
    uint32 func_table = 2;        //1bytes 功能表
    repeated course_list_item list_items = 3;//max: 暂定50
    repeated course_target_support_type target_support = 4;//运动课程目标支持列表
}
```
