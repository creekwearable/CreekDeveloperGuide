---
docId: ios-ota-upgrade
locale: en-US
title: iOS OTA Firmware Upgrade
description: Check, configure, and run device firmware upgrades.
platform: iOS
slug: ios/ota-upgrade
order: 6
status: published
version: v2.0
---

# iOS OTA Firmware Upgrade

## Overview

Check, configure, and run device firmware upgrades.

## Swift example

```swift
// IOS
// let fileData:Data
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
            // Update progress.
         } uploadSuccess: {
            // Update progress.
         } uploadFailure: { code, message in
            // Handle error.
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
               }else{
               }
            }
         } failure: { code, message in
            print(message)
         }
```

```swift
CreekInterFace.instance.startFirmwareUpdate(url: model.data.firmwareURL) { progress in
                  print("Download progress: \(progress)")
               } downSuccess: {
                  print("Download completed")
               } downFailure: { code, message in
                  print("Download error: \(message)")
               } uploadProgress: { progress in
                  print("Upload progress: \(progress)")
               } uploadSuccess: {
                  print("Upload succeeded")
               } uploadFailure: { code, message in
                  print("Upload error: \(message)")
               }
```
