---
docId: android-quick-replies
locale: zh-CN
title: Android 快捷回复
description: 配置 Android 消息快捷回复并监听回复结果。
platform: Android
slug: android/quick-replies
order: 115
status: published
version: v2.0
---

# Android 快捷回复

配置 Android 消息快捷回复并监听回复结果。

### 编辑快速回复列表

```kotlin
CreekManager.sInstance.getMessageReply({
    model: Message.protocol_message_reply_list_inquire_reply ->
    responseText.value = model.toString()
}, failure = {
    c,m ->
    responseText.value = m
})

var model = Message.protocol_message_reply_list_operate()
model.addCallingReplyItems(ByteString.copyFrom("hello11111".toByteArray()))
model.addMsgReplyItems(ByteString.copyFrom("hello22222".toByteArray()))
CreekManager.sInstance.setMessageReply(model = model, {
    responseText.value = "success"
}, failure = { _, m ->
    responseText.value = m
})
```

### 通知栏回复

The key point is to send the message ID that supports reply in the notification bar to the firmware

```kotlin
override fun onNotificationPosted(sbn: StatusBarNotification) {
    super.onNotificationPosted(sbn)
    val packageName = sbn.packageName
    val notification = sbn.notification
    val extras = notification.extras
    val title = extras.getString("android.title")
    val text = extras.getCharSequence("android.text")
    val isForeground = (sbn.notification.flags and Notification.FLAG_FOREGROUND_SERVICE) != 0
    val isFlagNOClear = sbn.notification.flags and Notification.FLAG_NO_CLEAR != 0
    if (isForeground && isFlagNOClear) {
        Log.i("NotificationListener", "onNotificationPosted----filter-flags:-${sbn.notification.flags}")
        return
    }
    Log.i("NotificationListener", "Notification from $packageName: $title - $text")
    var msgId = ""
    if (notification.actions != null) {
        for (action in notification.actions) {
            if (action.remoteInputs != null) {
                for (remoteInput in action.remoteInputs) {
                    if (remoteInput != null) {
                        //Generate short hash keys
                        val shortKey = HashUtil.generateShortHash(sbn.key)
                        msgId = shortKey
                        replyableNotifications[shortKey] = ReplyableNotification(
                            packageName = packageName,
                            notificationId = sbn.id,
                            key = sbn.key,
                            action = action,
                            remoteInput = remoteInput,
                            title = title,
                            text = text
                        )
                    }
                }
            }
        }
    }
    ///msgId Control msgId, preferably less than 20 characters.
    if(packageName.contains("com.whatsapp")){
         var data = Message.protocol_message_notify_data()
        data.remindTypeValue = Enums.message_remind_type.Whatsapp_VALUE
        data.contactText = ByteString.copyFrom((title?:"").toByteArray())
        data.msgContent = ByteString.copyFrom((text.toString()).toByteArray())
        data.msgId = ByteString.copyFrom(msgId.toByteArray())
        CreekManager.sInstance.setMessageApp(model = data, success = {

        }, failure = {
            code: Int, message: String ->

        })
    }
}
```

### 短信权限

当App主动获取短信权限时，成功获取后需要主动告诉手表支持发送短信的权限

SDK内部机制在连接成功后进行检查，然后定时器每隔30分钟检查短信权限并发送给手表。.

```kotlin
CreekManager.sInstance.setSmsToWatchState(state = true)
```

### 来电回复

msgId：结合卡槽和电话号码。这个组合需要你自己完成。稍后回复时，你需要自己解析它以获取电话号码。

```kotlin
class LocalPhoneStateListener internal constructor( private val context: Context): PhoneStateListener() {

    private var time: ZonedDateTime? = null
    private var callType: CallType? = null
    private var previousState: Int? = null

    @RequiresApi(Build.VERSION_CODES.O)
    @Synchronized
    override fun onCallStateChanged(state: Int, incomingNumber: String?) {
        when (state) {
            TelephonyManager.CALL_STATE_IDLE -> {
                val duration = Duration.between(time ?: ZonedDateTime.now(), ZonedDateTime.now())

                if (previousState == TelephonyManager.CALL_STATE_OFFHOOK && callType == CallType.INCOMING) {
                    // Incoming call ended
                    Log.d(
                        "LocalPhoneStateListener",
                        "Phone State event IDLE (INCOMING ENDED) with number - $incomingNumber"
                    )

                    var simSlot: Int = getSimSlotForIncomingCall(context) 
                    Log.d("CallReceiver", "Incoming call from123333:  SIM slot: $simSlot")
                    sendToWatch(
                        CallEvent.INCOMINGEND,
                        duration.toMillis() / 1000,
                        incomingNumber!!,simSlot,context
                    )
                } else if (callType == CallType.OUTGOING) {
                    // Outgoing call ended
                    Log.d(
                        "LocalPhoneStateListener",
                        "Phone State event IDLE (OUTGOING ENDED) with number - $incomingNumber"
                    )

                } else {
                    Log.d(
                        "LocalPhoneStateListener",
                        "Phone State event IDLE (INCOMING MISSED) with number - $incomingNumber"
                    )

                    var simSlot: Int = getSimSlotForIncomingCall(context) 
                    Log.d("CallReceiver", "Incoming call from123333:  SIM slot: $simSlot")

                    sendToWatch(CallEvent.INCOMINGMISSED, 0, incomingNumber!!,simSlot,context)
                }

                callType = null
                previousState = TelephonyManager.CALL_STATE_IDLE
            }

            TelephonyManager.CALL_STATE_OFFHOOK -> {
                Log.d("LocalPhoneStateListener", "Phone State event STATE_OFF_HOOK")
                // Phone didn't ring, so this is an outgoing call
                if (callType == null)
                    callType = CallType.OUTGOING

            }

            TelephonyManager.CALL_STATE_RINGING -> {
                Log.d(
                    "LocalPhoneStateListener",
                    "Phone State event PHONE_RINGING number: $incomingNumber"
                )
            }
        }
    }

    private fun sendToWatch(type: CallEvent, duration: Long, phoneNumber: String,simSlotIndex:Int,context: Context) {
        var displayName:String? = null
        if(type ==CallEvent.INCOMINGMISSED){
             if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
                 Log.d(
                     "LocalPhoneStateListener",
                     "Have permission"
                 )
                 displayName = getContactNameByPhoneNumber(context, phoneNumber)
             }else{
                 Log.d(
                     "LocalPhoneStateListener",
                     "permission denied"
                 )
             }
         }

        var data = Message.protocol_message_notify_data()
        data.remindTypeValue = Enums.message_remind_type.Missed_Call_VALUE
        data.contactText = ByteString.copyFrom((displayName?:phoneNumber).toByteArray())
        data.msgContent = ByteString.copyFrom((phoneNumber).toByteArray())
        var msgId = "$simSlotIndex$phoneNumber"
        if(SMS permission is enabled){
         data.msgId = ByteString.copyFrom(msgId.toByteArray())
        }
        CreekManager.sInstance.setMessageApp(model = data, success = {

        }, failure = {
                code: Int, message: String ->

        })

    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP_MR1)
    private fun getSimSlotForIncomingCall(context: Context): Int {
        val smsSelfPermission = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.READ_PHONE_STATE
        )
        if(smsSelfPermission == PackageManager.PERMISSION_GRANTED){
            val subscriptionManager =context.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE) as SubscriptionManager
            val activeSubscriptionInfoList = subscriptionManager.activeSubscriptionInfoList
            val telephonyManager =
                context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
            for (subscriptionInfo in activeSubscriptionInfoList) {
                val subId = subscriptionInfo.subscriptionId
                val simSlotIndex = subscriptionInfo.simSlotIndex
                println("subId--$subId---simSlotIndex$simSlotIndex")
                val phoneState = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    telephonyManager.createForSubscriptionId(subId).callState
                } else {
                    telephonyManager.callState
                }
                if (phoneState == TelephonyManager.CALL_STATE_RINGING) {
                    if (subscriptionInfo.simSlotIndex == 0) {
                        Log.i("IncomingCallReceiver", "Incoming call on SIM 1: ")
                        return simSlotIndex
                    } else if (subscriptionInfo.simSlotIndex == 1) {
                        Log.i("IncomingCallReceiver", "Incoming call on SIM 2: ")
                        return simSlotIndex
                    }
                }
            }
        }
        return 9 // Unknown slot
    }

    @SuppressLint("Range")
    fun getContactNameByPhoneNumber(context: Context, phoneNumber: String): String {
        val uri: Uri = ContactsContract.PhoneLookup.CONTENT_FILTER_URI.buildUpon().appendEncodedPath(phoneNumber).build()
        val projection = arrayOf(ContactsContract.PhoneLookup.DISPLAY_NAME)

        context.contentResolver.query(uri, projection, null, null, null)?.use { cursor ->
            if (cursor.moveToFirst()) {
                return cursor.getString(cursor.getColumnIndex(ContactsContract.PhoneLookup.DISPLAY_NAME))
            }
        }
        return ""
    }
}
```

### 监听手表回复

```kotlin
CreekManager.sInstance.messageReplyListen { model: Message.protocol_message_reply_send_operate ->
    if (model.replyType == Enums.msg_reply_type.MSG_REPLY_CALL){
        var phone = model.msgId.toStringUtf8().substring(1,model.msgId.count())
        var slotId = model.msgId.toStringUtf8().substring(0,1)
        sendSms(number = phone, message = model.sendContent.toStringUtf8(), slotId = slotId.toInt())
    }else{
        MyNotificationListenerService.getInstance()
            ?.sendReply(key = model.msgId.toStringUtf8(), replyMessage = model.sendContent.toStringUtf8())
    }

}
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
| 0 | 是否支持梅脱 |
| 1 | 是否支持海拔高度 |
| 2 | 是否支持跑步功率 |

| bit位 | 说明 |
|-|-|
| 0 | 是否支持运动自动恢复开关 |
