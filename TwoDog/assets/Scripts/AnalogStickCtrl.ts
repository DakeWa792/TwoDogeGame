
import { _decorator, Component, Node, Vec3, EventTouch, UITransform, Vec2 } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AnalogStickCtrl
 * DateTime = Sat Apr 30 2022 16:39:01 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = AnalogStickCtrl.ts
 * FileBasenameNoExtension = AnalogStickCtrl
 * URL = db://assets/Scripts/AnalogStickCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('AnalogStickCtrl')
export class AnalogStickCtrl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    bgStick:Node = null;
    coreStick:Node = null;
    bgTransform:UITransform = null;
    max_R:number = null;

    init(){
      this.bgStick = this.node.children[0];
      this.coreStick = this.bgStick.children[0];

      this.coreStick.position = new Vec3(0,0,0);
      this.bgTransform = this.bgStick.getComponent(UITransform);
      this.max_R = this.bgTransform.contentSize.width/2;

      this.bgStick.on(Node.EventType.TOUCH_START,this.startTouch,this);
      this.bgStick.on(Node.EventType.TOUCH_MOVE,this.moveTouch,this);
      //this.bgStick.on(Node.EventType.TOUCH_END,this.endStick,this);
    }

    startTouch(event:EventTouch){
      console.log("startTouch");
      this.moveStick(event);
    }

    moveTouch(event:EventTouch){
      
      this.moveStick(event);
    }

    moveStick(event:EventTouch){
      let touchPos = event.getUILocation();
      
      let ps = new Vec2(touchPos.x -480,touchPos.y-320);
      let pos = new Vec2(ps.x - this.bgStick.position.x,ps.y - this.bgStick.position.y);
      
      let len =pos.length();
     
      if (len >this.max_R){
        
        pos.x = this.max_R * pos.x/len;
        pos.y = this.max_R * pos.y/len;
      }
      
      this.coreStick.setPosition(new Vec3(pos.x,pos.y,0));
      CustomEventListener.dispatchEvent(Constants.EventName.MOVEJOYSTICK,pos);
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
