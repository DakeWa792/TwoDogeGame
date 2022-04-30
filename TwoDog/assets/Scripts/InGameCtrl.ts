
import { _decorator, Component, Node } from 'cc';
import { AnalogStickCtrl } from './AnalogStickCtrl';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = InGameCtrl
 * DateTime = Sat Apr 30 2022 17:51:35 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = InGameCtrl.ts
 * FileBasenameNoExtension = InGameCtrl
 * URL = db://assets/Scripts/InGameCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('InGameCtrl')
export class InGameCtrl extends Component {
    
    joyStickCtrl:AnalogStickCtrl = null;

    onLoad(){
      CustomEventListener.on(Constants.EventName.JOYSTICK,this.joyStickEnable,this);
    }

    start () {
      
    }

    joyStickEnable(bool:Boolean){
      console.log("joyStickEnable");
      if (!this.joyStickCtrl){
        this.joyStickCtrl = this.node.getChildByName("AnalogStick").getComponent(AnalogStickCtrl);
      }

      if (bool){
        this.joyStickCtrl.node.active = true;
        this.joyStickCtrl.init();
      }

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
