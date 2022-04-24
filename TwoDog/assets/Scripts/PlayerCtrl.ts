
import { _decorator, Component, Node, RigidBody2D, input, Input, EventTouch, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerCtrl
 * DateTime = Sun Apr 24 2022 22:41:46 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = PlayerCtrl.ts
 * FileBasenameNoExtension = PlayerCtrl
 * URL = db://assets/Scripts/PlayerCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    // [1]
    // dummy = '';

    human:Node = null;
    hammer:Node = null;

    humanRig2D:RigidBody2D = null;
    hammerRig2D:RigidBody2D = null;

    start () {
      this.human = this.node.children[0];
      this.hammer = this.node.children[1];

      this.humanRig2D = this.human.getComponent(RigidBody2D);
      this.hammerRig2D = this.hammer.getChildByName("Ham").getComponent(RigidBody2D);
    }

    onEnable(){
      //input.on(Input.EventType.MOUSE_MOVE,this.moveHammer,this);
    }
    
    moveHammer(e:EventTouch){
      //let mosuePosition = event.getUILocation();
      //this.hammerRig2D.linearVelocity = Vec2.subtract(mosuePosition,new Vec2(this.human.position.x,this.human.position.y));
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
