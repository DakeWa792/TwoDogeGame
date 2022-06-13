
import { _decorator, Component, Node, RigidBody2D, input, Input, EventTouch, Vec2, EventMouse, sp, UITransform, Vec3, Quat, misc, Collider2D, Contact2DType, BoxCollider2D, sys, Prefab, instantiate } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { RunTimeData } from './FrameWork/GameData';
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
    @property([Prefab])
    hammer_Pr:Prefab[] = [];

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

    hammerCollider:Collider2D = null;

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

    headBone:sp.spine.Bone = null;

    left_MaxLen:number = null;
    right_MaxLen:number = null;

    //是否处于碰撞中
    isCollider:Boolean = false;

    ScreenWidth:number = null;
    ScreenHeight:number = null;

    //是否开启操作检测
    isOpenOperate:Boolean = false;

    eneterGame(pos:Vec2) {
      let p_pos = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(pos.x,pos.y,0));
      this.node.setWorldPosition(p_pos.x,p_pos.y,0);
      
      this.ScreenWidth = this.node.parent.getComponent(UITransform).contentSize.width/2;
      this.ScreenHeight = this.node.parent.getComponent(UITransform).contentSize.height/2;
      
      this.endPos = this.node.getChildByName("EndPos");
      
      this.canmeraNode = this.node.parent.getChildByName("Camera");
      this.mouseTarget = this.node.getChildByName("MouseTarget");

      //读取锤子数据
      let tag = RunTimeData.instance().euipedWeapon;
      this.hammer = this.node.getChildByName("Hammer");

      if (this.hammer){
        this.hammer.destroy();
      }
      
      //console.log(this.hammer);
      this.hammer = instantiate(this.hammer_Pr[tag]);
      this.hammer.parent = this.node;

      this.human = this.node.getChildByName("Human");
      
      this.hammer_anchor = this.hammer.getChildByName("Ham");     //锤子头部节点
      this.ham_root_L = this.hammer.getChildByName("RootLeft");   //左手握的锤子的位置
      this.ham_root_R = this.hammer.getChildByName("RootRight");  //右手握的锤子的位置
      
      let hammer_sprite = this.hammer.getChildByName("Sprite");

      let posY = hammer_sprite.getComponent(UITransform).contentSize.height;
      this.hammer.position = new Vec3(this.endPos.position.x,(this.endPos.position.y+posY),0);

      this.hammerCollider = this.hammer.getComponent(Collider2D); //锤子的碰撞体，只有头部存在
     
      //锤子长度
      this.hammerLen = this.hammer.getComponent(UITransform).contentSize.height - this.hammer_anchor.getComponent(UITransform).contentSize.height/2;

      //读取玩家节点数据
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

      this.headBone = this.playerSk.findBone("Head");
    
      //计算玩家spine数据中左臂、右臂的长度，作为限制范围
      this.left_MaxLen = this.leftUpArmBone.data.length + this.leftArmBone.data.length -5;
      this.right_MaxLen = this.rightUpArmBone.data.length + this.rightArmBone.data.length -0;

    }

    restartGame(pos:Vec2|Vec3){
      this.closeOperate();
      this.hammer.destroy();
      let p_pos = this.node.parent.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(pos.x,pos.y,0));
      this.node.setWorldPosition(p_pos.x,p_pos.y,0);
    }

    openOperate(){
      //控制鼠标在玩家合适的范围内
      this.playerRig2D.gravityScale = 1;
      if (sys.hasFeature(sys.Feature.EVENT_MOUSE)){
        input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
      }else{
        CustomEventListener.dispatchEvent(Constants.EventName.JOYSTICK,true);
        CustomEventListener.on(Constants.EventName.MOVEJOYSTICK,this.moveJoyStick,this);
      }
      
      
      this.hammerCollider.on(Contact2DType.BEGIN_CONTACT,this.OnCollisionEnter,this);
      this.hammerCollider.on(Contact2DType.END_CONTACT,this.OnCollisionExit,this);

      this.isOpenOperate = true;
    }

    closeOperate(){
      this.playerRig2D.gravityScale = 0;
      if (sys.hasFeature(sys.Feature.EVENT_MOUSE)){
        input.off(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
      }else{
        CustomEventListener.dispatchEvent(Constants.EventName.JOYSTICK,false);
        CustomEventListener.off(Constants.EventName.MOVEJOYSTICK,this.moveJoyStick,this);
      }
      this.hammerCollider.off(Contact2DType.BEGIN_CONTACT,this.OnCollisionEnter,this);
      this.hammerCollider.off(Contact2DType.END_CONTACT,this.OnCollisionExit,this);
    }
    
    moveJoyStick(stickPos:Vec2){
      let pos = new Vec2();
      pos.x =this.human.worldPosition.x + stickPos.x*1.5;
      pos.y =this.human.worldPosition.y + stickPos.y*1.5;
      this.targetPosition = pos.clone();
    }


    moveMouse(event:EventMouse){
      let uiPos = event.getUILocation();
      
      let pos = new Vec2((uiPos.x -this.ScreenWidth  + this.canmeraNode.worldPosition.x),(uiPos.y -this.ScreenHeight + this.canmeraNode.worldPosition.y));
      this.targetPosition = pos.clone();
    }

    update(dt){
      if (!this.isOpenOperate){
        return;
      }
      
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
      
      if (this.targetPosition.x <this.human.worldPosition.x){
        this.headBone.scaleY = 1;
        /* if(ang <45){
          ang = 45;
        }else if (ang >135){
          ang = 135;
        } */
      }else{
        this.headBone.scaleY = -1;
        /* if(ang <235){
          ang = 235;
        }else if (ang >315){
          ang = 315;
        } */
      }
      let dirVec2 = new Vec2();
      Vec2.subtract(dirVec2,this.targetPosition,new Vec2(this.human.worldPosition.x,this.human.worldPosition.y+11));
      let direction= dirVec2.normalize();
      let rad = new Vec2(0,1).signAngle(direction);
      let ang = misc.radiansToDegrees(rad);

      if(ang>0 && ang <15){
        ang = 15;
      }else if(ang <0 && ang >-15){
        ang = -15;
      }else if(ang <180 && ang>165){
        ang = 165;
      }else if(ang >-180 && ang<-165){
        ang = -165;
      }

      if (ang <0){
        ang = ang +180;
      }

      this.headBone.rotation = ang;

    }

    //产生碰撞时调用
    OnCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D){
      if (otherCollider.tag == 2){
        this.isCollider = true;
        this.playerRig2D.gravityScale = 0;
      }
    }
    //结束碰撞时调用
    OnCollisionExit(selfCollider: Collider2D, otherCollider: Collider2D){
      if (otherCollider.tag == 2 && this.isCollider && this.playerRig2D.gravityScale==0){
        this.isCollider = false;
        this.playerRig2D.gravityScale = 1;
      }
    }

    onDisable(){
      this.closeOperate();
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
