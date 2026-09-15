---
docId: android-incoming-calls
locale: en-US
title: Android Incoming Call Handling
description: Integrate incoming-call alerts, call state, and quick replies on Android.
platform: Android
slug: android/incoming-calls
order: 118
status: published
version: v2.0
---

# Android Incoming Call Handling

Integrate incoming-call alerts, call state, and quick replies on Android.

####  Incoming-call reminder(Only supports Android)

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

```kotlin
CreekManager.sInstance.callStatusUpdate { model: Call.protocol_call_remind_status ->
    if (model.status == Enums.call_status.RECEIVED_CALL){
        // /Watch notification app rejects incoming call
    }
}

CreekManager.sInstance.setCallState(status = Enums.call_status.REJECT_CALL, success = {

}, failure = {
    _,_ ->
})
```

```kotlin
<receiver android:name="com.example.creek_blue_manage.CreekPhoneStateReceiver"
    android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.PHONE_STATE" />
    </intent-filter>
</receiver>
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;// RECEIVED CALL.
    REJECT_CALL = 1;// REJECT CALL.
}

enum tran_direction_type
{
    WATCH_TRAN = 0;// WATCH TRAN.
    APP_TRAN = 1;// APP TRAN.
}

message protocol_call_switch
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool call_switch = 2; // Call Switch switch. 1bytes.
    uint32 call_delay = 3;// Call Delay. 1bytes.
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool call_switch = 2; // Call Switch switch. 1bytes.
    uint32 call_delay = 3;// Call Delay. 1bytes.
}

// Incoming-call reminder
message protocol_call_remind
{
    bytes contact_name = 1; // Contact Name. max:64.
    bytes phone_number = 2; // max:32 Phone number
}

message protocol_call_remind_status
{
    tran_direction_type tran_type = 1;// Tran Type.
    call_status status = 2;// Status. 1bytes.
}
```
