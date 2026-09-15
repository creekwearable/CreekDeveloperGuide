---
docId: android-heart-rate-zones
locale: en-US
title: Android Heart Rate Zones
description: Configure heart-rate zones used during workouts.
platform: Android
slug: android/heart-rate-zones
order: 119
status: published
version: v2.0
---

# Android Heart Rate Zones

Configure heart-rate zones used during workouts.

```kotlin
var model = Sport.protocol_exercise_heart_rate_zone()
model.zone1 = 100
model.zone2 = 100
model.zone3 = 100
model.zone4 = 100
model.zone5 = 100
model.zone6 = 100

CreekManager.sInstance.setSportHeartRate(model = model, {
    textView.text = "success"
}, failure = { _, m ->
    textView.text = m
})
```

---

## Data Model

### Protobuf Definition

```protobuf
enum sport_type
{
    ORUN  = 0;                        // ORUN.
    IRUN = 1;                         // IRUN.
    OWALK = 2;                        // OWALK.
    IWALK = 3;                        // IWALK.
    HIKING = 4;                       // HIKING.
    OCYCLE = 5;                       // OCYCLE.
    ICYCLE = 6;                       // ICYCLE.
    CRICKET = 7;                      // CRICKET.
    FOOTBALL = 8;                     // FOOTBALL.
    PSWIM = 9;                        // PSWIM.
    OSWIM = 10;                       // OSWIM.
    YOGA = 11;                        // YOGA.
    PILATES = 12;                      // PILATES.
    DANCE = 13;                        // DANCE.
    ZUMBA = 14;                        // ZUMBA.
    ROWER = 15;                       // ROWER.
    ELLIPTICAL = 16;                      // ELLIPTICAL.
    CTRAINING = 17;                    // CTRAINING.
    TSTRAINING = 18;                   // TSTRAINING.
    FSTRAINING = 19;                   // FSTRAINING.
    HIIT = 20;                         // HIIT
    COOLDOWN = 21;                     // COOLDOWN.
    WORKOUT = 22;                      // WORKOUT.
    FITNESS = 23;                      // FITNESS.
    TRAIL_RUNNING = 24;                 // TRAIL RUNNING.

    TREADMILL = 25;                    // TREADMILL.
    AEROBICS = 26;                     // AEROBICS.
    SIT_UP = 27;                       // SIT UP.
    PLANK = 28;                        // PLANK.
    JUMPING_JACK = 29;                 // JUMPING JACK.
    CHIN_UP = 30;                      // CHIN UP.
    PUSH_UP = 31;                      // PUSH UP.
    DEEP_SQUAT = 32;                   // DEEP SQUAT.
    HIGH_KNEE_LIFT = 33;               // HIGH KNEE LIFT.
    DUMBBELL = 34;                     // DUMBBELL.
    BARBELL = 35;                      // BARBELL.
    BOXING = 36;                       // BOXING.
    KICKBOXING = 37;                   // KICKBOXING.
    HORIZONTAL_BAR = 38;               // HORIZONTAL BAR.
    PARALLEL_BARS = 39;                // PARALLEL BARS.
    WALKING_MACHINE = 40;              // WALKING MACHINE.
    SUMMIT_TRAINERS = 41;              // SUMMIT TRAINERS.

    BOWLING = 42;                      // BOWLING.
    TENNIS = 43;                       // TENNIS.
    TABLE_TENNIS = 44;                 // TABLE TENNIS.
    GOLF = 45;                         // GOLF.
    BASKETBALL = 46;                   // BASKETBALL.
    BADMINTON = 47;                    // BADMINTON.
    HOCKEY = 48;                       // HOCKEY.
    AMERICAN_FOOTBALL = 49;            // AMERICAN FOOTBALL.
    HANDBALL = 50;                     // HANDBALL.
    SQUASH = 51;                       // SQUASH.
    BASEBALL = 52;                     // BASEBALL.
    SOFTBALL = 53;                     // SOFTBALL.
    SHUTTLECOCK = 54;                  // SHUTTLECOCK.
    SEPAKTAKRAW = 55;                  // SEPAKTAKRAW.

    STREET_DANCE = 56;                 // STREET DANCE.
    MOUNTAIN_CLINBING = 57;            // MOUNTAIN CLINBING.
    ROPE_SKIPPING = 58;                // ROPE SKIPPING.
    CLIMB_STAIRS = 59;                 // CLIMB STAIRS.
    BALLET = 60;                       // BALLET.
    SOCIAL_DANCE = 61;                 // SOCIAL DANCE.
    DARTS = 62;                        // DARTS.
    HORSEBACK_RIDING = 63;             // HORSEBACK RIDING.
    ROLLER_SKATING = 64;               // ROLLER SKATING.
    TAI_CHI = 65;                      // TAI CHI.
    FRISBEE = 66;                      // FRISBEE.
    HULA_HOOP = 67;                    // HULA HOOP.

    SLEIGH = 68;                       // SLEIGH.
    SKATING = 69;                      // SKATING.
    BOBSLEIGH_AND_TOBOGGANING = 70;    // BOBSLEIGH AND TOBOGGANING.
    CURLING = 71;                      // CURLING.
    ICE_HOCKEY = 72;                   // ICE HOCKEY.

    SURFING = 73;                      // SURFING.
    SAILBOAT = 74;                     // SAILBOAT.
    SAILBOARD = 75;                    // SAILBOARD.
    FOLDBOATING = 76;                  // FOLDBOATING.
    CANOEING = 77;                     // CANOEING.
    BOAT_RACE = 78;                    // BOAT RACE.
    MOTORBOAT = 79;                    // MOTORBOAT.
    WATER_POLO = 80;                   // WATER POLO.

    SLIDING_PLATE = 81;                // SLIDING PLATE.
    ROCK_CLIMBING = 82;                // ROCK CLIMBING.
    BUNGEE_JUMPING = 83;               // BUNGEE JUMPING.
    PARKOUR = 84;                      // PARKOUR.
    OTHER = 85;                      // OTHER.
    

    SPINNING = 86;                    // SPINNING.
    MARTIAL_ARTS = 87;                // MARTIAL ARTS.
    TAEKWONDO = 88;                   // TAEKWONDO.
    KARATE = 89;                      // KARATE.
    GYMNASTICS = 90;                  // GYMNASTICS.
    PADEL = 91;                       // PADEL.
    PICKLEBALL = 92;                  // PICKLEBALL.
    SNOWBOARDING = 93;                // SNOWBOARDING.
    ALPINE_SKIING = 94;               // ALPINE SKIING.
    PADDLING = 95;                    // PADDLING.
    BMX = 96;                         // BMX.
    FENCING = 97;                     // FENCING.
    BILLIARDS = 98;                   // BILLIARDS.
    BEACH_SOCCER = 99;                // BEACH SOCCER.
    BEACH_VOLLEYBALL = 100;           // BEACH VOLLEYBALL.
    DODGEBALL = 101;                  // DODGEBALL.
    JAZZ = 102;                       // JAZZ.
    LATIN = 103;                      // LATIN.
    SQUARE_DANCE = 104;               // SQUARE DANCE.
    VOLLEYBALL = 105;                 // VOLLEYBALL.
    KITE_FLYING = 106;                // KITE FLYING.
    FISHING = 107;                    // FISHING.
    ARCHERY = 108;                    // ARCHERY.
    SHOOTING = 109;                   // SHOOTING.
    WHITE_WATER_RAFTING = 110;        // WHITE WATER RAFTING.
    DOWNHILL_SKIING = 111;            // DOWNHILL SKIING.
    CROSS_COUNTRY_SKIING = 112;       // CROSS COUNTRY SKIING.
    BIATHON = 113;                    // BIATHON.
    DRAGON_BOAT_RACING = 114;         // DRAGON BOAT RACING.
    RACING = 115;                     // RACING.
    AUSTRALIAN_RULES_FOOTBALL = 116;  // AUSTRALIAN RULES FOOTBALL.
    BOULDERING = 117;                 // BOULDERING.
    TRACK_RUNNING = 118;              // TRACK RUNNING.
    STANDUP_PADDLEBOARDING = 119;     // STANDUP PADDLEBOARDING.
    RACQUETBALL = 120;                    // RACQUETBALL.
    DISC_OLF = 121;                  // DISC OLF.
    SKIING = 122;                    // SKIING.
    INLINE_SKATING = 123;            // INLINE SKATING.
    OUTDOOR_FITNESS = 124;           // OUTDOOR FITNESS.
    SNOW_SKATEBOARDING = 125;        // SNOW SKATEBOARDING.
    CANOE = 126;                     // CANOE.
    MIXED_AEROBICS = 127;            // MIXED AEROBICS.
    WEIGHTLIFTING = 128;             // WEIGHTLIFTING.
    ULTIMATE_FRISBEE = 129;          // ULTIMATE FRISBEE.
    CROSS_TRAINING = 130;            // CROSS TRAINING.
    INTERVAL_TRAINING = 131;        // INTERVAL TRAINING.
    EQUESTRIAN_SPORTS = 132;        // EQUESTRIAN SPORTS.
    KAYAKING = 133;                // KAYAKING.
    WRESTLING = 134;                // WRESTLING.
    INDOOR_CLIMBING = 135;          // INDOOR CLIMBING.
    ATHLETICS = 136;                // ATHLETICS.
    STEP_AEROBICS = 137;            // STEP AEROBICS.
    PHYSICAL_CONDITIONING = 138;    // PHYSICAL CONDITIONING.
    RECREATIONAL_SPORTS = 139;      // RECREATIONAL SPORTS.
    CIRCUIT_TRAINING = 140;        // CIRCUIT TRAINING.
    SNOW_SPORTS = 141;            // SNOW SPORTS.
    AEROBIC_EXERCISE = 142;        // AEROBIC EXERCISE.
    RUGBY = 143;                    // RUGBY.
    REHEALTHY_TRAINING = 144;       // REHEALTHY TRAINING.
    MULTISPORT = 145;           // MULTISPORT.
    WALKING_BRISK = 146;            // WALKING BRISK.
    JOGGING = 147;            // JOGGING.
    TRAMPOLINING = 148;             // TRAMPOLINING.
    HIGH_JUMP = 149;                // HIGH JUMP.
    TRIATHLON = 150;                // TRIATHLON.
    MARATHON = 151;                 // MARATHON.
    RACE_WALKING = 152;             // RACE WALKING.
    TUG_OF_WAR = 153;               // TUG OF WAR.
    KENDO = 154;                    // KENDO.
    CARDIO_BOXING = 155;            // CARDIO BOXING.
    MUAY_THAI = 156;                // MUAY THAI.
    KETTLEBELL = 157;               // KETTLEBELL.
    SKATEBOARDING = 158;            // SKATEBOARDING.
    STEEPLECHASE = 159;             // STEEPLECHASE.
    KITESURFING = 160;              // KITESURFING.
    WINDSURFING = 161;              // WINDSURFING.
    HANDCYCLING = 162;              // HANDCYCLING.
    GROUP_CALISTHENICS = 163;       // GROUP CALISTHENICS.
    PARACHUTING = 164;              // PARACHUTING.
    HORSE_RACE = 165;               // HORSE RACE.
    KICKBOXING_AEROBICS = 166;      // KICKBOXING AEROBICS.
    FOLK_DANCING = 167;             // FOLK DANCING.
    CHA_CHA = 168;                  // CHA CHA.
    WAIST_TRAINING = 169;           // WAIST TRAINING.
    STRETCHING = 170;               // STRETCHING.
    DIVING = 171;                   // DIVING.
    HYBRID_TRAINING = 172;          // HYBRID TRAINING.
    HOT_AIR_BALLOON = 173;          // HOT AIR BALLOON.
    ORIENTEERING = 174;             // ORIENTEERING.
    AB_ROLLER = 175;                // AB ROLLER.
    CROSS_FIT = 176;                // CROSS FIT.
    POLE_DANCE = 177;               // POLE DANCE.
    CROQUET = 178;                  // CROQUET.
        LONG_JUMP = 179;                  // LONG JUMP.
    TAP_DANCE = 180;                  // TAP DANCE.
    SWING = 181;                      // SWING.
    EXERGAMING = 182;                 // EXERGAMING.
    WATER_FITNESS = 183;              // WATER FITNESS.
    LADDER_TRAINING = 184;            // LADDER TRAINING.
    CALLISTHENICS = 185;              // CALLISTHENICS.
    TEAM_COMPETITION = 186;           // TEAM COMPETITION.
    HOUSEWORK = 187;                  // HOUSEWORK.
    POLO = 188;                       // POLO.
    POLOCROSSE = 189;                 // POLOCROSSE.
    SHOW_JUMPING = 190;               // SHOW JUMPING.
    DRESSAGE = 191;                   // DRESSAGE.

    WATER_SKIING = 192;               // WATER SKIING.
    SAILING = 193;                    // SAILING.
    OTHER_WATER_SPORTS = 194;         // OTHER WATER SPORTS.
    ATV = 195;                        // ATV
    HUNTING = 196;                    // HUNTING.
    OTHER_WINTER_SPORTS = 197;        // OTHER WINTER SPORTS.
    DEADLIFT = 198;                   // DEADLIFT.
    KABBADI = 199;                    // KABBADI.
    PARAGLIDING = 200;                // PARAGLIDING.
    WALL_BALL = 201;                  // WALL BALL.
    FIN_SWIMMING = 202;               // FIN SWIMMING.
    CARDIO_CRUISER = 203;             // CARDIO CRUISER.
    FOOTVOLLEY = 204;                 // FOOTVOLLEY.
    MOUNTAIN_CYCLING = 205;           // MOUNTAIN CYCLING.
    ROLLED_ABDOMEN = 206;             // ROLLED ABDOMEN.
    SNORKELING = 207;                 // SNORKELING.
    ABS = 208;                        // ABS.
    JUDO = 209;                       // JUDO.
    MIND_AND_RELAX = 210;             // MIND AND RELAX.
    BOBBY_JUMPS = 211;                // BOBBY JUMPS.
    SAVATE = 212;                     // SAVATE.
    HOVERBOARD = 213;                 // HOVERBOARD.
    SNOWMOBILE = 214;                 // SNOWMOBILE.
    GARDENING = 215;                  // GARDENING.
    UPPER_BODY = 216;                 // UPPER BODY.
    BACK_EXERCISES = 217;             // BACK EXERCISES.
    ARTISTIC_SWIMMING = 218;          // ARTISTIC SWIMMING.
    BURPEE = 219;                     // BURPEE.
    CHEST_TRAINING = 220;             // CHEST TRAINING.
    SHOULDER_TRAINING = 221;          // SHOULDER TRAINING.
    LOWER_BODY_TRAINING = 222;        // LOWER BODY TRAINING.
    BACK_TRAINING = 223;              // BACK TRAINING.
    RUN = 224;                        // RUN.
    WALK = 225;                       // WALK.
    VERTICAL_JUMP = 226;              // VERTICAL JUMP.
    BEACH_TENNIS = 227;              // BEACH TENNIS.
    
}
```

### `func_table` Bit Definitions

| Bit | Description |
| - | - |
| 0 | Whether reserve heart rate is supported |
| 1 | Whether reserve-heart-rate value delivery is supported Field: reserve_hr |
