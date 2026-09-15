---
docId: ios-messages
locale: en-US
title: iOS Messages
description: Send message notifications and work with related message capabilities.
platform: iOS
slug: ios/messages
order: 114
status: published
version: v2.0
---

# iOS Messages

## Overview

Send message notifications and work with related message capabilities.

## Swift example

```swift
// Set the master message-notification switch.
   var data =  protocol_message_notify_switch()
            data.notifySwitch = true
            CreekInterFace.instance.setMessageOnOff(model: data) {
                self.view.hideRemark()
                self.textView.text = "success"
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
// Get message-notification settings.
       CreekInterFace.instance.getMessageOnOff { model in
                self.view.hideRemark()
                let json = try? model.jsonString()
                if let str = json{
                    dispatch_main_sync_safe {
                        self.textView.text = str
                    }
                }
            } failure: { code, message in
                self.view.hideRemark()
                self.textView.text = message
            }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table message_data = 6;// Message-notification capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
import "common.proto";

enum notify_type
{
    ALLOW = 0;// ALLOW
    SILENT = 1;// SILENT
    CLOSE = 2;// disable
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
    OHTER               = 34;// type
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
    WEIBO               = 69;   // WEIBO
    XHS                 = 70;   // XHS
    PINDUODUO           = 71;   // PINDUODUO
    ALIPAY              = 72;   // ALIPAY
    TAOBAO              = 73;   // TAOBAO
    JINGDONG            = 74;   // JINGDONG
    MEITUAN             = 75;   // MEITUAN
    DIDI                = 76;   // DIDI
    TAKEOUTNEW          = 77;   // TAKEOUTNEW
    ELE                 = 78;   // ELE
    DOUYIN              = 79;   // DOUYIN
    KUAISHOU            = 80;   // KUAISHOU
    QQMAIL              = 81;   // QQ
    DINGTALK            = 82;   // DINGTALK
    WEMEET              = 83;   // WEMEET
    WEWORK              = 84;   // WEWORK
    CTRIP               = 85;   // CTRIP
    BOSS                = 86;   // BOSS
    ESPN                = 87;
    ZALO                = 88;
}

enum notify_os_platform
{
    ANDROID = 0;// ANDROID
    IOS = 1;
}

message protocol_message_notify_switch_item
{
    message_remind_type remind_type = 1;// Built-in message category
    notify_type notify_flag = 2;// Notification behavior for this category
}

message protocol_message_notify_switch_ext_item
{
    bytes app_id = 1;// Message application identifier
    notify_type notify_flag = 2;// Notification state: 0 invalid, 1 enabled, 2 disabled
}

// Message categories supported by the device.
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
    bool OTHER               = 34;// type
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
    bool weibo               = 69;   // weibo
    bool xhs                 = 70;   // xhs
    bool pinduoduo           = 71;   // pinduoduo
    bool alipay              = 72;   // alipay
    bool taobao              = 73;   // taobao
    bool jingdong            = 74;   // jingdong
    bool meituan             = 75;   // meituan
    bool didi                = 76;   // didi
    bool takeoutnew          = 77;   // takeoutnew
    bool ele                 = 78;   // ele
    bool douyin              = 79;   // douyin
    bool kuaishou            = 80;   // kuaishou
    bool qqmail              = 81;   // QQ
    bool dingtalk            = 82;   // dingtalk
    bool wemeet              = 83;   // wemeet
    bool wework              = 84;   // wework
    bool ctrip               = 85;   // ctrip
    bool boss                = 86;   // BOSS
    bool Espn                = 87;   // ESPN
    bool Zalo                = 88;
}

// One message notification delivered to the device.
message protocol_message_notify_data
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    notify_os_platform os_platform = 2; // Originating OS platform; 1 byte
    notify_type notify_flag = 3; // Notification state: 0 invalid, 1 enabled, 2 disabled
    message_remind_type remind_type = 4; // Message category; 1 byte
    bytes contact_text = 5; // Contact text; maximum 64 bytes
    bytes msg_content = 6; // Message content; maximum 250 bytes
    bytes app_name = 7;// Application name
    bytes app_id = 8;// Application identifier
    bytes msg_id = 9;// Message identifier
}

// Set message-notification switches.
message protocol_message_notify_switch
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    bool notify_switch = 2; // Master message-notification switch; 1 byte
    repeated protocol_message_notify_switch_item items = 3;// Per-category switches for built-in applications
    bool access_details_direct_switch = 4;// Whether selecting a notification opens its details directly
    repeated protocol_message_notify_switch_ext_item ext_items = 5;// Per-application switches keyed by app_id
    bool wearing_notify_switch = 6;// Whether notifications are shown while the device is being worn
}

message protocol_message_notify_switch_inquire_reply
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    bool notify_switch = 2; // Master message-notification switch
    repeated protocol_message_notify_switch_item items = 3;// Per-category switches for built-in applications
    bool access_details_direct_switch = 4;// Whether selecting a notification opens its details directly
    uint32 func_table = 5;// Message-notification capability bit field
    repeated protocol_message_notify_switch_ext_item ext_items = 6;// Per-application switches keyed by app_id
    bool wearing_notify_switch = 7;// Whether notifications are shown while the device is being worn
}
```
