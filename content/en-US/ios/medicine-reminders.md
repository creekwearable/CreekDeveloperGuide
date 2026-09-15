---
docId: ios-medicine-reminders
locale: en-US
title: iOS Medication Reminders
description: Read and configure medication-reminder windows, repeat days, and intervals.
platform: iOS
slug: ios/medicine-reminders
order: 140
status: published
version: v2.0
---

# iOS Medication Reminders

## Overview

Read and configure medication-reminder windows, repeat days, and intervals.

## Swift example

The source SDK guide does not provide a confirmed Swift example for this capability. The data model below is included without inferring an API signature.

## Protobuf data model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// query
    SET = 2;// set
}

enum notify_type
{
    ALLOW = 0;// ALLOW
    SILENT = 1;// SILENT
    CLOSE = 2;// disable
}

message protocol_medicine_remind_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    bool switch_flag = 2; // Reminder switch: true enables, false disables
    notify_type notify_flag = 3;// Notification type; 1 byte
    uint32 start_hour = 4; // Start hour
    uint32 start_minute = 5;
    uint32 end_hour = 6;   // End hour
    uint32 end_minute = 7;
    repeated bool repeat = 8; // Repeat flags from Monday through Sunday
    uint32 interval = 9;  // Reminder interval in minutes; 2 bytes
}

message protocol_medicine_remind_inquire_reply
{
    uint32 func_table = 1;// Medicine-reminder capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    bool switch_flag = 3; // Reminder switch: true enables, false disables
    notify_type notify_flag = 4;// Notification type; 1 byte
    uint32 start_hour = 5; // Start hour
    uint32 start_minute = 6;
    uint32 end_hour = 7;   // End hour
    uint32 end_minute = 8;
    repeated bool repeat = 9; // Repeat flags from Monday through Sunday
    uint32 interval = 10;  // Reminder interval in minutes; 2 bytes
}
```
