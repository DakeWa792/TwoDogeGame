
import { _decorator, Component, Node } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { chooseTipCtrl } from './UI/chooseTipCtrl';
import { confirmTipCtrl } from './UI/confirmTipCtrl';
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
    endGui:endGuiCtrl = null;


    curTips:Node = null;

    start () {
      this.curTips = null;
      this.chooseTips = this.node.getChildByName("ChoosTips").getComponent(chooseTipCtrl);
      this.confirmTips = this.node.getChildByName("ConfirmTips").getComponent(confirmTipCtrl);


      CustomEventListener.on(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.on(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);
      CustomEventListener.on(Constants.EventName.showEndGui,this.showEndGui,this);

    }

    showChooseTips(text:string,event:string){
      if (this.curTips){
        this.curTips.active = false;
      }

      this.curTips = this.chooseTips.node;

      this.chooseTips.node.active = true;
      this.chooseTips.init(text,event);
    }

    showConfirmTips(text:string){
      if (this.curTips){
        this.curTips.active = false;
      }
      this.curTips = this.confirmTips.node;

      this.confirmTips.node.active = true;
      this.confirmTips.init(text);
    }

    showEndGui(){

    }

    onDisable(){
      CustomEventListener.off(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.off(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);
      CustomEventListener.off(Constants.EventName.showEndGui,this.showEndGui,this);
    }

}

