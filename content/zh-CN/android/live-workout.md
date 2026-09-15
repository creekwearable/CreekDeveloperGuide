---
docId: android-live-workout
locale: zh-CN
title: Android 运动实况
description: 监听并同步运动实况数据。
platform: Android
slug: android/live-workout
order: 137
status: published
version: v2.0
---

# Android 运动实况

监听并同步运动实况数据。

```kotlin
///监听运动数据详情
CreekManager.sInstance.liveSportDataListen { model ->
    println(model.toString())
}

///监听运动控制（运动暂停、开始、等状态）
CreekManager.sInstance.liveSportControlListen { model ->
    println(model.toString())
}

///控制运动、如果监听到手表运动是暂停，可以发起恢复运动的指令
///注意：不能发起开始运动的指令（暂不支持主动去控制手表开始运动）
CreekManager.sInstance.setSportControl(
    controlType = Enums.exercise_control_type.CONTROL_RESUME, success = {
        println("setSportControl success")
    }, failure = {
         c,m ->
        println("setSportControl failure")
    }
)
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;//运动类型
    uint32 total_durations = 3;//运动时长； 单位： s
    uint32 km_pace = 4;//公里配速
    uint32 avg_km_pace = 5;//平均公里配速
    uint32 mi_pace = 6;//英里配速
    uint32 avg_mi_pace = 7;//平均英里配速
    uint32 km_speed = 8;//公里速度 km/h  固件扩大100倍
    uint32 avg_km_speed = 9;//平均公里速度 km/h  固件扩大100倍
    uint32 mi_speed = 10;//英里速度 mi/h  固件 扩大100倍
    uint32 avg_mi_speed = 11;//平均英里速度 mi/h  固件扩大100倍
    uint32 total_distance = 12;//距离；单位： m
    int32 latitude = 13;//纬度 负数:S南纬  正数：N北纬 放大1000000倍
    int32 longitude = 14;//经度 负数:W西经  正数：E东经 放大1000000倍
    int32 elevation = 15;//海拔数据 单位：米
    uint32 step_stride = 16;//步幅
    uint32 step_frequency = 17;//步频 单位步/分钟
    uint32 total_climb_height = 18;//累计爬升高度 单位：米
    uint32 hr_value = 19;//心率值
    uint32 max_hr_value = 20;//最大心率值
    uint32 min_hr_value = 21;//最小心率值
    uint32 total_calories = 22;//总卡路里
    uint32 lap_count = 23;//分段次数
    uint32 lap_duration = 24;//分段时长
    uint32 lap_distance = 25;//分段距离
    uint32 lap_km_pace_speed = 26;//平均公里配速/速度，骑行类的用速度，其他是配速
    uint32 lap_mi_pace_speed = 27;//平均英里配速/速度 骑行类的用速度，其他是配速
    uint32 avg_hr_value = 28;//平均心率值
    uint32 hr_zone1_sec = 29;//心率区间1累计秒数
    uint32 hr_zone2_sec = 30;//心率区间2累计秒数
    uint32 hr_zone3_sec = 31;//心率区间3累计秒数
    uint32 hr_zone4_sec = 32;//心率区间4累计秒数
    uint32 hr_zone5_sec = 33;//心率区间5累计秒数
    bool elevation_support = 34;//海拔数据，爬升高度数据项是否支持
    bool lap_support = 35;//lap分段是否支持
    uint32 gps_rssi = 36;//gps信号 0是无信号 1红 2橙，3绿
    bool gps_rssi_support = 37;//gps信号是否支持
    bool step_support = 38;  //步数显示是否支持
    uint32 total_step = 39;  //步数
    bool vertical_jump_support = 40; //纵跳数据是否支持
    uint32 rep_id = 41; //Reps重复编号（0-9999）
    uint32 rep_timestamp_start = 42; //自动识别Rep开始时间戳
    uint32 rep_timestamp_end = 43; //自动识别Rep结束时间戳
    uint32 jump_timestamp_start = 44; //双腿实际离地时间戳
    uint32 jump_timestamp_end = 45; //双腿触地时间戳
    uint32 rep_durations = 46; //Rep单次时长（0-2000ms）
    uint32 jump_durations = 47; //Rep单次腾空时长（0-2000ms）
    uint32 jump_height = 48; //纵跳高度（0-200cm）
    uint32 peak_speed = 49; //纵跳峰值速度*10（0-5m/s）
    uint32 rep_count = 50; //Reps次数（0-9999）
    bool skip_rope_support = 51;  //跳绳次数显示是否支持
    uint32 total_jumps = 52;  //总跳绳次数
    uint32 jumps_per_min = 53; //跳绳速度（次/分钟）
    bool racket_data_support = 54;//是否挥拍数据支持
    uint32 max_racket_speed = 55;                 // 最大挥拍速度 0–999 km/h
    uint32 longest_rally = 56;                    // 最长连拍 0~2000 次
    uint32 forehands_stroke = 57;                 // 正手球 0~2000 次
    uint32 backhands_stroke = 58;                 // 反手球 0~2000 次
    uint32 overhands_stroke = 59;                 // 上手球 0~2000 次
    uint32 underhands_stroke = 60;                // 下手球 0~2000 次
    uint32 other_stroke = 61;                     // 其他球 0~2000 次
    uint32 num_racket_total = 62;                 // 挥拍总数 0~2000 次
    uint32 cur_racket_speed = 63;                 // 当前挥拍速度 0–999 km/h
    exercise_control_type control_type = 64;      //运动状态
}

syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

enum exercise_control_type
{
    CONTROL_NULL = 0;
    CONTROL_START = 1;//开始运动
    CONTROL_END = 2;//结束运动
    CONTROL_PAUSE = 3;//暂停运动
    CONTROL_RESUME = 4;//恢复运动
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;//运动类型
    exercise_control_type control_type = 3;//运动控制类型
}
```
