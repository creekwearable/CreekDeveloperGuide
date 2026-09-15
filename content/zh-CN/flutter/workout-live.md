---
docId: flutter-workout-live
locale: zh-CN
title: "Flutter 设备发起运动与运动实况"
description: "处理运动控制、运动实况数据与 GPS 请求。"
platform: Flutter
slug: flutter/workout-live
order: 128
status: published
version: v2.0
---

# Flutter 设备发起运动与运动实况

处理运动控制、运动实况数据与 GPS 请求。

## 接口示例

戒指和手环没有 GPS 芯片。运动开始后，应用需持续提供实时定位信息。

```dart
/// liveSportDataListen、liveSportControlListen、sportGpsListen
///It needs to be listened for at the global level.
 ///workout status monitoring
sdkManager.sportControlListen((e){
  if (Get.isRegistered<SportControlPageController>()) {
    final page = Get.find<SportControlPageController>();
    page.operate = e;
    page.update();
  }
});

 ///workout data monitoring
sdkManager.sportLiveListen ((e){
  if (Get.isRegistered<SportControlPageController>()) {
    final page = Get.find<SportControlPageController>();
    page.liveData = e.toString();
    page.update();
  }
});

///Get supported sport types
sdkManager.getSupportSportType(callBack: (e){
  sportTypeList = e.supportType.map((e) => e.value).toList();
  if(sportTypeList.isNotEmpty){
    selectSportType(sportTypeList.first);
  }
}, errCallBack: (e){

});

 ///Devices without a GPS chip need to be monitored, while those with a GPS chip do not.
sdkManager.sportGPSListen((e) async{
  CreekLog.info("*****************${e.gpsOperate.toString()}");
  if (e.gpsOperate == gps_operate_type.GPS_INFO_INQUIRE) {
    GPSModel model = GPSModel();
    model.longitude =  (114.027986 * 1000000).toInt();
    model.latitude =  (22.543060 * 1000000).toInt();
    model.gpsPermission = true;
    return model;
  }
  return null;
});

///Start workout (the watch does not support starting a workout actively, but the ring does).
sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_START..sportType=sport_type.ORUN)

 ///Pause workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_PAUSE)
 ///Resume workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_RESUME)
 ///End workout
 sdkManager.setSportControl(operate: protocol_exercise_control_operate()..controlType = exercise_control_type.CONTROL_END)

foundationCommand.setSportControl(
    operate: protocol_exercise_control_operate()
      ..controlType = type
      ..sportType = sportType ?? sport_type.ORUN
      ..actionType = actionType ?? selectedControlActionType
      ..swimTripTotalDistance = swimTripTotalDistance!.value,
    callBack:  (){

    },errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0; // 操作由手表发起。
    APP_TRAN = 1; // 操作由应用发起。
}
enum Segments_type
{
   HYROX_RUN = 0; // HYROX 跑步阶段。
   HYROX_WORKOUT =1; // HYROX 功能站阶段。
   HYROX_RESET = 2; // HYROX 重置阶段。
   HYROX_SWIM = 3; // HYROX 游泳阶段。
   HYROX_BIKE = 4; // HYROX 骑行阶段。
   HYROX_TRANSITION = 5; // HYROX 转换阶段。
}

message segments_data
{
    Segments_type type = 1; // 分段类型
    sport_type sporttype = 2; // 运动类型。
    uint32  group_id = 3; // 分组 ID。
    uint32  avg_hr = 4; // 平均心率。
    uint32  order = 5; // 显示或处理顺序。
    uint32  calories = 6; // 消耗的卡路里。
    uint32  duration = 7; // 持续时长。
}

enum StepType{
    STEP_TYPE_WARM_UP = 0; // 热身
    STEP_TYPE_TRAIN = 1; // 训练
    STEP_TYPE_RECOVERY = 2; // 恢复
    STEP_TYPE_REST = 3; // 休息
    STEP_TYPE_COOL_DOWN = 4; // 缓和
    STEP_TYPE_OTHER = 5; // 其他运动步骤类型。
}

enum continuing_target
{
    CONTINUING_TARGET_MANUALLY_LAP = 0; // 持续目标 - 手动计圈
    CONTINUING_TARGET_TIME = 1; // 持续目标 - 时间
    CONTINUING_TARGET_DISTANCE = 2; // 持续目标 - 距离
    CONTINUING_TARGET_CALORIES = 3; // 持续目标 - 卡路里
}

enum strength_target
{
    STRENGTH_TARGET2_OPEN = 0; // 强度目标 - 开放式
    STRENGTH_TARGET2_PACE = 1; // 强度目标 - 配速
    STRENGTH_TARGET2_CADENCE = 2; // 强度目标 - 步频
    STRENGTH_TARGET2_HEART_RATE_ZONE = 3; // 强度目标 心率 - 心率区间
    STRENGTH_TARGET2_CUSTOM_RATE_ZONE = 4; // 心率 - 自定义心率
    STRENGTH_TARGET2_POWER_ZONES = 5; // 强度目标 - 功率区间
    STRENGTH_TARGET2_RATE_ZONE_RESERVE = 6; // 心率 - 储备心率
    STRENGTH_TARGET2_RATE_ZONE_MAX = 7; // 心率 - 最大心率
}

message workout_course
{
    uint32 action_id = 1; // 动作指导id
    uint32 durations = 2; // 阶段的时长
    sport_type type = 3; // 运动类型
    bytes name = 4; // 名称
    continuing_target ct_type = 5; // 持续目标类型
    strength_target st_type = 6; // 强度目标类型
    uint32 ct_value = 7; // 持续目标值
    uint32 st_max = 8; // 强度目标最大值
    uint32 st_min = 9; // 强度目标最小值
    uint32 avg_st_value = 10; // 平均强度值，根据强度目标类型得出
    uint32 extre_value_max = 11; // 极值强度 最大值
    uint32 extre_value_min = 12; // 极值强度 最大值
    uint32 complete_rate = 13; // 保留两位小数，实际值扩大一百倍
    StepType steptype = 14; // 步骤类型
}

message gomore_realtime_data {
  uint32 rest_calories = 1;      // 静止消耗卡路里（运动实时） kcal，×10000
  uint32 MET = 2;                // 实时代谢当量 MET，×10000
  uint32 METs_0 = 3;             // 久坐不动 MET，×10000
  uint32 METs_1 = 4;             // 轻度活动 MET，×10000
  uint32 METs_2 = 5;             // 中度活动 MET，×10000
  uint32 METs_3 = 6;            // 活力活动 MET，×10000
  uint32 METs_4 = 7;            // 高强度锻炼 MET，×10000
  uint32 fatPerc = 8;            // 脂肪供能消耗，kcal，×10000
  uint32 carbPerc = 9;           // 碳水供能消耗，kcal，×10000
}

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    sport_type sport_type = 2; // 运动类型
    uint32 total_durations = 3; // 运动时长； 单位： s
    uint32 km_pace = 4; // 公里配速
    uint32 avg_km_pace = 5; // 平均公里配速
    uint32 mi_pace = 6; // 英里配速
    uint32 avg_mi_pace = 7; // 平均英里配速
    uint32 km_speed = 8; // 公里速度 km/h  固件扩大100倍
    uint32 avg_km_speed = 9; // 平均公里速度 km/h  固件扩大100倍
    uint32 mi_speed = 10; // 英里速度 mi/h  固件 扩大100倍
    uint32 avg_mi_speed = 11; // 平均英里速度 mi/h  固件扩大100倍
    uint32 total_distance = 12; // 距离；单位： m
    int32 latitude = 13; // 纬度 负数:S南纬  正数：N北纬 放大1000000倍
    int32 longitude = 14; // 经度 负数:W西经  正数：E东经 放大1000000倍
    int32 elevation = 15; // 海拔数据 单位：米
    uint32 step_stride = 16; // 步幅
    uint32 step_frequency = 17; // 步频 单位步/分钟
    uint32 total_climb_height = 18; // 累计爬升高度 单位：米
    uint32 hr_value = 19; // 心率值
    uint32 max_hr_value = 20; // 最大心率值
    uint32 min_hr_value = 21; // 最小心率值
    uint32 total_calories = 22; // 总卡路里
    uint32 lap_count = 23; // 分段次数
    uint32 lap_duration = 24; // 分段时长
    uint32 lap_distance = 25; // 分段距离
    uint32 lap_km_pace_speed = 26; // 平均公里配速/速度，骑行类的用速度，其他是配速
    uint32 lap_mi_pace_speed = 27; // 平均英里配速/速度 骑行类的用速度，其他是配速
    uint32 avg_hr_value = 28; // 平均心率值
    uint32 hr_zone1_sec = 29; // 心率区间1累计秒数
    uint32 hr_zone2_sec = 30; // 心率区间2累计秒数
    uint32 hr_zone3_sec = 31; // 心率区间3累计秒数
    uint32 hr_zone4_sec = 32; // 心率区间4累计秒数
    uint32 hr_zone5_sec = 33; // 心率区间5累计秒数
    bool elevation_support = 34; // 海拔数据，爬升高度数据项是否支持
    bool lap_support = 35; // lap分段是否支持
    uint32 gps_rssi = 36; // gps信号 0是无信号 1红 2橙，3绿
    bool gps_rssi_support = 37; // gps信号是否支持
    bool step_support = 38; // 步数显示是否支持
    uint32 total_step = 39; // 步数
    bool vertical_jump_support = 40; // 纵跳数据是否支持
    uint32 rep_id = 41; // Reps重复编号（0-9999）
    uint32 rep_timestamp_start = 42; // 自动识别Rep开始时间戳
    uint32 rep_timestamp_end = 43; // 自动识别Rep结束时间戳
    uint32 jump_timestamp_start = 44; // 双腿实际离地时间戳
    uint32 jump_timestamp_end = 45; // 双腿触地时间戳
    uint32 rep_durations = 46; // Rep单次时长（0-2000ms）
    uint32 jump_durations = 47; // Rep单次腾空时长（0-2000ms）
    uint32 jump_height = 48; // 纵跳高度（0-200cm）
    uint32 peak_speed = 49; // 纵跳峰值速度*10（0-5m/s）
    uint32 rep_count = 50; // Reps次数（0-9999）
    bool skip_rope_support = 51; // 跳绳次数显示是否支持
    uint32 total_jumps = 52; // 总跳绳次数
    uint32 jumps_per_min = 53; // 跳绳速度（次/分钟）
    bool racket_data_support = 54; // 是否挥拍数据支持
    uint32 max_racket_speed = 55; // 最大挥拍速度 0–999 km/h
    uint32 longest_rally = 56; // 最长连拍 0~2000 次
    uint32 forehands_stroke = 57; // 正手球 0~2000 次
    uint32 backhands_stroke = 58; // 反手球 0~2000 次
    uint32 overhands_stroke = 59; // 上手球 0~2000 次
    uint32 underhands_stroke = 60; // 下手球 0~2000 次
    uint32 other_stroke = 61; // 其他球 0~2000 次
    uint32 num_racket_total = 62; // 挥拍总数 0~2000 次
    uint32 cur_racket_speed = 63; // 当前挥拍速度 0–999 km/h
    exercise_control_type control_type = 64; // 运动状态
    bool hyrox_data_support = 65; // 是否hyrox数据支持
    uint32 hyrox_eventtype = 66; // 赛事种类
    segments_data hyrox_items = 67; // hyrox数据项
    bool effort_support = 68; // 支持负荷
    uint32 effort = 69; // 负荷值 0.0～25.0. 值扩大10倍 当前运动的增长值
    uint32 aerobic_effect = 70; // 有氧效果值 0.0-5.0（保留一位小数）放大10倍
    uint32 anaerobic_effect = 71; // 无氧效果值 0.0-5.0（保留一位小数）放大10倍
    bool workout_course_support = 72; // 是否支持运动课程 （73 - 76）
    workout_course course = 73; // 课程数据
    bool gomore_support = 74; // 是否支持gomore数据
    gomore_realtime_data  realtime_data = 75; // gomore 本次运动中，身体消耗的总热量，每秒输出
}
```

```protobuf
syntax = "proto3";

enum exercise_control_type
{
    CONTROL_NULL = 0; // 无运动控制动作。
    CONTROL_START = 1; // 开始运动
    CONTROL_END = 2; // 结束运动
    CONTROL_PAUSE = 3; // 暂停运动
    CONTROL_RESUME = 4; // 恢复运动
}

enum action_type
{
    ACTION_NULL = 0; // 未指定运动动作。
    ACTION_LEFT_HAND  = 1; // 左手
    ACTION_RIGHT_HAND   = 2; // 右手
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1; // 本次操作的发起方。
    sport_type sport_type = 2; // 运动类型
    exercise_control_type control_type = 3; // 运动控制类型
    action_type action_type = 4; // 动作类型
    uint32 swim_trip_total_distance = 5;       // 泳池总长度 单位米
}
```

### 字段说明

#### `segments_data`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `type` | `Segments_type` | 分段类型 |
| `sporttype` | `sport_type` | 运动类型。 |
| `group_id` | `uint32` | 分组 ID。 |
| `avg_hr` | `uint32` | 平均心率。 |
| `order` | `uint32` | 显示或处理顺序。 |
| `calories` | `uint32` | 消耗的卡路里。 |
| `duration` | `uint32` | 持续时长。 |

#### `workout_course`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `action_id` | `uint32` | 动作指导id |
| `durations` | `uint32` | 阶段的时长 |
| `type` | `sport_type` | 运动类型 |
| `name` | `bytes` | 名称 |
| `ct_type` | `continuing_target` | 持续目标类型 |
| `st_type` | `strength_target` | 强度目标类型 |
| `ct_value` | `uint32` | 持续目标值 |
| `st_max` | `uint32` | 强度目标最大值 |
| `st_min` | `uint32` | 强度目标最小值 |
| `avg_st_value` | `uint32` | 平均强度值，根据强度目标类型得出 |
| `extre_value_max` | `uint32` | 极值强度 最大值 |
| `extre_value_min` | `uint32` | 极值强度 最大值 |
| `complete_rate` | `uint32` | 保留两位小数，实际值扩大一百倍 |
| `steptype` | `StepType` | 步骤类型 |

#### `gomore_realtime_data`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `rest_calories` | `uint32` | 静止消耗卡路里（运动实时） kcal，×10000 |
| `MET` | `uint32` | 实时代谢当量 MET，×10000 |
| `METs_0` | `uint32` | 久坐不动 MET，×10000 |
| `METs_1` | `uint32` | 轻度活动 MET，×10000 |
| `METs_2` | `uint32` | 中度活动 MET，×10000 |
| `METs_3` | `uint32` | 活力活动 MET，×10000 |
| `METs_4` | `uint32` | 高强度锻炼 MET，×10000 |
| `fatPerc` | `uint32` | 脂肪供能消耗，kcal，×10000 |
| `carbPerc` | `uint32` | 碳水供能消耗，kcal，×10000 |

#### `protocol_exercise_sync_realtime_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `sport_type` | `sport_type` | 运动类型 |
| `total_durations` | `uint32` | 运动时长； 单位： s |
| `km_pace` | `uint32` | 公里配速 |
| `avg_km_pace` | `uint32` | 平均公里配速 |
| `mi_pace` | `uint32` | 英里配速 |
| `avg_mi_pace` | `uint32` | 平均英里配速 |
| `km_speed` | `uint32` | 公里速度 km/h  固件扩大100倍 |
| `avg_km_speed` | `uint32` | 平均公里速度 km/h  固件扩大100倍 |
| `mi_speed` | `uint32` | 英里速度 mi/h  固件 扩大100倍 |
| `avg_mi_speed` | `uint32` | 平均英里速度 mi/h  固件扩大100倍 |
| `total_distance` | `uint32` | 距离；单位： m |
| `latitude` | `int32` | 纬度 负数:S南纬  正数：N北纬 放大1000000倍 |
| `longitude` | `int32` | 经度 负数:W西经  正数：E东经 放大1000000倍 |
| `elevation` | `int32` | 海拔数据 单位：米 |
| `step_stride` | `uint32` | 步幅 |
| `step_frequency` | `uint32` | 步频 单位步/分钟 |
| `total_climb_height` | `uint32` | 累计爬升高度 单位：米 |
| `hr_value` | `uint32` | 心率值 |
| `max_hr_value` | `uint32` | 最大心率值 |
| `min_hr_value` | `uint32` | 最小心率值 |
| `total_calories` | `uint32` | 总卡路里 |
| `lap_count` | `uint32` | 分段次数 |
| `lap_duration` | `uint32` | 分段时长 |
| `lap_distance` | `uint32` | 分段距离 |
| `lap_km_pace_speed` | `uint32` | 平均公里配速/速度，骑行类的用速度，其他是配速 |
| `lap_mi_pace_speed` | `uint32` | 平均英里配速/速度 骑行类的用速度，其他是配速 |
| `avg_hr_value` | `uint32` | 平均心率值 |
| `hr_zone1_sec` | `uint32` | 心率区间1累计秒数 |
| `hr_zone2_sec` | `uint32` | 心率区间2累计秒数 |
| `hr_zone3_sec` | `uint32` | 心率区间3累计秒数 |
| `hr_zone4_sec` | `uint32` | 心率区间4累计秒数 |
| `hr_zone5_sec` | `uint32` | 心率区间5累计秒数 |
| `elevation_support` | `bool` | 海拔数据，爬升高度数据项是否支持 |
| `lap_support` | `bool` | lap分段是否支持 |
| `gps_rssi` | `uint32` | gps信号 0是无信号 1红 2橙，3绿 |
| `gps_rssi_support` | `bool` | gps信号是否支持 |
| `step_support` | `bool` | 步数显示是否支持 |
| `total_step` | `uint32` | 步数 |
| `vertical_jump_support` | `bool` | 纵跳数据是否支持 |
| `rep_id` | `uint32` | Reps重复编号（0-9999） |
| `rep_timestamp_start` | `uint32` | 自动识别Rep开始时间戳 |
| `rep_timestamp_end` | `uint32` | 自动识别Rep结束时间戳 |
| `jump_timestamp_start` | `uint32` | 双腿实际离地时间戳 |
| `jump_timestamp_end` | `uint32` | 双腿触地时间戳 |
| `rep_durations` | `uint32` | Rep单次时长（0-2000ms） |
| `jump_durations` | `uint32` | Rep单次腾空时长（0-2000ms） |
| `jump_height` | `uint32` | 纵跳高度（0-200cm） |
| `peak_speed` | `uint32` | 纵跳峰值速度*10（0-5m/s） |
| `rep_count` | `uint32` | Reps次数（0-9999） |
| `skip_rope_support` | `bool` | 跳绳次数显示是否支持 |
| `total_jumps` | `uint32` | 总跳绳次数 |
| `jumps_per_min` | `uint32` | 跳绳速度（次/分钟） |
| `racket_data_support` | `bool` | 是否挥拍数据支持 |
| `max_racket_speed` | `uint32` | 最大挥拍速度 0–999 km/h |
| `longest_rally` | `uint32` | 最长连拍 0~2000 次 |
| `forehands_stroke` | `uint32` | 正手球 0~2000 次 |
| `backhands_stroke` | `uint32` | 反手球 0~2000 次 |
| `overhands_stroke` | `uint32` | 上手球 0~2000 次 |
| `underhands_stroke` | `uint32` | 下手球 0~2000 次 |
| `other_stroke` | `uint32` | 其他球 0~2000 次 |
| `num_racket_total` | `uint32` | 挥拍总数 0~2000 次 |
| `cur_racket_speed` | `uint32` | 当前挥拍速度 0–999 km/h |
| `control_type` | `exercise_control_type` | 运动状态 |
| `hyrox_data_support` | `bool` | 是否hyrox数据支持 |
| `hyrox_eventtype` | `uint32` | 赛事种类 |
| `hyrox_items` | `segments_data` | hyrox数据项 |
| `effort_support` | `bool` | 支持负荷 |
| `effort` | `uint32` | 负荷值 0.0～25.0. 值扩大10倍 当前运动的增长值 |
| `aerobic_effect` | `uint32` | 有氧效果值 0.0-5.0（保留一位小数）放大10倍 |
| `anaerobic_effect` | `uint32` | 无氧效果值 0.0-5.0（保留一位小数）放大10倍 |
| `workout_course_support` | `bool` | 是否支持运动课程 （73 - 76） |
| `course` | `workout_course` | 课程数据 |
| `gomore_support` | `bool` | 是否支持gomore数据 |
| `realtime_data` | `gomore_realtime_data` | gomore 本次运动中，身体消耗的总热量，每秒输出 |

#### `protocol_exercise_control_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | 本次操作的发起方。 |
| `sport_type` | `sport_type` | 运动类型 |
| `control_type` | `exercise_control_type` | 运动控制类型 |
| `action_type` | `action_type` | 动作类型 |
| `swim_trip_total_distance` | `uint32` | 泳池总长度 单位米 |

### 枚举值

#### `tran_direction_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | 操作由手表发起。 |
| `APP_TRAN` | `1` | 操作由应用发起。 |

#### `Segments_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `HYROX_RUN` | `0` | HYROX 跑步阶段。 |
| `HYROX_WORKOUT` | `1` | HYROX 功能站阶段。 |
| `HYROX_RESET` | `2` | HYROX 重置阶段。 |
| `HYROX_SWIM` | `3` | HYROX 游泳阶段。 |
| `HYROX_BIKE` | `4` | HYROX 骑行阶段。 |
| `HYROX_TRANSITION` | `5` | HYROX 转换阶段。 |

#### `StepType`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `STEP_TYPE_WARM_UP` | `0` | 热身 |
| `STEP_TYPE_TRAIN` | `1` | 训练 |
| `STEP_TYPE_RECOVERY` | `2` | 恢复 |
| `STEP_TYPE_REST` | `3` | 休息 |
| `STEP_TYPE_COOL_DOWN` | `4` | 缓和 |
| `STEP_TYPE_OTHER` | `5` | 其他运动步骤类型。 |

#### `continuing_target`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `CONTINUING_TARGET_MANUALLY_LAP` | `0` | 持续目标 - 手动计圈 |
| `CONTINUING_TARGET_TIME` | `1` | 持续目标 - 时间 |
| `CONTINUING_TARGET_DISTANCE` | `2` | 持续目标 - 距离 |
| `CONTINUING_TARGET_CALORIES` | `3` | 持续目标 - 卡路里 |

#### `strength_target`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `STRENGTH_TARGET2_OPEN` | `0` | 强度目标 - 开放式 |
| `STRENGTH_TARGET2_PACE` | `1` | 强度目标 - 配速 |
| `STRENGTH_TARGET2_CADENCE` | `2` | 强度目标 - 步频 |
| `STRENGTH_TARGET2_HEART_RATE_ZONE` | `3` | 强度目标 心率 - 心率区间 |
| `STRENGTH_TARGET2_CUSTOM_RATE_ZONE` | `4` | 心率 - 自定义心率 |
| `STRENGTH_TARGET2_POWER_ZONES` | `5` | 强度目标 - 功率区间 |
| `STRENGTH_TARGET2_RATE_ZONE_RESERVE` | `6` | 心率 - 储备心率 |
| `STRENGTH_TARGET2_RATE_ZONE_MAX` | `7` | 心率 - 最大心率 |

#### `exercise_control_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `CONTROL_NULL` | `0` | 无运动控制动作。 |
| `CONTROL_START` | `1` | 开始运动 |
| `CONTROL_END` | `2` | 结束运动 |
| `CONTROL_PAUSE` | `3` | 暂停运动 |
| `CONTROL_RESUME` | `4` | 恢复运动 |

#### `action_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `ACTION_NULL` | `0` | 未指定运动动作。 |
| `ACTION_LEFT_HAND` | `1` | 左手 |
| `ACTION_RIGHT_HAND` | `2` | 右手 |
