---
docId: ios-ring-workout
locale: en-US
title: iOS Ring Workout and Live Data
description: Start, pause, resume, or end a ring workout and listen for live data.
platform: iOS
slug: ios/ring-workout
order: 138
status: published
version: v2.0
---

# iOS Ring Workout and Live Data

## Overview

Start, pause, resume, or end a ring workout and listen for live data.

## Swift example

```swift
// liveSportDataListen、liveSportControlListen、sportGpsListen
class GlobalListenManager{
   
   static let shared = GlobalListenManager()
   
   var liveSportDataListenCallback: (( protocol_exercise_sync_realtime_info) -> Void)?
   var liveSportControlListenCallback: (( protocol_exercise_control_operate) -> Void)?
   var sportGpsListenCallback: ((protocol_exercise_gps_info) -> Void)?
   
   private init() {
      CreekInterFace.instance.liveSportDataListen { model in
          self.liveSportDataListenCallback?(model)
      }
      CreekInterFace.instance.liveSportControlListen { model in
          self.liveSportControlListenCallback?(model)
      }
      CreekInterFace.instance.sportGpsListen { model in
         self.sportGpsListenCallback?(model)
      }
   }  
}

// Get supported workout types.
 CreekInterFace.instance.getSportType { model in
              model.supportType
 } failure: { code, message in
            print("getSportType failure: \(message)")
 }

// Start, pause, resume, or end a ring workout.
 CreekInterFace.instance.setSportControl(controlType: .controlStart,self.currentType)
 CreekInterFace.instance.setSportControl(controlType: .controlPause)
 CreekInterFace.instance.setSportControl(controlType: .controlResume)
 // end
 CreekInterFace.instance.setSportControl(controlType: .controlEnd)
 
 
 // data
 GlobalListenManager.shared.liveSportDataListenCallback = { [weak self] model in
      let json = try? model.jsonString()
       self?.updateJSONText(json ?? "")
 }
 // workout state
GlobalListenManager.shared.liveSportControlListenCallback = { [weak self] model in
         self?.stateLabel.text = "state：\(String(describing: model.controlType).uppercased())"
       }

 // GPS
 GlobalListenManager.shared.sportGpsListenCallback =  {model in
         let json = try? model.jsonString()
         print(json ?? "")
         if model.gpsOperate == gps_operate_type.gpsInfoInquire {
            let model = GPSModel()
            model.gpsPermission = 0;
            // Ask for permission 0 Location permission is not enabled 1 Location permission is enabled
            CreekInterFace.instance.setSportGPS(model: model) {
               
            } failure: { code, message in
               
            }
         }else if model.gpsOperate ==  gps_operate_type.gpsInfoRequest{
            // You can enable continuous location tracking here.
            // Then each time, you can take the most recently updated location and send it directly to the firmware.
            let model = GPSModel()
            model.latitude = Int(22.312653 * 1000000)
            model.longitude = Int(114.027986 * 1000000)
            model.accuracy =   Int(8.00 * 100)
            model.gpsPermission = 1
            // Just set it without worrying about whether it’s successfully sent. The firmware sends location updates every second.
            CreekInterFace.instance.setSportGPS(model: model) {
               
            } failure: { code, message in
               
            }
            
         }else if model.gpsOperate ==  gps_operate_type.gpsInfoEnd{
            // end disable
         }
         
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
    function_table app_start_sport = 55;// App-started workout capability.
}
```

## Protobuf data model

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

enum exercise_control_type
{
    CONTROL_NULL = 0;
    CONTROL_START = 1;// start
    CONTROL_END = 2;// end
    CONTROL_PAUSE = 3;// CONTROL PAUSE
    CONTROL_RESUME = 4;// CONTROL RESUME
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;// type
    exercise_control_type control_type = 3;// type
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;// watch
    APP_TRAN = 1;// app
}

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;// type
    uint32 total_durations = 3;// unit s
    uint32 km_pace = 4;// km pace
    uint32 avg_km_pace = 5;// avg km pace
    uint32 mi_pace = 6;// mi pace
    uint32 avg_mi_pace = 7;// avg mi pace
    uint32 km_speed = 8;// km/h 100
    uint32 avg_km_speed = 9;// km/h 100
    uint32 mi_speed = 10;// mi/h 100
    uint32 avg_mi_speed = 11;// mi/h 100
    uint32 total_distance = 12;// unit m
    int32 latitude = 13;// :S N 1000000
    int32 longitude = 14;// :W E 1000000
    int32 elevation = 15;// data unit
    uint32 step_stride = 16;// step stride
    uint32 step_frequency = 17;// unit /minute
    uint32 total_climb_height = 18;// height unit
    uint32 hr_value = 19;// value
    uint32 max_hr_value = 20;// maximum value
    uint32 min_hr_value = 21;// minimum value
    uint32 total_calories = 22;// total calories
    uint32 lap_count = 23;// lap count
    uint32 lap_duration = 24;// lap duration
    uint32 lap_distance = 25;// lap distance
    uint32 lap_km_pace_speed = 26;// lap km pace speed
    uint32 lap_mi_pace_speed = 27;// lap mi pace speed
    uint32 avg_hr_value = 28;// Average heart rate
    uint32 hr_zone1_sec = 29;// Seconds spent in heart-rate zone 1
    uint32 hr_zone2_sec = 30;// Seconds spent in heart-rate zone 2
    uint32 hr_zone3_sec = 31;// Seconds spent in heart-rate zone 3
    uint32 hr_zone4_sec = 32;// Seconds spent in heart-rate zone 4
    uint32 hr_zone5_sec = 33;// Seconds spent in heart-rate zone 5
    bool elevation_support = 34;// Whether elevation data is supported
    bool lap_support = 35;// Whether lap data is supported
    uint32 gps_rssi = 36;// GPS signal level: 0–3
    bool gps_rssi_support = 37;// Whether GPS signal level is supported
    bool step_support = 38;  // Whether step data is supported
    uint32 total_step = 39;  // Total steps
    bool vertical_jump_support = 40; // Whether vertical-jump data is supported
    uint32 rep_id = 41; // Reps 0-9999
    uint32 rep_timestamp_start = 42; // Repetition start timestamp
    uint32 rep_timestamp_end = 43; // Repetition end timestamp
    uint32 jump_timestamp_start = 44; // Jump start timestamp
    uint32 jump_timestamp_end = 45; // Jump end timestamp
    uint32 rep_durations = 46; // Repetition duration, 0–2000 ms
    uint32 jump_durations = 47; // Jump duration, 0–2000 ms
    uint32 jump_height = 48; // Jump height, 0–200 cm
    uint32 peak_speed = 49; // Peak speed multiplied by 10, range 0–5 m/s
    uint32 rep_count = 50; // Reps 0-9999
    bool skip_rope_support = 51;  // Whether jump-rope data is supported
    uint32 total_jumps = 52;  // total jumps
    uint32 jumps_per_min = 53; // Jumps per minute
    bool racket_data_support = 54;// Whether racket-sport data is supported
    uint32 max_racket_speed = 55;                 // maximum 0–999 km/h
    uint32 longest_rally = 56;                    // longest rally
    uint32 forehands_stroke = 57;                 // forehands stroke
    uint32 backhands_stroke = 58;                 // backhands stroke
    uint32 overhands_stroke = 59;                 // overhands stroke
    uint32 underhands_stroke = 60;                // underhands stroke
    uint32 other_stroke = 61;                     // other stroke
    uint32 num_racket_total = 62;                 // num racket total
    uint32 cur_racket_speed = 63;                 // cur racket speed; 0–999 km/h
    exercise_control_type control_type = 64;      // workout state
}
```

```protobuf
enum sport_type
{
    ORUN  = 0;                        // ORUN
    IRUN = 1;                         // IRUN
    OWALK = 2;                        // OWALK
    IWALK = 3;                        // IWALK
    HIKING = 4;                       // HIKING
    OCYCLE = 5;                       // OCYCLE
    ICYCLE = 6;                       // ICYCLE
    CRICKET = 7;                      // CRICKET
    FOOTBALL = 8;                     // FOOTBALL
    PSWIM = 9;                        // PSWIM
    OSWIM = 10;                       // OSWIM
    YOGA = 11;                        // YOGA
    PILATES = 12;                      // PILATES
    DANCE = 13;                        // DANCE
    ZUMBA = 14;                        // ZUMBA
    ROWER = 15;                       // ROWER
    ELLIPTICAL = 16;                      // ELLIPTICAL
    CTRAINING = 17;                    // CTRAINING
    TSTRAINING = 18;                   // TSTRAINING
    FSTRAINING = 19;                   // FSTRAINING
    HIIT = 20;                         // HIIT
    COOLDOWN = 21;                     // COOLDOWN
    WORKOUT = 22;                      // WORKOUT
    FITNESS = 23;                      // FITNESS
    TRAIL_RUNNING = 24;                 // TRAIL RUNNING

    TREADMILL = 25;                    // TREADMILL
    AEROBICS = 26;                     // AEROBICS
    SIT_UP = 27;                       // SIT UP
    PLANK = 28;                        // PLANK
    JUMPING_JACK = 29;                 // JUMPING JACK
    CHIN_UP = 30;                      // CHIN UP
    PUSH_UP = 31;                      // PUSH UP
    DEEP_SQUAT = 32;                   // DEEP SQUAT
    HIGH_KNEE_LIFT = 33;               // height
    DUMBBELL = 34;                     // DUMBBELL
    BARBELL = 35;                      // BARBELL
    BOXING = 36;                       // BOXING
    KICKBOXING = 37;                   // KICKBOXING
    HORIZONTAL_BAR = 38;               // HORIZONTAL BAR
    PARALLEL_BARS = 39;                // PARALLEL BARS
    WALKING_MACHINE = 40;              // WALKING MACHINE
    SUMMIT_TRAINERS = 41;              // SUMMIT TRAINERS

    BOWLING = 42;                      // BOWLING
    TENNIS = 43;                       // TENNIS
    TABLE_TENNIS = 44;                 // TABLE TENNIS
    GOLF = 45;                         // height
    BASKETBALL = 46;                   // BASKETBALL
    BADMINTON = 47;                    // BADMINTON
    HOCKEY = 48;                       // HOCKEY
    AMERICAN_FOOTBALL = 49;            // AMERICAN FOOTBALL
    HANDBALL = 50;                     // HANDBALL
    SQUASH = 51;                       // SQUASH
    BASEBALL = 52;                     // BASEBALL
    SOFTBALL = 53;                     // SOFTBALL
    SHUTTLECOCK = 54;                  // SHUTTLECOCK
    SEPAKTAKRAW = 55;                  // SEPAKTAKRAW

    STREET_DANCE = 56;                 // STREET DANCE
    MOUNTAIN_CLINBING = 57;            // MOUNTAIN CLINBING
    ROPE_SKIPPING = 58;                // ROPE SKIPPING
    CLIMB_STAIRS = 59;                 // CLIMB STAIRS
    BALLET = 60;                       // BALLET
    SOCIAL_DANCE = 61;                 // SOCIAL DANCE
    DARTS = 62;                        // DARTS
    HORSEBACK_RIDING = 63;             // HORSEBACK RIDING
    ROLLER_SKATING = 64;               // ROLLER SKATING
    TAI_CHI = 65;                      // TAI CHI
    FRISBEE = 66;                      // FRISBEE
    HULA_HOOP = 67;                    // HULA HOOP

    SLEIGH = 68;                       // SLEIGH
    SKATING = 69;                      // SKATING
    BOBSLEIGH_AND_TOBOGGANING = 70;    // BOBSLEIGH AND TOBOGGANING
    CURLING = 71;                      // CURLING
    ICE_HOCKEY = 72;                   // ICE HOCKEY

    SURFING = 73;                      // SURFING
    SAILBOAT = 74;                     // SAILBOAT
    SAILBOARD = 75;                    // SAILBOARD
    FOLDBOATING = 76;                  // FOLDBOATING
    CANOEING = 77;                     // CANOEING
    BOAT_RACE = 78;                    // BOAT RACE
    MOTORBOAT = 79;                    // MOTORBOAT
    WATER_POLO = 80;                   // WATER POLO

    SLIDING_PLATE = 81;                // SLIDING PLATE
    ROCK_CLIMBING = 82;                // ROCK CLIMBING
    BUNGEE_JUMPING = 83;               // BUNGEE JUMPING
    PARKOUR = 84;                      // PARKOUR
    OTHER = 85;                      // OTHER
    
    SPINNING = 86;                    // SPINNING
    MARTIAL_ARTS = 87;                // MARTIAL ARTS
    TAEKWONDO = 88;                   // TAEKWONDO
    KARATE = 89;                      // KARATE
    GYMNASTICS = 90;                  // GYMNASTICS
    PADEL = 91;                       // PADEL
    PICKLEBALL = 92;                  // PICKLEBALL
    SNOWBOARDING = 93;                // SNOWBOARDING
    ALPINE_SKIING = 94;               // ALPINE SKIING
    PADDLING = 95;                    // PADDLING
    BMX = 96;                         // BMX
    FENCING = 97;                     // FENCING
    BILLIARDS = 98;                   // BILLIARDS
    BEACH_SOCCER = 99;                // BEACH SOCCER
    BEACH_VOLLEYBALL = 100;           // BEACH VOLLEYBALL
    DODGEBALL = 101;                  // DODGEBALL
    JAZZ = 102;                       // JAZZ
    LATIN = 103;                      // LATIN
    SQUARE_DANCE = 104;               // SQUARE DANCE
    VOLLEYBALL = 105;                 // VOLLEYBALL
    KITE_FLYING = 106;                // KITE FLYING
    FISHING = 107;                    // FISHING
    ARCHERY = 108;                    // ARCHERY
    SHOOTING = 109;                   // SHOOTING
    WHITE_WATER_RAFTING = 110;        // WHITE WATER RAFTING
    DOWNHILL_SKIING = 111;            // height
    CROSS_COUNTRY_SKIING = 112;       // CROSS COUNTRY SKIING
    BIATHON = 113;                    // BIATHON
    DRAGON_BOAT_RACING = 114;         // DRAGON BOAT RACING
    RACING = 115;                     // RACING
    AUSTRALIAN_RULES_FOOTBALL = 116;  // AUSTRALIAN RULES FOOTBALL
    BOULDERING = 117;                 // BOULDERING
    TRACK_RUNNING = 118;              // TRACK RUNNING
    STANDUP_PADDLEBOARDING = 119;     // STANDUP PADDLEBOARDING
    RACQUETBALL = 120;                    // RACQUETBALL
    DISC_OLF = 121;                  // height
    SKIING = 122;                    // SKIING
    INLINE_SKATING = 123;            // INLINE SKATING
    OUTDOOR_FITNESS = 124;           // OUTDOOR FITNESS
    SNOW_SKATEBOARDING = 125;        // SNOW SKATEBOARDING
    CANOE = 126;                     // CANOE
    MIXED_AEROBICS = 127;            // MIXED AEROBICS
    WEIGHTLIFTING = 128;             // WEIGHTLIFTING
    ULTIMATE_FRISBEE = 129;          // ULTIMATE FRISBEE
    CROSS_TRAINING = 130;            // CROSS TRAINING
    INTERVAL_TRAINING = 131;        // INTERVAL TRAINING
    EQUESTRIAN_SPORTS = 132;        // EQUESTRIAN SPORTS
    KAYAKING = 133;                // KAYAKING
    WRESTLING = 134;                // WRESTLING
    INDOOR_CLIMBING = 135;          // INDOOR CLIMBING
    ATHLETICS = 136;                // ATHLETICS
    STEP_AEROBICS = 137;            // STEP AEROBICS
    PHYSICAL_CONDITIONING = 138;    // PHYSICAL CONDITIONING
    RECREATIONAL_SPORTS = 139;      // RECREATIONAL SPORTS
    CIRCUIT_TRAINING = 140;        // CIRCUIT TRAINING
    SNOW_SPORTS = 141;            // SNOW SPORTS
    AEROBIC_EXERCISE = 142;        // AEROBIC EXERCISE
    RUGBY = 143;                    // RUGBY
    REHEALTHY_TRAINING = 144;       // REHEALTHY TRAINING
    MULTISPORT = 145;           // MULTISPORT
    WALKING_BRISK = 146;            // WALKING BRISK
    JOGGING = 147;            // JOGGING
    TRAMPOLINING = 148;             // TRAMPOLINING
    HIGH_JUMP = 149;                // height
    TRIATHLON = 150;                // TRIATHLON
    MARATHON = 151;                 // MARATHON
    RACE_WALKING = 152;             // RACE WALKING
    TUG_OF_WAR = 153;               // TUG OF WAR
    KENDO = 154;                    // KENDO
    CARDIO_BOXING = 155;            // CARDIO BOXING
    MUAY_THAI = 156;                // MUAY THAI
    KETTLEBELL = 157;               // KETTLEBELL
    SKATEBOARDING = 158;            // SKATEBOARDING
    STEEPLECHASE = 159;             // STEEPLECHASE
    KITESURFING = 160;              // KITESURFING
    WINDSURFING = 161;              // WINDSURFING
    HANDCYCLING = 162;              // HANDCYCLING
    GROUP_CALISTHENICS = 163;       // GROUP CALISTHENICS
    PARACHUTING = 164;              // PARACHUTING
    HORSE_RACE = 165;               // HORSE RACE
    KICKBOXING_AEROBICS = 166;      // KICKBOXING AEROBICS
    FOLK_DANCING = 167;             // FOLK DANCING
    CHA_CHA = 168;                  // CHA CHA
    WAIST_TRAINING = 169;           // WAIST TRAINING
    STRETCHING = 170;               // STRETCHING
    DIVING = 171;                   // DIVING
    HYBRID_TRAINING = 172;          // HYBRID TRAINING
    HOT_AIR_BALLOON = 173;          // HOT AIR BALLOON
    ORIENTEERING = 174;             // ORIENTEERING
    AB_ROLLER = 175;                // AB ROLLER
    CROSS_FIT = 176;                // CROSS FIT
    POLE_DANCE = 177;               // POLE DANCE
    CROQUET = 178;                  // CROQUET
        LONG_JUMP = 179;                  // LONG JUMP
    TAP_DANCE = 180;                  // TAP DANCE
    SWING = 181;                      // SWING
    EXERGAMING = 182;                 // EXERGAMING
    WATER_FITNESS = 183;              // WATER FITNESS
    LADDER_TRAINING = 184;            // LADDER TRAINING
    CALLISTHENICS = 185;              // CALLISTHENICS
    TEAM_COMPETITION = 186;           // TEAM COMPETITION
    HOUSEWORK = 187;                  // HOUSEWORK
    POLO = 188;                       // POLO
    POLOCROSSE = 189;                 // POLOCROSSE
    SHOW_JUMPING = 190;               // SHOW JUMPING
    DRESSAGE = 191;                   // DRESSAGE

    WATER_SKIING = 192;               // WATER SKIING
    SAILING = 193;                    // SAILING
    OTHER_WATER_SPORTS = 194;         // OTHER WATER SPORTS
    ATV = 195;                        // ATV
    HUNTING = 196;                    // HUNTING
    OTHER_WINTER_SPORTS = 197;        // OTHER WINTER SPORTS
    DEADLIFT = 198;                   // DEADLIFT
    KABBADI = 199;                    // KABBADI
    PARAGLIDING = 200;                // PARAGLIDING
    WALL_BALL = 201;                  // WALL BALL
    FIN_SWIMMING = 202;               // FIN SWIMMING
    CARDIO_CRUISER = 203;             // CARDIO CRUISER
    FOOTVOLLEY = 204;                 // FOOTVOLLEY
    MOUNTAIN_CYCLING = 205;           // MOUNTAIN CYCLING
    ROLLED_ABDOMEN = 206;             // ROLLED ABDOMEN
    SNORKELING = 207;                 // SNORKELING
    ABS = 208;                        // ABS
    JUDO = 209;                       // JUDO
    MIND_AND_RELAX = 210;             // MIND AND RELAX
    BOBBY_JUMPS = 211;                // BOBBY JUMPS
    SAVATE = 212;                     // SAVATE
    HOVERBOARD = 213;                 // HOVERBOARD
    SNOWMOBILE = 214;                 // SNOWMOBILE
    GARDENING = 215;                  // GARDENING
    UPPER_BODY = 216;                 // UPPER BODY
    BACK_EXERCISES = 217;             // BACK EXERCISES
    ARTISTIC_SWIMMING = 218;          // ARTISTIC SWIMMING
    BURPEE = 219;                     // BURPEE
    CHEST_TRAINING = 220;             // CHEST TRAINING
    SHOULDER_TRAINING = 221;          // SHOULDER TRAINING
    LOWER_BODY_TRAINING = 222;        // LOWER BODY TRAINING
    BACK_TRAINING = 223;              // BACK TRAINING
    RUN = 224;                        // RUN
    WALK = 225;                       // WALK
    VERTICAL_JUMP = 226;              // VERTICAL JUMP
    BEACH_TENNIS = 227;              // BEACH TENNIS
    
}
```
