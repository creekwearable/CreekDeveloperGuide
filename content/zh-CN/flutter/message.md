---
docId: flutter-message
locale: zh-CN
title: "Flutter 消息提醒"
description: "配置消息开关并提供通知内容。"
platform: Flutter
slug: flutter/message
order: 113
status: published
version: v2.0
---

# Flutter 消息提醒

配置消息开关并提供通知内容。

系统消息类型 1–4 不需要 `appName` 或 `packageName`；第三方应用应使用表中的精确名称与包名。

| id | message_remind_type | appName | packageName |
| --- | --- | --- | --- |
| 1 | SMS |  |  |
| 2 | Email |  |  |
| 3 | Calendar |  |  |
| 4 | Missed_Call |  |  |
| 5 | Facebook | facebook | com.facebook.katana |
| 6 | Twitter | Twitter | com.twitter.android |
| 7 | Instagram | Instagram | com.instagram.android |
| 8 | Snapchat | Snapchat | com.snapchat.android |
| 9 | Whatsapp | WhatsApp | com.whatsapp |
| 10 | Line | LINE | jp.naver.line.android |
| 11 | Tiktok | Tiktok | `com.zhiliaoapp.musically`<br>`com.ss.android.ugc.trill` |
| 12 | Skype | Skype | com.skype.raider |
| 13 | Wechat | Wechat | com.tencent.mm |
| 14 | Fitbeing | Fitbeing | com.watchic.app |
| 15 | Microsoft_Teams | Microsoft Teams | com.microsoft.teams |
| 16 | Telegram_Messenger | Telegram | org.telegram.messenger |
| 17 | Messenger | Messenger | com.facebook.orca |
| 18 | LinkedIn | Linkedin | com.linkedin.android |
| 19 | Gmail | GMail | com.google.android.gm |
| 20 | Microsoft_Outlook | OUTLOOK | com.microsoft.office.outlook |
| 21 | Google_Chat | Google Chat | com.google.android.apps.dynamite |
| 22 | QQ | QQ | com.tencent.mobileqq |
| 23 | WhatsApp_Business | WhatsApp Business | com.whatsapp.w4b |
| 24 | Youtube | Youtube | com.google.android.youtube |
| 25 | Uber | Uber | com.ubercab |
| 26 | Uber_eats | Uber Eats | com.ubercab.eats |
| 27 | Door_Dash_missing | DoorDash | com.dd.doordash |
| 28 | Banco_General | Banco General | com.BancoGeneral |
| 29 | BAC_Bank | BAC Bank | com.infonow.bofa |
| 30 | Google_Maps | Google Maps | com.google.android.apps.maps |
| 31 | Amazon_shopping | Amazon | com.amazon.mShop.android.shopping |
| 32 | Spotify | Spotify | com.spotify.music |
| 33 | Discord | Discord | com.discord |
| 34 | OHTER | 未包含的消息类型 |  |
| 35 | DAILYHUNT | Dailyhunt Xpresso News Cricket | com.eterno |
| 36 | FASTRACK_SMART_WORLD | Fastrack Smart World | com.titan.fastrack.reflex |
| 37 | INSHORTS | Inshorts | com.nis.app |
| 38 | OLA | Ola | com.olacabs.customer |
| 39 | PHONEPE | PhonePe | com.phonepe.app |
| 40 | SWIGGY | Swiggy Food | in.swiggy.android |
| 41 | ZOMATO | Zomato | com.application.zomato |
| 42 | AMAZONPRIME | Amazon Prime Video | com.amazon.avod.thirdpartyclient |
| 43 | AMAZON_BUSINESS | Amazon Business | com.amazon.mShop.android.business.shopping |
| 44 | AMAZON_MUSIC | Amazon Music | com.amazon.mp3 |
| 45 | DUNZO | Dunzo | com.dunzo.user |
| 46 | ZEPTO | Zepto | com.zeptoconsumerapp |
| 47 | FLIPKART | Flipkart Online Shopping App | com.flipkart.android |
| 48 | GAANA | Gaana | com.gaana |
| 49 | GOOGLE_DRIVE | Google Drive | com.google.android.apps.docs |
| 50 | GPAY | Google Pay | com.google.android.apps.nbu.paisa.user |
| 51 | HOTSTAR | Disney+ Hotstar | in.startv.hotstar |
| 52 | NETFLIX | Netflix | com.netflix.mediaclient |
| 53 | JIO_CINEMA | JioCinema | com.jio.media.ondemand |
| 54 | RAPIDO | Rapido | com.rapido.passenger |
| 55 | DIGI_LOCKER | DigiLocker | com.digilocker.android |
| 56 | MYNTRA | Myntra | com.myntra.android |
| 57 | URBAN_COMPANY | Urban Company | com.urbanclap.urbanclap |
| 58 | PAYTM | Paytm | net.one97.paytm |
| 59 | WYNK | Wynk Music | com.bsbportal.music |
| 60 | YAHOO | Yahoo Mail | com.yahoo.mobile.client.android.mail |
| 61 | YTMUSIC | YouTube Music | com.google.android.apps.youtube.music |
| 62 | TITAN_SMART_WORLD | Titan Smart World | com.titan.smartworld |
| 63 | MAKE_MY_TRIP | MakeMyTrip | com.makemytrip |
| 64 | Jio_TV | JioTV | com.jio.jioplay.tv |

```dart
// 获取消息开关
sdkManager.getMessageOnOff(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

// 设置消息开关
protocol_message_notify_switch operate =  protocol_message_notify_switch();
operate.notifySwitch = true;
sdkManager.setMessageOnOff(operate: operate,callBack: (){

},errCallBack: (e){

});

// 提供消息内容
protocol_message_notify_data operate =  protocol_message_notify_data();
operate.osPlatform = notify_os_platform.ANDROID;
operate.notifyFlag = notify_type.ALLOW;
operate.remindType = message_remind_type.Whatsapp;
operate.contactText = utf8.encode("bean");
operate.msgContent = utf8.encode("hello");
sdkManager.setMessageApp(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Android 消息监听与快捷回复（Demo 集成）
> **范围：** 通知与媒体监听由 Android Demo 实现。SDK 负责序列化支持的通知数据，并提供快捷回复事件。

### 前置条件与启动
1. 将 `SystemMessageListenerService` 声明为 Android `NotificationListenerService`。
2. 在 Demo 设置页添加通知使用权入口。打开 `Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS`，并在应用恢复前台时重新检查授权状态。
3. 应用启动时即初始化监听器，不要等到设备连接后再初始化，因为 Android 通知可能早于蓝牙连接到达。

```dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemMessageManager.instance.init();
  runApp(const MyApp());
}

// 设置页面
final granted = await SystemMessageManager.instance
    .isNotificationAccessGranted();
await SystemMessageManager.instance.requestNotificationAccess();
```

### 通知字段映射
| **字段** | **来源** | **规则** |
|-|-|-|
| `remindType` | 通知包名 | 使用上表的精确包名匹配；未知包名使用 `OHTER`。 |
| `contactText` | 通知标题 | 使用 UTF-8 编码。 |
| `msgContent` | 通知正文 | 优先使用展开文本或文本行，否则使用普通文本。 |
| `appName` | 应用名称 | 始终填写，包括未知应用。 |
| `appId` | 应用包名 | 始终填写，用于应用识别。 |
| `msgId` | 通知键摘要 | 仅当通知提供 Android `RemoteInput` 时设置；使用小于 20 个字符的稳定 ID。 |

```dart
final operate = protocol_message_notify_data()
  ..notifyFlag = notify_type.ALLOW
  ..remindType = remindType
  ..contactText = utf8.encode(title)
  ..msgContent = utf8.encode(content)
  ..appName = utf8.encode(appName)
  ..appId = utf8.encode(packageName);

if (supportsQuickReply) {
  operate.msgId = utf8.encode(messageId);
}
sdkManager.setMessageApp(operate: operate);
```

### 快捷回复处理
1. Demo 查找包含 Android `RemoteInput` 的动作，保存其 `PendingIntent`，并与生成的 `msgId` 关联。
2. Demo 管理器启动时注册 `sdkManager.messageReplyListen`，用于接收 `protocol_message_reply_send_operate` 事件。
3. Demo 通过 `msgId` 找到原始动作，用 `RemoteInput.addResultsToIntent` 写入 `sendContent`，然后执行原始 `PendingIntent`。

> **限制：** 仅当原始通知提供有效 `RemoteInput` 时才能快捷回复。通知被移除时也必须移除已保存的回复动作，之后可能无法再回复。

### 无电话权限的 SMS 识别
不要只依赖 `Telephony.Sms.getDefaultSmsPackage(context)`。应解析使用 `smsto:` URI 的 `ACTION_SENDTO` 意图的默认处理程序，再使用已知包名列表作为后备。该检测不需要电话权限。

已知后备包名： `com.oneplus.mms`, `com.samsung.android.messaging`, `com.motorola.messaging`, `com.google.android.apps.messaging`, `com.verizon.messaging.vzmsgs`, `com.android.mms`, `cn.nubia.mms`, `com.hihonor.mms`, `com.android.mms.service`，以及 `com.sonyericsson.conversations`.

> **SMS 快捷回复：** 当 SMS 通知提供 `RemoteInput` 时，通过通知动作回复。该路径需要通知使用权，但不需要 `SEND_SMS` 权限。

## Protobuf 数据模型

```protobuf
enum message_remind_type
{
    NULL                = 0; // 无效或未指定的值。
    SMS                 = 1;    // SMS
    Email               = 2;    // Email
    Calendar            = 3;    // Calendar
    Missed_Call         = 4;    // Missed Call
    Facebook            = 5;    // Facebook
    Twitter             = 6;    // Twitter
    Instagram           = 7;    // Instagram
    Snapchat            = 8;    // Snapchat
    Whatsapp            = 9;    // WhatsApp
    Line                = 10;   // Line
    Tiktok              = 11;   // Tiktok
    Skype               = 12;   // Skype
    Wechat              = 13;   // WeChat
    Fitbeing            = 14;   // Fitbeing
    Microsoft_Teams     = 15;   // Microsoft Teams
    Telegram_Messenger  = 16;   // Telegram Messenger
    Messenger           = 17;   // Messenger
    LinkedIn            = 18;   // LinkedIn
    Gmail               = 19;   // Gmail
    Microsoft_Outlook   = 20;   // Microsoft Outlook
    Google_Chat         = 21;   // Google Chat
    QQ                  = 22;   // QQ
    WhatsApp_Business   = 23;   // WhatsApp Business
    Youtube             = 24;   // YouTube
    Uber                = 25;   // Uber
    Uber_eats           = 26;   // Uber Eats
    Door_Dash_missing   = 27;   // Door Dash Missing
    Banco_General       = 28;   // Banco General
    BAC_Bank            = 29;   // BAC Bank
    Google_Maps         = 30;   // Google Maps
    Amazon_shopping     = 31;   // Amazon Shopping
    Spotify             = 32;   // Spotify
    Discord             = 33;   // Discord
    OTHER               = 34;   // Other Type
    DAILYHUNT           = 35;   // DailyHunt
    FASTRACK_SMART_WORLD = 36;  // Fastrack Smart World
    INSHORTS            = 37;   // Inshorts
    OLA                 = 38;   // Ola
    PHONEPE             = 39;   // PhonePe
    SWIGGY              = 40;   // Swiggy
    ZOMATO              = 41;   // Zomato
    AMAZONPRIME         = 42;   // Amazon Prime
    AMAZON_BUSINESS     = 43;   // Amazon Business
    AMAZON_MUSIC        = 44;   // Amazon Music
    DUNZO               = 45;   // Dunzo
    ZEPTO               = 46;   // Zepto
    FLIPKART            = 47;   // Flipkart
    GAANA               = 48;   // Gaana
    GOOGLE_DRIVE        = 49;   // Google Drive
    GPAY                = 50;   // GPay
    HOTSTAR             = 51;   // Hotstar
    NETFLIX             = 52;   // Netflix
    JIO_CINEMA          = 53;   // Jio Cinema
    RAPIDO              = 54;   // Rapido
    DIGI_LOCKER         = 55;   // Digi Locker
    MYNTRA              = 56;   // Myntra
    URBAN_COMPANY       = 57;   // Urban Company
    PAYTM               = 58;   // Paytm
    WYNK                = 59;   // Wynk
    YAHOO               = 60;   // Yahoo
    YTMUSIC             = 61;   // YTMusic
    TITAN_SMART_WORLD   = 62;   // Titan Smart World
    MAKE_MY_TRIP        = 63;   // Make My Trip
    Jio_TV              = 64;   // Jio TV
    feishu              = 65;   // Feishu
    RING                = 66;   // Ring
    LARK                = 67;   // Lark
    KAKAO               = 68;   // Kakao
    WEIBO               = 69; // 微博
    XHS                 = 70; // 小红书
    PINDUODUO           = 71; // 拼多多
    ALIPAY              = 72; // 支付宝
    TAOBAO              = 73; // 淘宝
    JINGDONG            = 74; // 京东
    MEITUAN             = 75; // 美团
    DIDI                = 76; // 滴滴
    TAKEOUTNEW          = 77; // 美团外卖
    ELE                 = 78; // 饿了么
    DOUYIN              = 79; // 抖音
    KUAISHOU            = 80; // 快手
    QQMAIL              = 81; // QQ邮箱
    DINGTALK            = 82; // 钉钉
    WEMEET              = 83; // 腾讯会议
    WEWORK              = 84; // 企业微信
    CTRIP               = 85; // 携程
    BOSS                = 86; // BOSS直聘
    ESPN                = 87;   // ESPN
}
```

### 枚举值

#### `message_remind_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `NULL` | `0` | 无效或未指定的值。 |
| `SMS` | `1` | SMS |
| `Email` | `2` | Email |
| `Calendar` | `3` | Calendar |
| `Missed_Call` | `4` | Missed Call |
| `Facebook` | `5` | Facebook |
| `Twitter` | `6` | Twitter |
| `Instagram` | `7` | Instagram |
| `Snapchat` | `8` | Snapchat |
| `Whatsapp` | `9` | WhatsApp |
| `Line` | `10` | Line |
| `Tiktok` | `11` | Tiktok |
| `Skype` | `12` | Skype |
| `Wechat` | `13` | WeChat |
| `Fitbeing` | `14` | Fitbeing |
| `Microsoft_Teams` | `15` | Microsoft Teams |
| `Telegram_Messenger` | `16` | Telegram Messenger |
| `Messenger` | `17` | Messenger |
| `LinkedIn` | `18` | LinkedIn |
| `Gmail` | `19` | Gmail |
| `Microsoft_Outlook` | `20` | Microsoft Outlook |
| `Google_Chat` | `21` | Google Chat |
| `QQ` | `22` | QQ |
| `WhatsApp_Business` | `23` | WhatsApp Business |
| `Youtube` | `24` | YouTube |
| `Uber` | `25` | Uber |
| `Uber_eats` | `26` | Uber Eats |
| `Door_Dash_missing` | `27` | Door Dash Missing |
| `Banco_General` | `28` | Banco General |
| `BAC_Bank` | `29` | BAC Bank |
| `Google_Maps` | `30` | Google Maps |
| `Amazon_shopping` | `31` | Amazon Shopping |
| `Spotify` | `32` | Spotify |
| `Discord` | `33` | Discord |
| `OTHER` | `34` | Other Type |
| `DAILYHUNT` | `35` | DailyHunt |
| `FASTRACK_SMART_WORLD` | `36` | Fastrack Smart World |
| `INSHORTS` | `37` | Inshorts |
| `OLA` | `38` | Ola |
| `PHONEPE` | `39` | PhonePe |
| `SWIGGY` | `40` | Swiggy |
| `ZOMATO` | `41` | Zomato |
| `AMAZONPRIME` | `42` | Amazon Prime |
| `AMAZON_BUSINESS` | `43` | Amazon Business |
| `AMAZON_MUSIC` | `44` | Amazon Music |
| `DUNZO` | `45` | Dunzo |
| `ZEPTO` | `46` | Zepto |
| `FLIPKART` | `47` | Flipkart |
| `GAANA` | `48` | Gaana |
| `GOOGLE_DRIVE` | `49` | Google Drive |
| `GPAY` | `50` | GPay |
| `HOTSTAR` | `51` | Hotstar |
| `NETFLIX` | `52` | Netflix |
| `JIO_CINEMA` | `53` | Jio Cinema |
| `RAPIDO` | `54` | Rapido |
| `DIGI_LOCKER` | `55` | Digi Locker |
| `MYNTRA` | `56` | Myntra |
| `URBAN_COMPANY` | `57` | Urban Company |
| `PAYTM` | `58` | Paytm |
| `WYNK` | `59` | Wynk |
| `YAHOO` | `60` | Yahoo |
| `YTMUSIC` | `61` | YTMusic |
| `TITAN_SMART_WORLD` | `62` | Titan Smart World |
| `MAKE_MY_TRIP` | `63` | Make My Trip |
| `Jio_TV` | `64` | Jio TV |
| `feishu` | `65` | Feishu |
| `RING` | `66` | Ring |
| `LARK` | `67` | Lark |
| `KAKAO` | `68` | Kakao |
| `WEIBO` | `69` | 微博 |
| `XHS` | `70` | 小红书 |
| `PINDUODUO` | `71` | 拼多多 |
| `ALIPAY` | `72` | 支付宝 |
| `TAOBAO` | `73` | 淘宝 |
| `JINGDONG` | `74` | 京东 |
| `MEITUAN` | `75` | 美团 |
| `DIDI` | `76` | 滴滴 |
| `TAKEOUTNEW` | `77` | 美团外卖 |
| `ELE` | `78` | 饿了么 |
| `DOUYIN` | `79` | 抖音 |
| `KUAISHOU` | `80` | 快手 |
| `QQMAIL` | `81` | QQ邮箱 |
| `DINGTALK` | `82` | 钉钉 |
| `WEMEET` | `83` | 腾讯会议 |
| `WEWORK` | `84` | 企业微信 |
| `CTRIP` | `85` | 携程 |
| `BOSS` | `86` | BOSS直聘 |
| `ESPN` | `87` | ESPN |

### `func_table` 功能位

| bit位 | 说明 |
| - | - |
| 0 | 是否支持直接进入消息详情还是弹出应用图标开关，对应字段access_details_direct_switch |
| 1 | 是否支持消息应用名设置 |
| 2 | 是否支持其他应用开关 |
| 3 | 是否支持检测是否佩戴弹提醒开关，对应字段wearing_notify_switch |
| 4 | 是否支持亮屏通知开关，对应字段screen_notify_switch |
