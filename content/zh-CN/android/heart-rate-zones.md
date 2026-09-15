---
docId: android-heart-rate-zones
locale: zh-CN
title: Android 心率区间
description: 设置运动使用的心率区间。
platform: Android
slug: android/heart-rate-zones
order: 119
status: published
version: v2.0
---

# Android 心率区间

设置运动使用的心率区间。

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

## 数据模型

### Protobuf 定义

```protobuf
enum sport_type
{
    ORUN  = 0;                        //室外跑步
    IRUN = 1;                         //室内跑步
    OWALK = 2;                        //户外走路
    IWALK = 3;                        //室内走路
    HIKING = 4;                       //徒步
    OCYCLE = 5;                       //户外骑行
    ICYCLE = 6;                       //室内单车
    CRICKET = 7;                      //板球
    FOOTBALL = 8;                     //足球
    PSWIM = 9;                        //泳池游泳
    OSWIM = 10;                       //开放区游泳
    YOGA = 11;                        //瑜伽
    PILATES = 12;                      //普拉提
    DANCE = 13;                        //跳舞
    ZUMBA = 14;                        //尊巴舞
    ROWER = 15;                       //划船机
    ELLIPTICAL = 16;                      //椭圆机
    CTRAINING = 17;                    //核心训练
    TSTRAINING = 18;                   //传统力量训练
    FSTRAINING = 19;                   //功能性力量训练    
    HIIT = 20;                         //HIIT
    COOLDOWN = 21;                     //整理放松  
    WORKOUT = 22;                      //自由训练
    FITNESS = 23;                      //健身
    TRAIL_RUNNING = 24;                 //越野跑

    // 健身
    TREADMILL = 25;                    //踏步机
    AEROBICS = 26;                     //有氧健身操
    SIT_UP = 27;                       //仰卧起坐
    PLANK = 28;                        //平板支撑
    JUMPING_JACK = 29;                 //开合跳
    CHIN_UP = 30;                      //引体向上
    PUSH_UP = 31;                      //俯卧撑
    DEEP_SQUAT = 32;                   //深蹲
    HIGH_KNEE_LIFT = 33;               //高抬腿
    DUMBBELL = 34;                     //哑铃
    BARBELL = 35;                      //杠铃
    BOXING = 36;                       //拳击
    KICKBOXING = 37;                   //自由搏击
    HORIZONTAL_BAR = 38;               //单杠
    PARALLEL_BARS = 39;                //双杠
    WALKING_MACHINE = 40;              //漫步机
    SUMMIT_TRAINERS = 41;              //登山机

    /*球类*/
    BOWLING = 42;                      //保龄球
    TENNIS = 43;                       //网球
    TABLE_TENNIS = 44;                 //乒乓球
    GOLF = 45;                         //高尔夫球
    BASKETBALL = 46;                   //篮球
    BADMINTON = 47;                    //羽毛球
    HOCKEY = 48;                       //曲棍球
    AMERICAN_FOOTBALL = 49;            //美式橄榄球
    HANDBALL = 50;                     //手球
    SQUASH = 51;                       //壁球
    BASEBALL = 52;                     //棒球
    SOFTBALL = 53;                     //垒球
    SHUTTLECOCK = 54;                  //毽球
    SEPAKTAKRAW = 55;                  //藤球

    /*休闲运动*/
    STREET_DANCE = 56;                 //街舞
    MOUNTAIN_CLINBING = 57;            //登山
    ROPE_SKIPPING = 58;                //跳绳
    CLIMB_STAIRS = 59;                 //爬楼
    BALLET = 60;                       //芭蕾
    SOCIAL_DANCE = 61;                 //社交舞
    DARTS = 62;                        //飞镖
    HORSEBACK_RIDING = 63;             //骑马
    ROLLER_SKATING = 64;               //轮滑
    TAI_CHI = 65;                      //太极
    FRISBEE = 66;                      //飞盘
    HULA_HOOP = 67;                    //呼啦圈

    /*冰雪运动*/
    SLEIGH = 68;                       //雪橇
    SKATING = 69;                      //滑冰
    BOBSLEIGH_AND_TOBOGGANING = 70;    //雪车
    CURLING = 71;                      //冰壶
    ICE_HOCKEY = 72;                   //冰球

    /*水上运动*/
    SURFING = 73;                      //冲浪
    SAILBOAT = 74;                     //帆船
    SAILBOARD = 75;                    //帆板
    FOLDBOATING = 76;                  //皮艇
    CANOEING = 77;                     //划艇
    BOAT_RACE = 78;                    //赛艇
    MOTORBOAT = 79;                    //摩托艇
    WATER_POLO = 80;                   //水球

    /*极限运动*/
    SLIDING_PLATE = 81;                //滑板
    ROCK_CLIMBING = 82;                //攀岩
    BUNGEE_JUMPING = 83;               //蹦极
    PARKOUR = 84;                      //跑酷
    OTHER = 85;                      //其他
    
    /*新增运动*/
    SPINNING = 86;                    //动感单车
    MARTIAL_ARTS = 87;                //武术
    TAEKWONDO = 88;                   //跆拳道
    KARATE = 89;                      //空手道
    GYMNASTICS = 90;                  //体操
    PADEL = 91;                       //笼式网球
    PICKLEBALL = 92;                  //匹克球
    SNOWBOARDING = 93;                //单板滑雪
    ALPINE_SKIING = 94;               //双板滑雪
    PADDLING = 95;                    //划桨
    BMX = 96;                         //小轮车
    FENCING = 97;                     //击剑
    BILLIARDS = 98;                   //台球/撞球
    BEACH_SOCCER = 99;                //沙滩足球
    BEACH_VOLLEYBALL = 100;           //沙滩排球
    DODGEBALL = 101;                  //躲避球
    JAZZ = 102;                       //爵士舞
    LATIN = 103;                      //拉丁舞
    SQUARE_DANCE = 104;               //广场舞
    VOLLEYBALL = 105;                 //排球
    KITE_FLYING = 106;                //放风筝
    FISHING = 107;                    //钓鱼
    ARCHERY = 108;                    //射箭
    SHOOTING = 109;                   //射击
    WHITE_WATER_RAFTING = 110;        //漂流
    DOWNHILL_SKIING = 111;            //高山滑雪
    CROSS_COUNTRY_SKIING = 112;       //越野滑雪
    BIATHON = 113;                    //冬季两项
    DRAGON_BOAT_RACING = 114;         //龙舟
    RACING = 115;                     //赛车
    AUSTRALIAN_RULES_FOOTBALL = 116;  //澳式足球
    BOULDERING = 117;                 //抱石
    TRACK_RUNNING = 118;              //操场跑
    STANDUP_PADDLEBOARDING = 119;     //单桨冲浪
    RACQUETBALL = 120;                    //短柄墙球
    DISC_OLF = 121;                  //飞盘高尔夫
    SKIING = 122;                    //滑雪
    INLINE_SKATING = 123;            //滑旱冰
    OUTDOOR_FITNESS = 124;           //户外健身
    SNOW_SKATEBOARDING = 125;        //滑板滑雪
    CANOE = 126;                     //划独木舟
    MIXED_AEROBICS = 127;            //混合有氧
    WEIGHTLIFTING = 128;             //举重
    ULTIMATE_FRISBEE = 129;          //极限飞盘
    CROSS_TRAINING = 130;            //交叉训练
    INTERVAL_TRAINING = 131;        //间歇锻炼
    EQUESTRIAN_SPORTS = 132;        //马术运动
    KAYAKING = 133;                //皮划艇
    WRESTLING = 134;                //摔跤/角力
    INDOOR_CLIMBING = 135;          //室内攀岩
    ATHLETICS = 136;                //田径
    STEP_AEROBICS = 137;            //踏步运动
    PHYSICAL_CONDITIONING = 138;    //体能训练
    RECREATIONAL_SPORTS = 139;      //休闲运动
    CIRCUIT_TRAINING = 140;        //循环训练
    SNOW_SPORTS = 141;            //雪上运动
    AEROBIC_EXERCISE = 142;        //有氧运动
    RUGBY = 143;                    //橄榄球
    REHEALTHY_TRAINING = 144;       //康复训练
    MULTISPORT = 145;           //组合运动
    WALKING_BRISK = 146;            //健步训练
    JOGGING = 147;            //慢跑
    TRAMPOLINING = 148;             //蹦床
    HIGH_JUMP = 149;                //跳高
    TRIATHLON = 150;                //铁人三项
    MARATHON = 151;                 //马拉松
    RACE_WALKING = 152;             //竞走
    TUG_OF_WAR = 153;               //拔河
    KENDO = 154;                    //剑道
    CARDIO_BOXING = 155;            //拳击有氧
    MUAY_THAI = 156;                //泰拳
    KETTLEBELL = 157;               //壶铃
    SKATEBOARDING = 158;            //滑板车
    STEEPLECHASE = 159;             //障碍赛
    KITESURFING = 160;              //滑翔伞冲浪
    WINDSURFING = 161;              //风帆冲浪
    HANDCYCLING = 162;              //手摇车
    GROUP_CALISTHENICS = 163;       //团体操
    PARACHUTING = 164;              //跳伞
    HORSE_RACE = 165;               //赛马
    KICKBOXING_AEROBICS = 166;      //搏击操
    FOLK_DANCING = 167;             //民族舞
    CHA_CHA = 168;                  //恰恰
    WAIST_TRAINING = 169;           //腰腹训练
    STRETCHING = 170;               //伸展运动
    DIVING = 171;                   //跳水
    HYBRID_TRAINING = 172;          //混合健身
    HOT_AIR_BALLOON = 173;          //热气球
    ORIENTEERING = 174;             //定向越野
    AB_ROLLER = 175;                //健腹轮
    CROSS_FIT = 176;                //交叉配合
    POLE_DANCE = 177;               //钢管舞
    CROQUET = 178;                  //门球
        LONG_JUMP = 179;                  //跳远
    TAP_DANCE = 180;                  //踢踏舞
    SWING = 181;                      //秋千
    EXERGAMING = 182;                 //健身电玩
    WATER_FITNESS = 183;              //水中健身
    LADDER_TRAINING = 184;            //阶梯训练
    CALLISTHENICS = 185;              //柔软操
    TEAM_COMPETITION = 186;           //团队竞技
    HOUSEWORK = 187;                  //做家务
    POLO = 188;                       //马球
    POLOCROSSE = 189;                 //兜网马球
    SHOW_JUMPING = 190;               //障碍赛马
    DRESSAGE = 191;                   //花样骑术

    /*新增运动类型*/
    WATER_SKIING = 192;               //滑水
    SAILING = 193;                    //航海
    OTHER_WATER_SPORTS = 194;         //其他水上运动
    ATV = 195;                        //ATV
    HUNTING = 196;                    //打猎
    OTHER_WINTER_SPORTS = 197;        //其他雪上运动
    DEADLIFT = 198;                   //硬拉
    KABBADI = 199;                    //卡巴迪
    PARAGLIDING = 200;                //滑伞
    WALL_BALL = 201;                  //墙球
    FIN_SWIMMING = 202;               //蹼泳
    CARDIO_CRUISER = 203;             //全身有氧训练机
    FOOTVOLLEY = 204;                 //足排球
    MOUNTAIN_CYCLING = 205;           //登山骑行
    ROLLED_ABDOMEN = 206;             //腹轮
    SNORKELING = 207;                 //浮潜
    ABS = 208;                        //腹部训练
    JUDO = 209;                       //柔道
    MIND_AND_RELAX = 210;             //头脑放松
    BOBBY_JUMPS = 211;                //俯卧撑跳
    SAVATE = 212;                     //法国踢腿术
    HOVERBOARD = 213;                 //漂浮滑板
    SNOWMOBILE = 214;                 //雪地摩托
    GARDENING = 215;                  //园艺
    UPPER_BODY = 216;                 //上肢运动
    BACK_EXERCISES = 217;             //背部运动
    ARTISTIC_SWIMMING = 218;          //艺术游泳
    BURPEE = 219;                     //波比跳
    CHEST_TRAINING = 220;             //胸部训练
    SHOULDER_TRAINING = 221;          //肩部训练
    LOWER_BODY_TRAINING = 222;        //下肢训练
    BACK_TRAINING = 223;              //背部训练
    RUN = 224;                        //跑步
    WALK = 225;                       //走路
    VERTICAL_JUMP = 226;              //纵跳
    BEACH_TENNIS = 227;              //沙滩网球
    
}
```

### `func_table` 位说明

| bit位 | 说明 |
|-|-|
| 0 | 是否支持储备心率 |
| 1 | 是否支持储备心率值下发 字段：reserve_hr  |
