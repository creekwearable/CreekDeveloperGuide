---
docId: flutter-language
locale: en-US
title: "Flutter Language"
description: "Read and set the language used by the device."
platform: Flutter
slug: flutter/language
order: 104
status: published
version: v2.0
---

# Flutter Language

Read and set the language used by the device.

## SDK Usage

```dart
sdkManager.getLanguage(callBack: (e) {
  SmartDialog.dismiss();
  rawData = e.toString();
  update();
}, errCallBack: (e) {
  SmartDialog.dismiss();
  rawData = "fail";
  update();
});

protocol_language_operate operate = protocol_language_operate();
operate.curLanguage = language.ENGLISH;
sdkManager.setLanguage(operate,callBack: (){

},errCallBack: (e){

});
```

## Protobuf Data Model

```protobuf
syntax = "proto3";

enum operate_type
{
    INVALID = 0; // Invalid or unspecified value.
    INQUIRE = 1;// query.
    SET = 2;// set.
}

enum language
{
    LANG_INVALID = 0;// invalid.
    CHINESE = 1;// Chinese.
    ENGLISH = 2;// English.
    GERMAN = 3;// German.
    SPANISH = 4;// Spanish.
    ITALIAN = 5;// Italian.
    JAPANESE = 6;// Japanese.
    RUSSIAN = 7;// Russian.
    PORTUGUESE = 8;// Portuguese.
    FRENCH = 9;// French.
    KOREAN = 10;// Korean.
    POLISH = 11;// Polish.
    CZECH = 12;// Czech.
    SLOVAK = 13;// Slovak.
    HUNGARIAN = 14;// Hungarian.
    GREEK = 15;// Greek.
    LITHUANIAN = 16;// Lithuanian.
    LATVIAN = 17;// Latvian.
    ESTONIAN = 18;// Estonian.
    BULGARIAN = 19;// Bulgarian.
    MALAY = 20;// Malay.
    INDONESIAN = 21;// Indonesian.
    THAILAND = 22;// Thailand.
    VIETNAMESE = 23;// Vietnamese.
    HEBREW = 24;// Hebrew.
    DEVANAGARI = 25;// Devanagari.
    TURKEY = 26;// Turkey.
    ROMANIAN = 27;// Romanian.
    DUTCH = 28;// Dutch.
    UKRAINIAN = 29;// Ukrainian.
    ARABIC = 30;// Arabic.
    FARSI = 31;// Farsi.
    TRAD_CHINESE = 32;// Trad chinese.
    SWEDEN = 33;// Sweden.
    BURMESE = 34;// Burmese.
    KHMER = 35;// Khmer.
    BENGALI = 36;// Bengali.
    SLOVENE = 37;// Slovene.
    HRVATSKI = 38;// Hrvatski.
    AZERBAIZHAN = 39;// Azerbaizhan.
    SERBIAN = 40;// Serbian.
}

message protocol_language_operate
{
    operate_type operate = 1; // 1bytes operation type 0: invalid operation 1: query 2: set.
    language cur_language = 2;     // Cur language; 1bytes , 0x01 0x02.
}

message protocol_language_inquire_reply
{
    operate_type operate = 1; // 1bytesoperation type 0: invalid operation 1: query 2: set.
    language cur_language = 2; // Current device language.
    bool chinese_support = 3;   // Chinese support; 1bytes.
    bool english_support = 4;   // English support; 1bytes.
    bool german_support = 5;   // German support; 1bytes.
    bool spanish_support = 6;   // Spanish support; 1bytes.
    bool italian_support = 7;   // Italian support; 1bytes.
    bool janpanese_support = 8;   // Janpanese support; 1bytes.
    bool russian_support = 9;   // Russian support; 1bytes.
    bool portuguese_support = 10;   // Portuguese support; 1bytes.
    bool french_support = 11;   // French support; 1bytes.
    bool korean_support = 12;   // Korean support; 1bytes.
    bool polish_support = 13;   // Polish support; 1bytes.
    bool czech_support = 14;   // Czech support; 1bytes.
    bool slovak_support = 15;   // Slovak support; 1bytes.
    bool Hungarian_support = 16;   // Hungarian support; 1bytes.
    bool greek_support = 17;   // Greek support; 1bytes.
    bool lithuanian_support = 18;   // Lithuanian support; 1bytes.
    bool latvian_support = 19;   // Latvian support; 1bytes.
    bool estonian_support = 20;   // Estonian support; 1bytes.
    bool bulgarian_support = 21;   // Bulgarian support; 1bytes.
    bool malay_support = 22;    // Malay support; 1bytes.
    bool indonesian_support = 23;// Indonesian support; 1bytes.
    bool thai_support = 24;// Thai support; 1bytes.
    bool vietnamese_support = 25;// Vietnamese support; 1bytes.
    bool hebrew_support = 26;// Hebrew support; 1bytes.
    bool devanagari_support = 27;// Devanagari support; 1bytes.
    bool turkey_support = 28;// Turkey support; 1bytes.
    bool romanian_support = 29;// Romanian support; 1bytes.
    bool dutch_support = 30;// Dutch support; 1bytes.
    bool ukrainian_support = 31;// Ukrainian support; 1bytes.
    bool arabic_support = 32;// Arabic support; 1bytes.
    bool farsi_support = 33;// Farsi support; 1bytes.
    bool trad_chinese_support = 34;// Trad chinese support; 1bytes.
    bool sweden_support = 35;// Sweden support; 1bytes.
    bool burmese_support = 36;// Burmese support; 1bytes.
    bool khmer_support = 37;// Khmer support; 1bytes.
    bool bengali_support = 38;// Bengali support; 1bytes.
    bool slovene_support = 39;// Slovene support; 1bytes.
    bool hrvatski_support = 40;// Hrvatski support; 1bytes.
    bool azerbaidzhan_support = 41;// Azerbaidzhan support; 1bytes.
}
```

### Field Reference

#### `protocol_language_operate`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytes operation type 0: invalid operation 1: query 2: set. |
| `cur_language` | `language` | Cur language; 1bytes , 0x01 0x02. |

#### `protocol_language_inquire_reply`

| Field | Type | Description |
| --- | --- | --- |
| `operate` | `operate_type` | 1bytesoperation type 0: invalid operation 1: query 2: set. |
| `cur_language` | `language` | Current device language. |
| `chinese_support` | `bool` | Chinese support; 1bytes. |
| `english_support` | `bool` | English support; 1bytes. |
| `german_support` | `bool` | German support; 1bytes. |
| `spanish_support` | `bool` | Spanish support; 1bytes. |
| `italian_support` | `bool` | Italian support; 1bytes. |
| `janpanese_support` | `bool` | Janpanese support; 1bytes. |
| `russian_support` | `bool` | Russian support; 1bytes. |
| `portuguese_support` | `bool` | Portuguese support; 1bytes. |
| `french_support` | `bool` | French support; 1bytes. |
| `korean_support` | `bool` | Korean support; 1bytes. |
| `polish_support` | `bool` | Polish support; 1bytes. |
| `czech_support` | `bool` | Czech support; 1bytes. |
| `slovak_support` | `bool` | Slovak support; 1bytes. |
| `Hungarian_support` | `bool` | Hungarian support; 1bytes. |
| `greek_support` | `bool` | Greek support; 1bytes. |
| `lithuanian_support` | `bool` | Lithuanian support; 1bytes. |
| `latvian_support` | `bool` | Latvian support; 1bytes. |
| `estonian_support` | `bool` | Estonian support; 1bytes. |
| `bulgarian_support` | `bool` | Bulgarian support; 1bytes. |
| `malay_support` | `bool` | Malay support; 1bytes. |
| `indonesian_support` | `bool` | Indonesian support; 1bytes. |
| `thai_support` | `bool` | Thai support; 1bytes. |
| `vietnamese_support` | `bool` | Vietnamese support; 1bytes. |
| `hebrew_support` | `bool` | Hebrew support; 1bytes. |
| `devanagari_support` | `bool` | Devanagari support; 1bytes. |
| `turkey_support` | `bool` | Turkey support; 1bytes. |
| `romanian_support` | `bool` | Romanian support; 1bytes. |
| `dutch_support` | `bool` | Dutch support; 1bytes. |
| `ukrainian_support` | `bool` | Ukrainian support; 1bytes. |
| `arabic_support` | `bool` | Arabic support; 1bytes. |
| `farsi_support` | `bool` | Farsi support; 1bytes. |
| `trad_chinese_support` | `bool` | Trad chinese support; 1bytes. |
| `sweden_support` | `bool` | Sweden support; 1bytes. |
| `burmese_support` | `bool` | Burmese support; 1bytes. |
| `khmer_support` | `bool` | Khmer support; 1bytes. |
| `bengali_support` | `bool` | Bengali support; 1bytes. |
| `slovene_support` | `bool` | Slovene support; 1bytes. |
| `hrvatski_support` | `bool` | Hrvatski support; 1bytes. |
| `azerbaidzhan_support` | `bool` | Azerbaidzhan support; 1bytes. |

### Enum Values

#### `operate_type`

| Value | Number | Description |
| --- | --- | --- |
| `INVALID` | `0` | Invalid or unspecified value. |
| `INQUIRE` | `1` | query. |
| `SET` | `2` | set. |

#### `language`

| Value | Number | Description |
| --- | --- | --- |
| `LANG_INVALID` | `0` | invalid. |
| `CHINESE` | `1` | Chinese. |
| `ENGLISH` | `2` | English. |
| `GERMAN` | `3` | German. |
| `SPANISH` | `4` | Spanish. |
| `ITALIAN` | `5` | Italian. |
| `JAPANESE` | `6` | Japanese. |
| `RUSSIAN` | `7` | Russian. |
| `PORTUGUESE` | `8` | Portuguese. |
| `FRENCH` | `9` | French. |
| `KOREAN` | `10` | Korean. |
| `POLISH` | `11` | Polish. |
| `CZECH` | `12` | Czech. |
| `SLOVAK` | `13` | Slovak. |
| `HUNGARIAN` | `14` | Hungarian. |
| `GREEK` | `15` | Greek. |
| `LITHUANIAN` | `16` | Lithuanian. |
| `LATVIAN` | `17` | Latvian. |
| `ESTONIAN` | `18` | Estonian. |
| `BULGARIAN` | `19` | Bulgarian. |
| `MALAY` | `20` | Malay. |
| `INDONESIAN` | `21` | Indonesian. |
| `THAILAND` | `22` | Thailand. |
| `VIETNAMESE` | `23` | Vietnamese. |
| `HEBREW` | `24` | Hebrew. |
| `DEVANAGARI` | `25` | Devanagari. |
| `TURKEY` | `26` | Turkey. |
| `ROMANIAN` | `27` | Romanian. |
| `DUTCH` | `28` | Dutch. |
| `UKRAINIAN` | `29` | Ukrainian. |
| `ARABIC` | `30` | Arabic. |
| `FARSI` | `31` | Farsi. |
| `TRAD_CHINESE` | `32` | Trad chinese. |
| `SWEDEN` | `33` | Sweden. |
| `BURMESE` | `34` | Burmese. |
| `KHMER` | `35` | Khmer. |
| `BENGALI` | `36` | Bengali. |
| `SLOVENE` | `37` | Slovene. |
| `HRVATSKI` | `38` | Hrvatski. |
| `AZERBAIZHAN` | `39` | Azerbaizhan. |
| `SERBIAN` | `40` | Serbian. |
