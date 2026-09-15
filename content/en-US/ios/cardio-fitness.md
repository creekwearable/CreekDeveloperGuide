---
docId: ios-cardio-fitness
locale: en-US
title: iOS Cardio Fitness
description: Read and update cardio-fitness data such as VO2 max.
platform: iOS
slug: ios/cardio-fitness
order: 147
status: published
version: v2.0
---

# iOS Cardio Fitness

## Overview

Read and update cardio-fitness data such as VO2 max.

## Swift example

```swift
// Get cardio-fitness data.
 CreekInterFace.instance.getCardioFitness{ model in
     
         } failure: { code, message in
          
  }
  
  
  // Set cardio-fitness data.
var  operate =  protocol_cardio_fitness_operate()
var vo2max =  cardio_fitness_vo2max_data()
vo2max.vo2MaxValue = 40
vo2max.unixTime = UInt32(Date().timeIntervalSince1970)
operate.vo2MaxBest = vo2max
CreekInterFace.instance.setCardioFitness(model: operate) {
           
         } failure: { code, message in
           
         }
```

## Protobuf data model

```protobuf
syntax = "proto3";

enum cardio_fitness_level
{
    CF_LEVEL_NULL = 0;// CF LEVEL NULL
    CF_LEVEL_LOW = 1; // CF LEVEL LOW
    CF_LEVEL_LOW_MID = 2;   // CF LEVEL LOW MID
    CF_LEVEL_MEDUIM = 3;    // CF LEVEL MEDUIM
    CF_LEVEL_GOOD = 4;      // CF LEVEL GOOD
    CF_LEVEL_EXCELLENT = 5; // CF LEVEL EXCELLENT
}

message cardio_fitness_score
{
    uint32 five_km = 1;
    uint32 ten_km = 2;
    uint32 half_marathon = 3;
    uint32 marathon = 4;
}

message cardio_fitness_vo2max_data
{
    uint32 vo2max_value = 1; // value 10 10
    uint32 unix_time = 2;
    cardio_fitness_level level = 3;
}

message protocol_cardio_fitness_operate
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    cardio_fitness_vo2max_data vo2max_best = 2;// Best VO2 max record
    repeated cardio_fitness_vo2max_data vo2max_history = 3;// Historical VO2 max records with timestamps
    cardio_fitness_score score_best = 4;// Best marathon prediction
}

message protocol_cardio_fitness_inquire_reply
{
    operate_type operate = 1; // operate; 1bytes operation type 0 invalid 1 query 2 set
    uint32 func_table = 2;// func table; 1bytes capability table
    cardio_fitness_vo2max_data vo2max_best = 3;// Best VO2 max record
    repeated cardio_fitness_vo2max_data vo2max_history = 4;// Historical VO2 max records with timestamps
    cardio_fitness_score score_predict = 5;// Marathon prediction
}
```
