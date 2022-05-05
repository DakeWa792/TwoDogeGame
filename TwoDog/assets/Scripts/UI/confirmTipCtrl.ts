
import { _decorator, Component, Node, Button, Label } from 'cc';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = confirmTipCtrl
 * DateTime = Mon May 02 2022 12:23:19 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = confirmTipCtrl.ts
 * FileBasenameNoExtension = confirmTipCtrl
 * URL = db://assets/Scripts/UI/confirmTipCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('confirmTipCtrl')
export class confirmTipCtrl extends Component {
    // [1]
    agreeBtn:Button = null;
    contextLb:Label = null;
    agereeEvent:string = null;

    onLoad () {
      this.agreeBtn = this.node.children[1].getComponent(Button);
      this.contextLb = this.node.children[2].children[0].getComponent(Label);
    }

    init (text:string,event:string) {
      this.contextLb.string = text;

      if (event){
        this.agreeBtn.node.on(Button.EventType.CLICK,this.confirm,this);
        this.agereeEvent = event;
      }else{
        this.agreeBtn.node.on(Button.EventType.CLICK,this.close,this);
      }
      
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
      this.agreeBtn.node.off(Button.EventType.CLICK);
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
