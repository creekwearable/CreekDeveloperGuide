---
docId: flutter-message
locale: en-US
title: "Flutter Message Notifications"
description: "Configure message switches and deliver notification content."
platform: Flutter
slug: flutter/message
order: 113
status: published
version: v2.0
---

# Flutter Message Notifications

Configure message switches and deliver notification content.

System message types 1–4 do not require `appName` or `packageName`; use the exact listed values for third-party applications.

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
| 34 | OHTER | Message type not included |  |
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
// Get message switch
sdkManager.getMessageOnOff(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

// Set message switch
protocol_message_notify_switch operate =  protocol_message_notify_switch();
operate.notifySwitch = true;
sdkManager.setMessageOnOff(operate: operate,callBack: (){

},errCallBack: (e){

});

// Send message content
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

## Android Message Listening and Quick Reply (Demo Integration)
> **Scope:** Notification and media listening are implemented in the Android Demo. The SDK serializes supported notification data and exposes quick-reply events.

### Prerequisites and startup
1. Declare `SystemMessageListenerService` as an Android `NotificationListenerService`.
2. Add a Notification Access entry on the Demo settings page. Open `Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS` and re-check the grant state when the App resumes.
3. Initialize the listener when the App starts. Do not wait until a device connects, because Android notifications may arrive before the Bluetooth connection is ready.

```dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemMessageManager.instance.init();
  runApp(const MyApp());
}

// Settings page
final granted = await SystemMessageManager.instance
    .isNotificationAccessGranted();
await SystemMessageManager.instance.requestNotificationAccess();
```

### Notification payload mapping
| **Field** | **Source** | **Rule** |
|-|-|-|
| `remindType` | Notification package name | Use exact package-name matching against the table above. Unknown packages use `OHTER`. |
| `contactText` | Notification title | UTF-8 encoded. |
| `msgContent` | Notification text | Prefer expanded text or text lines, then fall back to normal text. |
| `appName` | Application label | Always send it, including unknown applications. |
| `appId` | Package name | Always send it for firmware-side identification. |
| `msgId` | Notification key digest | Only set when the notification exposes Android `RemoteInput`. Use a stable ID shorter than 20 characters. |

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

### Quick-reply handling
1. The Demo finds an action containing Android `RemoteInput`, saves its `PendingIntent`, and associates it with the generated `msgId`.
2. Register `sdkManager.messageReplyListen` when the Demo manager starts to receive `protocol_message_reply_send_operate` events.
3. The Demo resolves the original action by `msgId`, injects `sendContent` through `RemoteInput.addResultsToIntent`, and executes the original `PendingIntent`.

> **Limitation:** Quick reply is available only when the original notification provides a valid `RemoteInput`. If the notification is removed, its saved reply action must also be removed and the reply may no longer be delivered.

### SMS recognition without phone permission
Do not rely only on `Telephony.Sms.getDefaultSmsPackage(context)`. Resolve the default handler for an `ACTION_SENDTO` intent with the `smsto:` URI, then use the known package list as a fallback. This detection does not require phone permission.

Known fallback packages: `com.oneplus.mms`, `com.samsung.android.messaging`, `com.motorola.messaging`, `com.google.android.apps.messaging`, `com.verizon.messaging.vzmsgs`, `com.android.mms`, `cn.nubia.mms`, `com.hihonor.mms`, `com.android.mms.service`, and `com.sonyericsson.conversations`.

> **SMS quick reply:** When the SMS notification exposes `RemoteInput`, reply through the notification action. This path requires Notification Access but does not require the `SEND_SMS` permission.

## Protobuf Data Model

```protobuf
enum message_remind_type
{
    NULL                = 0; // Invalid or unspecified value.
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
    WEIBO               = 69;   // Weibo
    XHS                 = 70;   // Xiaohongshu
    PINDUODUO           = 71;   // Pinduoduo
    ALIPAY              = 72;   // Alipay
    TAOBAO              = 73;   // Taobao
    JINGDONG            = 74;   // JD.com
    MEITUAN             = 75;   // Meituan
    DIDI                = 76;   // Didi
    TAKEOUTNEW          = 77;   // Meituan Takeout
    ELE                 = 78;   // Ele.me
    DOUYIN              = 79;   // Douyin
    KUAISHOU            = 80;   // Kuaishou
    QQMAIL              = 81;   // QQ Mail
    DINGTALK            = 82;   // DingTalk
    WEMEET              = 83;   // Tencent Meeting
    WEWORK              = 84;   // WeWork
    CTRIP               = 85;   // Ctrip
    BOSS                = 86;   // Boss Zhipin
    ESPN                = 87;   // ESPN
}
```

### Enum Values

#### `message_remind_type`

| Value | Number | Description |
| --- | --- | --- |
| `NULL` | `0` | Invalid or unspecified value. |
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
| `WEIBO` | `69` | Weibo |
| `XHS` | `70` | Xiaohongshu |
| `PINDUODUO` | `71` | Pinduoduo |
| `ALIPAY` | `72` | Alipay |
| `TAOBAO` | `73` | Taobao |
| `JINGDONG` | `74` | JD.com |
| `MEITUAN` | `75` | Meituan |
| `DIDI` | `76` | Didi |
| `TAKEOUTNEW` | `77` | Meituan Takeout |
| `ELE` | `78` | Ele.me |
| `DOUYIN` | `79` | Douyin |
| `KUAISHOU` | `80` | Kuaishou |
| `QQMAIL` | `81` | QQ Mail |
| `DINGTALK` | `82` | DingTalk |
| `WEMEET` | `83` | Tencent Meeting |
| `WEWORK` | `84` | WeWork |
| `CTRIP` | `85` | Ctrip |
| `BOSS` | `86` | Boss Zhipin |
| `ESPN` | `87` | ESPN |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports choosing between opening message details directly and showing the application icon through `access_details_direct_switch`. |
| 1 | Supports providing the message application name. |
| 2 | Supports the switch for unlisted applications. |
| 3 | Supports the wear-state notification switch `wearing_notify_switch`. |
| 4 | Supports the wake-screen notification switch `screen_notify_switch`. |
