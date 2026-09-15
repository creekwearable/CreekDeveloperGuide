---
docId: flutter-weather
locale: en-US
title: "Flutter Weather"
description: "Build and write weather details to the device."
platform: Flutter
slug: flutter/weather
order: 112
status: published
version: v2.0
---

# Flutter Weather

Build and write weather details to the device.

## SDK Usage

Pay attention to details：

```dart
/// Firmware
1. uint32 atmos_hpa = 22; // Atmospheric pressure, unit: Pa (value * 100), interface field: pressureMeanSeaLevel * 100
2. uint32 wind_speed = 16; // 1 byte, wind speed, default 100 times magnification, interface field: windSpeed * 100
3. Wind direction conversion
/// North N 0 348.75 - 11.25
if (deg <= 11.25 || deg >= 348.76) {
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_N;
} else if (deg > 11.25 && deg <= 33.75) {
  /// North-Northeast NNE 22.5 11.25 - 33.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_NNE;
} else if (deg > 33.75 && deg <= 56.25) {
  /// Northeast NE 45 33.75 - 56.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_NE;
} else if (deg > 56.25 && deg <= 78.75) {
  /// East-Northeast ENE 67.5 56.25 - 78.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_ENE;
} else if (deg > 78.75 && deg <= 101.25) {
  /// East E 90 78.75 - 101.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_E;
} else if (deg > 101.25 && deg <= 123.75) {
  /// East-Southeast ESE 112.5 101.25 - 123.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_ESE;
} else if (deg > 123.75 && deg <= 146.25) {
  /// Southeast SE 135 123.75 - 146.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_SE;
} else if (deg > 146.25 && deg <= 168.75) {
  /// South-Southeast SSE 157.5 146.25 - 168.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_SSE;
} else if (deg > 168.75 && deg <= 191.25) {
  /// South S 180 168.75 - 191.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_S;
} else if (deg > 191.25 && deg <= 213.75) {
  /// South-Southwest SSW 202.5 191.25 - 213.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_SSW;
} else if (deg > 213.75 && deg <= 236.25) {
  /// Southwest SW 225 213.75 - 236.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_SW;
} else if (deg > 236.25 && deg <= 258.75) {
  /// West-Southwest WSW 247.5 236.25 - 258.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_WSW;
} else if (deg > 258.75 && deg <= 281.25) {
  /// West W 270 258.75 - 281.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_W;
} else if (deg > 281.25 && deg <= 303.75) {
  /// West-Northwest WNW 292.5 281.25 - 303.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_WNW;
} else if (deg > 303.75 && deg <= 33.75) {
  /// Northwest NW 315 303.75 - 326.25
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_NW;
} else if (deg > 326.25 && deg <= 348.75) {
  /// North-Northwest NNW 337.5 326.25 - 348.75
  item.windDirection = wind_direction_type.WEATHER_DIRECTION_NNW;
}

// Display conditions on the app. This is only used when displaying ℉ on the app. It has no relation to firmware transmission; keep the original format.
uint32 air_temp_unit = 3; // 1 byte, weather temperature unit 0x00: invalid, 0x01: ℃, 0x02: ℉, get user information
if air_temp_unit = 2 {
    temperature * 1.8 + 32;
    temperatureMax * 1.8 + 32;
    temperatureMin * 1.8 + 32;
}
```

```dart
// Set weather
 protocol_weather_operate operate = protocol_weather_operate();
 operate.switchFlag = true;
 protocol_weather_detail_data_item item = protocol_weather_detail_data_item();
 item.hour = 14;
 item.curTemp = 30;
 item.curMaxTemp = 33;
 item.curMinTemp = 26;
 operate.detailDataItem.add(item);
sdkManager.setWeather(operate: operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1;// Query
    SET = 2;// Set
};

enum weather_type
{
    TORNADO = 0;// Tornado
    TROPICAL_STORM = 1;// Tropical storm
    HURRICANE = 2;// Hurricane
    STRONG_STORMS = 3;// Strong storms
    THUNDERSTORMS = 4;// Thunderstorms
    RAIN_SNOW = 5;// Rain and snow
    RAIN_SLEET = 6;// Rain and sleet
    WINTRY_MIX = 7;// Wintry mix
    FREEZING_DRIZZLE = 8;// Freezing drizzle
    DRIZZLE = 9;// Drizzle
    FREEZING_RAIN = 10;// Freezing rain
    SHOWERS = 11;// Showers
    RAIN = 12;// Rain
    FLURRIES = 13;// Flurries
    SNOW_SHOWERS = 14;// Snow showers
    DRIFTING_SNOW = 15;// Drifting snow (wind-blown)
    SNOW = 16;// Snow
    HAIL = 17;// Hail
    SLEET = 18;// Sleet
    BLOWING_DUST_SANDSTORM = 19;// Blowing dust / Sandstorm
    FOGGY = 20;// Foggy
    HAZE = 21;// Haze
    SMOKE = 22;// Smoke
    BREEZY = 23;// Breezy
    WINDY = 24;// Windy
    ICE_CRYSTALS = 25;// Ice crystals
    CLOUDY = 26;// Cloudy
    MOSTLY_CLOUDY_NIGHT = 27;// Mostly cloudy night
    MOSTLY_CLOUDY_DAY = 28;// Mostly cloudy day
    PARTLY_CLOUDY_NIGHT = 29;// Partly cloudy night
    PARTLY_CLOUDY_DAY = 30;// Partly cloudy day
    CLEAR = 31;// Clear night
    SUNNY = 32;// Sunny day
    MOSTLY_CLEAR = 33;// Mostly clear (night)
    MOSTLY_SUNNY = 34;// Mostly sunny (day)
    MIXED_RAIN_HAIL = 35;// Mixed rain and hail
    HOT = 36;// Hot
    ISOLATED_THUNDERSTORMS = 37;// Isolated thunderstorms
    SCATTERED_THUNDERSTORMS_D = 38;// Scattered thunderstorms (Day)
    SCATTERED_SHOWERS_NIGHT = 39;// Scattered showers (Night)
    HEAVY_RAIN = 40;// Heavy rain
    SCATTERED_SNOW_SHOWERS_D = 41;// Scattered snow showers (Day)
    HEAVY_SNOW = 42;// Heavy snow
    BLIZZARD = 43;// Blizzard
    NOT_AVAILABLE = 44;// No data available
    SCATTERED_SNOW_SHOWERS_N = 45;// Scattered snow showers (Night)
    SCATTERED_SHOWERS = 46;// Scattered showers
    SCATTERED_THUNDERSTORMS_N = 47;// Scattered thunderstorms (Night)
};

// Wind direction
enum wind_direction_type
{
    WEATHER_DIRECTION_N = 0;// North
    WEATHER_DIRECTION_NNE = 1;// North-Northeast
    WEATHER_DIRECTION_NE = 2;// Northeast
    WEATHER_DIRECTION_ENE = 3;// East-Northeast
    WEATHER_DIRECTION_E = 4;// East
    WEATHER_DIRECTION_ESE = 5;// East-Southeast
    WEATHER_DIRECTION_SE = 6;// Southeast
    WEATHER_DIRECTION_SSE = 7;// South-Southeast
    WEATHER_DIRECTION_S = 8;// South
    WEATHER_DIRECTION_SSW = 9;// South-Southwest
    WEATHER_DIRECTION_SW = 10;// Southwest
    WEATHER_DIRECTION_WSW = 11;// West-Southwest
    WEATHER_DIRECTION_W = 12;// West
    WEATHER_DIRECTION_WNWM = 13;// West-Northwest
    WEATHER_DIRECTION_NW = 14;// Northwest
    WEATHER_DIRECTION_NNW = 15;// North-Northwest
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
    WANING_MOON = 7;// Waning moon
};

message protocol_weather_future_item
{
    weather_type weather_type = 1; // 1byte Weather type
    int32 max_temp = 2; // 1byte Maximum temperature
    int32 min_temp = 3; // 1byte Minimum temperature
};

message protocol_weather_hour_weather_item
{
    weather_type weather_type = 1; // 1byte Weather type
    int32 temperature = 2;  // 1byte Temperature
};

// Sunrise and sunset times
message protocol_weather_sunrise_item
{
    uint32 sunrise_hour = 1; // 1byte Sunrise hour
    uint32 sunrise_min = 2; // 1byte Sunrise minute
    uint32 sunset_hour = 3;// 1byte Sunset hour
    uint32 sunset_min = 4; // 1byte Sunset minute
};

// Moonrise and moonset times
message protocol_weather_moon_item
{
    uint32 moonrise_hour = 1; // 1byte Moonrise hour
    uint32 moonrise_min = 2; // 1byte Moonrise minute
    uint32 moonset_hour = 3;// 1byte Moonset hour
    uint32 moonset_min = 4; // 1byte Moonset minute
    moon_phase phase = 5;// Moon phase
};

message protocol_weather_detail_data_item
{
    uint32 month = 1; // 1byte Current month
    uint32 day = 2; // 1byte Current day
    uint32 hour = 3; // 1byte Hour
    uint32 min = 4;  // 1byte Minute
    uint32 week = 5; // 1byte Week (0x00 invalid, 0x01~0x07: Monday~Sunday)
    weather_type weather_type = 6; // 1byte Weather type
    int32 cur_temp = 7;  // 1byte Current temperature
    int32 cur_max_temp = 8; // 1byte Maximum temperature
    int32 cur_min_temp = 9;  // 1byte Minimum temperature
    bytes city_name = 10; // max:60 City name
    repeated protocol_weather_hour_weather_item hours_weather_items = 11;// max:48 Hourly weather data
    uint32 air_quality = 12;// 1byte Air quality
    uint32 rainfall_probability = 13;// 2bytes Precipitation probability
    uint32 humidity = 14;  // 1byte Humidity
    uint32 ultraviolet_intensity = 15; // 1byte Current UV intensity
    uint32 wind_speed = 16;  // 1byte Wind speed, default expanded by 100
    uint32 wind_level = 17;  // 1byte Wind strength
    wind_direction_type wind_direction = 18;  // 1byte Wind direction
    repeated protocol_weather_future_item future_items = 19; // Future weather data (up to 7 days)
    protocol_weather_sunrise_item sunrise_item = 20;// Sunrise and sunset times
    bool location = 21;// Is the current city the city of the location?
    uint32 atmos_hpa = 22;// Pressure (hPa), multiplied by 100
    repeated uint32 uv_items = 23;    // max:24 UV intensity over 24 hours
    repeated protocol_weather_moon_item moon_item = 24;// max:3 Moonrise and moonset times (3 days)
    repeated protocol_weather_sunrise_item sunrise_items = 25;// max:3 Sunrise and sunset times (3 days)
    repeated uint32 atmos_hpa_items = 26;// max:48 Sea-level atmospheric pressure for future
    uint32 visibility = 27;// 4bytes Visibility in meters
    bytes visibility_level = 28;// max:30 Visibility level text
}

message protocol_weather_operate
{
    operate_type operate = 1; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
    bool switch_flag = 2; // 1byte Weather function switch, true: On, false: Off
    repeated protocol_weather_detail_data_item detail_data_item = 3; // Detailed weather entries.
    int32 latitude = 4;// Current latitude, negative: South, positive: North, scaled by 1000000
    int32 longitude = 5;// Current longitude, negative: West, positive: East, scaled by 1000000
};

message protocol_weather_inquire_reply
{
    uint32 func_table = 1;// 1byte Function table
    uint32 weather_support_max = 2; // 1byte Maximum supported weather detail count
    operate_type operate = 3; // 1byte Operation type, 0: Invalid, 1: Query, 2: Set
}
```

### Field Reference

#### `protocol_weather_future_item`

| Field | Type | Description |
| --- | --- | --- |
| `weather_type` | `weather_type` | 1byte Weather type |
| `max_temp` | `int32` | 1byte Maximum temperature |
| `min_temp` | `int32` | 1byte Minimum temperature |

#### `protocol_weather_hour_weather_item`

| Field | Type | Description |
| --- | --- | --- |
| `weather_type` | `weather_type` | 1byte Weather type |
| `temperature` | `int32` | 1byte Temperature |

#### `protocol_weather_sunrise_item`

| Field | Type | Description |
| --- | --- | --- |
| `sunrise_hour` | `uint32` | 1byte Sunrise hour |
| `sunrise_min` | `uint32` | 1byte Sunrise minute |
| `sunset_hour` | `uint32` | 1byte Sunset hour |
| `sunset_min` | `uint32` | 1byte Sunset minute |

#### `protocol_weather_moon_item`

| Field | Type | Description |
| --- | --- | --- |
| `moonrise_hour` | `uint32` | 1byte Moonrise hour |
| `moonrise_min` | `uint32` | 1byte Moonrise minute |
| `moonset_hour` | `uint32` | 1byte Moonset hour |
| `moonset_min` | `uint32` | 1byte Moonset minute |
| `phase` | `moon_phase` | Moon phase |

#### `protocol_weather_detail_data_item`

| Field | Type | Description |
| --- | --- | --- |
| `month` | `uint32` | 1byte Current month |
| `day` | `uint32` | 1byte Current day |
| `hour` | `uint32` | 1byte Hour |
| `min` | `uint32` | 1byte Minute |
| `week` | `uint32` | 1byte Week (0x00 invalid, 0x01~0x07: Monday~Sunday) |
| `weather_type` | `weather_type` | 1byte Weather type |
| `cur_temp` | `int32` | 1byte Current temperature |
| `cur_max_temp` | `int32` | 1byte Maximum temperature |
| `cur_min_temp` | `int32` | 1byte Minimum temperature |
| `city_name` | `bytes` | max:60 City name |
| `hours_weather_items` | `repeated protocol_weather_hour_weather_item` | max:48 Hourly weather data |
| `air_quality` | `uint32` | 1byte Air quality |
| `rainfall_probability` | `uint32` | 2bytes Precipitation probability |
| `humidity` | `uint32` | 1byte Humidity |
| `ultraviolet_intensity` | `uint32` | 1byte Current UV intensity |
| `wind_speed` | `uint32` | 1byte Wind speed, default expanded by 100 |
| `wind_level` | `uint32` | 1byte Wind strength |
| `wind_direction` | `wind_direction_type` | 1byte Wind direction |
| `future_items` | `repeated protocol_weather_future_item` | Future weather data (up to 7 days) |
| `sunrise_item` | `protocol_weather_sunrise_item` | Sunrise and sunset times |
| `location` | `bool` | Is the current city the city of the location? |
| `atmos_hpa` | `uint32` | Pressure (hPa), multiplied by 100 |
| `uv_items` | `repeated uint32` | max:24 UV intensity over 24 hours |
| `moon_item` | `repeated protocol_weather_moon_item` | max:3 Moonrise and moonset times (3 days) |
| `sunrise_items` | `repeated protocol_weather_sunrise_item` | max:3 Sunrise and sunset times (3 days) |
| `atmos_hpa_items` | `repeated uint32` | max:48 Sea-level atmospheric pressure for future |
| `visibility` | `uint32` | 4bytes Visibility in meters |
| `visibility_level` | `bytes` | max:30 Visibility level text |

#### `protocol_weather_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |
| `switch_flag` | `bool` | 1byte Weather function switch, true: On, false: Off |
| `detail_data_item` | `repeated protocol_weather_detail_data_item` | Detailed weather entries. |
| `latitude` | `int32` | Current latitude, negative: South, positive: North, scaled by 1000000 |
| `longitude` | `int32` | Current longitude, negative: West, positive: East, scaled by 1000000 |

#### `protocol_weather_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `func_table` | `uint32` | 1byte Function table |
| `weather_support_max` | `uint32` | 1byte Maximum supported weather detail count |
| `operate` | `operate_type` | 1byte Operation type, 0: Invalid, 1: Query, 2: Set |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | Query |
| `SET` | `2` | Set |

#### `weather_type`

| Value | Number | Description |
| --- | --- | --- |
| `TORNADO` | `0` | Tornado |
| `TROPICAL_STORM` | `1` | Tropical storm |
| `HURRICANE` | `2` | Hurricane |
| `STRONG_STORMS` | `3` | Strong storms |
| `THUNDERSTORMS` | `4` | Thunderstorms |
| `RAIN_SNOW` | `5` | Rain and snow |
| `RAIN_SLEET` | `6` | Rain and sleet |
| `WINTRY_MIX` | `7` | Wintry mix |
| `FREEZING_DRIZZLE` | `8` | Freezing drizzle |
| `DRIZZLE` | `9` | Drizzle |
| `FREEZING_RAIN` | `10` | Freezing rain |
| `SHOWERS` | `11` | Showers |
| `RAIN` | `12` | Rain |
| `FLURRIES` | `13` | Flurries |
| `SNOW_SHOWERS` | `14` | Snow showers |
| `DRIFTING_SNOW` | `15` | Drifting snow (wind-blown) |
| `SNOW` | `16` | Snow |
| `HAIL` | `17` | Hail |
| `SLEET` | `18` | Sleet |
| `BLOWING_DUST_SANDSTORM` | `19` | Blowing dust / Sandstorm |
| `FOGGY` | `20` | Foggy |
| `HAZE` | `21` | Haze |
| `SMOKE` | `22` | Smoke |
| `BREEZY` | `23` | Breezy |
| `WINDY` | `24` | Windy |
| `ICE_CRYSTALS` | `25` | Ice crystals |
| `CLOUDY` | `26` | Cloudy |
| `MOSTLY_CLOUDY_NIGHT` | `27` | Mostly cloudy night |
| `MOSTLY_CLOUDY_DAY` | `28` | Mostly cloudy day |
| `PARTLY_CLOUDY_NIGHT` | `29` | Partly cloudy night |
| `PARTLY_CLOUDY_DAY` | `30` | Partly cloudy day |
| `CLEAR` | `31` | Clear night |
| `SUNNY` | `32` | Sunny day |
| `MOSTLY_CLEAR` | `33` | Mostly clear (night) |
| `MOSTLY_SUNNY` | `34` | Mostly sunny (day) |
| `MIXED_RAIN_HAIL` | `35` | Mixed rain and hail |
| `HOT` | `36` | Hot |
| `ISOLATED_THUNDERSTORMS` | `37` | Isolated thunderstorms |
| `SCATTERED_THUNDERSTORMS_D` | `38` | Scattered thunderstorms (Day) |
| `SCATTERED_SHOWERS_NIGHT` | `39` | Scattered showers (Night) |
| `HEAVY_RAIN` | `40` | Heavy rain |
| `SCATTERED_SNOW_SHOWERS_D` | `41` | Scattered snow showers (Day) |
| `HEAVY_SNOW` | `42` | Heavy snow |
| `BLIZZARD` | `43` | Blizzard |
| `NOT_AVAILABLE` | `44` | No data available |
| `SCATTERED_SNOW_SHOWERS_N` | `45` | Scattered snow showers (Night) |
| `SCATTERED_SHOWERS` | `46` | Scattered showers |
| `SCATTERED_THUNDERSTORMS_N` | `47` | Scattered thunderstorms (Night) |

#### `wind_direction_type`

| Value | Number | Description |
| --- | --- | --- |
| `WEATHER_DIRECTION_N` | `0` | North |
| `WEATHER_DIRECTION_NNE` | `1` | North-Northeast |
| `WEATHER_DIRECTION_NE` | `2` | Northeast |
| `WEATHER_DIRECTION_ENE` | `3` | East-Northeast |
| `WEATHER_DIRECTION_E` | `4` | East |
| `WEATHER_DIRECTION_ESE` | `5` | East-Southeast |
| `WEATHER_DIRECTION_SE` | `6` | Southeast |
| `WEATHER_DIRECTION_SSE` | `7` | South-Southeast |
| `WEATHER_DIRECTION_S` | `8` | South |
| `WEATHER_DIRECTION_SSW` | `9` | South-Southwest |
| `WEATHER_DIRECTION_SW` | `10` | Southwest |
| `WEATHER_DIRECTION_WSW` | `11` | West-Southwest |
| `WEATHER_DIRECTION_W` | `12` | West |
| `WEATHER_DIRECTION_WNWM` | `13` | West-Northwest |
| `WEATHER_DIRECTION_NW` | `14` | Northwest |
| `WEATHER_DIRECTION_NNW` | `15` | North-Northwest |

#### `moon_phase`

| Value | Number | Description |
| --- | --- | --- |
| `NEW_MOON` | `0` | New moon |
| `WAXING_CRESCENT` | `1` | Waxing crescent |
| `FIRST_QUARTER` | `2` | First quarter |
| `WAXING_GIBBOUS` | `3` | Waxing gibbous |
| `FULL_MOON` | `4` | Full moon |
| `WANING_GIBBOUS` | `5` | Waning gibbous |
| `LAST_QUARTER` | `6` | Last quarter |
| `WANING_MOON` | `7` | Waning moon |

### `func_table` Capability Bits

| Bit | Description |
| - | - |
| 0 | Supports providing the current latitude and longitude. |
