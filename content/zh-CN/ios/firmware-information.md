---
docId: ios-firmware-information
locale: zh-CN
title: iOS 固件信息
description: 读取设备、固件、电池、硬件与序列号信息。
platform: iOS
slug: ios/firmware-information
order: 101
status: published
version: v2.0
---

# iOS 固件信息

## 功能说明

读取设备、固件、电池、硬件与序列号信息。

## Swift 示例

```swift
CreekInterFace.instance.getFirmware { model in
  
            //获取SN码
                 CreekInterFace.instance.getSNFirmware(model: model) { sn in
                    print("sn++++\(sn)")
                }
            
            } failure: { code, message in
               
            }
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum Platform
{
    JX_3085C_PLATFORM = 0;//炬芯3085C平台
    JX_3085L_PLATFORM = 1;//炬芯3085L平台
    JX_3085E_PLATFORM = 2;//炬芯3085E平台
    JX_3085S_PLATFORM = 3;//炬芯3085s平台
}

enum Shape
{
    SQUARE_SHAPE = 0;//方形
    ROUND_SHAPE = 1;//圆形
}

enum Dev_type
{
    WATCH_TYPE = 0;//手表
    BAND_TYPE = 1;  //手环
    RING_TYPE = 2;//戒指
}

enum Batt_mode
{
    INVALID = 0; //无效
    NORMAL_MODE = 1;//正常模式（非省电模式）
    ECO_MODE = 2;   //省电模式
}

enum Batt_status
{
    NORMAL = 0; //未充电
    CHARING = 1;//充电中
    FULL = 2;   //满电
    LOW = 3; //低电量
}

enum bind_method_support
{
    PAIRING_CODE_NORMAL_SUPPORT = 0;//配对码绑定,直接绑定都支持
    PAIRING_CODE_SUPPORT = 1;//仅支持配对码绑定
    NORMAL_BIND_SUPPORT = 2;//仅支持直接绑定
}

message protocol_device_batt_info
{
    uint32 voltage = 1; //2bytes
    Batt_status status = 2;//1bytes 电池状态
    uint32 batt_level = 3;//1bytes
    uint32 last_charging_year = 4;//2bytes
    uint32 last_charging_month = 5;//1bytes
    uint32 last_charging_day = 6;//1bytes
    uint32 last_charging_hour = 7;//1bytes
    uint32 last_charging_minute = 8;//1bytes
    uint32 last_charging_second = 9;//1bytes
    Batt_mode mode = 10; //1bytes 0x01:模式
    
};

message protocol_bt_name
{
    bool is_support = 1; //是否支持bt，支持则可以获取bt蓝牙名，ios需要
    bytes bt_name = 2;//max:16bytes
};

message device_size_info
{
    uint32 width = 1;//2bytes 宽
    uint32 height = 2;//2bytes 高
    uint32 angle = 3;//2bytes 圆角角度
    uint32 ring_size = 4;//戒指圈号
}

message hardware_support{
    bool heartrate_hardware = 1;//心率传感器
    bool acc_hardware = 2;//acc传感器
    bool gyro_hardware = 3;//陀螺仪传感器
    bool button_hardware = 4;//按键
    bool lcd_hardware = 5;//屏幕
    bool tp_hardware = 6;//tp
    bool motor_hardware = 7;//motor
    bool mic_hardware = 8;//麦克风
    bool speak_hardware = 9;//喇叭
    bool gps_hardware = 10;//gps
    bool norflash_hardware = 11;//nor_flash
    bool nandflash_hardware = 12;//nand_flash
}

message device_sn_info{
    uint32 product_id = 1;//产品系列标识
    uint32 factory_id = 2;//工厂标识
    uint32 customer_id = 3;//客户标识
    uint32 production_date = 4;//生产年月日
    uint32 batch_num = 5;//批次号
    uint32 serial_num = 6;//顺序编号
    uint32 color_code = 7;//颜色代号
    uint32 ring_size = 8;//戒指尺寸
}

message device_voice_assistant{
    uint32  fw_major_version = 1;   //固件主版本号
    uint32  fw_minor_version = 2;   //固件次版本号
    uint32  fw_type = 3;            //固件语言类型 1中文 2英文
    uint32  nw_major_version = 4;   //网络主版本号
    uint32  nw_minorr_version = 5;  //网络次版本号
    uint32  nw_type = 6;            //网络语言类型
    uint32  current_language = 7;   //当前语言 //1中文， 2英文
    uint32  switch_language = 8;    //是否切换语言  0是切换 1是未切换
}

enum Platform_pspkey
{
    ACTIONS = 0; //炬心平台
    NORDIC = 1;//nordic平台
}

message protocol_device_info {
    uint32 device_id = 1;   //2bytes 设备id
    uint32 major_version = 2; //1bytes 固件主版本号
    uint32 minor_version = 3;  //1bytes 固件次版本号
    uint32 micro_version = 4;  //1bytes 固件小版本号
    uint32 pair_flag = 5;    //1bytes 绑定状态
    Platform platform = 6;    //1bytes 手表的平台
    Shape shape = 7;  //1bytes 设备形状
    Dev_type dev_type = 8; //设备类型
    bytes mac_addr = 9; //max:6bytes ble蓝牙地址
    bytes bt_addr = 10;//max:6bytes bt蓝牙地址
    protocol_device_batt_info batt_info = 11;
    protocol_bt_name bt_name = 12;
    uint32 font_major_version = 13; //1bytes 字库主版本号
    uint32 font_minor_version = 14;  //1bytes 字库次版本号
    uint32 font_micro_version = 15;  //1bytes 字库小版本号
    uint32 reboot_flag = 16;//1bytes 重启标志
    hardware_support hw_support = 17;//硬件支持
    string gps_soc_name = 18;//gps芯片型号 //"UC6228CI"是和芯星通 "BCM4776x"是新思 "CC1165W"芯与物 "AG3335"络达 "UC7510"和芯星通第二代 "UC7510_2"和芯星通第二代离线星历方式更换
    device_size_info size_info = 19;//设备规格大小
    bool is_recovery_mode = 20;//1bytes 恢复模式标志
    uint32 device_color = 21;//1bytes 设备颜色 深锖（SN代号：A）、钛银（SN代号：B）、香槟金（SN代号：C）、玫瑰粉（SN代号：D）、茉莉红（SN代号：E）、黛紫（SN代号：F）
    uint32 plate_photo_pic_support_num = 22;//1bytes 照片表盘支持相片个数
    device_sn_info sn_info = 23;//SN 码
    device_voice_assistant voice_assistant = 24;//知存语音助手设备
    bool heartrate_push = 25;//是否开始心率推送
    bool is_wrench_mode = 26;//扳手模式（0:正常 1:设备进入扳手界面(软件或硬件复位导致)）
    bind_method_support bind = 27;//绑定方式支持
    protocol_device_batt_info batt_case_info = 28;//充电仓
    Platform_pspkey pspkey = 29;  //获取飞利浦key不同平台
    bytes user_sn_info = 30; //获取用户序列号
    uint32 phone_book_num_max = 31;//电话本最大数量
}
```

