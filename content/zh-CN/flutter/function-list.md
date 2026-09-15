---
docId: flutter-function-list
locale: zh-CN
title: "Flutter 功能表"
description: "查询当前设备支持的能力。"
platform: Flutter
slug: flutter/function-list
order: 100
status: published
version: v2.0
---

# Flutter 功能表

查询当前设备支持的能力。

## 接口示例

```dart
sdkManager.getTable(callBack: (e){

},errCallBack: (e){

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message function_table {
    bool is_support = 1; // 是否支持该功能。
    uint32 cmd_id = 2; // 2bytes
}

message protocol_function_table {
    function_table disturb = 1; // 勿扰
    function_table water_remind = 2; // 喝水提醒
    function_table standing_remind = 3; // 站立提醒
    function_table female_health = 4; // 女性健康
    function_table weather = 5; // 天气
    function_table message_data = 6; // 消息提醒
    function_table bt_call = 7; // 是否bt协议通话
    function_table ble_call = 8; // 是否ble协议通话
    function_table schedule_remind = 9; // 日程提醒
    function_table voice_assistant = 10; // 语音助手
    function_table quick_card = 11; // 快捷卡片
    function_table world_time = 12; // 世界时钟
    function_table frequent_contacts = 13; // 常用联系人
    function_table gps = 14; // gps功能
    function_table online_gnss = 15; // 在线星历
    function_table offline_gnss = 16; // 离线星历
    function_table emergency_contacts = 17; // 紧急联系人(SOS)
    function_table hrv = 18; // hrv
    function_table button_crown = 19; // 按键快捷操作
    function_table focus_mode = 20; // 专注模式
    function_table find_watch = 21; // 寻找手表
    function_table alexa = 22; // alexa
    function_table app_list = 23; // 应用列表
    function_table event_tracking = 24; // 数据埋点
    function_table strava_app = 25; // strava支持,上传数据到第三方平台
    function_table sport_prescription = 26; // 运动处方
    function_table sport_recognition = 27; // 运动识别
    function_table msg_reply = 28; // 快捷回复
    function_table msg_appid_download = 29; // 消息动态下载(icon + 应用名)
    function_table alipay = 30; // 支付宝
    function_table app_func = 31; // app功能表
    function_table good_morning = 32; // 早安问候
    function_table psp_sleep = 33; // 飞利浦睡眠数据
    function_table water_assistant = 34; // 喝水助手
    function_table ble_call_coming = 35; // 来电提醒
    function_table psp_sleep_score = 36; // 飞利浦睡眠得分数据
    function_table psp_sleep_nap = 37; // 飞利浦睡眠小睡数据
    function_table spo2_nonsuport = 38; // 是否不支持血氧功能
    function_table phonebook_nonsuport = 39; // 是否不支持电话本功能,默认是支持
    function_table watch_sensors = 40; // 传感器开关
    function_table psp_creek_sleep = 41; // 小澈睡眠和飞利浦睡眠合并
    function_table music_file = 42; // 音乐文件支持
    function_table watch_direction = 43; // 手表方向
    function_table spp_transfer = 44; // spp传输
    function_table creek_algo_sleep = 45; // 小澈睡眠和小澈算法合并
    function_table good_morning_content = 46; // 早安问候语自定义
    function_table alarm_nonsuport = 47; // 是否不支持闹钟
    function_table screen_brightness_nonsuport = 48; // 是否不支持屏幕
    function_table music_control_nonsuport = 49; // 是否不支持音乐控制
    function_table dial_plate_nonsuport = 50; // 是否不支持表盘
    function_table calendar = 51; // 日程
    function_table health_snap = 52; // 健康快照
    function_table gesture = 53; // 手势
    function_table ring_click_measure = 54; // 戒指点击测量
    function_table app_start_sport = 55; // app支持发起运动
    function_table geobin = 56; // app支持geobin轨迹数据
    function_table workout_course = 57; // 运动课程
    function_table user_icon = 58; // 用户头像下载
    function_table body_temperature = 59; // 体温
    function_table remind_switch = 60; // 提醒开关功能表
    function_table batt_case_info = 61; // 是否支持充电仓
    function_table ble_hid_pair = 62; // 是否支持ble hid配对
    function_table map_route = 63; // 是否支持路线地图
    function_table map_ofline = 64; // 是否支持离线地图
    function_table super_msg = 65; // 是否支持超级通知
    function_table blood_pressure = 66; // 是否支持血压数据
    function_table medicine_remind = 67; // 是否支持吃药提醒
    function_table cardio_fitness = 68; // 是否支持有氧适能
    function_table training_load = 69; // 是否支持训练负荷
    function_table volume_adjust = 70; // 是否支持音量调节
    function_table action_guide = 71; // 是否支持动作指导
    function_table training_readiness = 72; // 是否支持训练准备度
    function_table total_mileage = 73; // 是否支持运动总跑量
    function_table disturb_switch = 74; // 是否选择用勿扰定时开关设置
}
```

### 字段说明

#### `function_table`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_support` | `bool` | 是否支持该功能。 |
| `cmd_id` | `uint32` | 2bytes |

#### `protocol_function_table`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `disturb` | `function_table` | 勿扰 |
| `water_remind` | `function_table` | 喝水提醒 |
| `standing_remind` | `function_table` | 站立提醒 |
| `female_health` | `function_table` | 女性健康 |
| `weather` | `function_table` | 天气 |
| `message_data` | `function_table` | 消息提醒 |
| `bt_call` | `function_table` | 是否bt协议通话 |
| `ble_call` | `function_table` | 是否ble协议通话 |
| `schedule_remind` | `function_table` | 日程提醒 |
| `voice_assistant` | `function_table` | 语音助手 |
| `quick_card` | `function_table` | 快捷卡片 |
| `world_time` | `function_table` | 世界时钟 |
| `frequent_contacts` | `function_table` | 常用联系人 |
| `gps` | `function_table` | gps功能 |
| `online_gnss` | `function_table` | 在线星历 |
| `offline_gnss` | `function_table` | 离线星历 |
| `emergency_contacts` | `function_table` | 紧急联系人(SOS) |
| `hrv` | `function_table` | hrv |
| `button_crown` | `function_table` | 按键快捷操作 |
| `focus_mode` | `function_table` | 专注模式 |
| `find_watch` | `function_table` | 寻找手表 |
| `alexa` | `function_table` | alexa |
| `app_list` | `function_table` | 应用列表 |
| `event_tracking` | `function_table` | 数据埋点 |
| `strava_app` | `function_table` | strava支持,上传数据到第三方平台 |
| `sport_prescription` | `function_table` | 运动处方 |
| `sport_recognition` | `function_table` | 运动识别 |
| `msg_reply` | `function_table` | 快捷回复 |
| `msg_appid_download` | `function_table` | 消息动态下载(icon + 应用名) |
| `alipay` | `function_table` | 支付宝 |
| `app_func` | `function_table` | app功能表 |
| `good_morning` | `function_table` | 早安问候 |
| `psp_sleep` | `function_table` | 飞利浦睡眠数据 |
| `water_assistant` | `function_table` | 喝水助手 |
| `ble_call_coming` | `function_table` | 来电提醒 |
| `psp_sleep_score` | `function_table` | 飞利浦睡眠得分数据 |
| `psp_sleep_nap` | `function_table` | 飞利浦睡眠小睡数据 |
| `spo2_nonsuport` | `function_table` | 是否不支持血氧功能 |
| `phonebook_nonsuport` | `function_table` | 是否不支持电话本功能,默认是支持 |
| `watch_sensors` | `function_table` | 传感器开关 |
| `psp_creek_sleep` | `function_table` | 小澈睡眠和飞利浦睡眠合并 |
| `music_file` | `function_table` | 音乐文件支持 |
| `watch_direction` | `function_table` | 手表方向 |
| `spp_transfer` | `function_table` | spp传输 |
| `creek_algo_sleep` | `function_table` | 小澈睡眠和小澈算法合并 |
| `good_morning_content` | `function_table` | 早安问候语自定义 |
| `alarm_nonsuport` | `function_table` | 是否不支持闹钟 |
| `screen_brightness_nonsuport` | `function_table` | 是否不支持屏幕 |
| `music_control_nonsuport` | `function_table` | 是否不支持音乐控制 |
| `dial_plate_nonsuport` | `function_table` | 是否不支持表盘 |
| `calendar` | `function_table` | 日程 |
| `health_snap` | `function_table` | 健康快照 |
| `gesture` | `function_table` | 手势 |
| `ring_click_measure` | `function_table` | 戒指点击测量 |
| `app_start_sport` | `function_table` | app支持发起运动 |
| `geobin` | `function_table` | app支持geobin轨迹数据 |
| `workout_course` | `function_table` | 运动课程 |
| `user_icon` | `function_table` | 用户头像下载 |
| `body_temperature` | `function_table` | 体温 |
| `remind_switch` | `function_table` | 提醒开关功能表 |
| `batt_case_info` | `function_table` | 是否支持充电仓 |
| `ble_hid_pair` | `function_table` | 是否支持ble hid配对 |
| `map_route` | `function_table` | 是否支持路线地图 |
| `map_ofline` | `function_table` | 是否支持离线地图 |
| `super_msg` | `function_table` | 是否支持超级通知 |
| `blood_pressure` | `function_table` | 是否支持血压数据 |
| `medicine_remind` | `function_table` | 是否支持吃药提醒 |
| `cardio_fitness` | `function_table` | 是否支持有氧适能 |
| `training_load` | `function_table` | 是否支持训练负荷 |
| `volume_adjust` | `function_table` | 是否支持音量调节 |
| `action_guide` | `function_table` | 是否支持动作指导 |
| `training_readiness` | `function_table` | 是否支持训练准备度 |
| `total_mileage` | `function_table` | 是否支持运动总跑量 |
| `disturb_switch` | `function_table` | 是否选择用勿扰定时开关设置 |
