---
docId: android-incoming-call-switch
locale: en-US
title: Android Incoming Call Reminder Switch
description: Read and configure the incoming-call reminder switch.
platform: Android
slug: android/incoming-call-switch
order: 117
status: published
version: v2.0
---

# Android Incoming Call Reminder Switch

Read and configure the incoming-call reminder switch.

```kotlin
// /GetIncoming-call reminder
CreekManager.sInstance.getCall({ model: Call.protocol_call_switch_inquire_reply ->
    textView.text = model.toString()
}, failure = { _, m ->
    textView.text = m
})

// /SetIncoming-call reminder
var model = Call.protocol_call_switch()
model.callSwitch = true
model.callDelay = 5
CreekManager.sInstance.setCall(model = model, {
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
