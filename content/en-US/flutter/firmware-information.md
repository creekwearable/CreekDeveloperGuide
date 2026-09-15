---
docId: flutter-firmware-information
locale: en-US
title: "Flutter Firmware Information"
description: "Read firmware identity, version, and capability information."
platform: Flutter
slug: flutter/firmware-information
order: 101
status: published
version: v2.0
---

# Flutter Firmware Information

Read firmware identity, version, and capability information.

## SDK Usage

```dart
sdkManager.getFirmware(callBack: (e) {

}, errCallBack: (e) {

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum Platform
{
    JX_3085C_PLATFORM = 0;// Juxin 3085C platform
    JX_3085L_PLATFORM = 1;// Juxin 3085L platform
    JX_3085E_PLATFORM = 2;// Juxin 3085E platform
    JX_3085S_PLATFORM = 3;// Juxin 3085S platform
}

enum Shape
{
    SQUARE_SHAPE = 0;// Square
    ROUND_SHAPE = 1;// Round
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
    NORMAL_MODE = 1;// Normal mode (non-power-saving mode)
    ECO_MODE = 2;   // Power-saving mode
}

enum Batt_status
{
    NORMAL = 0; // Not charging
    CHARING = 1;// Charging
    FULL = 2;   // Full charge
    LOW = 3; // Low battery
}

enum bind_method_support
{
    PAIRING_CODE_NORMAL_SUPPORT = 0;// Pairing code binding, direct binding is supported
    PAIRING_CODE_SUPPORT = 1;// Only pairing code binding supported
    NORMAL_BIND_SUPPORT = 2;// Only direct binding supported
}

message protocol_device_batt_info
{
    uint32 voltage = 1; // 2bytes
    Batt_status status = 2;// 1byte Battery status
    uint32 batt_level = 3;// 1byte
    uint32 last_charging_year = 4;// 2bytes
    uint32 last_charging_month = 5;// 1byte
    uint32 last_charging_day = 6;// 1byte
    uint32 last_charging_hour = 7;// 1byte
    uint32 last_charging_minute = 8;// 1byte
    uint32 last_charging_second = 9;// 1byte
    Batt_mode mode = 10; // 1byte 0x01: Mode
};

message protocol_bt_name
{
    bool is_support = 1; // Whether Bluetooth is supported, if supported, the BT name can be retrieved (iOS needs it)
    bytes bt_name = 2;// max:16bytes
};

message device_size_info
{
    uint32 width = 1;// 2bytes Width
    uint32 height = 2;// 2bytes Height
    uint32 angle = 3;// 2bytes Corner radius angle
}

message hardware_support{
    bool heartrate_hardware = 1;// Heart rate sensor
    bool acc_hardware = 2;// Accelerometer sensor
    bool gyro_hardware = 3;// Gyroscope sensor
    bool button_hardware = 4;// Button
    bool lcd_hardware = 5;// Screen
    bool tp_hardware = 6;// Touch panel
    bool motor_hardware = 7;// Motor
    bool mic_hardware = 8;// Microphone
    bool speak_hardware = 9;// Speaker
    bool gps_hardware = 10;// GPS
    bool norflash_hardware = 11;// NOR flash
    bool nandflash_hardware = 12;// NAND flash
}

message device_sn_info{
    uint32 product_id = 1;// Product series identifier
    uint32 factory_id = 2;// Factory identifier
    uint32 customer_id = 3;// Customer identifier
    uint32 production_date = 4;// Production date (year, month, day)
    uint32 batch_num = 5;// Batch number
    uint32 serial_num = 6;// Sequence number
    uint32 color_code = 7;// Color code
}

message device_voice_assistant{
    uint32  fw_major_version = 1;   // Firmware major version
    uint32  fw_minor_version = 2;   // Firmware minor version
    uint32  fw_type = 3;            // Firmware language type 1: Chinese 2: English
    uint32  nw_major_version = 4;   // Network major version
    uint32  nw_minorr_version = 5;  // Network minor version
    uint32  nw_type = 6;            // Network language type
    uint32  current_language = 7;   // Current language: 1: Chinese, 2: English
    uint32  switch_language = 8;    // Whether the language is switched: 0: switched, 1: not switched
}

message protocol_device_info {
    uint32 device_id = 1;   // 2bytes Device ID
    uint32 major_version = 2; // 1byte Firmware major version
    uint32 minor_version = 3;  // 1byte Firmware minor version
    uint32 micro_version = 4;  // 1byte Firmware micro version
    uint32 pair_flag = 5;    // 1byte Pairing status
    Platform platform = 6;    // 1byte Platform of the device
    Shape shape = 7;  // 1byte Device shape
    Dev_type dev_type = 8; // Device type
    bytes mac_addr = 9; // max:6bytes BLE MAC address
    bytes bt_addr = 10;// max:6bytes BT MAC address
    protocol_device_batt_info batt_info = 11; // Battery information.
    protocol_bt_name bt_name = 12; // Bluetooth name.
    uint32 font_major_version = 13; // 1byte Font major version
    uint32 font_minor_version = 14;  // 1byte Font minor version
    uint32 font_micro_version = 15;  // 1byte Font micro version
    uint32 reboot_flag = 16;// 1byte Reboot flag
    hardware_support hw_support = 17;// Hardware support
    // GPS chip model //"UC6228CI" is Unicore Starlink "BCM4776x" is Synaptics "CC1165W" is Core and Object "AG3335" is Airoha "UC7510" is Unicore Starlink's second generation "UC7510_2" is Unicore Starlink's second generation offline ephemeris replacement
    string gps_soc_name = 18;// GPS chip model. "UC6228CI" is from Xin Xin Tong, "BCM4776x" is from Broadcom, etc.
    device_size_info size_info = 19;// Device size specifications
    bool is_recovery_mode = 20;// 1byte Recovery mode flag
    uint32 device_color = 21;// 1byte Device color. Example: Dark Bronze (SN code: A), Titanium Silver (SN code: B), Champagne Gold (SN code: C), Rose Pink (SN code: D), Jasmine Red (SN code: E), Indigo Purple (SN code: F)
    uint32 plate_photo_pic_support_num = 22;// 1byte Number of supported photo dials
    device_sn_info sn_info = 23;// SN code
    device_voice_assistant voice_assistant = 24;// Voice assistant device
    bool heartrate_push = 25;// Whether heart rate push is enabled
    bool is_wrench_mode = 26;// Wrench mode (0: normal, 1: device in wrench interface, triggered by software or hardware reset)
    bind_method_support bind = 27;// Supported binding methods
}
```

### Field Reference

#### `protocol_device_batt_info`

| Field | Type | Description |
| --- | --- | --- |
| `voltage` | `uint32` | 2bytes |
| `status` | `Batt_status` | 1byte Battery status |
| `batt_level` | `uint32` | 1byte |
| `last_charging_year` | `uint32` | 2bytes |
| `last_charging_month` | `uint32` | 1byte |
| `last_charging_day` | `uint32` | 1byte |
| `last_charging_hour` | `uint32` | 1byte |
| `last_charging_minute` | `uint32` | 1byte |
| `last_charging_second` | `uint32` | 1byte |
| `mode` | `Batt_mode` | 1byte 0x01: Mode |

#### `protocol_bt_name`

| Field | Type | Description |
| --- | --- | --- |
| `is_support` | `bool` | Whether Bluetooth is supported, if supported, the BT name can be retrieved (iOS needs it) |
| `bt_name` | `bytes` | max:16bytes |

#### `device_size_info`

| Field | Type | Description |
| --- | --- | --- |
| `width` | `uint32` | 2bytes Width |
| `height` | `uint32` | 2bytes Height |
| `angle` | `uint32` | 2bytes Corner radius angle |

#### `hardware_support`

| Field | Type | Description |
| --- | --- | --- |
| `heartrate_hardware` | `bool` | Heart rate sensor |
| `acc_hardware` | `bool` | Accelerometer sensor |
| `gyro_hardware` | `bool` | Gyroscope sensor |
| `button_hardware` | `bool` | Button |
| `lcd_hardware` | `bool` | Screen |
| `tp_hardware` | `bool` | Touch panel |
| `motor_hardware` | `bool` | Motor |
| `mic_hardware` | `bool` | Microphone |
| `speak_hardware` | `bool` | Speaker |
| `gps_hardware` | `bool` | GPS |
| `norflash_hardware` | `bool` | NOR flash |
| `nandflash_hardware` | `bool` | NAND flash |

#### `device_sn_info`

| Field | Type | Description |
| --- | --- | --- |
| `product_id` | `uint32` | Product series identifier |
| `factory_id` | `uint32` | Factory identifier |
| `customer_id` | `uint32` | Customer identifier |
| `production_date` | `uint32` | Production date (year, month, day) |
| `batch_num` | `uint32` | Batch number |
| `serial_num` | `uint32` | Sequence number |
| `color_code` | `uint32` | Color code |

#### `device_voice_assistant`

| Field | Type | Description |
| --- | --- | --- |
| `fw_major_version` | `uint32` | Firmware major version |
| `fw_minor_version` | `uint32` | Firmware minor version |
| `fw_type` | `uint32` | Firmware language type 1: Chinese 2: English |
| `nw_major_version` | `uint32` | Network major version |
| `nw_minorr_version` | `uint32` | Network minor version |
| `nw_type` | `uint32` | Network language type |
| `current_language` | `uint32` | Current language: 1: Chinese, 2: English |
| `switch_language` | `uint32` | Whether the language is switched: 0: switched, 1: not switched |

#### `protocol_device_info`

| Field | Type | Description |
| --- | --- | --- |
| `device_id` | `uint32` | 2bytes Device ID |
| `major_version` | `uint32` | 1byte Firmware major version |
| `minor_version` | `uint32` | 1byte Firmware minor version |
| `micro_version` | `uint32` | 1byte Firmware micro version |
| `pair_flag` | `uint32` | 1byte Pairing status |
| `platform` | `Platform` | 1byte Platform of the device |
| `shape` | `Shape` | 1byte Device shape |
| `dev_type` | `Dev_type` | Device type |
| `mac_addr` | `bytes` | max:6bytes BLE MAC address |
| `bt_addr` | `bytes` | max:6bytes BT MAC address |
| `batt_info` | `protocol_device_batt_info` | Battery information. |
| `bt_name` | `protocol_bt_name` | Bluetooth name. |
| `font_major_version` | `uint32` | 1byte Font major version |
| `font_minor_version` | `uint32` | 1byte Font minor version |
| `font_micro_version` | `uint32` | 1byte Font micro version |
| `reboot_flag` | `uint32` | 1byte Reboot flag |
| `hw_support` | `hardware_support` | Hardware support |
| `gps_soc_name` | `string` | GPS chip model. "UC6228CI" is from Xin Xin Tong, "BCM4776x" is from Broadcom, etc. |
| `size_info` | `device_size_info` | Device size specifications |
| `is_recovery_mode` | `bool` | 1byte Recovery mode flag |
| `device_color` | `uint32` | 1byte Device color. Example: Dark Bronze (SN code: A), Titanium Silver (SN code: B), Champagne Gold (SN code: C), Rose Pink (SN code: D), Jasmine Red (SN code: E), Indigo Purple (SN code: F) |
| `plate_photo_pic_support_num` | `uint32` | 1byte Number of supported photo dials |
| `sn_info` | `device_sn_info` | SN code |
| `voice_assistant` | `device_voice_assistant` | Voice assistant device |
| `heartrate_push` | `bool` | Whether heart rate push is enabled |
| `is_wrench_mode` | `bool` | Wrench mode (0: normal, 1: device in wrench interface, triggered by software or hardware reset) |
| `bind` | `bind_method_support` | Supported binding methods |

### Enum Values

#### `Platform`

| Value | Number | Description |
| --- | --- | --- |
| `JX_3085C_PLATFORM` | `0` | Juxin 3085C platform |
| `JX_3085L_PLATFORM` | `1` | Juxin 3085L platform |
| `JX_3085E_PLATFORM` | `2` | Juxin 3085E platform |
| `JX_3085S_PLATFORM` | `3` | Juxin 3085S platform |

#### `Shape`

| Value | Number | Description |
| --- | --- | --- |
| `SQUARE_SHAPE` | `0` | Square |
| `ROUND_SHAPE` | `1` | Round |

#### `Dev_type`

| Value | Number | Description |
| --- | --- | --- |
| `WATCH_TYPE` | `0` | Watch |
| `BAND_TYPE` | `1` | Band |
| `RING_TYPE` | `2` | Ring |

#### `Batt_mode`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid |
| `NORMAL_MODE` | `1` | Normal mode (non-power-saving mode) |
| `ECO_MODE` | `2` | Power-saving mode |

#### `Batt_status`

| Value | Number | Description |
| --- | --- | --- |
| `NORMAL` | `0` | Not charging |
| `CHARING` | `1` | Charging |
| `FULL` | `2` | Full charge |
| `LOW` | `3` | Low battery |

#### `bind_method_support`

| Value | Number | Description |
| --- | --- | --- |
| `PAIRING_CODE_NORMAL_SUPPORT` | `0` | Pairing code binding, direct binding is supported |
| `PAIRING_CODE_SUPPORT` | `1` | Only pairing code binding supported |
| `NORMAL_BIND_SUPPORT` | `2` | Only direct binding supported |
