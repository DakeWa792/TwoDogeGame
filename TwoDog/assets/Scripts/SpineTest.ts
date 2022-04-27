
import { _decorator, Component, Node, sp, find, input, Input, EventMouse, Vec2, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const leftTargName = "LeftTarg";
const rightTargName = "RightTarg";
@ccclass('SpineTest')
export class SpineTest extends Component {
    // [1]
    // dummy = '';
    
    
    playerSk:sp.Skeleton = null;
    playerSk_Data:sp.SkeletonData = null;

    leftTarBone:sp.spine.Bone = null;
    rightTarBone:sp.spine.Bone = null;

    mosuePosition:Vec2 = new Vec2(0,0);

    start () {
      this.playerSk = this.node.getComponent(sp.Skeleton);
      this.playerSk_Data = this.playerSk.skeletonData;

      this.leftTarBone = this.playerSk.findBone(leftTargName);
      this.rightTarBone = this.playerSk.findBone(rightTargName);

      console.log(this.leftTarBone);
      console.log(this.rightTarBone);

    }

    onEnable(){
      input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
    }

    moveMouse(event:EventMouse){
      this.mosuePosition = event.getUILocation();
      

      if (this.leftTarBone && this.leftTarBone.parent){
        let p2 = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(this.mosuePosition.x,this.mosuePosition.y,0));
        this.leftTarBone.parent.worldToLocal(new sp.spine.Vector2(p2.x,p2.y));
        this.leftTarBone.x = p2.x;
        this.leftTarBone.y = p2.y;
      }
      
      if (this.rightTarBone && this.rightTarBone.parent){
        let p3 = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(this.mosuePosition.x,this.mosuePosition.y,0));
        this.rightTarBone.parent.worldToLocal(new sp.spine.Vector2(p3.x,p3.y));
        this.rightTarBone.x = p3.x;
        this.rightTarBone.y = p3.y;
      }

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
