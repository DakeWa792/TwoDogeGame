import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

enum EventName {
  JOYSTICK = "joystick",  
  MOVEJOYSTICK = "move_JoyStick",
  SHOWCHOOSETIP = 'showChooseTips',
  CONFIRMTIP = 'confirmTip',
  TINYTIP = 'tinyTip',

  CHATSUCCESS = 'chatSuccess',
  CHATFAIL = 'chatFail',
  UPDATEBULLET = 'updateBullet',


  ENTERGAME = 'enterGame',
  LEAVEGAME = 'leaveGame',
  RESTARTGAME = 'restartGame',
  ENDGAME = 'endGame',
  PAUESEGAME = 'pauseGame',



  SHOWWINGUI = 'showEndGui',
  SHOWBULLETTIP = 'showBulletTip',
  SHOWFAILGUI = 'showFailGui',
  CLOSEFAILGUI = 'closeFailGui',

  UPLOADSCORE  = 'upload_score',
  UPLOADSUCEES = 'upload_sucess',
  UPLOADFAIL = 'upload_fail',
}

enum Weapons{
  Hammer0 = 'Hammer_1',
  Hammer1 = 'Hammer_2',
  Hammer2 = 'Hammer_3',
  Hammer3 = 'Hammer_4',
  Hammer4 = 'Hammer_5',
  Hammer5 = 'Hammer_6',
}

enum VideoEvent {
    CALLBACKSCORE =  'upLoadScore_callBack',
    UNLOCKBULLET = 'unlockBullet',
    UNLOCKWEAPON = 'unlockWeapon',
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
    public static Weapons = Weapons;
    public static WeaponsNum = 6;
    
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
