---
docId: ios-weather
locale: en-US
title: iOS Weather
description: Write current conditions and forecast data to the device.
platform: iOS
slug: ios/weather
order: 112
status: published
version: v2.0
---

# iOS Weather

## Overview

Write current conditions and forecast data to the device.

## Swift example

```swift
// Set weather data.
var data =  protocol_weather_operate()
            data.switchFlag = true
            var item = protocol_weather_detail_data_item()
            item.hour = 14
            item.curTemp = 30
            item.curMaxTemp = 33
            item.curMinTemp = 26
            data.detailDataItem.append(item)
            CreekInterFace.instance.setWeather(model: data) {
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
    bool is_support = 1;// Whether the capability is supported.
    uint32 cmd_id = 2;// Capability command identifier.
}

message protocol_function_table {
    function_table weather = 5;// Weather capability.
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
};

enum weather_type
{
    TORNADO = 0;// TORNADO
    TROPICAL_STORM= 1;// TROPICAL STORM
    HURRICANE = 2;// HURRICANE
    STRONG_STORMS = 3;// STRONG STORMS
    THUNDERSTORMS = 4;// THUNDERSTORMS
    RAIN_SNOW = 5;// RAIN SNOW
    RAIN_SLEET = 6;// RAIN SLEET
    WINTRY_MIX = 7;// WINTRY MIX
    FREEZING_DRIZZLE = 8;// FREEZING DRIZZLE
    DRIZZLE = 9;// DRIZZLE
    FREEZING_RAIN = 10;// FREEZING RAIN
    SHOWERS = 11;// SHOWERS
    RAIN = 12;// RAIN
    FLURRIES = 13;// FLURRIES
    SNOW_SHOWERS = 14;// SNOW SHOWERS
    DRIFTING_SNOW = 15;// DRIFTING SNOW
    SNOW = 16;// SNOW
    HAIL = 17;// HAIL
    SLEET = 18;// SLEET
    BLOWING_DUST_SANDSTORM = 19;// BLOWING DUST SANDSTORM
    FOGGY = 20;// FOGGY
    HAZE = 21;// HAZE
    SMOKE = 22;// SMOKE
    BREEZY = 23;// BREEZY
    WINDY = 24;// WINDY
    ICE_CRYSTALS = 25;// ICE CRYSTALS
    CLOUDY = 26;// CLOUDY
    MOSTLY_CLOUDY_NIGHT = 27;// MOSTLY CLOUDY NIGHT
    MOSTLY_CLOUDY_DAY = 28;// MOSTLY CLOUDY DAY
    PARTLY_CLOUDY_NIGHT = 29;// PARTLY CLOUDY NIGHT
    PARTLY_CLOUDY_DAY = 30;// PARTLY CLOUDY DAY
    CLEAR = 31;// CLEAR
    SUNNY = 32;// SUNNY
    MOSTLY_CLEAR = 33;// MOSTLY CLEAR
    MOSTLY_SUNNY = 34;// MOSTLY SUNNY
    MIXED_RAIN_HAIL = 35;// MIXED RAIN HAIL
    HOt = 36;// HOt
    ISOLATED_THUNDERSTORMS = 37;// ISOLATED THUNDERSTORMS
    SCATTERED_THUNDERSTORMS_D = 38;// (DAY)
    SCATTERED_SHOWERS_NIGHT = 39;// (Night)
    HEAVY_RAIN = 40;// HEAVY RAIN
    SCATTERED_SNOW_SHOWERS_D = 41;// SCATTERED SNOW SHOWERS D
    HEAVY_SNOW = 42;// HEAVY SNOW
    BLIZZARD = 43;// BLIZZARD
    NOT_AVAILABLE = 44;// data
    SCATTERED_SNOW_SHOWERS_N = 45;// (Night)
    SCATTERED_SHOWERS = 46;// SCATTERED SHOWERS
    SCATTERED_THUNDERSTORMS_N = 47;// (Night)
};

enum wind_direction_type
{
    WEATHER_DIRECTION_N = 0;// WEATHER DIRECTION N
    WEATHER_DIRECTION_NNE = 1;// WEATHER DIRECTION NNE
    WEATHER_DIRECTION_NE = 2;// WEATHER DIRECTION NE
    WEATHER_DIRECTION_ENE = 3;// WEATHER DIRECTION ENE
    WEATHER_DIRECTION_E = 4;// WEATHER DIRECTION E
    WEATHER_DIRECTION_ESE = 5;// WEATHER DIRECTION ESE
    WEATHER_DIRECTION_SE = 6;// WEATHER DIRECTION SE
    WEATHER_DIRECTION_SSE = 7;// WEATHER DIRECTION SSE
    WEATHER_DIRECTION_S = 8;// WEATHER DIRECTION S
    WEATHER_DIRECTION_SSW = 9;// WEATHER DIRECTION SSW
    WEATHER_DIRECTION_SW = 10;// WEATHER DIRECTION SW
    WEATHER_DIRECTION_WSW = 11;// WEATHER DIRECTION WSW
    WEATHER_DIRECTION_W = 12;// WEATHER DIRECTION W
    WEATHER_DIRECTION_WNWM = 13;// WEATHER DIRECTION WNWM
    WEATHER_DIRECTION_NW = 14;// WEATHER DIRECTION NW
    WEATHER_DIRECTION_NNW = 15;// WEATHER DIRECTION NNW
};

enum moon_phase
{
    NEW_MOON = 0;// New moon
    WAXING_CRESCENT = 1;// Waxing crescent
    FIRST_QUARTER = 2;// First quarter
    WAXING_GIBBOUS = 3;// Waxing gibbous
    FULL_MOON = 4;// Full moon
    WANING_GIBBOUS = 5;// Waning gibbous
    LAST_QUARTER = 6;// Last quarter
    WANING_MOON = 7;// Waning crescent
};

message protocol_weather_future_item
{
    weather_type weather_type = 1; // Weather condition; 1 byte
    int32 max_temp = 2; // Maximum temperature; 1 byte
    int32 min_temp = 3; // Minimum temperature; 1 byte
};

message protocol_weather_hour_weather_item
{
    weather_type weather_type = 1; // Weather condition; 1 byte
    int32 temperature = 2;  // Temperature; 1 byte
};

// Sunrise and sunset times.
message protocol_weather_sunrise_item
{
    uint32 sunrise_hour = 1; // Sunrise hour; 1 byte
    uint32 sunrise_min = 2; // Sunrise minute
    uint32 sunset_hour = 3;// Sunset hour; 1 byte
    uint32 sunset_min = 4; // Sunset minute
};

// Moonrise and moonset times.
message protocol_weather_moon_item
{
    uint32 moonrise_hour = 1; // Moonrise hour; 1 byte
    uint32 moonrise_min = 2; // Moonrise minute
    uint32 moonset_hour = 3;// Moonset hour; 1 byte
    uint32 moonset_min = 4; // Moonset minute
    moon_phase phase = 5;// Moon phase
};

message protocol_weather_detail_data_item
{
    uint32 month = 1; // Month of the latest synchronization
    uint32 day = 2; // Day of month
    uint32 hour = 3; // Hour
    uint32 min = 4;  // Minute
    uint32 week = 5; // Weekday: 0x00 invalid; 0x01–0x07 Monday through Sunday
    weather_type weather_type = 6; // Current weather condition; 1 byte
    int32 cur_temp = 7;  // Current temperature; 1 byte
    int32 cur_max_temp = 8; // Current maximum temperature; 1 byte
    int32 cur_min_temp = 9;  // Current minimum temperature; 1 byte
    bytes city_name = 10; // City name; maximum 60 bytes
    repeated protocol_weather_hour_weather_item hours_weather_items = 11;// Hourly weather entries; maximum 48
    uint32 air_quality = 12;// Air quality; 1 byte
    uint32 rainfall_probability = 13;// Precipitation probability; 2 bytes
    uint32 humidity = 14;  // Humidity; 1 byte
    uint32 ultraviolet_intensity = 15;    // Current UV intensity
    uint32 wind_speed = 16;  // Wind speed multiplied by 100; 1 byte
    uint32 wind_level = 17;  // Wind-force level; 1 byte
    wind_direction_type wind_direction = 18;  // Wind direction; 1 byte
    repeated protocol_weather_future_item future_items = 19; // Forecast entries; currently seven days
    protocol_weather_sunrise_item sunrise_item = 20;// Sunrise and sunset times.
    bool location = 21;// Whether the city is the device's current location
    uint32 atmos_hpa = 22;// Atmospheric pressure in pascals, multiplied by 100
    repeated uint32 uv_items = 23;    // Hourly UV intensity; maximum 24 entries
    repeated protocol_weather_moon_item moon_item = 24;// Up to three moonrise and moonset entries.
    repeated protocol_weather_sunrise_item sunrise_items = 25;// Up to three sunrise and sunset entries.
    repeated uint32 atmos_hpa_items = 26;// Future sea-level pressure values multiplied by 100; maximum 48 entries
    uint32 visibility = 27;// Visibility in metres; 4 bytes
    bytes visibility_level = 28;// Visibility-level text; maximum 30 bytes
}

message protocol_weather_operate
{
    operate_type operate = 1; // Operation type: 0 invalid, 1 query, 2 set
    bool switch_flag = 2; // Weather switch: true enables, false disables
    repeated protocol_weather_detail_data_item detail_data_item = 3;
    int32 latitude = 4;// Latitude multiplied by 1,000,000; negative south, positive north
    int32 longitude = 5;// Longitude multiplied by 1,000,000; negative west, positive east
};

message protocol_weather_inquire_reply
{
    uint32 func_table = 1;// Capability bit table; 1 byte
    uint32 weather_support_max = 2; // Maximum supported weather-detail count; 1 byte
    operate_type operate = 3; // Operation type: 0 invalid, 1 query, 2 set
}
```
