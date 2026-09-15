---
docId: android-weather
locale: zh-CN
title: Android 天气
description: 读取天气能力并向设备设置天气数据。
platform: Android
slug: android/weather
order: 112
status: published
version: v2.0
---

# Android 天气

读取天气能力并向设备设置天气数据。

获取天气的数据详见API文档

也可以用自己服务器上获取的天气数据。

注意细节：

```kotlin
var model = Weather.protocol_weather_operate()
model.switchFlag = true
var item = Weather.protocol_weather_detail_data_item()
item.hour = 14
item.curTemp = 30
item.curMaxTemp = 33
item.curMinTemp = 26
model.addDetailDataItem(item)
CreekManager.sInstance.setWeather(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## 数据模型

### Protobuf 定义

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;//查询
    SET = 2;//设置
};

enum weather_type
{
    TORNADO = 0;//龙卷风
    TROPICAL_STORM= 1;//热带风暴
    HURRICANE = 2;//飓风
    STRONG_STORMS = 3;//强风暴
    THUNDERSTORMS = 4;//雷暴/雷雨
    RAIN_SNOW = 5;//雨夹雪
    RAIN_SLEET = 6;//雨加冰雹
    WINTRY_MIX = 7;//混合降雨
    FREEZING_DRIZZLE = 8;//冻雨
    DRIZZLE = 9;//毛毛雨
    FREEZING_RAIN = 10;//冻雨
    SHOWERS = 11;//阵雨
    RAIN = 12;//雨
    FLURRIES = 13;//小雪
    SNOW_SHOWERS = 14;//阵雪
    DRIFTING_SNOW = 15;//飘雪（风力作用）
    SNOW = 16;//雪
    HAIL = 17;//冰雹
    SLEET = 18;//冰雹/冻雨
    BLOWING_DUST_SANDSTORM = 19;//扬尘/沙暴
    FOGGY = 20;//雾气
    HAZE = 21;//雾霾
    SMOKE = 22;//烟雾
    BREEZY = 23;//微风
    WINDY = 24;//大风
    ICE_CRYSTALS = 25;//寒流
    CLOUDY = 26;//多云
    MOSTLY_CLOUDY_NIGHT = 27;//多云间晴（晚上）
    MOSTLY_CLOUDY_DAY = 28;//多云间晴（白天）
    PARTLY_CLOUDY_NIGHT = 29;//多云转晴（晚上）
    PARTLY_CLOUDY_DAY = 30;//多云转晴（白天）
    CLEAR = 31;//晴天（晚上）
    SUNNY = 32;//晴天（白天）
    MOSTLY_CLEAR = 33;//晴时多云（晚上）
    MOSTLY_SUNNY = 34;//晴时多云（白天）
    MIXED_RAIN_HAIL = 35;//雨加冰雹
    HOt = 36;//炎热
    ISOLATED_THUNDERSTORMS = 37;//局部雷雨
    SCATTERED_THUNDERSTORMS_D = 38;//局部雷阵雨(DAY)
    SCATTERED_SHOWERS_NIGHT = 39;//零星阵雨(Night)
    HEAVY_RAIN = 40;//暴雨
    SCATTERED_SNOW_SHOWERS_D = 41;//零星阵雪
    HEAVY_SNOW = 42;//暴雪
    BLIZZARD = 43;//暴风雪
    NOT_AVAILABLE = 44;//无数据（无法使用）
    SCATTERED_SNOW_SHOWERS_N = 45;//零星阵雨(Night)
    SCATTERED_SHOWERS = 46;//零星阵雪
    SCATTERED_THUNDERSTORMS_N = 47;//局部雷阵雨(Night)
};

//风向
enum wind_direction_type
{
    WEATHER_DIRECTION_N = 0;//正北
    WEATHER_DIRECTION_NNE = 1;//北东北
    WEATHER_DIRECTION_NE = 2;//东北
    WEATHER_DIRECTION_ENE = 3;//东东北
    WEATHER_DIRECTION_E = 4;//东
    WEATHER_DIRECTION_ESE = 5;//东东南
    WEATHER_DIRECTION_SE = 6;//东南
    WEATHER_DIRECTION_SSE = 7;//南东南
    WEATHER_DIRECTION_S = 8;//南
    WEATHER_DIRECTION_SSW = 9;//南西南
    WEATHER_DIRECTION_SW = 10;//西南
    WEATHER_DIRECTION_WSW = 11;//西西南
    WEATHER_DIRECTION_W = 12;//西
    WEATHER_DIRECTION_WNWM = 13;//西西北
    WEATHER_DIRECTION_NW = 14;//西北
    WEATHER_DIRECTION_NNW = 15;//北西北
};

enum moon_phase
{
    NEW_MOON = 0;//新月   
    WAXING_CRESCENT = 1;//娥眉月
    FIRST_QUARTER = 2;//上弦月
    WAXING_GIBBOUS = 3;//渐盈凸月
    FULL_MOON = 4;//满月
    WANING_GIBBOUS = 5;//渐亏凸月
    LAST_QUARTER = 6;//下弦月
    WANING_MOON = 7;//残月
};

message protocol_weather_future_item
{
    weather_type weather_type = 1; //1bytes 天气类型
    int32 max_temp = 2; //1bytes 最大温度
    int32 min_temp = 3; //1bytes 最小温度
};

message protocol_weather_hour_weather_item
{
    weather_type weather_type = 1; //1bytes 天气类型
    int32 temperature = 2;  //1bytes 温度
};

//日出日落时间item
message protocol_weather_sunrise_item
{
    uint32 sunrise_hour = 1; //1bytes 日出
    uint32 sunrise_min = 2;
    uint32 sunset_hour = 3;//1bytes 日落
    uint32 sunset_min = 4;
};

//月出月落时间item
message protocol_weather_moon_item
{
    uint32 moonrise_hour = 1; //1bytes 月出
    uint32 moonrise_min = 2;
    uint32 moonset_hour = 3;//1bytes 月落
    uint32 moonset_min = 4;
    moon_phase phase = 5;//月相
};

message protocol_weather_detail_data_item
{
    uint32 month = 1; //最新同步 月份
    uint32 day = 2;
    uint32 hour = 3; //时
    uint32 min = 4;  //分
    uint32 week = 5; //1bytes 星期  0x00无效 0x01~0x07:星期一~星期日
    weather_type weather_type = 6; //1bytes 天气类型
    int32 cur_temp = 7;  //1bytes 当前的温度
    int32 cur_max_temp = 8; //1bytes 最大温度
    int32 cur_min_temp = 9;  //1bytes 最小温度
    bytes city_name = 10; //max:60 城市名称
    repeated protocol_weather_hour_weather_item hours_weather_items = 11;//max:48 实时天气数据，单位小时
    uint32 air_quality = 12;//1bytes 空气质量
    uint32 rainfall_probability = 13;//2bytes  降水概率
    uint32 humidity = 14;  //1bytes 湿度
    uint32 ultraviolet_intensity = 15;    //当前实时紫外线强度
    uint32 wind_speed = 16;  //1bytes  风速，默认扩大100倍
    uint32 wind_level = 17;  //1bytes  风力等级
    wind_direction_type wind_direction = 18;  //1bytes  风向
    repeated protocol_weather_future_item future_items = 19; //未来天气数据 暂定7天
    protocol_weather_sunrise_item sunrise_item = 20;//日出日落时间item
    bool location = 21;//是否定位城市(当前城市是否是当前定位的城市)
    uint32 atmos_hpa = 22;//气压，单位帕 数值*100
    repeated uint32 uv_items = 23;    //max:24 实时紫外线强度 24小时
    repeated protocol_weather_moon_item moon_item = 24;//max：3 月出月落时间item 3天
    repeated protocol_weather_sunrise_item sunrise_items = 25;//max：3 日出日落时间item 3天
    repeated uint32 atmos_hpa_items = 26;//max:48 未来海平面大气压 数值*100
    uint32 visibility = 27;//4bytes 能见度 单位:米
    bytes visibility_level = 28;//max:30 能见度等级文本
}

message protocol_weather_operate
{
    operate_type operate = 1; //1bytes 操作类型 0：无效操作 1：查询 2：设置
    bool switch_flag = 2; //1bytes 天气功能 true 开启,false 关闭
    repeated protocol_weather_detail_data_item detail_data_item = 3;
    int32 latitude = 4;//当前位置 纬度 负数:S南纬  正数：N北纬 放大1000000倍
    int32 longitude = 5;//当前位置  经度 负数:W西经  正数：E东经 放大1000000倍
};

message protocol_weather_inquire_reply
{
    uint32 func_table = 1;//1bytes 功能表
    uint32 weather_support_max = 2; //1bytes 天气详情支持最大数量
    operate_type operate = 3; //1bytes 操作类型 0：无效操作 1：查询 2：设置
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持当前位置经纬度下发 |
