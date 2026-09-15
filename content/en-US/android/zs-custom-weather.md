---
docId: android-zs-custom-weather
locale: en-US
title: Android ZS Custom Weather
description: Send extended weather data to supported custom devices.
platform: Android
slug: android/zs-custom-weather
order: 113
status: published
version: v2.0
---

# Android ZS Custom Weather

Send extended weather data to supported custom devices.

```kotlin
var model = ZsWeather.protocol_zs_weather_operate()
model.switchFlag = true
var item = ZsWeather.protocol_zs_weather_detail_data_item()
item.hour = 14
item.curTemp = 30
item.curMaxTemp = 33
item.curMinTemp = 26
item.visibilityLevel = ByteString.copyFrom("hello".toByteArray())
item.atmosHpa = (1015.1*100).toInt()
model.addDetailDataItem(item)
CreekManager.sInstance.setZSWeather(model = model, {
    responseText.value = "success"
}, failure = { _, m ->
    responseText.value = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0;
    INQUIRE = 1;// Query
    SET = 2;// Set
};

enum weather_type
{
    TORNADO = 0;// TORNADO.
    TROPICAL_STORM= 1;// TROPICAL STORM.
    HURRICANE = 2;// HURRICANE.
    STRONG_STORMS = 3;// STRONG STORMS.
    THUNDERSTORMS = 4;// THUNDERSTORMS.
    RAIN_SNOW = 5;// RAIN SNOW.
    RAIN_SLEET = 6;// RAIN SLEET.
    WINTRY_MIX = 7;// WINTRY MIX.
    FREEZING_DRIZZLE = 8;// FREEZING DRIZZLE.
    DRIZZLE = 9;// DRIZZLE.
    FREEZING_RAIN = 10;// FREEZING RAIN.
    SHOWERS = 11;// SHOWERS.
    RAIN = 12;// RAIN.
    FLURRIES = 13;// FLURRIES.
    SNOW_SHOWERS = 14;// SNOW SHOWERS.
    DRIFTING_SNOW = 15;// DRIFTING SNOW.
    SNOW = 16;// SNOW.
    HAIL = 17;// HAIL.
    SLEET = 18;// SLEET.
    BLOWING_DUST_SANDSTORM = 19;// BLOWING DUST SANDSTORM.
    FOGGY = 20;// FOGGY.
    HAZE = 21;// HAZE.
    SMOKE = 22;// SMOKE.
    BREEZY = 23;// BREEZY.
    WINDY = 24;// WINDY.
    ICE_CRYSTALS = 25;// ICE CRYSTALS.
    CLOUDY = 26;// CLOUDY.
    MOSTLY_CLOUDY_NIGHT = 27;// MOSTLY CLOUDY NIGHT.
    MOSTLY_CLOUDY_DAY = 28;// MOSTLY CLOUDY DAY.
    PARTLY_CLOUDY_NIGHT = 29;// PARTLY CLOUDY NIGHT.
    PARTLY_CLOUDY_DAY = 30;// PARTLY CLOUDY DAY.
    CLEAR = 31;// CLEAR.
    SUNNY = 32;// SUNNY.
    MOSTLY_CLEAR = 33;// MOSTLY CLEAR.
    MOSTLY_SUNNY = 34;// MOSTLY SUNNY.
    MIXED_RAIN_HAIL = 35;// MIXED RAIN HAIL.
    HOt = 36;// HOt.
    ISOLATED_THUNDERSTORMS = 37;// ISOLATED THUNDERSTORMS.
    SCATTERED_THUNDERSTORMS_D = 38;// SCATTERED THUNDERSTORMS D.
    SCATTERED_SHOWERS_NIGHT = 39;// SCATTERED SHOWERS NIGHT.
    HEAVY_RAIN = 40;// HEAVY RAIN.
    SCATTERED_SNOW_SHOWERS_D = 41;// SCATTERED SNOW SHOWERS D.
    HEAVY_SNOW = 42;// HEAVY SNOW.
    BLIZZARD = 43;// BLIZZARD.
    NOT_AVAILABLE = 44;// NOT AVAILABLE.
    SCATTERED_SNOW_SHOWERS_N = 45;// SCATTERED SNOW SHOWERS N.
    SCATTERED_SHOWERS = 46;// SCATTERED SHOWERS.
    SCATTERED_THUNDERSTORMS_N = 47;// SCATTERED THUNDERSTORMS N.
};

// Wind direction
enum wind_direction_type
{
    WEATHER_DIRECTION_N = 0;// WEATHER DIRECTION N.
    WEATHER_DIRECTION_NNE = 1;// WEATHER DIRECTION NNE.
    WEATHER_DIRECTION_NE = 2;// WEATHER DIRECTION NE.
    WEATHER_DIRECTION_ENE = 3;// WEATHER DIRECTION ENE.
    WEATHER_DIRECTION_E = 4;// WEATHER DIRECTION E.
    WEATHER_DIRECTION_ESE = 5;// WEATHER DIRECTION ESE.
    WEATHER_DIRECTION_SE = 6;// WEATHER DIRECTION SE.
    WEATHER_DIRECTION_SSE = 7;// WEATHER DIRECTION SSE.
    WEATHER_DIRECTION_S = 8;// WEATHER DIRECTION S.
    WEATHER_DIRECTION_SSW = 9;// WEATHER DIRECTION SSW.
    WEATHER_DIRECTION_SW = 10;// WEATHER DIRECTION SW.
    WEATHER_DIRECTION_WSW = 11;// WEATHER DIRECTION WSW.
    WEATHER_DIRECTION_W = 12;// WEATHER DIRECTION W.
    WEATHER_DIRECTION_WNWM = 13;// WEATHER DIRECTION WNWM.
    WEATHER_DIRECTION_NW = 14;// WEATHER DIRECTION NW.
    WEATHER_DIRECTION_NNW = 15;// WEATHER DIRECTION NNW.
};

enum moon_phase
{
    NEW_MOON = 0;// NEW MOON.
    WAXING_CRESCENT = 1;// WAXING CRESCENT.
    FIRST_QUARTER = 2;// FIRST QUARTER.
    WAXING_GIBBOUS = 3;// WAXING GIBBOUS.
    FULL_MOON = 4;// FULL MOON.
    WANING_GIBBOUS = 5;// WANING GIBBOUS.
    LAST_QUARTER = 6;// LAST QUARTER.
    WANING_MOON = 7;// WANING MOON.
};

message protocol_weather_future_item
{
    weather_type weather_type = 1; // 1bytes WeatherType
    int32 max_temp = 2; // Maximum max temp. 1bytes.
    int32 min_temp = 3; // Min Temp. 1bytes.
};

message protocol_weather_hour_weather_item
{
    weather_type weather_type = 1; // 1bytes WeatherType
    int32 temperature = 2;  // 1bytes Temperature
};

// Sunrise and sunset time item
message protocol_weather_sunrise_item
{
    uint32 sunrise_hour = 1; // 1bytes Sunrise
    uint32 sunrise_min = 2;
    uint32 sunset_hour = 3;// 1bytes Sunset
    uint32 sunset_min = 4;
};

// Moonrise and moonset time item
message protocol_weather_moon_item
{
    uint32 moonrise_hour = 1; // 1bytes Moonrise
    uint32 moonrise_min = 2;
    uint32 moonset_hour = 3;// 1bytes Moonset
    uint32 moonset_min = 4;
    moon_phase phase = 5;// Moon phase
};

message protocol_weather_detail_data_item
{
    uint32 month = 1; // Month.
    uint32 day = 2;
    uint32 hour = 3; // Hour.
    uint32 min = 4;  // Min.
    uint32 week = 5; // Week. 1bytes, 0x00, 0x01, 0x07.
    weather_type weather_type = 6; // 1bytes WeatherType
    int32 cur_temp = 7;  // Cur Temp. 1bytes.
    int32 cur_max_temp = 8; // Maximum cur max temp. 1bytes.
    int32 cur_min_temp = 9;  // Cur Min Temp. 1bytes.
    bytes city_name = 10; // max:60 City name
    repeated protocol_weather_hour_weather_item hours_weather_items = 11;// Hours Weather Items. max:48.
    uint32 air_quality = 12;// 1bytes Air quality
    uint32 rainfall_probability = 13;// 2bytes  Precipitation probability
    uint32 humidity = 14;  // 1bytes Humidity
    uint32 ultraviolet_intensity = 15;    // Ultraviolet Intensity.
    uint32 wind_speed = 16;  // Wind Speed. 1bytes.
    uint32 wind_level = 17;  // 1bytes  Wind level
    wind_direction_type wind_direction = 18;  // 1bytes  Wind direction
    repeated protocol_weather_future_item future_items = 19; // Future Items.
    protocol_weather_sunrise_item sunrise_item = 20;// Sunrise and sunset time item
    bool location = 21;// Location.
    uint32 atmos_hpa = 22;// Atmos Hpa.
    repeated uint32 uv_items = 23;    // Uv Items. max:24.
    repeated protocol_weather_moon_item moon_item = 24;// Moon Item. max: 3.
    repeated protocol_weather_sunrise_item sunrise_items = 25;// Sunrise Items. max: 3.
    repeated uint32 atmos_hpa_items = 26;// Atmos Hpa Items. max:48.
    uint32 visibility = 27;// Visibility. 4bytes.
    bytes visibility_level = 28;// max:30 Visibility-level text
}

message protocol_weather_operate
{
    operate_type operate = 1; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
    bool switch_flag = 2; // Switch Flag. 1bytes.
    repeated protocol_weather_detail_data_item detail_data_item = 3;
    int32 latitude = 4;// Latitude.
    int32 longitude = 5;// Longitude.
};

message protocol_weather_inquire_reply
{
    uint32 func_table = 1;// 1bytes Function table
    uint32 weather_support_max = 2; // Number of weather support max. 1bytes.
    operate_type operate = 3; // 1bytes Operation type 0: Invalid operation 1: Query 2: Set
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether current-location latitude and longitude delivery is supported |
