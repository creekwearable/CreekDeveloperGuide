---
docId: ios-health-monitoring
locale: en-US
title: iOS Health Monitoring
description: Read and configure health-monitoring rules such as heart rate, SpO2, and stress.
platform: iOS
slug: ios/health-monitoring
order: 120
status: published
version: v2.0
---

# iOS Health Monitoring

## Overview

Read and configure health-monitoring rules such as heart rate, SpO2, and stress.

## Swift example

```swift
// Get health-monitoring settings.
var data =  protocol_health_monitor_operate()
            data.healthType = health_type.heartRate
            CreekInterFace.instance.getMonitor(operate: data) { model in
      
            } failure: { code, message in
               
            }
            
// Set health-monitoring settings.
var data =  protocol_health_monitor_operate()
            data.healthType = health_type.heartRate
            data.measurementInterval = 5
            CreekInterFace.instance.setMonitor(model: data) {
                
            } failure: { code, message in
                
            }
```

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

enum health_monitor_mode
{
    MANUAL = 0;// MANUAL
    AUTO = 1;// AUTO
    CONTINUOUS = 2;// CONTINUOUS
    INTELLIHENT = 3;// INTELLIHENT
}

enum health_type
{
    HEART_RATE = 0;// HEART RATE
    STRESS = 1;// STRESS
    SPO2 = 2;// SpO2
    NOISE = 3;// NOISE
    BODY_ENERGY = 4;// BODY ENERGY
    RESPIRATORY_RATE = 5;// RESPIRATORY RATE
    SKIN_TEMPERATURE = 6;// SKIN TEMPERATURE
    ATRIAL_FIBRILLATION = 7;// ATRIAL FIBRILLATION
    OSA = 8;// OSA
}

message protocol_health_monitor_auto_adjust
{
    bool switch_flag = 1; // Whether automatic adjustment is enabled
    health_monitor_mode adjust_mode = 2; // Monitoring mode used for automatic adjustment
    // Adjustment-window start time.
    uint32 start_hour = 3;
    uint32 start_minute = 4;
    // Adjustment-window end time.
    uint32 end_hour = 5;
    uint32 end_minute = 6;
}

message protocol_heart_monitor_notify
{
    notify_type notify_flag = 1; // Notification behavior
    bool high_remind_switch = 2;  // Enable the high-value reminder; 1 byte
    bool low_remind_switch = 3;  // Enable the low-value reminder; 1 byte
    uint32 high_threshold_value = 4;  // High reminder threshold; 1 byte
    uint32 low_threshold_value = 5;  // Low reminder threshold; 1 byte
    uint32 interval = 6;  // Reminder interval in minutes; 1 byte
    repeated bool repeat = 7;   // Seven repeat flags, Monday through Sunday
    // Notification-window start time.
    uint32 start_hour = 8;
    uint32 start_minute = 9;
    // Notification-window end time.
    uint32 end_hour = 10;
    uint32 end_minute = 11;
}

message protocol_health_monitor_operate
{
    operate_type operate = 1; // Operation: 0 invalid, 1 query, 2 set
    health_type health_type = 2;// Health metric to monitor
    health_monitor_mode default_mode = 3;   // Default monitoring mode; 1 byte
    uint32 measurement_interval = 4;   // Measurement interval; 2 bytes, unit depends on health_type
    protocol_health_monitor_auto_adjust mode_auto_adjust = 5; // Automatic-adjustment settings
    protocol_heart_monitor_notify notify_setting = 6;// Threshold-notification settings
}

message protocol_health_monitor_inquire_reply
{
    uint32 func_table = 1;// Health-monitoring capability bit field
    operate_type operate = 2; // Operation: 0 invalid, 1 query, 2 set
    health_type health_type = 3;// Health metric being reported
    health_monitor_mode default_mode = 4;   // Default monitoring mode; 1 byte
    uint32 measurement_interval = 5;   // Measurement interval; 2 bytes, unit depends on health_type
    protocol_health_monitor_auto_adjust mode_auto_adjust = 6; // Automatic-adjustment settings
    protocol_heart_monitor_notify notify_setting = 7;// Threshold-notification settings
    
}
```
