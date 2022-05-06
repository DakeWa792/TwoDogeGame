
import { _decorator, Component, Node, Label } from 'cc';
import { Constants } from '../FrameWork/Constants';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = winGuiCtrl
 * DateTime = Fri May 06 2022 05:39:11 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = winGuiCtrl.ts
 * FileBasenameNoExtension = winGuiCtrl
 * URL = db://assets/Scripts/UI/winGuiCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('failGuiCtrl')
export class failGuiCtrl extends Component {
    // [1]
    // dummy = '';

    @property(Node)
    returnMan_Btn:Node = null;

    @property(Node)
    uploadScore_Btn:Node = null;

    isCanUplaod:boolean = false;
    isUploadSucess:boolean = false;
    isWaitingUpload:boolean = false;

    onEnable () {
      this.returnMan_Btn.on(Node.EventType.TOUCH_START,this.restartGame,this);
      this.uploadScore_Btn.on(Node.EventType.TOUCH_START,this.watchVideo,this);
      //看视频成功
      CustomEventListener.on(Constants.EventName.CLOSEFAILGUI,this.closeFailGui,this);

    }

   onDisable(){
    this.returnMan_Btn.off(Node.EventType.TOUCH_START,this.restartGame,this);
    this.uploadScore_Btn.off(Node.EventType.TOUCH_START,this.watchVideo,this);
    CustomEventListener.off(Constants.EventName.CLOSEFAILGUI,this.closeFailGui,this);

   }

   restartGame(){
    CustomEventListener.dispatchEvent(Constants.EventName.RESTARTGAME);
    this.node.active = false;
   }

   watchVideo(){
    //观看视频的API
   }

   //视频观看结束，获得回调，隐藏摄像头角标
   closeFailGui(){
     //隐藏摄像头角标

    this.node.active = false;
   }


}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
