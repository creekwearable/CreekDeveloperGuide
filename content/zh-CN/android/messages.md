---
docId: android-messages
locale: zh-CN
title: Android 消息
description: 向设备发送消息通知并管理消息状态。
platform: Android
slug: android/messages
order: 114
status: published
version: v2.0
---

# Android 消息

向设备发送消息通知并管理消息状态。

```kotlin
//消息开关设置
CreekManager.sInstance.setMessageOnOff(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
///消息开关获取
CreekManager.sInstance.getMessageOnOff({ model: Message.protocol_message_notify_switch_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})
///消息内容发送
var model = Message.protocol_message_notify_data()
model.osPlatform = Enums.notify_os_platform.ANDROID_NOTIFY
model.notifyFlag = Enums.notify_type.ALLOW
model.remindType = Enums.message_remind_type.Wechat
model.contactText = ByteString.copyFrom("bean".toByteArray())
model.msgContent =  ByteString.copyFrom("hello".toByteArray())
CreekManager.sInstance.setMessageApp(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";
import "common.proto";

enum notify_type
{
    ALLOW = 0;//允许通知
    SILENT = 1;//静默通知
    CLOSE = 2;//关闭通知
}

enum message_remind_type
{
    NULL                = 0;
    SMS                 = 1;
    Email               = 2;
    Calendar            = 3;
    Missed_Call         = 4;
    Facebook            = 5;
    Twitter             = 6;
    Instagram           = 7;
    Snapchat            = 8;
    Whatsapp            = 9;
    Line                = 10;
    Tiktok              = 11;
    Skype               = 12;
    Wechat              = 13;
    Fitbeing            = 14;
    Microsoft_Teams     = 15;
    Telegram_Messenger  = 16;
    Messenger           = 17;
    LinkedIn            = 18;
    Gmail               = 19;
    Microsoft_Outlook   = 20;
    Google_Chat         = 21;
    QQ                  = 22;
    WhatsApp_Business   = 23;
    Youtube             = 24;
    Uber                = 25;
    Uber_eats           = 26;
    Door_Dash_missing   = 27;
    Banco_General       = 28;
    BAC_Bank            = 29;        
    Google_Maps         = 30;
    Amazon_shopping     = 31;
    Spotify             = 32;
    Discord             = 33;
    OHTER               = 34;//其他类型
    DAILYHUNT           = 35;
    FASTRACK_SMART_WORLD = 36;
    INSHORTS            = 37;
    OLA                 = 38;
    PHONEPE             = 39;
    SWIGGY              = 40;
    ZOMATO              = 41;
    AMAZONPRIME         = 42;
    AMAZON_BUSINESS     = 43;
    AMAZON_MUSIC        = 44;
    DUNZO               = 45;
    ZEPTO               = 46;
    FLIPKART            = 47;
    GAANA               = 48;
    GOOGLE_DRIVE        = 49;
    GPAY                = 50;
    HOTSTAR             = 51;
    NETFLIX             = 52;
    JIO_CINEMA          = 53;
    RAPIDO              = 54;
    DIGI_LOCKER         = 55;
    MYNTRA              = 56;
    URBAN_COMPANY       = 57;
    PAYTM               = 58;
    WYNK                = 59;
    YAHOO               = 60;
    YTMUSIC             = 61;
    TITAN_SMART_WORLD   = 62;
    MAKE_MY_TRIP        = 63;
    Jio_TV              = 64;
    feishu              = 65;
    RING                = 66;
    LARK                = 67;
    KAKAO               = 68;
    WEIBO               = 69;   //微博
    XHS                 = 70;   //小红书
    PINDUODUO           = 71;   //拼多多
    ALIPAY              = 72;   //支付宝
    TAOBAO              = 73;   //淘宝
    JINGDONG            = 74;   //京东
    MEITUAN             = 75;   //美团
    DIDI                = 76;   //滴滴
    TAKEOUTNEW          = 77;   //美团外卖
    ELE                 = 78;   //饿了么
    DOUYIN              = 79;   //抖音
    KUAISHOU            = 80;   //快手
    QQMAIL              = 81;   //QQ邮箱
    DINGTALK            = 82;   //钉钉
    WEMEET              = 83;   //腾讯会议
    WEWORK              = 84;   //企业微信
    CTRIP               = 85;   //携程
    BOSS                = 86;   //BOSS直聘
    ESPN                = 87;
    ZALO                = 88;
}

enum notify_os_platform
{
    ANDROID = 0;//安卓
    IOS = 1;
}

message protocol_message_notify_switch_item
{
    message_remind_type remind_type = 1;//1bytes 消息的枚举类型 
    notify_type notify_flag = 2;//1bytes 预留： 通知类型 ： 0允许通知； 1：静默通知; 2:关闭通知
}

message protocol_message_notify_switch_ext_item
{
    bytes app_id = 1;//消息应用名,动态消息
    notify_type notify_flag = 2;//1bytes 预留： 通知类型 ： 0允许通知； 1：静默通知; 2:关闭通知
}

//获取设备支持消息类型 
message protocol_message_notify_func_support_reply
{
    bool sms                 = 1;
    bool email               = 2;
    bool calendar            = 3;
    bool missed_call         = 4;
    bool facebook            = 5;
    bool twitter             = 6;
    bool instagram           = 7;
    bool snapchat            = 8;
    bool whatsapp            = 9;
    bool line                = 10;
    bool tiktok              = 11;
    bool skype               = 12;
    bool wechat              = 13;
    bool Fitbeing            = 14;
    bool microsoft_teams     = 15;
    bool telegram_messenger  = 16;
    bool messenger           = 17;
    bool linkedin            = 18;
    bool gmail               = 19;
    bool microsoft_outlook   = 20;
    bool google_chat         = 21;
    bool qq                  = 22;
    bool whatsapp_business   = 23;
    bool Youtube             = 24;
    bool Uber                = 25;
    bool Uber_eats           = 26;
    bool Door_Dash_missing   = 27;
    bool Banco_General       = 28;
    bool BAC_Bank            = 29;        
    bool Google_Maps         = 30;
    bool Amazon_shopping     = 31;
    bool Spotify             = 32;
    bool Discord             = 33;
    bool OTHER               = 34;//其他类型
    bool Dailyhunt           = 35;
    bool Fastrack_smart_world = 36;
    bool Inshorts            = 37;
    bool Ola                 = 38;
    bool Phonepe             = 39;
    bool Swiggy              = 40;
    bool Zomato              = 41;
    bool Amazonprime         = 42;
    bool Amazon_business     = 43;
    bool Amazon_music        = 44;
    bool Dunzo               = 45;
    bool Zepto               = 46;
    bool Flipkart            = 47;
    bool Gaana               = 48;
    bool Google_drive        = 49;
    bool Gpay                = 50;
    bool Hotstar             = 51;
    bool Netflix             = 52;
    bool Jio_cinema          = 53;
    bool Rapido              = 54;
    bool Digi_locker         = 55;
    bool Myntra              = 56;
    bool Urban_company       = 57;
    bool Paytm               = 58;
    bool Wynk                = 59;
    bool Yahoo               = 60;
    bool Ytmusic             = 61;
    bool Titan_smart_world   = 62;
    bool Make_my_trip        = 63;
    bool Jio_tv              = 64;
    bool feishu              = 65;
    bool Ring                = 66;
    bool Lark                = 67;
    bool Kakao               = 68;
    bool weibo               = 69;   //微博
    bool xhs                 = 70;   //小红书
    bool pinduoduo           = 71;   //拼多多
    bool alipay              = 72;   //支付宝
    bool taobao              = 73;   //淘宝
    bool jingdong            = 74;   //京东
    bool meituan             = 75;   //美团
    bool didi                = 76;   //滴滴
    bool takeoutnew          = 77;   //美团外卖
    bool ele                 = 78;   //饿了么
    bool douyin              = 79;   //抖音
    bool kuaishou            = 80;   //快手
    bool qqmail              = 81;   //QQ邮箱
    bool dingtalk            = 82;   //钉钉
    bool wemeet              = 83;   //腾讯会议
    bool wework              = 84;   //企业微信
    bool ctrip               = 85;   //携程
    bool boss                = 86;   //BOSS直聘
    bool Espn                = 87;   //ESPN
    bool Zalo                = 88;
}

//app消息提醒
message protocol_message_notify_data
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    notify_os_platform os_platform = 2; //1bytes 平台类型
    notify_type notify_flag = 3; //1bytes 预留： 通知类型 ： 0允许通知； 1：静默通知; 2:关闭通知
    message_remind_type remind_type = 4; //1bytes 消息的枚举类型 
    bytes contact_text = 5; //max:64 联系人名字 
    bytes msg_content = 6; // max:250 消息内容
    bytes app_name = 7;//消息应用名，其他类型需要下发
    bytes app_id = 8;//消息包名
    bytes msg_id = 9;//消息id
}

//设置消息开关
message protocol_message_notify_switch
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool notify_switch = 2; //1bytes app消息通知开关
    repeated protocol_message_notify_switch_item items = 3;//默认消息开关
    bool access_details_direct_switch = 4;//1bytes 是否直接进入消息详情还是弹出应用图标开关
    repeated protocol_message_notify_switch_ext_item ext_items = 5;//动态消息开关
    bool wearing_notify_switch = 6;//检测是否佩戴弹提醒开关
}

message protocol_message_notify_switch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool notify_switch = 2; //1bytes app消息通知开关
    repeated protocol_message_notify_switch_item items = 3;
    bool access_details_direct_switch = 4;//1bytes 是否直接进入消息详情还是弹出应用图标开关
    uint32 func_table = 5;//功能表
    repeated protocol_message_notify_switch_ext_item ext_items = 6;//动态消息开关
    bool wearing_notify_switch = 7;//检测是否佩戴弹提醒开关
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持直接进入消息详情还是弹出应用图标开关，对应字段access_details_direct_switch |
| 1 | 是否支持消息应用名下发 |
| 2 | 是否支持其他应用开关 |
| 3 | 是否支持检测是否佩戴弹提醒开关，对应字段wearing_notify_switch |
| 4 | 是否支持亮屏通知开关，对应字段screen_notify_switch |
