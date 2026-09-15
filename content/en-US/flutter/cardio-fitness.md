---
docId: flutter-cardio-fitness
locale: en-US
title: "Flutter Cardio Fitness"
description: "Read and update VO2 max and race-prediction records."
platform: Flutter
slug: flutter/cardio-fitness
order: 134
status: published
version: v2.0
---

# Flutter Cardio Fitness

Read and update VO2 max and race-prediction records.

## SDK Usage

```dart
sdkManager.getCardioFitness(callBack: (e) {

}, errCallBack: (e) {

});

protocol_cardio_fitness_operate operate = protocol_cardio_fitness_operate();
// Set the optimal VO2Max data
cardio_fitness_vo2max_data vo2maxBest = cardio_fitness_vo2max_data();
vo2maxBest.level = level.value;
vo2maxBest.vo2maxValue = vo2maxValue.value;
vo2maxBest.unixTime = DateTime.now().millisecondsSinceEpoch ~/ 1000;
operate.vo2maxBest = vo2maxBest;

cardio_fitness_score scoreBest = cardio_fitness_score();
scoreBest.fiveKm = fiveKm.value;
scoreBest.tenKm = tenKm.value;
scoreBest.halfMarathon = halfMarathon.value;
scoreBest.marathon = marathon.value;
operate.scoreBest = scoreBest;

sdkManager.setCardioFitness(
  operate: operate,
  callBack: (){
  },
  errCallBack: (e){

  }
);
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum cardio_fitness_level
{
    CF_LEVEL_NULL = 0;      // Empty / none
    CF_LEVEL_LOW = 1;       // Low
    CF_LEVEL_LOW_MID = 2;   // Below average
    CF_LEVEL_MEDUIM = 3;    // Medium / average
    CF_LEVEL_GOOD = 4;      // Good
    CF_LEVEL_EXCELLENT = 5; // Excellent
}

message cardio_fitness_score
{
    uint32 five_km = 1;         // Predicted result for 5 km
    uint32 ten_km = 2;          // Predicted result for 10 km
    uint32 half_marathon = 3;   // Predicted result for half marathon
    uint32 marathon = 4;        // Predicted result for full marathon
}

message cardio_fitness_vo2max_data
{
    uint32 vo2max_value = 1; // Actual VO2Max value multiplied by 10
    uint32 unix_time = 2;    // Unix timestamp (seconds)
    cardio_fitness_level level = 3; // VO2Max level
}

message protocol_cardio_fitness_operate
{
    operate_type operate = 1; // Operation type (1 byte): 0 = invalid, 1 = query, 2 = set
    cardio_fitness_vo2max_data vo2max_best = 2; // Best VO2 max record.

    repeated cardio_fitness_vo2max_data vo2max_history = 3; // Historical VO2 max records.

    cardio_fitness_score score_best = 4; // Best cardio-fitness score.
}

message protocol_cardio_fitness_inquire_reply
{
    operate_type operate = 1; // Operation type (1 byte): 0 = invalid, 1 = query, 2 = set
    uint32 func_table = 2;    // Function table (1 byte)

    cardio_fitness_vo2max_data vo2max_best = 3; // Best VO2 max record.

    repeated cardio_fitness_vo2max_data vo2max_history = 4; // Historical VO2 max records.

    cardio_fitness_score score_predict = 5; // Predicted cardio-fitness score.
}
```

### Field Reference

#### `cardio_fitness_score`

| Field | Type | Description |
| --- | --- | --- |
| `five_km` | `uint32` | Predicted result for 5 km |
| `ten_km` | `uint32` | Predicted result for 10 km |
| `half_marathon` | `uint32` | Predicted result for half marathon |
| `marathon` | `uint32` | Predicted result for full marathon |

#### `cardio_fitness_vo2max_data`

| Field | Type | Description |
| --- | --- | --- |
| `vo2max_value` | `uint32` | Actual VO2Max value multiplied by 10 |
| `unix_time` | `uint32` | Unix timestamp (seconds) |
| `level` | `cardio_fitness_level` | VO2Max level |

#### `protocol_cardio_fitness_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type (1 byte): 0 = invalid, 1 = query, 2 = set |
| `vo2max_best` | `cardio_fitness_vo2max_data` | Best VO2 max record. |
| `vo2max_history` | `repeated cardio_fitness_vo2max_data` | Historical VO2 max records. |
| `score_best` | `cardio_fitness_score` | Best cardio-fitness score. |

#### `protocol_cardio_fitness_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | Operation type (1 byte): 0 = invalid, 1 = query, 2 = set |
| `func_table` | `uint32` | Function table (1 byte) |
| `vo2max_best` | `cardio_fitness_vo2max_data` | Best VO2 max record. |
| `vo2max_history` | `repeated cardio_fitness_vo2max_data` | Historical VO2 max records. |
| `score_predict` | `cardio_fitness_score` | Predicted cardio-fitness score. |

### Enum Values

#### `cardio_fitness_level`

| Value | Number | Description |
| --- | --- | --- |
| `CF_LEVEL_NULL` | `0` | Empty / none |
| `CF_LEVEL_LOW` | `1` | Low |
| `CF_LEVEL_LOW_MID` | `2` | Below average |
| `CF_LEVEL_MEDUIM` | `3` | Medium / average |
| `CF_LEVEL_GOOD` | `4` | Good |
| `CF_LEVEL_EXCELLENT` | `5` | Excellent |
