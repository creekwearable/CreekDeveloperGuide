---
docId: flutter-firmware-information
locale: zh-CN
title: "Flutter 固件信息"
description: "读取固件标识、版本及能力信息。"
platform: Flutter
slug: flutter/firmware-information
order: 101
status: published
version: v2.0
---

# Flutter 固件信息

读取固件标识、版本及能力信息。

## 接口示例

```dart
sdkManager.getFirmware(callBack: (e) {

}, errCallBack: (e) {

});
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum Platform
{
    JX_3085C_PLATFORM = 0; // 炬芯3085C平台
    JX_3085L_PLATFORM = 1; // 炬芯3085L平台
    JX_3085E_PLATFORM = 2; // 炬芯3085E平台
    JX_3085S_PLATFORM = 3; // 炬芯3085s平台
}

enum Shape
{
    SQUARE_SHAPE = 0; // 方形
    ROUND_SHAPE = 1; // 圆形
}

enum Dev_type
{
    WATCH_TYPE = 0; // 手表
    BAND_TYPE = 1; // 手环
    RING_TYPE = 2; // 戒指
}

enum Batt_mode
{
    INVALID = 0; // 无效
    NORMAL_MODE = 1; // 正常模式（非省电模式）
    ECO_MODE = 2; // 省电模式
}

enum Batt_status
{
    NORMAL = 0; // 未充电
    CHARING = 1; // 充电中
    FULL = 2; // 满电
    LOW = 3; // 低电量
}

enum bind_method_support
{
    PAIRING_CODE_NORMAL_SUPPORT = 0; // 配对码绑定,直接绑定都支持
    PAIRING_CODE_SUPPORT = 1; // 仅支持配对码绑定
    NORMAL_BIND_SUPPORT = 2; // 仅支持直接绑定
}

message protocol_device_batt_info
{
    uint32 voltage = 1; // 2bytes
    Batt_status status = 2; // 1bytes 电池状态
    uint32 batt_level = 3; // 1bytes
    uint32 last_charging_year = 4; // 2bytes
    uint32 last_charging_month = 5; // 1bytes
    uint32 last_charging_day = 6; // 1bytes
    uint32 last_charging_hour = 7; // 1bytes
    uint32 last_charging_minute = 8; // 1bytes
    uint32 last_charging_second = 9; // 1bytes
    Batt_mode mode = 10; // 1bytes 0x01:模式
};

message protocol_bt_name
{
    bool is_support = 1; // 是否支持bt，支持则可以获取bt蓝牙名，ios需要
    bytes bt_name = 2; // max:16bytes
};

message device_size_info
{
    uint32 width = 1; // 2bytes 宽
    uint32 height = 2; // 2bytes 高
    uint32 angle = 3; // 2bytes 圆角角度
}

message hardware_support{
    bool heartrate_hardware = 1; // 心率传感器
    bool acc_hardware = 2; // acc传感器
    bool gyro_hardware = 3; // 陀螺仪传感器
    bool button_hardware = 4; // 按键
    bool lcd_hardware = 5; // 屏幕
    bool tp_hardware = 6; // tp
    bool motor_hardware = 7; // motor
    bool mic_hardware = 8; // 麦克风
    bool speak_hardware = 9; // 喇叭
    bool gps_hardware = 10; // gps
    bool norflash_hardware = 11; // nor_flash
    bool nandflash_hardware = 12; // nand_flash
}

message device_sn_info{
    uint32 product_id = 1; // 产品系列标识
    uint32 factory_id = 2; // 工厂标识
    uint32 customer_id = 3; // 客户标识
    uint32 production_date = 4; // 生产年月日
    uint32 batch_num = 5; // 批次号
    uint32 serial_num = 6; // 顺序编号
    uint32 color_code = 7; // 颜色代号
}

message device_voice_assistant{
    uint32  fw_major_version = 1; // 固件主版本号
    uint32  fw_minor_version = 2; // 固件次版本号
    uint32  fw_type = 3; // 固件语言类型 1中文 2英文
    uint32  nw_major_version = 4; // 网络主版本号
    uint32  nw_minorr_version = 5; // 网络次版本号
    uint32  nw_type = 6; // 网络语言类型
    uint32  current_language = 7; // 当前语言 //1中文， 2英文
    uint32  switch_language = 8; // 是否切换语言  0是切换 1是未切换
}

message protocol_device_info {
    uint32 device_id = 1; // 2bytes 设备id
    uint32 major_version = 2; // 1bytes 固件主版本号
    uint32 minor_version = 3; // 1bytes 固件次版本号
    uint32 micro_version = 4; // 1bytes 固件小版本号
    uint32 pair_flag = 5; // 1bytes 绑定状态
    Platform platform = 6; // 1bytes 手表的平台
    Shape shape = 7; // 1bytes 设备形状
    Dev_type dev_type = 8; // 设备类型
    bytes mac_addr = 9; // max:6bytes ble蓝牙地址
    bytes bt_addr = 10; // max:6bytes bt蓝牙地址
    protocol_device_batt_info batt_info = 11; // 电池信息。
    protocol_bt_name bt_name = 12; // 蓝牙名称。
    uint32 font_major_version = 13; // 1bytes 字库主版本号
    uint32 font_minor_version = 14; // 1bytes 字库次版本号
    uint32 font_micro_version = 15; // 1bytes 字库小版本号
    uint32 reboot_flag = 16; // 1bytes 重启标志
    hardware_support hw_support = 17; // 硬件支持
    // GPS chip model //"UC6228CI" is Unicore Starlink "BCM4776x" is Synaptics "CC1165W" is Core and Object "AG3335" is Airoha "UC7510" is Unicore Starlink's second generation "UC7510_2" is Unicore Starlink's second generation offline ephemeris replacement
    string gps_soc_name = 18; // gps芯片型号 //"UC6228CI"是和芯星通 "BCM4776x"是新思 "CC1165W"芯与物 "AG3335"络达 "UC7510"和芯星通第二代 "UC7510_2"和芯星通第二代离线星历方式更换 “GS301W” 海思星历
    device_size_info size_info = 19; // 设备规格大小
    bool is_recovery_mode = 20; // 1bytes 恢复模式标志
    uint32 device_color = 21; // 1bytes 设备颜色 深锖（SN代号：A）、钛银（SN代号：B）、香槟金（SN代号：C）、玫瑰粉（SN代号：D）、茉莉红（SN代号：E）、黛紫（SN代号：F）
    uint32 plate_photo_pic_support_num = 22; // 1bytes 照片表盘支持相片个数
    device_sn_info sn_info = 23; // SN 码
    device_voice_assistant voice_assistant = 24; // 知存语音助手设备
    bool heartrate_push = 25; // 是否开始心率推送
    bool is_wrench_mode = 26; // 扳手模式（0:正常 1:设备进入扳手界面(软件或硬件复位导致)）
    bind_method_support bind = 27; // 绑定方式支持
}
```

### 字段说明

#### `protocol_device_batt_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `voltage` | `uint32` | 2bytes |
| `status` | `Batt_status` | 1bytes 电池状态 |
| `batt_level` | `uint32` | 1bytes |
| `last_charging_year` | `uint32` | 2bytes |
| `last_charging_month` | `uint32` | 1bytes |
| `last_charging_day` | `uint32` | 1bytes |
| `last_charging_hour` | `uint32` | 1bytes |
| `last_charging_minute` | `uint32` | 1bytes |
| `last_charging_second` | `uint32` | 1bytes |
| `mode` | `Batt_mode` | 1bytes 0x01:模式 |

#### `protocol_bt_name`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `is_support` | `bool` | 是否支持bt，支持则可以获取bt蓝牙名，ios需要 |
| `bt_name` | `bytes` | max:16bytes |

#### `device_size_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `width` | `uint32` | 2bytes 宽 |
| `height` | `uint32` | 2bytes 高 |
| `angle` | `uint32` | 2bytes 圆角角度 |

#### `hardware_support`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `heartrate_hardware` | `bool` | 心率传感器 |
| `acc_hardware` | `bool` | acc传感器 |
| `gyro_hardware` | `bool` | 陀螺仪传感器 |
| `button_hardware` | `bool` | 按键 |
| `lcd_hardware` | `bool` | 屏幕 |
| `tp_hardware` | `bool` | tp |
| `motor_hardware` | `bool` | motor |
| `mic_hardware` | `bool` | 麦克风 |
| `speak_hardware` | `bool` | 喇叭 |
| `gps_hardware` | `bool` | gps |
| `norflash_hardware` | `bool` | nor_flash |
| `nandflash_hardware` | `bool` | nand_flash |

#### `device_sn_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `product_id` | `uint32` | 产品系列标识 |
| `factory_id` | `uint32` | 工厂标识 |
| `customer_id` | `uint32` | 客户标识 |
| `production_date` | `uint32` | 生产年月日 |
| `batch_num` | `uint32` | 批次号 |
| `serial_num` | `uint32` | 顺序编号 |
| `color_code` | `uint32` | 颜色代号 |

#### `device_voice_assistant`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `fw_major_version` | `uint32` | 固件主版本号 |
| `fw_minor_version` | `uint32` | 固件次版本号 |
| `fw_type` | `uint32` | 固件语言类型 1中文 2英文 |
| `nw_major_version` | `uint32` | 网络主版本号 |
| `nw_minorr_version` | `uint32` | 网络次版本号 |
| `nw_type` | `uint32` | 网络语言类型 |
| `current_language` | `uint32` | 当前语言 //1中文， 2英文 |
| `switch_language` | `uint32` | 是否切换语言  0是切换 1是未切换 |

#### `protocol_device_info`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `device_id` | `uint32` | 2bytes 设备id |
| `major_version` | `uint32` | 1bytes 固件主版本号 |
| `minor_version` | `uint32` | 1bytes 固件次版本号 |
| `micro_version` | `uint32` | 1bytes 固件小版本号 |
| `pair_flag` | `uint32` | 1bytes 绑定状态 |
| `platform` | `Platform` | 1bytes 手表的平台 |
| `shape` | `Shape` | 1bytes 设备形状 |
| `dev_type` | `Dev_type` | 设备类型 |
| `mac_addr` | `bytes` | max:6bytes ble蓝牙地址 |
| `bt_addr` | `bytes` | max:6bytes bt蓝牙地址 |
| `batt_info` | `protocol_device_batt_info` | 电池信息。 |
| `bt_name` | `protocol_bt_name` | 蓝牙名称。 |
| `font_major_version` | `uint32` | 1bytes 字库主版本号 |
| `font_minor_version` | `uint32` | 1bytes 字库次版本号 |
| `font_micro_version` | `uint32` | 1bytes 字库小版本号 |
| `reboot_flag` | `uint32` | 1bytes 重启标志 |
| `hw_support` | `hardware_support` | 硬件支持 |
| `gps_soc_name` | `string` | gps芯片型号 //"UC6228CI"是和芯星通 "BCM4776x"是新思 "CC1165W"芯与物 "AG3335"络达 "UC7510"和芯星通第二代 "UC7510_2"和芯星通第二代离线星历方式更换 “GS301W” 海思星历 |
| `size_info` | `device_size_info` | 设备规格大小 |
| `is_recovery_mode` | `bool` | 1bytes 恢复模式标志 |
| `device_color` | `uint32` | 1bytes 设备颜色 深锖（SN代号：A）、钛银（SN代号：B）、香槟金（SN代号：C）、玫瑰粉（SN代号：D）、茉莉红（SN代号：E）、黛紫（SN代号：F） |
| `plate_photo_pic_support_num` | `uint32` | 1bytes 照片表盘支持相片个数 |
| `sn_info` | `device_sn_info` | SN 码 |
| `voice_assistant` | `device_voice_assistant` | 知存语音助手设备 |
| `heartrate_push` | `bool` | 是否开始心率推送 |
| `is_wrench_mode` | `bool` | 扳手模式（0:正常 1:设备进入扳手界面(软件或硬件复位导致)） |
| `bind` | `bind_method_support` | 绑定方式支持 |

### 枚举值

#### `Platform`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `JX_3085C_PLATFORM` | `0` | 炬芯3085C平台 |
| `JX_3085L_PLATFORM` | `1` | 炬芯3085L平台 |
| `JX_3085E_PLATFORM` | `2` | 炬芯3085E平台 |
| `JX_3085S_PLATFORM` | `3` | 炬芯3085s平台 |

#### `Shape`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `SQUARE_SHAPE` | `0` | 方形 |
| `ROUND_SHAPE` | `1` | 圆形 |

#### `Dev_type`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `WATCH_TYPE` | `0` | 手表 |
| `BAND_TYPE` | `1` | 手环 |
| `RING_TYPE` | `2` | 戒指 |

#### `Batt_mode`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `INVALID` | `0` | 无效 |
| `NORMAL_MODE` | `1` | 正常模式（非省电模式） |
| `ECO_MODE` | `2` | 省电模式 |

#### `Batt_status`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `NORMAL` | `0` | 未充电 |
| `CHARING` | `1` | 充电中 |
| `FULL` | `2` | 满电 |
| `LOW` | `3` | 低电量 |

#### `bind_method_support`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `PAIRING_CODE_NORMAL_SUPPORT` | `0` | 配对码绑定,直接绑定都支持 |
| `PAIRING_CODE_SUPPORT` | `1` | 仅支持配对码绑定 |
| `NORMAL_BIND_SUPPORT` | `2` | 仅支持直接绑定 |
