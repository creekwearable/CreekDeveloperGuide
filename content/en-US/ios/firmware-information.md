---
docId: ios-firmware-information
locale: en-US
title: iOS Firmware Information
description: Read device, firmware, battery, hardware, and serial-number information.
platform: iOS
slug: ios/firmware-information
order: 101
status: published
version: v2.0
---

# iOS Firmware Information

## Overview

Read device, firmware, battery, hardware, and serial-number information.

## Swift example

```swift
CreekInterFace.instance.getFirmware { model in
  
            // getSN
                 CreekInterFace.instance.getSNFirmware(model: model) { sn in
                    print("sn++++\(sn)")
                }
            
            } failure: { code, message in
               
            }
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum Platform
{
    JX_3085C_PLATFORM = 0;// JX 3085C PLATFORM; 3085Cplatform
    JX_3085L_PLATFORM = 1;// JX 3085L PLATFORM; 3085Lplatform
    JX_3085E_PLATFORM = 2;// JX 3085E PLATFORM; 3085Eplatform
    JX_3085S_PLATFORM = 3;// JX 3085S PLATFORM; 3085splatform
}

enum Shape
{
    SQUARE_SHAPE = 0;// square
    ROUND_SHAPE = 1;// round
}

enum Dev_type
{
    WATCH_TYPE = 0;// watch
    BAND_TYPE = 1;  // band
    RING_TYPE = 2;// ring
}

enum Batt_mode
{
    INVALID = 0; // invalid
    NORMAL_MODE = 1;// normal mode power-saving mode
    ECO_MODE = 2;   // power-saving mode
}

enum Batt_status
{
    NORMAL = 0; // not charging
    CHARING = 1;// charging
    FULL = 2;   // fully charged
    LOW = 3; // low battery
}

enum bind_method_support
{
    PAIRING_CODE_NORMAL_SUPPORT = 0;// pairing code ,direct binding supported
    PAIRING_CODE_SUPPORT = 1;// supportedpairing code
    NORMAL_BIND_SUPPORT = 2;// supporteddirect binding
}

message protocol_device_batt_info
{
    uint32 voltage = 1; // voltage; 2bytes
    Batt_status status = 2;// status; 1bytes battery status
    uint32 batt_level = 3;// battery level; 1bytes
    uint32 last_charging_year = 4;// last charging year; 2bytes
    uint32 last_charging_month = 5;// last charging month; 1bytes
    uint32 last_charging_day = 6;// last charging day; 1bytes
    uint32 last_charging_hour = 7;// last charging hour; 1bytes
    uint32 last_charging_minute = 8;// last charging minute; 1bytes
    uint32 last_charging_second = 9;// last charging second; 1bytes
    Batt_mode mode = 10; // mode; 1bytes 0x01:mode
    
};

message protocol_bt_name
{
    bool is_support = 1; // Whether classic Bluetooth is supported; required to read the Bluetooth name on iOS.
    bytes bt_name = 2;// Bluetooth name; max:16bytes
};

message device_size_info
{
    uint32 width = 1;// width; 2bytes width
    uint32 height = 2;// height; 2bytes height
    uint32 angle = 3;// angle; 2bytes corner radius
    uint32 ring_size = 4;// ring size
}

message hardware_support{
    bool heartrate_hardware = 1;// heart-rate sensor
    bool acc_hardware = 2;// accsensor
    bool gyro_hardware = 3;// gyroscope sensor
    bool button_hardware = 4;// button
    bool lcd_hardware = 5;// display
    bool tp_hardware = 6;// tp
    bool motor_hardware = 7;// motor
    bool mic_hardware = 8;// microphone
    bool speak_hardware = 9;// speaker
    bool gps_hardware = 10;// gps
    bool norflash_hardware = 11;// nor_flash
    bool nandflash_hardware = 12;// nand_flash
}

message device_sn_info{
    uint32 product_id = 1;// product-family identifier
    uint32 factory_id = 2;// factory identifier
    uint32 customer_id = 3;// customer identifier
    uint32 production_date = 4;// production date
    uint32 batch_num = 5;// batch number
    uint32 serial_num = 6;// serial number
    uint32 color_code = 7;// color code
    uint32 ring_size = 8;// ring size
}

message device_voice_assistant{
    uint32  fw_major_version = 1;   // firmware major version
    uint32  fw_minor_version = 2;   // firmware minor version
    uint32  fw_type = 3;            // language type 1 2
    uint32  nw_major_version = 4;   // nw major version
    uint32  nw_minorr_version = 5;  // nw minorr version
    uint32  nw_type = 6;            // language type
    uint32  current_language = 7;   // current language //1 2
    uint32  switch_language = 8;    // change language 0 1
}

enum Platform_pspkey
{
    ACTIONS = 0; // platform
    NORDIC = 1;// nordicplatform
}

message protocol_device_info {
    uint32 device_id = 1;   // device ID; 2bytes device ID
    uint32 major_version = 2; // major version; 1bytes firmware major version
    uint32 minor_version = 3;  // minor version; 1bytes firmware minor version
    uint32 micro_version = 4;  // micro version; 1bytes firmware patch version
    uint32 pair_flag = 5;    // pair flag; 1bytes binding state
    Platform platform = 6;    // platform; 1bytes watch platform
    Shape shape = 7;  // shape; 1bytes device shape
    Dev_type dev_type = 8; // device type
    bytes mac_addr = 9; // mac addr; max:6bytes bleBluetooth address
    bytes bt_addr = 10;// Bluetooth addr; max:6bytes btBluetooth address
    protocol_device_batt_info batt_info = 11;
    protocol_bt_name bt_name = 12;
    uint32 font_major_version = 13; // font major version; 1bytes font major version
    uint32 font_minor_version = 14;  // font minor version; 1bytes font minor version
    uint32 font_micro_version = 15;  // font micro version; 1bytes font patch version
    uint32 reboot_flag = 16;// reboot flag; 1bytes restart flag
    hardware_support hw_support = 17;// hardware support
    string gps_soc_name = 18;// gps //"UC6228CI" "BCM4776x" "CC1165W" "AG3335" "UC7510" "UC7510_2"
    device_size_info size_info = 19;// device dimensions
    bool is_recovery_mode = 20;// is recovery mode; 1bytes recovery-mode flag
    uint32 device_color = 21;// device color; 1bytes device color SN A 、 SN B 、 SN C 、 SN D 、 SN E 、 SN F
    uint32 plate_photo_pic_support_num = 22;// plate photo pic support num; 1bytes maximum photo-watch-face image count
    device_sn_info sn_info = 23;// SN
    device_voice_assistant voice_assistant = 24;// voice assistant
    bool heartrate_push = 25;// start
    bool is_wrench_mode = 26;// mode 0:normal 1: ( )
    bind_method_support bind = 27;// binding methodsupported
    protocol_device_batt_info batt_case_info = 28;// battery case info
    Platform_pspkey pspkey = 29;  // get key platform
    bytes user_sn_info = 30; // get
    uint32 phone_book_num_max = 31;// maximum count
}
```

