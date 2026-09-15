---
docId: ios-ota-upgrade
locale: zh-CN
title: iOS OTA 固件升级
description: 检查、配置并执行设备固件升级。
platform: iOS
slug: ios/ota-upgrade
order: 6
status: published
version: v2.0
---

# iOS OTA 固件升级

## 功能说明

检查、配置并执行设备固件升级。

### 使用要点

说明：

1、根据设备ID从服务器获取固件版本，不同的设备ID不允许获取固件版本

2、OTA有电量限制，＜30%电量可以检测到新版本，但是升级时会提示电量不足

3、需要根据FLASH版本在服务器上配置固件，如果需要升级的固件和手表的固件FLASH一致，服务器上配置单固件包即可，如果FLASH不一致需要配置全资源包

现阶段是以人工的方式提供：

里面的信息包含

固件包里面包含全资源包和固件包：比如cw01_v2.6.0_23101301_res.ota 全资源包 、   cw01_v2.6.0_23101301.ota固件包

1、把.ota文件放到服务器

## Swift 示例

```swift
///IOS
// let fileData:Data   文件流
CreekInterFace.instance.upload(fileName: "res.ota", fileData: fileData) { progress in
                        print(progress)
                    } uploadSuccess: {
                        print("uploadSuccess")
                    } uploadFailure: { code, message in
                        print(message)
                    }
```

```swift
CreekInterFace.instance.uploadWithFilePath(fileName: "", filePath: "") { progress in
            // 更新进度。
         } uploadSuccess: {
            // 处理成功。
         } uploadFailure: { code, message in
            // 处理错误。
         }
```

```swift
CreekInterFace.instance.getOTAUpgradeVersion { model in
              print("version：\(model)")
  }
```

```swift
CreekInterFace.instance.getOTAUpgradeState(fileName: "titan.zip", fileData: fileData) { model in
         print("totalResource:\(model.totalResource ?? 0)  step:\(model.step ?? 0)")
                      
                   
   } catch {
          print("\(error)")
   }
```

```swift
CreekInterFace.instance.upload(fileName: "titan.zip", fileData: fileData) { progress in
                          print(progress)
                      } uploadSuccess: {
                          print("uploadSuccess")
                      } uploadFailure: { code, message in
                          print(message)
                      }
```

```swift
if let path =  Bundle.main.path(forResource: "titan", ofType: "zip"){
                do {
                    let fileData:Data = try Data(contentsOf: URL(fileURLWithPath: path))
                   
                   CreekInterFace.instance.getOTAUpgradeState(fileName: "titan.zip", fileData: fileData) { model in
                      print("totalResource:\(model.totalResource ?? 0)  step:\(model.step ?? 0)")
                      CreekInterFace.instance.upload(fileName: "titan.zip", fileData: fileData) { progress in
                          print(progress)
                      } uploadSuccess: {
                          print("uploadSuccess")
                      } uploadFailure: { code, message in
                          print(message)
                      }
                   } failure: { code, message in
                      print(message)
                   }

                   

                } catch {
                    print("\(error)")
                }

            }else{
                print("file does not exist")
            }
```

```swift
CreekInterFace.instance.queryFirmwareUpdate { model in
            if model.code == 200{
               if model.data.firmwareURL != ""{
                  ///有更新
               }else{
                  ///没有更新
               }
            }
         } failure: { code, message in
            print(message)
         }
```

```swift
CreekInterFace.instance.startFirmwareUpdate(url: model.data.firmwareURL) { progress in
                  print("下载进度\(progress)")
               } downSuccess: {
                  print("下载完成")
               } downFailure: { code, message in
                  print("下载错误\(message)")
               } uploadProgress: { progress in
                  print("上传进度\(progress)")
               } uploadSuccess: {
                  print("上传成功")
               } uploadFailure: { code, message in
                  print("上传错误\(message)")
               }
```
