
import { _decorator, Component, Node, Button, Label } from 'cc';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = chooseTipCtrl
 * DateTime = Mon May 02 2022 10:52:32 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = chooseTipCtrl.ts
 * FileBasenameNoExtension = chooseTipCtrl
 * URL = db://assets/Scripts/UI/chooseTipCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('chooseTipCtrl')
export class chooseTipCtrl extends Component {
    // [1]
    // dummy = '';

    agreeBtn:Button = null;
    refuseBtn:Button = null;
    contextLb:Label = null;

    agereeEvent:string = null;

    onLoad () {
      this.agreeBtn = this.node.children[1].getComponent(Button);
      this.refuseBtn = this.node.children[2].getComponent(Button);
      this.contextLb = this.node.children[3].children[0].getComponent(Label);
    }

    init(text:string,event:string){
      this.contextLb.string = text;
      this.agereeEvent = event;
      this.agreeBtn.node.on(Button.EventType.CLICK,this.confirm,this);
      this.refuseBtn.node.on(Button.EventType.CLICK,this.close,this);
    }

    confirm(){
      CustomEventListener.dispatchEvent(this.agereeEvent);
      this.close();
    }
    
    close(){
      this.node.active = false;
    }

    onDisable(){
      this.contextLb.string = "";
      this.agereeEvent = null;
      
      this.agreeBtn.node.off(Button.EventType.CLICK,this.confirm,this);
      this.refuseBtn.node.off(Button.EventType.CLICK,this.close,this);
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
