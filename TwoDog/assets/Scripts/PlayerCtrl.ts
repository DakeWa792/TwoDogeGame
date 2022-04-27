
import { _decorator, Component, Node, RigidBody2D, input, Input, EventTouch, Vec2, EventMouse, sp, UITransform, Vec3, Quat } from 'cc';
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
    hammer_anchor:Node = null;


    humanRig2D:RigidBody2D = null;
    hammerRig2D:RigidBody2D = null;

    hammerVelocity:Vec2 = new Vec2(0,0);
    mosuePosition:Vec2 = new Vec2(0,0);

    //玩家的spine骨骼信息
    playerSk:sp.Skeleton = null;
    playerSk_Data:sp.SkeletonData = null;

    leftTarBone:sp.spine.Bone = null;
    rightTarBone:sp.spine.Bone = null;

    leftHit:sp.spine.Bone = null;
    rightHit:sp.spine.Bone = null;

    onLoad() {
      this.human = this.node.children[0];
      this.hammer = this.node.children[1];
      this.hammer_anchor = this.hammer.getChildByName("Ham");

      this.humanRig2D = this.human.getComponent(RigidBody2D);
      this.hammerRig2D = this.hammer.getComponent(RigidBody2D);

      this.playerSk = this.human.getComponent(sp.Skeleton);

      this.leftTarBone = this.playerSk.findBone("LeftTarg");
      this.rightTarBone = this.playerSk.findBone("RightTarg");

      this.leftHit = this.playerSk.findBone("LeftHit");
      this.rightHit = this.playerSk.findBone("RightHit");
    }

    onEnable(){
      input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
    }
    
    moveMouse(event:EventMouse){
      this.mosuePosition = event.getUILocation(); 
      this.controlHuman();    
    }

    update(dt){
      let startPos = new Vec2(this.hammer_anchor.worldPosition.x,this.hammer_anchor.worldPosition.y)
      Vec2.subtract(this.hammerVelocity,this.mosuePosition,startPos);
      
      this.hammerRig2D.linearVelocity = this.hammerVelocity.multiply2f(dt*10,dt*10);

      let direction=new Vec3(this.mosuePosition.x,this.mosuePosition.y,0).subtract(this.human.worldPosition);
      
      let q_tmp = new Quat();
      Quat.rotationTo(q_tmp,new Vec3(0,1,0),direction);
      console.log(q_tmp);
      //this.hammer.setRotation(q_tmp);
      
    }

    controlHuman(){
      if (this.leftTarBone && this.leftTarBone.parent){
        let p2 = this.human.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(this.mosuePosition.x,this.mosuePosition.y,0));
        this.leftTarBone.parent.worldToLocal(new sp.spine.Vector2(p2.x,p2.y));
        this.leftTarBone.x = p2.x;
        this.leftTarBone.y = p2.y;
      }
      if (this.rightTarBone && this.rightTarBone.parent){
        let p3 = this.human.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(this.mosuePosition.x,this.mosuePosition.y,0));
        this.rightTarBone.parent.worldToLocal(new sp.spine.Vector2(p3.x,p3.y));
        this.rightTarBone.x = p3.x;
        this.rightTarBone.y = p3.y;
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
