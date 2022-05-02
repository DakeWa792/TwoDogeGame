
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

    curTips:Node = null;

    start () {
      this.curTips = null;
      this.chooseTips = this.node.getChildByName("ChoosTips").getComponent(chooseTipCtrl);
      this.confirmTips = this.node.getChildByName("ConfirmTips").getComponent(confirmTipCtrl);


      CustomEventListener.on(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.on(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);

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

    onDisable(){
      CustomEventListener.off(Constants.EventName.SHOWCHOOSETIP,this.showChooseTips,this);
      CustomEventListener.off(Constants.EventName.CONFIRMTIP,this.showConfirmTips,this);
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
