---
docId: flutter-database
locale: en-US
title: "Flutter Database Queries and Operations"
description: "Configure the database user and query locally stored health records."
platform: Flutter
slug: flutter/database
order: 14
status: published
version: v2.0
---

# Flutter Database Queries and Operations

Configure the database user and query locally stored health records.

## Table Structure
The strikethrough on the field indicates that it is not in use (can be ignored).

### Heart Rate Table Structure (HEART_RATE_DATA_HEAD)"
> userID      : User ID
> 
> deviceId     :Device ID
> 
> creat_time ：Creation time
> 
> offset_last：Last received offset position (seconds)
> 
> silent_hr：Last received offset position (seconds)
> 
> min：Minimum heart rate
> 
> max：Maximum heart rate
> 
> average:Average heart rate
> 
> raisedHr: Percentage of increased heart rate
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> ~~hr_interval~~:  [{"/threshold"/:12,"/minute"/:60}]  
> 
> datas : Detailed data ([{"offset": 1, "value": 10}]) - offset in seconds, value is the heart rate
> 
> 

### Stress Table Structure (STRESS_DATA_HEAD)
> userID      : User ID
> 
> deviceId     :Device ID
> 
> creat_time ：Creation time
> 
> offset_last：Last received offset position (minutes)
> 
> min：Minimum stress level
> 
> max：Maximum stress level
> 
> average:Average stress level
> 
> low:Low stress level percentage
> 
> usual:Usual stress level percentage
> 
> higher:Higher stress level percentage
> 
> verHigh:Very high stress level percentage
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> datas : Detailed data ([{"offset": 1, "value": 10}]) - offset in minutes, value is the stress level

### Blood Oxygen Table Structure (SPO_DATA_HEAD)
> userID      : User ID
> 
> deviceId     :Device ID
> 
> creat_time ：Creation time
> 
> offset_last：Last received offset position (minutes)
> 
> min：Minimum blood oxygen level
> 
> max：Maximum blood oxygen level
> 
> average:Average blood oxygen level
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> datas : Detailed data ([{"offset": 1, "value": 10}]) - offset in minutes, value is the blood oxygen level
> 
> 

### Sleep Table Structure (SLEEP_DATA_HEAD)"
> - userID: User ID
> - deviceId: Device ID
> - get_up_date: Wake-up date
> - offset_last: Not currently in use
> - fall_asleep_time: Time of falling asleep
> - get_up_time: Time of waking up
> - total_sleep_time_mins: Total sleep duration (in minutes)
> - wake_mins: Total awake duration (in minutes)
> - light_sleep_mins: Total light sleep duration (in minutes)
> - deep_sleep_mins: Total deep sleep duration (in minutes)
> - rem_mins: Total REM sleep duration (in minutes)
> - wake_count: Number of awakenings
> - light_sleep_count: Number of light sleep cycles
> - deep_sleep_count: Number of deep sleep cycles
> - rem_count: Number of REM sleep cycles
> - sleep_score: Sleep score
> - datas: Detailed data ([{"stage": 1, "duration": 70}]) - sleep stage (1-4) and duration in minutes

> 

### Daily Activity Table Structure (ACTIVITY_DATA_HEAD)
> \- userID: User ID
> 
> \- deviceId: Device UUID
> 
> \- creat_time: Creation time
> 
> \- offset_last: Last received offset position (minutes)
> 
> \- total_step: Total steps
> 
> \- total_exercise_min: Total exercise duration (in minutes)
> 
> \- total_activity_calories: Total activity calories
> 
> \- total_rest_calories: Total resting calories/BMR
> 
> \- total_distances: Total distance (in kilometers)
> 
> \- total_stand_hour: Total hours standing per day
> 
> \- activity_item_count: Number of activity items
> 
> \- uploadStatus: Upload status (0: not uploaded, 1: uploaded)
> 
> \- floors_climbed_support: Whether climbing floors is supported
> 
> \- total_floors_climbed: Total floors climbed
> 
> \- stand_details：Standing details, the array length is 24, 0 and 1 represent whether
> 
> \- datas: Detailed data ([{"step_count": 1, "exercise_min": 10, "activity_calories": 1, "rest_calories": 10, "distance": 1, "~~stand_time~~": 10, "wear_time": 1}])
> 
> Note: The 'datas' field contains detailed information about each activity item, including step count, exercise duration, activity calories, resting calories, distance, standing time, and wear time.
> 
> 

### hrv HRV_DATA_HEAD
> \- userID: User ID
> 
> \- deviceId: Device ID
> 
> \- creat_time: Creation time
> 
> \- offset_last: Last received offset position (minutes)
> 
> \- min: Minimum hrv
> 
> \- max: Maximum hrv
> 
> \- average: Average hrv
> 
> \- sleepMax: HRV maximum value during sleep
> 
> \- sleepMin: HRV minimum value during sleep
> 
> \- uploadStatus: Upload status (0: not uploaded, 1: uploaded)
> 
> \- datas: Detailed data ([{"offset": 1, "value": 10}]) - offset in minutes, value is the heart rate
> 
> 

### Sports Table Structure (SPORT_DATA_HEAD)
> \- userID: User ID
> 
> \- deviceId: Device UUID
> 
> \- creatTime: Creation time
> 
> \- startTime: Start time
> 
> \- endTime: End time
> 
> \- sportType: Sport type (see below for type descriptions)
> 
> \- isConnectApp: Whether the bracelet is connected to the app (1: connected, 0: not connected)
> 
> \- sportStartType: 0: Invalid, 1: Sport initiated by the app, 2: Sport initiated by the watch
> 
> \- durations: Sport duration (in seconds)
> 
> \- goalType: Sport goal type
> 
> 
> 
> \- goalData: Goal value
> 
> \- avgHrValue: Average heart rate value
> 
> \- maxHrValue: Maximum heart rate value
> 
> \- minHrValue: Minimum heart rate value
> 
> \- warmUpTime: Accumulated warm-up time (seconds)
> 
> \- fatBurningTime: Accumulated fat-burning time (seconds)
> 
> \- aerobicExerciseTime: Accumulated aerobic exercise time (seconds)
> 
> \- anaerobicExerciseTime: Accumulated anaerobic exercise time (seconds)
> 
> \- extremeExerciseTime: Accumulated extreme exercise time (seconds)
> 
> \- totalStep: Total steps
> 
> \- totalCalories: Total calories (in kilocalories)
> 
> \- totalDistance: Total distance (in meters)
> 
> \- avgKmPace: Average kilometer pace (in seconds, e.g., 361 for 6 minutes and 1 second)
> 
> \- fastKmPace: Fastest kilometer pace
> 
> \- avgSpeed: Average speed (in km/h, multiplied by 1000 for actual value)
> 
> \- fastSpeed: Fastest speed (in km/h, multiplied by 1000 for actual value)
> 
> \- avgStepFrequency: Average step frequency (steps per minute)
> 
> \- maxStepFrequency: Maximum step frequency (steps per minute)
> 
> \- avgStepStride: Average step stride
> 
> \- maxStepStride: Maximum step stride
> 
> \- trainingEffect: Training effect (unit: none, range: 1.0 - 5.0, multiplied by 10 for transmission)
> 
> \- vozmax: Maximum oxygen intake (unit: milliliters/kilogram/minute, range: 0-80)
> 
> \- grade: Oxygen intake grade (0x00: No grade, 0x01: Low, 0x02: Amateur, 0x03: Average, 0x04: Above average)
> 
> \- recoveryTime: Recovery time (in hours)
> 
> \- hrItemCount: Number of heart rate values
> 
> \- kmSpeedCount: Number of kilometer speed values (max 100)
> 
> \- paceCount: Number of pace values
> 
> \- stepFrequencyCount: Number of step frequency values
> 
> \- stepStrideCount: Number of step stride values
> 
> \- avgPower: Average running power
> 
> \- swimDistance: Swimming distance (in meters)
> 
> \- maxElevation: Maximum elevation (in meters)
> 
> \- minElevation: Minimum elevation (in meters)
> 
> \- avgElevation: Average elevation (in meters)
> 
> \- climbHeight: Climbing height (accumulated ascent height in meters since the start of the sport)
> 
> \- met: Metabolic equivalent of task (MET)
> 
> \- metSupport: Whether MET is supported
> 
> \- elevationSupport: Whether elevation data is supported
> 
> \- avgPowerSupport: Whether running power is supported
> 
> \- uploadStatus: Upload status
> 
> speedPaceSupport: Whether speed details are supported
> 
> restCaloriesSupport: Whether total resting calories are supported
> 
> totalRestCalories: Total resting calories
> 
> vo2maxSupport: Whether maximum oxygen uptake and running power values are supported
> 
> swimDataSupport: Whether swimming data is supported
> 
> poolLength: Pool length
> 
> yardPoolLength: Pool length
> 
> totalLaps: Total laps
> 
> mainStroke: Main stroke
> 
> 
> 
> totalStrokes: Total strokes
> 
> swimAvgPace: Swimming average pace
> 
> swimAvgSwolf: Swolf = single lap strokes + lap duration (seconds)
> 
> avgStrokeRate: Average stroke rate
> 
> pauseDurations: Pause duration during exercise; unit: s
> 
> pauseDurationsSupport: Pause duration support
> 
> workoutCourseSupport: Whether workout courses are supported
> 
> courseTotalDurations: Total workout course duration
> 
> courseTotalDistance: Total workout course distance
> 
> courseTotalCalories: Total workout course calories
> 
> courseId: Course ID
> 
> coursePauseDurations: Course pause duration
> 
> courseName: Workout course name
> 
>  multiSportSupport: Does it support combination sports?
> 
>  multiSportIndex: Combined Movement Index
> 
>  multiSportCount: Total number of combined movements
> 
>  multiSportIsLastOne: Is this the last one?
> 
>  multiSportTotalDurations: Total time of combined exercises
> 
> multiSportTotalDistance: Total distance of combined motion
> 
>   multiSportTotalCalories: Total calories from combined exercise
> 
> multiSportActiveCalories: Total calories burned from combined exercise
> 
>  multiSportAvgHr: Average heart rate during combined exercise
> 
>  multiSportId: Combined sports id
> 
> swimHrSupport: Whether swimming heart rate is supported
> 
> swimTrailSupport: Whether swimming track/trajectory is supported
> 
> rtKmSpeedPaceSupport: Whether real-time pace and speed are supported
> 
> speedUnit100: Whether the speed unit is multiplied by 100 for compatibility with legacy data types
> 
> swimDurationSupport: Whether swimming duration is supported
> 
> swimDurations: Swimming duration; unit: seconds (s)
> 
> miDistanceSupport: Whether mile distance is supported
> 
> avgMiPace: Average mile pace; unit: seconds (s)
> 
> fastMiPace: Fastest mile pace; unit: seconds (s)
> 
> avgMiSpeed: Average mile speed (mi/h), multiplied by 100 in firmware
> 
> fastMiSpeed: Fastest mile speed (mi/h), multiplied by 100 in firmware
> 
> swimDistanceSupport: Whether swimming distance in yards is supported
> 
> swimYardDistance: Swimming distance; unit: yards
> 
> footballDistanceSupport: Whether football distance display is supported
> 
> racketDataSupport: Whether racket sports data is supported
> 
> racketSpeed: Swing speed
> 
> processRacketSpeedArrayFlag: Swing speed array flag: 0-[0,200], 1-[0,400]
> 
> processRacketSpeedArrayData: Swing speed array data, range 0–999 km/h
> 
> - processRacketSpeedArrayFlag corresponds to the X-axis in the chart, with a total of 21 points.
> 
>   - If the value is 0, the range is 0–200, divided into 21 points: 0, 10, 20, 30 … 200
> - processRacketSpeedArrayData corresponds to the values of the 21 index points
> 
> maxRacketSpeed: Maximum swing speed
> 
> longestRally: Longest consecutive rally count
> 
> forehandsStroke: Forehand stroke count
> 
> backhandsStroke: Backhand stroke count
> 
> overhandsStroke: Overhand stroke count
> 
> underhandsStroke: Underhand stroke count
> 
> otherStroke: Other stroke count
> 
> - performanceRadarArray: Performance radar chart data
> 
>   - Contains 6 fixed values:
>   
>     - 0: Power score (radar chart)
>     - 1: Stability score (radar chart)
>     - 2: Defense score (radar chart)
>     - 3: Efficiency score (radar chart)
>     - 4: Endurance score (radar chart)
>     - 5: Attack score (radar chart)
> 
> aerobicEffect: Aerobic effect value, range 0.0–5.0 (1 decimal place retained), multiplied by 10
> 
> anaerobicEffect: Anaerobic effect value, range 0.0–5.0 (1 decimal place retained), multiplied by 10
> 
> trainingEffectType: Training effect category determination
> 
> - trainingEffectType: Corresponding training effect type
> 
>   - enum training_effect_type {
>   
>     - TRAINING_EFFECT_RECOVERY = 0,      // Recovery: Aerobic 0.0–1.9, Anaerobic 0.0–0.9
>     - TRAINING_EFFECT_BASE_ENDURANCE = 1, // Base Endurance: Aerobic 2.0–2.9, Anaerobic 0.0–1.9
>     - TRAINING_EFFECT_TEMPO = 2,          // Tempo: Aerobic 3.0–3.9, Anaerobic 0.0–1.9
>     - TRAINING_EFFECT_THRESHOLD = 3,      // Threshold: Aerobic 4.0–5.0, Anaerobic 0.0–1.9
>     - TRAINING_EFFECT_VO2MAX = 4,         // VO₂Max: Aerobic 4.0–5.0, Anaerobic 2.0–3.9
>     - TRAINING_EFFECT_ANAEROBIC = 5,      // Anaerobic: Aerobic 0.0–3.9, Anaerobic 4.0–5.0
>     - TRAINING_EFFECT_OTHER = 6
>   - }
> 
> trainingEffectSupport: Whether training effect data is supported
> 
> skipRopeDataSupport: Whether jump rope data is supported
> 
> totalSkipRopeCount: Total jump rope count
> 
> maxSkipConsecutiveCnt: Maximum consecutive jump count
> 
> totalInterruptCount: Total interruption count
> 
> totalInterruptTimeSec: Total interruption duration; unit: seconds (s)
> 
> totalSkipTimeSec: Total jump rope duration; unit: seconds (s)
> 
> avgJumpsPerSecond: Average frequency, jumps per second (JPS)
> 
> avgJumpsPerMinute: Average speed, jumps per minute (JPM)
> 
> maxAvgJumpsPerMinute: Maximum average frequency, jumps per minute (JPM)
> 
> skiingDistanceSupport: Whether skiing distance is supported
> 
> runPostureSupport: Whether running posture data is supported
> 
> postureGroundTime: Ground contact time
> 
> postureAirTime: Air time
> 
> postureGroundAirRatio: Ground-to-air ratio
> 
> postureBalanceL: Left foot balance ratio
> 
> postureBalanceR: Right foot balance ratio
> 
> postureBabalanceRl: Left-right foot balance ratio, negative for right foot dominance, positive for left foot dominance
> 
> postureVerticalAmplitude: Vertical oscillation amplitude
> 
> postureVerticalStepPercent: Vertical stride ratio
> 
> verticalJumpSupport: Whether vertical jump data is supported
> 
> totalLoad: Total training load
> 
> numRacketTotal: Total swing count, range 0–2000
> 
> curSportTrainingLoad: Current workout training load
> 
> planId: Associated unique AI training plan ID
> 
> subId: Unique incremental identifier for all sub-courses under the training plan
> 
> isPrimary: Indicates whether the current training course is the primary or secondary item
> 
> sportsEventSupport：Support for multiple sports event combinations
> 
> sportsEventType： （Events_type）
> 
> enum Events_type{  
>    HYROX_SINGLES = 0,      
>    HYROX_DUBLES = 1,       
>    HYROX_RELAY =2,          
>    TRIATHON =3,               // （Not supported）  
> }
> 
> sportsEventRunTime：Total time for all running segments  /s
> 
> sportsEventWorkoutTime：Duration of all training segments /s
> 
> sportsEventTransitionTime：For all transition segments, the duration for HYROX events is 0.
> 
> Additional Items:
> 
> \- hrValueItem: Real-time heart rate monitoring: Saves a set every 5 seconds, with a maximum storage time of 20 hours.
> 
> \- kmSpeedItem: Real-time kilometer speed details (saved every 1 kilometer)
> 
> \- paceCount: Real-time pace details (saved every second)
> 
> \- stepFrequencyItem: Real-time step frequency details (saved every 5 seconds)
> 
> \- stepStrideItem: Real-time step stride details (saved every 5 seconds)
> 
> -elevationItem: Real-time absolute altitude details Unit: meter Store a value every 2 seconds Data: int16_t
> 
> \- trailData: Sport trajectory - latitude (saved every 2 seconds)
> 
> \- speedPaceItem: Real-time speed and pace details with latitude information (saved every 5 seconds)
> 
> workoutCourseItem: Workout course details
> 
> 
> 
> powerItem: Real-time power details, stored every 5 seconds, data: uint16_t
> 
> runPostureItem：Running Form Details: Saved every 5 seconds.
> 
> 
> 
>     verticalJumpItem：Vertical Jump Details
> 
> 

sportsEventItem

> 

### Respiratory RESPIRATORY_DATA_HEAD
> userID      : User ID
> 
> create_time ：
> 
> offset_last：Record the offset position of the last received data.（minutes）
> 
> min：Minimum Respiratory
> 
> max：Maximum Respiratory
> 
> average:Average Respiratory
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> datas : Detailed data ([{"offset": 1, "value": 10}]) - offset in minutes, value is Respiratory
> 
> 

### second oxygen SPO_SECOND_DATA_HEAD
> userID      : User ID
> 
> deviceId     :Device ID
> 
> create_time ：create time
> 
> offset_last：last received offset position (minutes)
> 
> min：Minimum blood oxygen level
> 
> max：Maximum blood oxygen level
> 
> average:Average blood oxygen level
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> datas : Detailed data ([{"offset": 1, "value": 10}]) - offset in second, value is the blood oxygen level
> 
> 

### temperature TEMPERATURE_DATA_HEAD
> userID      : 
> 
> deviceId     :
> 
> create_time ：create time
> 
> offset_last: Last received offset position (minutes)
> 
> bodyLineSupport: Whether body temperature baseline is supported
> 
> bodyBaseLineTemp: Body temperature baseline value \*100
> 
> baselineDiff: Baseline difference \*100
> 
> tempState:Temperature state
> 
> enum body_temp_state{
> 
>     ENUM_BODY_TEMP_BASELINE_NULL = 0,        // No baseline available
> 
>     ENUM_BODY_TEMP_GENERATE_BASELINE = 1,    // Baseline has been generated
> 
>     ENUM_BODY_TEMP_BASELINE_NEED_ONE = 2,    // Need 1 more night of data
> 
>     ENUM_BODY_TEMP_BASELINE_NEED_TWO = 3,    // Need 2 more nights of data
> 
>     ENUM_BODY_TEMP_BASELINE_NEED_THREE = 4,  // Need 3 more nights of data
> 
> };
> 
> sleepTempSupport:  Sleep Temperature Support   1:Support. 0 noSupport
> 
> sleepBodyTempAverage:  Sleep body temperature data, magnified 100 times.
> 
> uploadStatus：Upload status (0: not uploaded, 1: uploaded)
> 
> datas : Detailed data
> 
> [{
> 
>      "/offset"/:1,     //minutes
> 
>      "/ntc1"/:10,   // Internal temperature 
> 
>      "/ntc2"/:1, //Ambient temperature
> 
>       "/bodyTemp"/:10,  //  Body temperature \*100
> 
> }]

## Set Database User ID
## Queries
### Activity
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getActivityTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### Sleep
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getSleepTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### Heart Rate
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getHeartRateTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### Stress
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getStressTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### Blood Oxygen
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getSpoTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### hrv
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getHrvTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### sport
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getSportTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### respiratory
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getRespiratoryTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### Second oxygen
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getSpoSecondTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

### temperature
```dart
String startTime = "";
String endTime = DateTime.now().toString().substring(0,10);
sdkManager.getTemperatureTimeData(startTime,endTime).then((e){
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
});
```

## Query Unuploaded Data
### Activity
```dart
sdkManager.getActivityUploadStatus()
```

### Heart Rate
```dart
sdkManager.getHeartRateUploadStatus()
```

### Stress
```dart
sdkManager.getStressUploadStatus()
```

### Blood Oxygen
```dart
sdkManager.getSpoUploadStatus()
```

### Sport
```dart
sdkManager.getSportUploadStatus()
```

### hrv
```dart
sdkManager.getHrvUploadStatus()
```

### Sleep
```dart
sdkManager.getSleepUploadStatus()
```

### respiratory
```dart
sdkManager.getRespiratoryUploadStatus()
```

### Second oxygen
```dart
sdkManager.getSpoSecondUploadStatus()
```

### temperature
```dart
sdkManager.getTemperatureUploadStatus()
```

## Set Status to Uploaded
```dart
///activity
sdkManager.updateDBUploadStatus(SyncServerType.activity);
 ...................
```
