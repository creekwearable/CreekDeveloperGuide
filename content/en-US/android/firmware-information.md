---
docId: android-firmware-information
locale: en-US
title: Android Firmware Information
description: Read device, firmware, battery, hardware, and serial-number information.
platform: Android
slug: android/firmware-information
order: 101
status: published
version: v2.0
---

# Android Firmware Information

Read device, firmware, battery, hardware, and serial-number information.

```kotlin
CreekManager.sInstance.getFirmware({ model: Deviceinfo.protocol_device_info ->
    textView.text = model.toString()
    CreekManager.sInstance.getSNFirmware(model,{
        Log.w("sn", "Serial number: $it")
    })

}, failure = { c, m ->
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum Platform
{
    JX_3085C_PLATFORM = 0;// JX 3085C PLATFORM.
    JX_3085L_PLATFORM = 1;// JX 3085L PLATFORM.
    JX_3085E_PLATFORM = 2;// JX 3085E PLATFORM.
    JX_3085S_PLATFORM = 3;// JX 3085S PLATFORM.
}

enum Shape
{
    SQUARE_SHAPE = 0;// SQUARE SHAPE.
    ROUND_SHAPE = 1;// ROUND SHAPE.
}

enum Dev_type
{
    WATCH_TYPE = 0;// Watch
    BAND_TYPE = 1;  // Band
    RING_TYPE = 2;// Ring
}

enum Batt_mode
{
    INVALID = 0; // Invalid
    NORMAL_MODE = 1;// NORMAL MODE.
    ECO_MODE = 2;   // Power-saving mode
}

enum Batt_status
{
    NORMAL = 0; // Not charging
    CHARING = 1;// Charging
    FULL = 2;   // Fully charged
    LOW = 3; // Low battery
}

enum bind_method_support
{
    PAIRING_CODE_NORMAL_SUPPORT = 0;// PAIRING CODE NORMAL SUPPORT.
    PAIRING_CODE_SUPPORT = 1;// PAIRING CODE SUPPORT.
    NORMAL_BIND_SUPPORT = 2;// NORMAL BIND SUPPORT.
}

message protocol_device_batt_info
{
    uint32 voltage = 1; // 2bytes
    Batt_status status = 2;// 1bytes BatteryState
    uint32 batt_level = 3;// 1bytes
    uint32 last_charging_year = 4;// 2bytes
    uint32 last_charging_month = 5;// 1bytes
    uint32 last_charging_day = 6;// 1bytes
    uint32 last_charging_hour = 7;// 1bytes
    uint32 last_charging_minute = 8;// 1bytes
    uint32 last_charging_second = 9;// 1bytes
    Batt_mode mode = 10; // 1bytes 0x01:Mode
    
};

message protocol_bt_name
{
    bool is_support = 1; // Whether is support is supported.
    bytes bt_name = 2;// max:16bytes
};

message device_size_info
{
    uint32 width = 1;// 2bytes Width
    uint32 height = 2;// 2bytes Height
    uint32 angle = 3;// 2bytes Corner radius
    uint32 ring_size = 4;// Ring Size.
}

message hardware_support{
    bool heartrate_hardware = 1;// Heart rateSensor
    bool acc_hardware = 2;// accSensor
    bool gyro_hardware = 3;// Gyro Hardware.
    bool button_hardware = 4;// Button
    bool lcd_hardware = 5;// Screen
    bool tp_hardware = 6;// tp
    bool motor_hardware = 7;// motor
    bool mic_hardware = 8;// Microphone
    bool speak_hardware = 9;// Speaker
    bool gps_hardware = 10;// gps
    bool norflash_hardware = 11;// nor_flash
    bool nandflash_hardware = 12;// nand_flash
}

message device_sn_info{
    uint32 product_id = 1;// Product-series identifier
    uint32 factory_id = 2;// Factory identifier
    uint32 customer_id = 3;// Customer identifier
    uint32 production_date = 4;// Production date
    uint32 batch_num = 5;// Batch number
    uint32 serial_num = 6;// Serial number
    uint32 color_code = 7;// Color code
    uint32 ring_size = 8;// RingSize
}

message device_voice_assistant{
    uint32  fw_major_version = 1;   // FirmwareMajor version
    uint32  fw_minor_version = 2;   // FirmwareMinor version
    uint32  fw_type = 3;            // Fw Type.
    uint32  nw_major_version = 4;   // Nw Major Version.
    uint32  nw_minorr_version = 5;  // Nw Minorr Version.
    uint32  nw_type = 6;            // Nw Type.
    uint32  current_language = 7;   // Current Language.
    uint32  switch_language = 8;    // Switch Language.
}

enum Platform_pspkey
{
    ACTIONS = 0; // ACTIONS.
    NORDIC = 1;// NORDIC.
}

message protocol_device_info {
    uint32 device_id = 1;   // 2bytes Deviceid
    uint32 major_version = 2; // 1bytes FirmwareMajor version
    uint32 minor_version = 3;  // 1bytes FirmwareMinor version
    uint32 micro_version = 4;  // 1bytes FirmwarePatch version
    uint32 pair_flag = 5;    // 1bytes BindState
    Platform platform = 6;    // Platform. 1bytes.
    Shape shape = 7;  // Shape. 1bytes.
    Dev_type dev_type = 8; // DeviceType
    bytes mac_addr = 9; // Mac Addr. max:6.
    bytes bt_addr = 10;// Bt Addr. max:6.
    protocol_device_batt_info batt_info = 11;
    protocol_bt_name bt_name = 12;
    uint32 font_major_version = 13; // Font Major Version. 1bytes.
    uint32 font_minor_version = 14;  // Font Minor Version. 1bytes.
    uint32 font_micro_version = 15;  // Font Micro Version. 1bytes.
    uint32 reboot_flag = 16;// Reboot Flag. 1bytes.
    hardware_support hw_support = 17;// HardwareSupported
    string gps_soc_name = 18;// Gps Soc Name.
    device_size_info size_info = 19;// Size Info.
    bool is_recovery_mode = 20;// Is Recovery Mode. 1bytes.
    uint32 device_color = 21;// Device Color. 1bytes.
    uint32 plate_photo_pic_support_num = 22;// Plate Photo Pic Support Num. 1bytes.
    device_sn_info sn_info = 23;// Sn Info.
    device_voice_assistant voice_assistant = 24;// Voice Assistant.
    bool heartrate_push = 25;// Heartrate Push.
    bool is_wrench_mode = 26;// Is Wrench Mode.
    bind_method_support bind = 27;// Bind.
    protocol_device_batt_info batt_case_info = 28;// Batt Case Info.
    Platform_pspkey pspkey = 29;  // Pspkey.
    bytes user_sn_info = 30; // User Sn Info.
    uint32 phone_book_num_max = 31;// Number of phone book num max.
}
```
