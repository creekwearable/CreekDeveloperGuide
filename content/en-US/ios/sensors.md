---
docId: ios-sensors
locale: en-US
title: iOS Sensors
description: Read and configure device sensor switches.
platform: iOS
slug: ios/sensors
order: 121
status: published
version: v2.0
---

# iOS Sensors

## Overview

Read and configure device sensor switches.

## Swift example

```swift
// Get sensor settings.
      CreekInterFace.instance.getWatchSensor{ model in
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
            
// Set sensor settings.

   // Change only switches reported as supported by the capability response.
        
         var  operate =  protocol_watch_sensors_operate()
         operate.heartRateAllSwitch = .switchOn
         operate.bloodOxygenAllSwitch = .switchOn
  // operate.compassAllSwitch = .switchOn
// operate.baromaterAllSwitch = .switchOn
         CreekInterFace.instance.setWatchSensor(model: operate) {
            self.view.hideRemark()
            self.textView.text = "success"
         } failure: { code, message in
            self.view.hideRemark()
            self.textView.text = message
         }
```

## Capability-table fields

Check these fields after reading `protocol_function_table`:

```protobuf
message function_table {
    bool is_support = 1;//Whether the capability is supported.
    uint32 cmd_id = 2;//Capability command identifier.
}

message protocol_function_table {
    function_table watch_sensors = 40;//Sensor-switch capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
enum switch_type
{
    SWITCH_NULL = 0;// NULL
    SWITCH_ON = 1;// enable
    SWITCH_OFF = 2;// disable
}

message protocol_watch_sensors_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    switch_type heart_rate_all_switch = 2;// heart rate all switch; 1bytes switch
    switch_type blood_oxygen_all_switch = 3;// blood oxygen all switch; 1bytes switch
    switch_type compass_all_switch = 4;// compass all switch; 1bytes switch
    switch_type baromater_all_switch = 5;// baromater all switch; 1bytes switch
}

message protocol_watch_sensors_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    switch_type heart_rate_all_switch = 2;// heart rate all switch; 1bytes switch
    switch_type blood_oxygen_all_switch = 3;// blood oxygen all switch; 1bytes switch
    switch_type compass_all_switch = 4;// compass all switch; 1bytes switch
    switch_type baromater_all_switch = 5;// baromater all switch; 1bytes switch
}
```
