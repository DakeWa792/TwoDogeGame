
import { _decorator, Component, Node, RigidBody2D, input, Input, EventTouch, Vec2, EventMouse, sp, UITransform, Vec3, Quat, misc, Collider2D, Contact2DType, BoxCollider2D, sys } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
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
    endPos:Node = null;
    canmeraNode:Node = null;

    mouseTarget:Node = null;

    human:Node = null;
    hammer:Node = null;
    hammer_anchor:Node = null;
    ham_root_L:Node = null;
    ham_root_R:Node = null;

    hammerLen:number = null;

    playerRig2D:RigidBody2D = null;
    hammerRig2D:RigidBody2D = null;
    mouseTarRig2D:RigidBody2D = null;

    hammerCollider:BoxCollider2D = null;

    targetPosition:Vec2 = new Vec2(0,0);

    //玩家的spine骨骼信息
    playerSk:sp.Skeleton = null;
    playerSk_Data:sp.SkeletonData = null;

    leftTarBone:sp.spine.Bone = null;
    rightTarBone:sp.spine.Bone = null;

    leftUpArmBone:sp.spine.Bone = null;
    leftArmBone:sp.spine.Bone = null;

    rightUpArmBone:sp.spine.Bone = null;
    rightArmBone:sp.spine.Bone = null;

    left_MaxLen:number = null;
    right_MaxLen:number = null;

    //是否处于碰撞中
    isCollider:Boolean = false;

    onLoad() {
      this.endPos = this.node.children[3];
      
      this.canmeraNode = this.node.parent.getChildByName("Camera");
      this.mouseTarget = this.node.children[2];

      this.human = this.node.children[0];
      this.hammer = this.node.children[1];
      this.hammer_anchor = this.hammer.getChildByName("Ham");     //锤子头部节点
      this.ham_root_L = this.hammer.getChildByName("RootLeft");   //左手握的锤子的位置
      this.ham_root_R = this.hammer.getChildByName("RootRight");  //右手握的锤子的位置

      this.hammerCollider = this.hammer.getComponent(BoxCollider2D); //锤子的碰撞体，只有头部存在
     
      //锤子长度
      this.hammerLen = this.hammer.getComponent(UITransform).contentSize.height - this.hammer_anchor.getComponent(UITransform).contentSize.height/2;

      this.playerRig2D = this.node.getComponent(RigidBody2D);
      this.hammerRig2D = this.hammer.getComponent(RigidBody2D);
      this.mouseTarRig2D = this.mouseTarget.getComponent(RigidBody2D);


      //读取玩家的spine数据
      this.playerSk = this.human.getComponent(sp.Skeleton);

      this.leftTarBone = this.playerSk.findBone("Left");
      this.rightTarBone = this.playerSk.findBone("Right");

      this.leftUpArmBone = this.playerSk.findBone("R_Up_arm");
      this.leftArmBone = this.playerSk.findBone("R_arm");

      this.rightUpArmBone = this.playerSk.findBone("L_Up_arm");
      this.rightArmBone = this.playerSk.findBone("L_arm");

      //计算玩家spine数据中左臂、右臂的长度，作为限制范围
      this.left_MaxLen = this.leftUpArmBone.data.length + this.leftArmBone.data.length -5;
      this.right_MaxLen = this.rightUpArmBone.data.length + this.rightArmBone.data.length -0;
      
    }

    onEnable(){
      if (sys.hasFeature(sys.Feature.EVENT_MOUSE)){
        input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
        CustomEventListener.dispatchEvent(Constants.EventName.JOYSTICK,true);
        
      }else{
        CustomEventListener.dispatchEvent(Constants.EventName.JOYSTICK,true);
        CustomEventListener.on(Constants.EventName.MOVEJOYSTICK,this.moveJoyStick,this);
      }
      
      
      this.hammerCollider.on(Contact2DType.BEGIN_CONTACT,this.OnCollisionEnter,this);
      this.hammerCollider.on(Contact2DType.END_CONTACT,this.OnCollisionExit,this);
    }
    moveJoyStick(stickPos:Vec2){

    }


    moveMouse(event:EventMouse){
      let uiPos = event.getUILocation();
      let pos = new Vec2((uiPos.x - 480 + this.canmeraNode.worldPosition.x),(uiPos.y -320 + this.canmeraNode.worldPosition.y));
      this.targetPosition = pos.clone();
    }

    update(dt){
      //计算鼠标目标的受力
      let startPos1 = new Vec2(this.mouseTarget.worldPosition.x,this.mouseTarget.worldPosition.y);
      let targMouseVelocity = new Vec2();
      Vec2.subtract(targMouseVelocity,this.targetPosition,startPos1);

      let velocity = targMouseVelocity.multiply2f(dt*10,dt*10);

      this.mouseTarRig2D.linearVelocity = velocity;
      //console.log(velocity);

      //计算锤子的受力
      let startPos2 = new Vec2(this.hammer_anchor.worldPosition.x,this.hammer_anchor.worldPosition.y);
      let endPos2 = this.calEndPos(this.targetPosition);

      this.endPos.worldPosition = new Vec3(endPos2.x,endPos2.y,0);

      let hammervelocity = new Vec2();
      Vec2.subtract(hammervelocity,endPos2,startPos2);
      this.hammerRig2D.linearVelocity = hammervelocity.multiply2f(dt*10,dt*10);

      //计算锤子的转向
      let dirVec2 = new Vec2();
      Vec2.subtract(dirVec2,endPos2,new Vec2(this.human.worldPosition.x,this.human.worldPosition.y+11));
      let direction= dirVec2.normalize();
      let rad = new Vec2(0,1).signAngle(direction);
      let ang = misc.radiansToDegrees(rad);
      this.hammer.angle = ang;

      //计算玩家的受力，锤子目标的反向目标
      
      
      if (this.isCollider){
        let playerdir = new Vec2();
        Vec2.subtract(playerdir,new Vec2(this.hammer_anchor.worldPosition.x,this.hammer_anchor.worldPosition.y),endPos2);
        //console.log(playerdir);
        /* let playerEnd = new Vec2();
        Vec2.add(playerEnd,new Vec2(this.hammer_anchor.worldPosition.x,this.hammer_anchor.worldPosition.y),playerdir);
        console.log(this.human.worldPosition);
        console.log(playerEnd); */
        let playerVelocity= new Vec2();
        //Vec2.subtract(playerVelocity,playerEnd,new Vec2(this.human.worldPosition.x,this.human.worldPosition.y+11));
        
        //console.log(playerVelocity);
        this.playerRig2D.linearVelocity = playerdir.multiply2f(dt*10,dt*10);
        //this.isCollider = false;
      }
      this.controlHuman();
      //console.log(this.playerRig2D.linearVelocity);  
    }

    //计算锤子的限制范围，限制范围内的目标点
    calEndPos(pos:Vec2){
      
      let endPos = pos.clone();
      let startPos = new Vec2(this.human.worldPosition.x,this.human.worldPosition.y+11);

      let lenPos= new Vec2();
      Vec2.subtract(lenPos,endPos,startPos);
      let len = lenPos.length() - this.hammerLen;
  
      let max = 0;
     
      if (len >= this.left_MaxLen || len >= this.right_MaxLen){
        if (endPos.x < this.human.worldPosition.x){
          max = this.right_MaxLen + this.hammerLen;
        }else{
          max = this.left_MaxLen + this.hammerLen;
        }
      }
      if (max != 0){
        let dirPos = pos.clone();
        
        let dir = dirPos.subtract(startPos).normalize();
        Vec2.add(endPos,startPos,dir.multiplyScalar(max));

      }
      
      return endPos;
    }

    //控制玩家的动画人物的手的IK控制点
    controlHuman(){
      if (this.leftTarBone && this.leftTarBone.parent){
        let p2 = this.human.getComponent(UITransform).convertToNodeSpaceAR(this.ham_root_L.worldPosition);
        this.leftTarBone.parent.worldToLocal(new sp.spine.Vector2(p2.x,p2.y));
        this.leftTarBone.x = p2.x;
        this.leftTarBone.y = p2.y;
      }
      if (this.rightTarBone && this.rightTarBone.parent){
        let p3 = this.human.getComponent(UITransform).convertToNodeSpaceAR(this.ham_root_R.worldPosition);
        this.rightTarBone.parent.worldToLocal(new sp.spine.Vector2(p3.x,p3.y));
        this.rightTarBone.x = p3.x;
        this.rightTarBone.y = p3.y;
      }
    }

    //产生碰撞时调用
    OnCollisionEnter(){
      this.isCollider = true;
      this.playerRig2D.gravityScale = 0;
    }
    //结束碰撞时调用
    OnCollisionExit(){
      this.isCollider = false;
      this.playerRig2D.gravityScale = 1;
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
