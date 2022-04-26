
import { _decorator, Component, Node, RigidBody2D, input, Input, EventTouch, Vec2, EventMouse } from 'cc';
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

    hammerVelocity:Vec2 = new Vec2(0,0);
    mosuePosition:Vec2 = new Vec2(0,0);

    onLoad() {
      this.human = this.node.children[0];
      this.hammer = this.node.children[1];

      this.humanRig2D = this.human.getComponent(RigidBody2D);
      this.hammerRig2D = this.hammer.getComponent(RigidBody2D);
    }

    onEnable(){
      input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
    }
    
    moveMouse(event:EventMouse){
      this.mosuePosition = event.getUILocation();

      //Vec2.subtract(this.hammerVelocity,mosuePosition,hammerPos);
      
    }

    update(dt){
      console.log(this.mosuePosition);
      let hammerPos = new Vec2(this.hammer.worldPosition.x,this.hammer.worldPosition.y)
      Vec2.subtract(this.hammerVelocity,this.mosuePosition,hammerPos);
      console.log(this.hammerVelocity);
      this.hammerRig2D.linearVelocity = this.hammerVelocity.multiply2f(dt*10,dt*10);
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
