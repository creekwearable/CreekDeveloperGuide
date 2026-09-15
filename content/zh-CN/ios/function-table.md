---
docId: ios-function-table
locale: zh-CN
title: iOS 功能表
description: 读取固件能力表，并据此决定是否展示或调用对应功能。
platform: iOS
slug: ios/function-table
order: 100
status: published
version: v2.0
---

# iOS 功能表

## 功能说明

读取固件能力表，并据此决定是否展示或调用对应功能。

## Swift 示例

```swift
CreekInterFace.instance.getTable { model in
      ///支持天气功能
       model.weather = true
                
 } failure: { code, message in
                
 }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

message function_table{
    bool is_support = 1;
    uint32 cmd_id = 2; //2bytes
}

message protocol_function_table
{
    function_table disturb = 1;//勿扰
    function_table water_remind = 2;//喝水提醒
    function_table standing_remind = 3;//站立提醒
    function_table female_health = 4;//女性健康
    function_table weather = 5;//天气
    function_table message_data = 6;//消息提醒
    function_table bt_call = 7;//是否bt协议通话
    function_table ble_call = 8;//是否ble协议通话
    function_table schedule_remind = 9;//日程提醒
    function_table voice_assistant = 10;//语音助手
    function_table quick_card = 11;//快捷卡片
    function_table world_time = 12;//世界时钟
    function_table frequent_contacts = 13;//常用联系人
    function_table gps = 14;//gps功能
    function_table online_gnss = 15;//在线星历
    function_table offline_gnss = 16;//离线星历
    function_table emergency_contacts = 17;//紧急联系人(SOS)
    function_table hrv = 18;//hrv
    function_table button_crown = 19;//按键快捷操作
    function_table focus_mode = 20;//专注模式
    function_table find_watch = 21;//寻找手表
    function_table alexa = 22;//alexa
    function_table app_list = 23;//应用列表
    function_table event_tracking = 24;//数据埋点
    function_table strava_app = 25;//strava支持,上传数据到第三方平台
    function_table sport_prescription = 26;//运动处方
    function_table sport_recognition = 27;//运动识别
    function_table msg_reply = 28;//快捷回复
    function_table msg_appid_download = 29;//消息动态下载(icon + 应用名)
    function_table alipay = 30;//支付宝
    function_table app_func = 31;//app功能表
    function_table good_morning = 32;//早安问候
    function_table psp_sleep = 33;//飞利浦睡眠数据
    function_table water_assistant = 34;//喝水助手
    function_table ble_call_coming = 35;//来电提醒
    function_table psp_sleep_score = 36;//飞利浦睡眠得分数据
    function_table psp_sleep_nap = 37;//飞利浦睡眠小睡数据
    function_table spo2_nonsuport = 38;//是否不支持血氧功能
    function_table phonebook_nonsuport = 39;//是否不支持电话本功能,默认是支持
    function_table watch_sensors = 40;//传感器开关
    function_table psp_creek_sleep = 41;//小澈睡眠和飞利浦睡眠合并
    function_table music_file = 42;//音乐文件支持
    function_table watch_direction = 43;//手表方向
    function_table spp_transfer = 44;//spp传输
    function_table creek_algo_sleep = 45;//小澈睡眠和小澈算法合并
    function_table good_morning_content = 46;//早安问候语自定义
    function_table alarm_nonsuport = 47;//是否不支持闹钟
    function_table screen_brightness_nonsuport = 48;//是否不支持屏幕
    function_table music_control_nonsuport = 49;//是否不支持音乐控制
    function_table dial_plate_nonsuport = 50;//是否不支持表盘
    function_table calendar = 51;//日程
    function_table health_snap = 52;//健康快照
    function_table gesture = 53;//手势
    function_table ring_click_measure = 54;//戒指点击测量
    function_table app_start_sport = 55;//app支持发起运动
    function_table geobin = 56; //app支持geobin轨迹数据
}
```

