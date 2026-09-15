---
docId: flutter-incoming-call-reminder
locale: en-US
title: "Flutter Incoming Call Reminder"
description: "Configure and handle incoming-call reminders."
platform: Flutter
slug: flutter/incoming-call-reminder
order: 114
status: published
version: v2.0
---

# Flutter Incoming Call Reminder

Configure and handle incoming-call reminders.

```dart
// Get incoming call reminder
sdkManager.getCall(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

// Set incoming call reminder
protocol_call_switch operate =  protocol_call_switch();
operate.callSwitch = true;
operate.callDelay = 2;
sdkManager.setCall(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Missed-call Quick Reply (Android)
> The Demo monitors phone state. After an unanswered call ends, the SDK creates a `Missed_Call` notification. Direct SMS quick reply is enabled only when SMS permission is granted.

### Initialization and message ID
```dart
// Call once during App initialization.
sdkManager.registerPhoneState();
```

| **Field** | **Value** |
|-|-|
| `remindType` | `message_remind_type.Missed_Call` |
| `contactText` | Contact name when available; otherwise the phone number. |
| `msgContent` | Phone number. |
| `appId` | `missed_call` |
| `msgId` | Only present when SMS permission is granted: `{simSlot}{phoneNumber}`. |

For a quick-reply event with `replyType == MSG_REPLY_CALL`, the SDK parses `msgId`, selects the SIM slot, and sends `sendContent` through Android `SmsManager`.

### Permissions and capability refresh
- Incoming-call state: phone state and call-log access; contacts access is optional and only improves the displayed caller name.
- Direct missed-call SMS reply: `SEND_SMS`. Multi-SIM selection may also depend on phone-state access.
- Notification-based SMS quick reply is a different path and does not require `SEND_SMS`.

> **Important:** The SDK performs a periodic App capability-table check every 30 minutes, but the Demo must not wait for that timer after permission approval. Call `sdkManager.appTable()` immediately when the SMS permission request succeeds, and also when the App resumes and the permission changes from denied to granted.

```dart
Future<void> requestSMSPermission() async {
  smsPermissionGranted = await CreekPermission.requestSmstsStatus();
  if (smsPermissionGranted) {
    await sdkManager.appTable();
  }
}

@override
void didChangeAppLifecycleState(AppLifecycleState state) {
  if (state == AppLifecycleState.resumed) {
    refreshSMSPermission();
  }
}
```

`sdkManager.appTable()` sets `callMsgReply` from the current SMS permission and refreshes the application capability table. If the device is disconnected, the method returns safely; connection initialization refreshes the table again after reconnection.

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum call_status
{
    RECEIVED_CALL = 0;// Call received
    REJECT_CALL = 1;// Call rejected
}

enum tran_direction_type
{
    WATCH_TRAN = 0; // Operation originated from the watch.
    APP_TRAN = 1; // Operation originated from the application.
}

// Incoming call configuration
message protocol_call_switch
{
    operate_type operate = 1; // 1byte Operation type 0: Invalid operation, 1: Query, 2: Set
    bool call_switch = 2; // 1byte Incoming call switch, true: on, false: off
    uint32 call_delay = 3;// 1byte Incoming call delay in seconds
}

message protocol_call_switch_inquire_reply
{
    operate_type operate = 1; // 1byte Operation type 0: Invalid operation, 1: Query, 2: Set
    bool call_switch = 2; // 1byte Incoming call switch, true: on, false: off
    uint32 call_delay = 3;// 1byte Incoming call delay in seconds
}

// Incoming call reminder
message protocol_call_remind
{
    bytes contact_name = 1; // max:64 Contact name
    bytes phone_number = 2; // max:32 Phone number
}

// Incoming call status
message protocol_call_remind_status
{
    tran_direction_type tran_type = 1; // Origin of this operation.
    call_status status = 2;// 1byte Incoming call status
}
```

### Field Reference

#### `protocol_call_switch`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type 0: Invalid operation, 1: Query, 2: Set |
| `call_switch` | `bool` | 1byte Incoming call switch, true: on, false: off |
| `call_delay` | `uint32` | 1byte Incoming call delay in seconds |

#### `protocol_call_switch_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type 0: Invalid operation, 1: Query, 2: Set |
| `call_switch` | `bool` | 1byte Incoming call switch, true: on, false: off |
| `call_delay` | `uint32` | 1byte Incoming call delay in seconds |

#### `protocol_call_remind`

| Field | Type | Description |
| --- | --- | --- |
| `contact_name` | `bytes` | max:64 Contact name |
| `phone_number` | `bytes` | max:32 Phone number |

#### `protocol_call_remind_status`

| Field | Type | Description |
| --- | --- | --- |
| `tran_type` | `tran_direction_type` | Origin of this operation. |
| `status` | `call_status` | 1byte Incoming call status |

### Enum Values

#### `call_status`

| Value | Number | Description |
| --- | --- | --- |
| `RECEIVED_CALL` | `0` | Call received |
| `REJECT_CALL` | `1` | Call rejected |

#### `tran_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TRAN` | `0` | Operation originated from the watch. |
| `APP_TRAN` | `1` | Operation originated from the application. |
