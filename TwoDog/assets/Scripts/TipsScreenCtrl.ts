
import { _decorator, Component, Node } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { bulletTipCtrl } from './UI/bulletTipCtrl';
import { chooseTipCtrl } from './UI/chooseTipCtrl';
import { confirmTipCtrl } from './UI/confirmTipCtrl';
import { winGuiCtrl } from './UI/winGuiCtrl';
import { tinyTipCtrl } from './UI/tinyTipCtrl';

const { ccclass, property } = _decorator;

/**
 * Predefined variables

 */
 
@ccclass('TipsCtrl')
export class TipsCtrl extends Component {
    // [1]
    // dummy = '';

    chooseTips:chooseTipCtrl = null;
    confirmTips:confirmTipCtrl = null;
    winGui:winGuiCtrl = null;
    bulletTip:bulletTipCtrl = null;
    tinyTip:tinyTipCtrl = null;

    curTips:Node = null;

    start () {
      this.curTips = null;
      this.chooseTips = this.node.getChildByName("ChoosTips").getComponent(chooseTipCtrl);
      this.confirmTips = this.node.getChildByName("ConfirmTips").getComponent(confirmTipCtrl);
      this.winGui = this.node.getChildByName("WinTips").getComponent(winGuiCtrl);
      this.tinyTip = this.node.getChildByName("TinyTip").getComponent(tinyTipCtrl);

      CustomEventListener.on(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.on(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);
      CustomEventListener.on(Constants.EventName.SHOWWINGUI,this.showWinGui,this);
      CustomEventListener.on(Constants.EventName.SHOWBULLETTIP,this.showBulletTip,this);
      CustomEventListener.on(Constants.EventName.TINYTIP,this.showTinyTip,this);
    }

    showChooseTips(text:string,event:string){
      if (this.curTips){
        this.curTips.active = false;
      }

      this.curTips = this.chooseTips.node;

      this.chooseTips.node.active = true;
      this.chooseTips.init(text,event);
    }

    showConfirmTips(text:string,event:string){
      if (this.curTips){
        this.curTips.active = false;
      }
      this.curTips = this.confirmTips.node;

      this.confirmTips.node.active = true;
      this.confirmTips.init(text,event);
    }

    showWinGui(){
      if (this.curTips){
        this.curTips.active = false;
      }
      this.curTips = this.winGui.node;

      this.winGui.node.active = true;
    }

    showBulletTip(){
      if (this.curTips){
        this.curTips.active = false;
      }

      this.curTips = this.bulletTip.node;
      this.bulletTip.node.active = true;
    }

    showTinyTip(text:string){
      this.tinyTip.node.active = true;
      this.tinyTip.show(text);
    }

    onDisable(){
      CustomEventListener.off(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.off(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);
      CustomEventListener.off(Constants.EventName.SHOWWINGUI,this.showWinGui,this);
      CustomEventListener.off(Constants.EventName.SHOWBULLETTIP,this.showBulletTip,this);
      CustomEventListener.off(Constants.EventName.TINYTIP,this.showTinyTip,this);
    }

}

