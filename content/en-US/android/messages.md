---
docId: android-messages
locale: en-US
title: Android Messages
description: Send message notifications and manage message state.
platform: Android
slug: android/messages
order: 114
status: published
version: v2.0
---

# Android Messages

Send message notifications and manage message state.

```kotlin
CreekManager.sInstance.setMessageOnOff(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})

CreekManager.sInstance.getMessageOnOff({ model: Message.protocol_message_notify_switch_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

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

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";
import "common.proto";

enum notify_type
{
    ALLOW = 0;// Allow notifications
    SILENT = 1;// Silent notifications
    CLOSE = 2;// Disable notifications
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
    OHTER               = 34;// OHTER.
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
    WEIBO               = 69;   // WEIBO.
    XHS                 = 70;   // XHS.
    PINDUODUO           = 71;   // PINDUODUO.
    ALIPAY              = 72;   // ALIPAY.
    TAOBAO              = 73;   // TAOBAO.
    JINGDONG            = 74;   // JINGDONG.
    MEITUAN             = 75;   // MEITUAN.
    DIDI                = 76;   // DIDI.
    TAKEOUTNEW          = 77;   // TAKEOUTNEW.
    ELE                 = 78;   // ELE.
    DOUYIN              = 79;   // DOUYIN.
    KUAISHOU            = 80;   // KUAISHOU.
    QQMAIL              = 81;   // QQMAIL.
    DINGTALK            = 82;   // DINGTALK.
    WEMEET              = 83;   // WEMEET.
    WEWORK              = 84;   // WEWORK.
    CTRIP               = 85;   // CTRIP.
    BOSS                = 86;   // BOSS.
    ESPN                = 87;
    ZALO                = 88;
}

enum notify_os_platform
{
    ANDROID = 0;// ANDROID.
    IOS = 1;
}

message protocol_message_notify_switch_item
{
    message_remind_type remind_type = 1;// Remind Type. 1bytes.
    notify_type notify_flag = 2;// Notify Flag. 1bytes.
}

message protocol_message_notify_switch_ext_item
{
    bytes app_id = 1;// App Id.
    notify_type notify_flag = 2;// Notify Flag. 1bytes.
}

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
    bool OTHER               = 34;// OTHER.
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
    bool weibo               = 69;   // Weibo.
    bool xhs                 = 70;   // Xhs.
    bool pinduoduo           = 71;   // Pinduoduo.
    bool alipay              = 72;   // Alipay.
    bool taobao              = 73;   // Taobao.
    bool jingdong            = 74;   // Jingdong.
    bool meituan             = 75;   // Meituan.
    bool didi                = 76;   // Didi.
    bool takeoutnew          = 77;   // Takeoutnew.
    bool ele                 = 78;   // Ele.
    bool douyin              = 79;   // Douyin.
    bool kuaishou            = 80;   // Kuaishou.
    bool qqmail              = 81;   // Qqmail.
    bool dingtalk            = 82;   // Dingtalk.
    bool wemeet              = 83;   // Wemeet.
    bool wework              = 84;   // Wework.
    bool ctrip               = 85;   // Ctrip.
    bool boss                = 86;   // Boss.
    bool Espn                = 87;   // ESPN
    bool Zalo                = 88;
}

// appMessage notification
message protocol_message_notify_data
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    notify_os_platform os_platform = 2; // Os Platform. 1bytes.
    notify_type notify_flag = 3; // Notify Flag. 1bytes.
    message_remind_type remind_type = 4; // Remind Type. 1bytes.
    bytes contact_text = 5; // Contact Text. max:64.
    bytes msg_content = 6; // Msg Content. max:250.
    bytes app_name = 7;// App Name.
    bytes app_id = 8;// App Id.
    bytes msg_id = 9;// Msg Id.
}

message protocol_message_notify_switch
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool notify_switch = 2; // Notify Switch switch. 1bytes.
    repeated protocol_message_notify_switch_item items = 3;// Items switch.
    bool access_details_direct_switch = 4;// Access Details Direct Switch switch. 1bytes.
    repeated protocol_message_notify_switch_ext_item ext_items = 5;// Ext Items switch.
    bool wearing_notify_switch = 6;// Wearing Notify Switch switch.
}

message protocol_message_notify_switch_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool notify_switch = 2; // Notify Switch switch. 1bytes.
    repeated protocol_message_notify_switch_item items = 3;
    bool access_details_direct_switch = 4;// Access Details Direct Switch switch. 1bytes.
    uint32 func_table = 5;// Function table
    repeated protocol_message_notify_switch_ext_item ext_items = 6;// Ext Items switch.
    bool wearing_notify_switch = 7;// Wearing Notify Switch switch.
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether the direct-message-details versus app-icon switch is supported, Related field access_details_direct_switch |
| 1 | Whether message app-name delivery is supported |
| 2 | Whether the Other Apps switch is supported |
| 3 | Whether the wear-detection notification switch is supported, Related field wearing_notify_switch |
| 4 | Whether the wake-screen notification switch is supported, Related field screen_notify_switch |
