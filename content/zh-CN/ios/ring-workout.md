---
docId: ios-ring-workout
locale: zh-CN
title: iOS 戒指运动与运动实况
description: 由 App 在戒指上开始、暂停、恢复或结束运动，并监听实况数据。
platform: iOS
slug: ios/ring-workout
order: 138
status: published
version: v2.0
---

# iOS 戒指运动与运动实况

## 功能说明

由 App 在戒指上开始、暂停、恢复或结束运动，并监听实况数据。

### 使用要点

戒指不带GPS芯片，所以开启运动的时候需要app实时把位置信息下发给固件

## Swift 示例

```swift
/// liveSportDataListen、liveSportControlListen、sportGpsListen
///需要在全局里面去监听
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

///获取支持的运动类型
 CreekInterFace.instance.getSportType { model in
              model.supportType
 } failure: { code, message in
            print("getSportType failure: \(message)")
 }

///开始运动（手表不支持主动开启运动，戒指支持）
 CreekInterFace.instance.setSportControl(controlType: .controlStart,self.currentType)
 ///暂停运动
 CreekInterFace.instance.setSportControl(controlType: .controlPause)
 ///恢复运动
 CreekInterFace.instance.setSportControl(controlType: .controlResume)
 ///结束运动
 CreekInterFace.instance.setSportControl(controlType: .controlEnd)
 
 
 ///运动数据监听
 GlobalListenManager.shared.liveSportDataListenCallback = { [weak self] model in
      let json = try? model.jsonString()
       self?.updateJSONText(json ?? "")
 }
 ///运动状态监听
GlobalListenManager.shared.liveSportControlListenCallback = { [weak self] model in
         self?.stateLabel.text = "state：\(String(describing: model.controlType).uppercased())"
       }

 ///不带GPS芯片的需要监听，带的不需要监听
 GlobalListenManager.shared.sportGpsListenCallback =  {model in
         let json = try? model.jsonString()
         print(json ?? "")
         if model.gpsOperate == gps_operate_type.gpsInfoInquire {
            let model = GPSModel()
            model.gpsPermission = 0;
            ///Ask for permission 0 Location permission is not enabled 1 Location permission is enabled
            CreekInterFace.instance.setSportGPS(model: model) {
               
            } failure: { code, message in
               
            }
         }else if model.gpsOperate ==  gps_operate_type.gpsInfoRequest{
            ///You can enable continuous location tracking here.
            ///Then each time, you can take the most recently updated location and send it directly to the firmware.
            let model = GPSModel()
            model.latitude = Int(22.312653 * 1000000)
            model.longitude = Int(114.027986 * 1000000)
            model.accuracy =   Int(8.00 * 100)
            model.gpsPermission = 1
            ///Just set it without worrying about whether it’s successfully sent. The firmware sends location updates every second.
            CreekInterFace.instance.setSportGPS(model: model) {
               
            } failure: { code, message in
               
            }
            
         }else if model.gpsOperate ==  gps_operate_type.gpsInfoEnd{
            ///结束 可以关闭持续定位
         }
         
       }
```

## 功能表字段

读取 `protocol_function_table` 后检查以下字段：

```protobuf
message function_table {
    bool is_support = 1;//是否支持该能力。
    uint32 cmd_id = 2;//能力对应的指令标识。
}

message protocol_function_table {
    function_table app_start_sport = 55;//App 发起运动能力。
}
```

## Protobuf 数据模型

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

enum exercise_control_type
{
    CONTROL_NULL = 0;
    CONTROL_START = 1;//开始运动
    CONTROL_END = 2;//结束运动
    CONTROL_PAUSE = 3;//暂停运动
    CONTROL_RESUME = 4;//恢复运动
}

message protocol_exercise_control_operate
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;//运动类型
    exercise_control_type control_type = 3;//运动控制类型
}
```

```protobuf
syntax = "proto3";
enum tran_direction_type
{
    WATCH_TRAN = 0;//手表发起
    APP_TRAN = 1;//app发起
}

message protocol_exercise_sync_realtime_info
{
    tran_direction_type tran_type = 1;
    sport_type sport_type = 2;//运动类型
    uint32 total_durations = 3;//运动时长； 单位： s
    uint32 km_pace = 4;//公里配速
    uint32 avg_km_pace = 5;//平均公里配速
    uint32 mi_pace = 6;//英里配速
    uint32 avg_mi_pace = 7;//平均英里配速
    uint32 km_speed = 8;//公里速度 km/h  固件扩大100倍
    uint32 avg_km_speed = 9;//平均公里速度 km/h  固件扩大100倍
    uint32 mi_speed = 10;//英里速度 mi/h  固件 扩大100倍
    uint32 avg_mi_speed = 11;//平均英里速度 mi/h  固件扩大100倍
    uint32 total_distance = 12;//距离；单位： m
    int32 latitude = 13;//纬度 负数:S南纬  正数：N北纬 放大1000000倍
    int32 longitude = 14;//经度 负数:W西经  正数：E东经 放大1000000倍
    int32 elevation = 15;//海拔数据 单位：米
    uint32 step_stride = 16;//步幅
    uint32 step_frequency = 17;//步频 单位步/分钟
    uint32 total_climb_height = 18;//累计爬升高度 单位：米
    uint32 hr_value = 19;//心率值
    uint32 max_hr_value = 20;//最大心率值
    uint32 min_hr_value = 21;//最小心率值
    uint32 total_calories = 22;//总卡路里
    uint32 lap_count = 23;//分段次数
    uint32 lap_duration = 24;//分段时长
    uint32 lap_distance = 25;//分段距离
    uint32 lap_km_pace_speed = 26;//平均公里配速/速度，骑行类的用速度，其他是配速
    uint32 lap_mi_pace_speed = 27;//平均英里配速/速度 骑行类的用速度，其他是配速
    uint32 avg_hr_value = 28;//平均心率值
    uint32 hr_zone1_sec = 29;//心率区间1累计秒数
    uint32 hr_zone2_sec = 30;//心率区间2累计秒数
    uint32 hr_zone3_sec = 31;//心率区间3累计秒数
    uint32 hr_zone4_sec = 32;//心率区间4累计秒数
    uint32 hr_zone5_sec = 33;//心率区间5累计秒数
    bool elevation_support = 34;//海拔数据，爬升高度数据项是否支持
    bool lap_support = 35;//lap分段是否支持
    uint32 gps_rssi = 36;//gps信号 0是无信号 1红 2橙，3绿
    bool gps_rssi_support = 37;//gps信号是否支持
    bool step_support = 38;  //步数显示是否支持
    uint32 total_step = 39;  //步数
    bool vertical_jump_support = 40; //纵跳数据是否支持
    uint32 rep_id = 41; //Reps重复编号（0-9999）
    uint32 rep_timestamp_start = 42; //自动识别Rep开始时间戳
    uint32 rep_timestamp_end = 43; //自动识别Rep结束时间戳
    uint32 jump_timestamp_start = 44; //双腿实际离地时间戳
    uint32 jump_timestamp_end = 45; //双腿触地时间戳
    uint32 rep_durations = 46; //Rep单次时长（0-2000ms）
    uint32 jump_durations = 47; //Rep单次腾空时长（0-2000ms）
    uint32 jump_height = 48; //纵跳高度（0-200cm）
    uint32 peak_speed = 49; //纵跳峰值速度*10（0-5m/s）
    uint32 rep_count = 50; //Reps次数（0-9999）
    bool skip_rope_support = 51;  //跳绳次数显示是否支持
    uint32 total_jumps = 52;  //总跳绳次数
    uint32 jumps_per_min = 53; //跳绳速度（次/分钟）
    bool racket_data_support = 54;//是否挥拍数据支持
    uint32 max_racket_speed = 55;                 //最大挥拍速度 0–999 km/h
    uint32 longest_rally = 56;                    //最长连拍 0~2000 次
    uint32 forehands_stroke = 57;                 //正手球 0~2000 次
    uint32 backhands_stroke = 58;                 //反手球 0~2000 次
    uint32 overhands_stroke = 59;                 //上手球 0~2000 次
    uint32 underhands_stroke = 60;                //下手球 0~2000 次
    uint32 other_stroke = 61;                     //其他球 0~2000 次
    uint32 num_racket_total = 62;                 //挥拍总数 0~2000 次
    uint32 cur_racket_speed = 63;                 //当前挥拍速度 0–999 km/h
    exercise_control_type control_type = 64;      //运动状态
}
```

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

    //健身
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
