---
docId: android-incoming-calls
locale: zh-CN
title: Android 来电处理
description: 在 Android 中集成来电提醒、状态和快捷回复。
platform: Android
slug: android/incoming-calls
order: 118
status: published
version: v2.0
---

# Android 来电处理

在 Android 中集成来电提醒、状态和快捷回复。

### 手动集成

####  来电提醒（Only supports Android）

监听系统来电通知后，将获取到的信息发送至手表

```kotlin
var  operate =  Call.protocol_call_remind()
operate.contactName =  ByteString.copyFrom("bean".toByteArray())
operate.phoneNumber =  ByteString.copyFrom("12345678912".toByteArray())
CreekManager.sInstance.setCallReminder(model = operate, success = {
    responseText.value = "success"
}, failure = {_, m ->
    responseText.value = m
})
```

#### 来电状态（Only supports Android）

当bt未连接且ble已连接时

```kotlin
///监控手表来电状态
CreekManager.sInstance.callStatusUpdate { model: Call.protocol_call_remind_status ->
    if (model.status == Enums.call_status.RECEIVED_CALL){
        ///Watch notification app rejects incoming call
    }
}

///设置手表通话状态
CreekManager.sInstance.setCallState(status = Enums.call_status.REJECT_CALL, success = {

}, failure = {
    _,_ ->
})
```

### 自动集成（SDK内部实现）

```kotlin
// 配置 androidMainifest.xml  
  
  <receiver android:name="com.example.creek_blue_manage.CreekPhoneStateReceiver"
    android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.PHONE_STATE" />
    </intent-filter>
</receiver>
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;//来电已接
    REJECT_CALL = 1;//来电已拒
}

enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

//来电配置
message protocol_call_switch
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool call_switch = 2; //1bytes 来电开关 true 开启 false 关闭
    uint32 call_delay = 3;//1bytes 来电延时 单位秒
}

//来电提醒
message protocol_call_remind
{
    bytes contact_name = 1; // max:64 联系人名字
    bytes phone_number = 2; // max:32 电话号码
}

//来电状态
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1;//传输方向
    call_status status = 2;//1bytes 来电状态
}
```
