import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

enum EventName {
  JOYSTICK = "joystick",  
  MOVEJOYSTICK = "move_JoyStick",
  SHOWCHOOSETIP = 'showChooseTips',
  CONFIRMTIP = 'confirmTip',
  
  CHATSUCCESS = 'chatSuccess',
  CHATFAIL = 'chatFail',
  UPDATEBULLET = 'updateBullet',
  ENTERGAME = 'enterGame',
  LEAVEGAME = 'leaveGame',
  RESTARTGAME = 'restartGame',
  ENDGAME = 'endGame',
  SHOWWINGUI = 'showEndGui',
  SHOWBULLETTIP = 'showBulletTip',
}

enum VideoEvent {
    UPLOADSUCEES = 'upload_sucess',
    UPLOADFAIL = 'upload_fail',
    UNLOCKBULLET = 'unlockBullet',
}

enum AudioSource {
    BACKGROUND = 'background',
    CLICK = 'click',
    CRASH = 'crash',
    GETMONEY = 'getMoney',
    INCAR = 'inCar',
    NEWORDER = 'newOrder',
    START = 'start',
    STOP = 'stop',
    TOOTING1 = 'tooting1',
    TOOTING2 = 'tooting2',
    WIN = 'win',
}

enum CarGroup {
    NORMAL = 1 << 0,
    MAIN_CAR = 1 << 1,
    OTHER_CAR = 1 << 2,
}

@ccclass("Constants")
export class Constants {
    public static EventName = EventName;
    public static VideoEvent = VideoEvent;

    public static talkTable = [
        'Please hurry up.\n I have a plane to catch',
        'The most beautiful day \nis not the rainy day',
    ];

    public static UIPage = {
        mainUI: 'mainUI',
        gameUI: 'gameUI',
        resultUI: 'resultUI',
    };

  

    public static GameConfigID = 'TAXI_GAME_CACHE';
    public static PlayerConfigID = 'playerInfo';
    public static MaxLevel = 20;

    public static BulletConfig = "bulletStorge";
    public static BulletCursor = 'bulletCursor';
    public static GrounpId = 'TestWorld';
}
