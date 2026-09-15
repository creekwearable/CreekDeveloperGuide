---
docId: android-database-operations
locale: zh-CN
title: Android 数据库查询与操作
description: 设置数据库用户、查询健康数据并更新上传状态。
platform: Android
slug: android/database-operations
order: 14
status: published
version: v2.0
---

# Android 数据库查询与操作

设置数据库用户、查询健康数据并更新上传状态。

## 表结构

字段的删除线代表没用到（可忽略）

### 心率 HEART_RATE_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（秒）
> 
> silent_hr：静息心率
> 
> min：最小心率
> 
> max：最大心率
> 
> average:平均心率
> 
> raisedHr: 上升心率占比
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> ~~hr_interval~~:  [{"/threshold"/:12,"/minute"/:60}]  threshold阈值  minute分钟    
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位秒 value心率值
> 
>

### 压力 STRESS_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> min：最小压力
> 
> max：最大压力
> 
> average:平均压力
> 
> low:*压力区间占比*
> 
> usual:*压力区间占比*
> 
> higher:*压力区间占比*
> 
> verHigh:*压力区间占比*
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位分 value压力值

### 血氧 SPO_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> min：最小血氧
> 
> max：最大血氧
> 
> average:平均血氧
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位分 value血氧值
> 
>

### 睡眠 SLEEP_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的ID
> 
> get_up_date ：起床日期 
> 
> ~~offset_last~~：暂时用不上
> 
> fall_asleep_time：入睡时间  格式：2025-12-02 08:00:00
> 
> get_up_time : 起床时间
> 
> total_sleep_time_mins:睡眠总时长
> 
> wake_mins: 总清醒时长, 单位:分
> 
> light_sleep_mins:总浅眠时长
> 
> deep_sleep_mins:总深眠时长
> 
> rem_mins:总REM时长
> 
> ~~wake_count:清醒次数~~
> 
> ~~light_sleep_count:浅眠次数~~
> 
> ~~deep_sleep_count:深眠次数~~
> 
> ~~rem_count:眼动次数~~
> 
> sleep_score:睡眠得分
> 
> bodyTemp:  *体温数据 放大100倍，保留两位小数点*   /度
> 
> bodyTempSupport: *是否支持平均睡眠体温数据*
> 
> isNapSleep: *是否小睡*
> 
> osaSupport: 是否osa数据支持（ahi_value，apnoea_value，spo2_value）
> 
> osaEnable:是否打开osa
> 
> apnoeaValue:疑似呼吸暂停次数
> 
> spo2Value: 夜间实时血氧值
> 
> healthDataSupport: 是否支持睡眠健康相关数据（0不支持 1支持）
> 
> spo2MinValue: 睡眠期间的最低血氧值
> 
> spo2MaxValue: 睡眠期间的最高血氧值
> 
> heartRateAverageValue: 睡眠期间平均心率
> 
> heartRateMinValue: 睡眠期间最低心率
> 
> heartRateMaxValue: 睡眠期间最高心率
> 
> hrvAverageValue: 睡眠期间平均HRV值
> 
> hrvMinValue: 睡眠期间最低HRV值
> 
> hrvMaxValue: 睡眠期间最高HRV值
> 
> respirationRateAverageValue: 睡眠期间平均呼吸率
> 
> respirationRateMinValue: 睡眠期间最低呼吸率
> 
> respirationRateMaxValue: 睡眠期间最高呼吸率
> 
> inOutBedDataSupport: 是否支持入床/离床数据（0不支持 1支持）
> 
> inBedTimestamp: 入睡时间-卧床（UTC 秒）
> 
> inBedDurationMin: 入睡时长-卧床（分钟）
> 
> outBedTimestamp: 赖床时间（UTC 秒）
> 
> outBedDurationMin: 赖床时长（分钟）
> 
> stressAverageValue: *睡眠平均压力值*
> 
> stressMinValue: *睡眠最小压力值*
> 
> stressMaxValue: *睡眠最大压力值*
> 
> readinessSupport: *训练准备度支持*
> 
> readinessScore: *训练准备度得分*
> 
> spo2BelowDuration: *含氧量低于90%的时长*
> 
> odiValue: *odi测量值*
> 
> osaEventCount: *降氧次数*
> 
> maxDrop4Cnt: *氧降超过4的次数*
> 
> newAhiValue: ahi*测量值  （原始值\*10）*
> 
> newOdiValue: odi*测量值  （原始值\*10）*
> 
> bodyActValue: *体动参数*
> 
> osaTotalTime: osa测量时长 单位秒
> 
> osaNormalTime：*OSA*未见异常时间*S*
> 
> osaMildTime：*OSA*疑似轻度时间*S*
> 
> osaMiddleTime：*OSA*疑似中度时间*S*
> 
> osaSevereTime：*OSA*疑似重度时间*S*

> datas : 详情数据（[{"/stage"/:1,"/duration"/:10}]）stage 阶段 duration时长 单位分
> 
>

### 日常活动 ACTIVITY_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> total_step:总步数
> 
> total_exercise_min:锻炼时长 单位分钟
> 
> total_activity_calories; //总活动卡路里
> 
> total_rest_calories; //总静息卡路里/BMR
> 
> total_distances; //总距离  km
> 
> total_stand_hour;//每天站立小时数
> 
> activity_item_count：活动个数
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> floors_climbed_support：是否支持爬楼层数
> 
> total_floors_climbed：总爬楼层数
> 
> stand_details: 站立详情，数组长度为24，0和1代表是否
> 
> datas : 详情数据
> 
> [{
> 
>      "/step_count"/:1,     //步数
> 
>      "/exercise_min"/:10,  // 锻炼时长 单位分钟， 
> 
>      "/activity_calories"/:1, //活动卡路里
> 
>       "/rest_calories"/:10,  //静息卡路里
> 
>      "/distance"/:1,  /距离，单位米
> 
>       ~~"/stand_time"/:10, //站立    废弃~~
> 
>      "/wear_time"/:1, //佩戴时长
> 
> }]
> 
>

### ~~噪音 NOISE_DATA_HEAD~~

### hrv HRV_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的id
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> min：最小值
> 
> max：最大值
> 
> average:平均值
> 
> sleepMax: 睡眠最大值
> 
> sleepMin: 睡眠最小值
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位分 value值
> 
>

### 运动. SPORT_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creatTime ：创建时间 
> 
> startTime：开始时间
> 
> endTime：结束时间
> 
> sportType:运动枚举   详情看下面的类型介绍
> 
> isConnectApp：手环是否连接app，用app评产生何种报告， 1是连接，0是未连接
> 
> sportStartType:0:无效， 1 : app发起的运动， 2：手表发起的运动
> 
> durations：运动时长； 单位： s
> 
> goalType:运动目标 
> 
>

> 
> goalData:目标值 游泳目标单位米，比实际值大100
> 
> avgHrValue:平均心率值
> 
> maxHrValue:最大心率值
> 
> minHrValue:最小心率值
> 
> warmUpTime:热身运动的累计时长 秒钟数据
> 
> fatBurningTime:脂肪燃烧的累计时长   秒钟
> 
> aerobicExerciseTime:有氧运动的累计时长  秒钟
> 
> anaerobicExerciseTime:无氧运动的累计时长   秒钟
> 
> extremeExerciseTime:极限锻炼的累计时长   秒钟
> 
> totalStep:步数
> 
> totalCalories:卡路里     单位：千卡
> 
> totalDistance: 距离；     单位： m
> 
> avgKmPace:平均公里配速 传过来的是s钟， 比如361  361/60=6分 余数是1s  6''1' 
> 
> fastKmPace:最快公里配速
> 
> avgSpeed:平均速度  km/h  固件是 扩大1000倍
> 
> fastSpeed:最快速度  km/h  固件是 扩大1000倍
> 
> avgStepFrequency:平均步频 步/分钟
> 
> maxStepFrequency:最大步频 步/分钟
> 
> avgStepStride:平均步幅
> 
> maxStepStride:最大步幅
> 
> trainingEffect:训练效果；    单位：无：           范围： 1.0 - 5.0 （扩大10倍传输）
> 
> vozmax://最大摄氧量；  单位：毫升/公斤/分钟； 范围  0-80
> 
> grade:摄氧量等级  0x00：无等级  0x01:低等   0x02:业余   0x03:一般  0x04：平均 
> 
> recoveryTime:恢复时间 单位小时
> 
> ~~hrItemCount~~:心率的个数
> 
> ~~kmSpeedCount~~:公里配速的个数 最大100
> 
> ~~paceCount~~:实时配速个数
> 
> ~~stepFrequencyCount~~:步频个数
> 
> ~~stepStrideCount~~:步幅个数
> 
> avgPower:平均跑步功率
> 
> swimDistance:游泳距离 单位：米
> 
> maxElevation:最大海拔高度    单位：米
> 
> minElevation:最小海拔高度    单位：米
> 
> avgElevation:平均海拔高度    单位：米
> 
> climbHeight:爬升高度：自本次运动开始时，该数据为0，累计上升时产生的高度值（单位：米）
> 
> met:梅脱
> 
> metSupport:是否支持梅脱
> 
> elevationSupport:是否支持海拔数据
> 
> avgPowerSupport:是否支持跑步功率
> 
> travelingTime:*骑行移动时长s*
> 
> travelingTimeSupport:*是否支持骑行移动时长*
> 
> uploadStatus:
> 
> speedPaceSupport：*是否支持速度详情*
> 
> restCaloriesSupport：*是否支持总静息卡路里*
> 
> totalRestCalories：*总静息卡路里*
> 
> vo2maxSupport：*是否最大摄氧量和跑力值*
> 
> swimDataSupport： 是否支持*游泳数据*
> 
> poolLength：*泳池长度*
> 
> yardPoolLength：*泳池长度*
> 
> totalLaps：*趟数*
> 
> mainStroke：*主泳姿*
> 
>

> 
> totalStrokes：*总划水次数*
> 
> swimAvgPace：游泳平均配速
> 
> swimAvgSwolf：*swolf=单趟划水次数+单趟时长（秒）*
> 
> avgStrokeRate：*平均划频*
> 
> pauseDurations：*暂停运动时长； 单位： s*
> 
> pauseDurationsSupport：*暂停运动时长支持*
> 
> workoutCourseSupport：*是否支持运动课程*
> 
> courseTotalDurations：*运动课程总时间*
> 
> courseTotalDistance：*运动课程总距离*
> 
> courseTotalCalories：*运动课程总卡路里*
> 
> courseId：*课程id*
> 
> coursePauseDurations：*课程暂停时长*
> 
> courseName：*运动课程名字*
> 
>  multiSportSupport:*是否支持组合运动*
> 
>   multiSportIndex: *组合运动索引*
> 
>   multiSportCount: *组合运动总数*
> 
>   multiSportIsLastOne: *是否是最后一条*
> 
>  multiSportTotalDurations: *组合运动总时间*
> 
> multiSportTotalDistance: *组合运动总距离*
> 
>   multiSportTotalCalories: *组合运动总卡路里*
> 
> multiSportActiveCalories: *组合运动总活动卡路里*
> 
>  multiSportAvgHr: *组合运动平均心率*
> 
>  multiSportId: *组合运动id*
> 
> swimHrSupport：是否支持游泳心率
> 
> swimTrailSupport：是否支持游泳轨迹
> 
> rtKmSpeedPaceSupport：是否支持实时配速、速度
> 
> speedUnit100：是否支持速度单位扩大100倍，用于兼容旧数据类型
> 
> swimDurationSupport：是否支持游泳时长
> 
> swimDurations：游泳时长；单位：s
> 
> miDistanceSupport：是否支持英里距离
> 
> avgMiPace：平均英里配速，单位：s
> 
> fastMiPace：最快英里配速，单位：s
> 
> avgMiSpeed：平均英里速度 mi/h，固件扩大100倍
> 
> fastMiSpeed：最快英里速度 mi/h，固件扩大100倍
> 
> swimDistanceSupport：是否支持游泳距离单位为码
> 
> swimYardDistance：游泳距离；单位：码
> 
> footballDistanceSupport：是否支持足球距离显示
> 
> racketDataSupport：是否支持球拍类运动数据
> 
> racketSpeed：挥拍速度
> 
> processRacketSpeedArrayFlag：*挥拍速度数组标识位: 0-[0,200] 1-[0,400]*  
> 
> processRacketSpeedArrayData：挥拍速度数组数据 *0–999 km/h*
> 
> - processRacketSpeedArrayFlag 对应图表中X轴 总共21个点   如果返回的是0，那么就是200，分21个点就 是0、10、20、30.....200
> - processRacketSpeedArrayData 对应21个下标数值，
> 
> maxRacketSpeed：最大挥拍速度
> 
> longestRally：最长连续回合数
> 
> forehandsStroke：正手击球次数
> 
> backhandsStroke：反手击球次数
> 
> overhandsStroke：上手击球次数
> 
> underhandsStroke：下手击球次数
> 
> otherStroke：其他击球次数
> 
> performanceRadarArray：表现雷达图数据
> 
> -   里面固定有6个值：
> 
>        0:力量得分 *雷达图*
> 
>        1:稳定得分 *雷达图*
> 
>        2:防守得分 *雷达图*
> 
>       3:效率得分 *雷达图*
> 
>       4:耐力得分 *雷达图*
> 
>       5:进攻得分  *雷达图*
> 
> aerobicEffect： *有氧效果值 0.0-5.0（保留一位小数）放大10倍*
> 
> anaerobicEffect：*无氧效果值 0.0-5.0（保留一位小数）放大10倍*
> 
> trainingEffectType：*训练效果种类判断   ，*
> 
> *trainingEffectType : 对应的类型*
> 
> - enum training_effect_type{  
>     TRAINING_EFFECT_RECOVERY = 0,      *// 恢复 (Recovery): 有氧0.0–1.9, 无氧0.0–0.9*  
>     TRAINING_EFFECT_BASE_ENDURANCE = 1,    *// 基础耐力 (Base Endurance): 有氧2.0–2.9, 无氧0.0–1.9*  
>     TRAINING_EFFECT_TEMPO = 2,             *// 节奏 (Tempo): 有氧3.0–3.9, 无氧0.0–1.9*  
>     TRAINING_EFFECT_THRESHOLD = 3,         *// 阈值 (Threshold): 有氧4.0–5.0, 无氧0.0–1.9*  
>     TRAINING_EFFECT_VO2MAX = 4,            *// VO₂最大摄氧 (VO₂Max): 有氧4.0–5.0, 无氧2.0–3.9*  
>     TRAINING_EFFECT_ANAEROBIC = 5,         *// 无氧 (Anaerobic): 有氧0.0–3.9, 无氧4.0–5.0*  
>     TRAINING_EFFECT_OTHER = 6,  
> }
> 
> trainingEffectSupport：是否支持训练效果数据
> 
> skipRopeDataSupport：是否支持跳绳数据
> 
> totalSkipRopeCount：累计跳绳次数
> 
> maxSkipConsecutiveCnt：最高连跳次数
> 
> totalInterruptCount：中断总次数
> 
> totalInterruptTimeSec：中断总时长；单位：s
> 
> totalSkipTimeSec：跳绳总时长；单位：s
> 
> avgJumpsPerSecond：平均频率，每秒跳绳次数 (JPS)
> 
> avgJumpsPerMinute：平均速度，跳绳频次，次/每分钟 (JPM)
> 
> maxAvgJumpsPerMinute：最大平均频率， 跳绳频次， 次、每分钟
> 
> skiingDistanceSupport：是否支持滑雪距离
> 
> runPostureSupport：是否支持跑姿数据
> 
> postureGroundTime：触地时间
> 
> postureAirTime：腾空时间
> 
> postureGroundAirRatio：触地腾空比
> 
> postureBalanceL：左脚平衡比
> 
> postureBalanceR：右脚平衡比
> 
> postureBabalanceRl：左右脚平衡比 50 -右脚 ， +左脚
> 
> postureVerticalAmplitude：垂直振幅
> 
> postureVerticalStepPercent：垂直步幅比
> 
> verticalJumpSupport：是否支持纵跳数据
> 
> totalLoad：训练总负荷
> 
> numRacketTotal：挥拍总数 0\~2000 次
> 
> curSportTrainingLoad：当前运动训练负荷
> 
> planId：关联唯一AI训练计划
> 
> subId：训练计划下所有子类课程课程递增唯一标识
> 
> isPrimary：判断当前训练课程是主项还是副项
> 
> sportsEventSupport：多运动赛事组合支持
> 
> sportsEventType：赛事种类 （Events_type）
> 
> enum Events_type{  
>    HYROX_SINGLES = 0,    //单人赛  
>    HYROX_DUBLES = 1,     //双人赛  
>    HYROX_RELAY =2,        //接力赛  
>    TRIATHON =3,               //铁人三项 （暂不支持）  
> }
> 
> sportsEventRunTime：所有跑步段总用时
> 
> sportsEventWorkoutTime：所有训练段时长
> 
> sportsEventTransitionTime：所有换项段时长，hyrox运动为0
> 
> hrValueItem:实时运动心率 每5秒钟保存一组,最大保存20小时   数据格式: [0,1]
> 
> kmSpeedItem://实时公里速度详情 每达到1公里时存一次 单位km/h,保留两位小数，实际值扩大一百倍
> 
> stepFrequencyItem:实时步频详情 每5秒存一次 步/分钟 一分钟多少步     数据格式:[0,1,2]
> 
> kmPaceItem:实时配速详情 每达到1公里时存一次 传过来的是 s 钟
> 
> stepStrideItem:实时步幅  每5S存一次.  数据格式:[0,1,2]
> 
> miSpeedItem：实时英里速度详情 每达到1英里时存一次 单位mi/h,保留两位小数，实际值扩大一百倍
> 
> miPaceItem：实时英里配速详情 每达到1公里时存一次 传过来的是 s 钟
> 
> elevationItem:实时的绝对海拔高度详情 单位米 2秒存一个值 data:int16_t
> 
> trailData:运动轨迹-纬度 每2秒存一次   [{"latitude":22624768,"longitude":114018378}]
> 
> speedPaceItem:实时配速和速度-纬度 每5秒存一次   [{"speed":1233,"pace":2345}]   speed //单位km/h,保留两位小数，实际值扩大一百倍 pace;//单位秒钟
> 
> workoutCourseItem：运动课程详情
> 
>

> 
> powerItem:实时功率详情 每5秒存一次 data:uint16_t
> 
> runPostureItem：跑姿详情 每5秒存一次
> 
>

```kotlin
> public class RunPostureModel: Codable {
>     /// // 右脚平衡比
>     public var balanceR: Int?
>    /// // 触地时间
>     public var groundTime: Int?
>    /// // 腾空时间
>     public var airTime: Int?
>    /// // 垂直振幅
>     public var verticalOscillation: Int?
>    /// // 垂直振幅比
>     public var verticalStepPercent: Int?
> 
> }
>
```

> 
> verticalJumpItem：纵跳详情    
> 
>

```kotlin
> public class VerticalJumpModel: Codable {
> 
>     /// Reps // 重复编号（0-9999）
>     public var repId: Int?
>     /// // 自动识别Rep开始时间戳
>     public var repTimestampStart: Int?
>     /// // 自动识别Rep结束时间戳
>     public var repTimestampEnd: Int?
>     /// // 双腿实际离地时间戳
>     public var jumpTimestampStart: Int?
>     /// // 双腿触地时间戳
>     public var jumpTimestampEnd: Int?
>     ///Rep // 单次时长（0-2000ms）
>     public var repDurations: Int?
>     /// Rep // 单次腾空时长（0-2000ms）
>     public var jumpDurations: Int?
>     /// // 纵跳高度（0-200cm）
>     public var jumpHeight: Int?
>     /// // 纵跳峰值速度*10（0-5m/s）
>     public var peakSpeed: Int?
>     /// Reps // 次数（0-9999）
>     public var repCount: Int?
> 
> }
>
```

sportsEventItem

>

```kotlin
> public class sportsEventModel: Codable {
>    
>     public var segmentsType: Int?
>     public var sportType: Int?
>     public var groupId: Int?
>     public var avgHr: Int?
>     public var order: Int?
>     public var calories: Int?
>     public var duration: Int?
> 
> }
>
```

### 呼吸率 RESPIRATORY_DATA_HEAD

> userID      : 用户id
> 
> create_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> min：最小呼吸
> 
> max：最大呼吸
> 
> average:平均呼吸
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位分 value血氧值
> 
>

### 秒血氧 SPO_SECOND_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> min：最小血氧
> 
> max：最大血氧
> 
> average:平均血氧
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:10}]）offset 偏移 单位秒 value血氧值
> 
>

### 房颤 AF_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> creat_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据（[{"/offset"/:1,"/value"/:0}]）offset 偏移 单位分钟   value：0无 1异常

### 异常房颤记录 AF_PPG_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> create_time ：创建时间 
> 
> startTime：记录时间
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas :  房颤异常数据  [int] 

### 温度 TEMPERATURE_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> create_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> bodyLineSupport: 是否支持基线
> 
> bodyBaseLineTemp:体温基线值 \*100
> 
> baselineDiff:计算差值 \*100
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据
> 
> [{
> 
>      "/offset"/:1,     //步数
> 
>      "/ntc1"/:10,  // *室内温度*， 
> 
>      "/ntc2"/:1, //*环境温度*
> 
>       "/bodyTemp"/:10,  //  体温 \*100
> 
> }]

### 活动等级 ACTIVITY_LEVEL_DATA_HEAD

> userID      : 用户id
> 
> deviceId     :设备的uuid
> 
> create_time ：创建时间 
> 
> offset_last：记录最后接收的偏移位置（分）
> 
> uploadStatus：上传状态 0未上传  1 上传
> 
> datas : 详情数据
> 
> [{
> 
>      "/offset"/:1,     //偏移
> 
>      "/activityLevelMinAvg"/:0,   动量等级0 ,1, 2, 3, 4，数值越大等级越高，0是静止，255异常
> 
> }]

## 设置数据库用户ID

## 查询

### 活动

### 睡眠

### 心率

### 压力

### 噪音

### 血氧

### 秒级血氧（客户定制需求）

### hrv

### 呼吸率

```kotlin
CreekManager.sInstance.getRespiratoryNewTimeData(startTime = "2023-10-01", endTime = "2024-11-23", model = {
        model: BaseModel<List<RespiratoryModel>> ->
    responseText.value = model.data?.toList().toString()
})
```

### 活动等级

```kotlin
CreekManager.sInstance.getActivityLevelNewTimeData(
    startTime = "2026-07-01",
    endTime = "2026-07-30"
) { model: BaseModel<List<ActivityLevelModel>> ->
    responseText.value = model.data?.toList().toString()

}
```

### 运动

#### 获取全部运动

#### 根据时间获取

#### 删除运动

#### 删除运动

#### 获取自识别未确认的运动数据

#### 编辑运动（特殊需求）

## 查询未上传数据

### 活动

### 心率

### 压力

### 血氧

### 秒级血氧（客户定制需求）

### 噪音

### 运动

### hrv

### 睡眠

### 呼吸率

### 活动等级

## 状态置为已上传
