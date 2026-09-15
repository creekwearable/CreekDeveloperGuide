---
docId: flutter-cardio-fitness
locale: zh-CN
title: "Flutter 有氧适能"
description: "读取并更新最大摄氧量与比赛预测记录。"
platform: Flutter
slug: flutter/cardio-fitness
order: 134
status: published
version: v2.0
---

# Flutter 有氧适能

读取并更新最大摄氧量与比赛预测记录。

## 接口示例

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

## Protobuf 数据模型

```protobuf
syntax = "proto3";

enum cardio_fitness_level
{
    CF_LEVEL_NULL = 0; // 空
    CF_LEVEL_LOW = 1; // 低
    CF_LEVEL_LOW_MID = 2; // 偏低
    CF_LEVEL_MEDUIM = 3; // 中等
    CF_LEVEL_GOOD = 4; // 良好
    CF_LEVEL_EXCELLENT = 5; // 优秀
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
    uint32 vo2max_value = 1; // 实际值乘以10，10倍
    uint32 unix_time = 2;    // Unix timestamp (秒)
    cardio_fitness_level level = 3; // VO2Max level
}

message protocol_cardio_fitness_operate
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    cardio_fitness_vo2max_data vo2max_best = 2; // 最佳 VO2 max 数据

    repeated cardio_fitness_vo2max_data vo2max_history = 3; // 历史 VO2 max 记录。

    cardio_fitness_score score_best = 4; // 马拉松预测成绩
}

message protocol_cardio_fitness_inquire_reply
{
    operate_type operate = 1; // 1bytes 操作类型 0：无效操作 1：查询 2：设置
    uint32 func_table = 2; // 1bytes 功能表

    cardio_fitness_vo2max_data vo2max_best = 3; // 最佳 VO2 max 数据

    repeated cardio_fitness_vo2max_data vo2max_history = 4; // 历史 VO2 max 记录。

    cardio_fitness_score score_predict = 5; // 马拉松预测成绩
}
```

### 字段说明

#### `cardio_fitness_score`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `five_km` | `uint32` | Predicted result for 5 km |
| `ten_km` | `uint32` | Predicted result for 10 km |
| `half_marathon` | `uint32` | Predicted result for half marathon |
| `marathon` | `uint32` | Predicted result for full marathon |

#### `cardio_fitness_vo2max_data`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `vo2max_value` | `uint32` | 实际值乘以10，10倍 |
| `unix_time` | `uint32` | Unix timestamp (秒) |
| `level` | `cardio_fitness_level` | VO2Max level |

#### `protocol_cardio_fitness_operate`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `vo2max_best` | `cardio_fitness_vo2max_data` | 最佳 VO2 max 数据 |
| `vo2max_history` | `repeated cardio_fitness_vo2max_data` | 历史 VO2 max 记录。 |
| `score_best` | `cardio_fitness_score` | 马拉松预测成绩 |

#### `protocol_cardio_fitness_inquire_reply`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes 操作类型 0：无效操作 1：查询 2：设置 |
| `func_table` | `uint32` | 1bytes 功能表 |
| `vo2max_best` | `cardio_fitness_vo2max_data` | 最佳 VO2 max 数据 |
| `vo2max_history` | `repeated cardio_fitness_vo2max_data` | 历史 VO2 max 记录。 |
| `score_predict` | `cardio_fitness_score` | 马拉松预测成绩 |

### 枚举值

#### `cardio_fitness_level`

| 枚举 | 值 | 说明 |
| --- | --- | --- |
| `CF_LEVEL_NULL` | `0` | 空 |
| `CF_LEVEL_LOW` | `1` | 低 |
| `CF_LEVEL_LOW_MID` | `2` | 偏低 |
| `CF_LEVEL_MEDUIM` | `3` | 中等 |
| `CF_LEVEL_GOOD` | `4` | 良好 |
| `CF_LEVEL_EXCELLENT` | `5` | 优秀 |
