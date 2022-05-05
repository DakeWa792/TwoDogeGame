
import { _decorator, Component, Node, UITransform, Camera, Vec2, Vec3 } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CameraCtrl
 * DateTime = Sat Apr 30 2022 09:35:38 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = CameraCtrl.ts
 * FileBasenameNoExtension = CameraCtrl
 * URL = db://assets/Scripts/CameraCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CameraCtrl')
export class CameraCtrl extends Component {
    // [1]
    // dummy = '';

    playerTransfor:UITransform = null;
    transform:UITransform = null;
    camera:Camera = null;

    bgNode:Node = null;
    ScreenNode:Node = null;

    isInGame:boolean = false;

    enterGame(pos:Vec2){
      this.playerTransfor = this.node.parent.getChildByName("Player").getChildByName("Human").getComponent(UITransform);
      this.transform = this.node.parent.getComponent(UITransform);
      this.bgNode = this.node.parent.getChildByName("Bg");
      this.ScreenNode = this.node.parent.getChildByName("ScreenGui");

      let c_pos = this.transform.convertToNodeSpaceAR(new Vec3(pos.x,pos.y,0));
      this.node.setPosition(new Vec3(c_pos.x,c_pos.y,1000));
      this.bgNode.setPosition(new Vec3(c_pos.x,c_pos.y,0));
      this.ScreenNode.setPosition(new Vec3(c_pos.x,c_pos.y,0));

      this.isInGame = true;

    }
    
    leaveGame(){
      this.isInGame = false;

      this.node.setPosition(new Vec3(0,0,1000));
      this.bgNode.setPosition(new Vec3(0,0,0));
      this.ScreenNode.setPosition(new Vec3(0,0,0));
    }

    closeUpdate(){
      this.isInGame = false;
    }

    update(dt){
      if (!this.playerTransfor || !this.isInGame) {
        return;
      }

      let w_pos = this.playerTransfor.convertToWorldSpaceAR(new Vec3(0,0,0));
      let c_pos = this.transform.convertToNodeSpaceAR(w_pos);
      //console.log(c_pos);
      this.node.setPosition(new Vec3(c_pos.x,c_pos.y,1000));
      this.bgNode.setPosition(new Vec3(c_pos.x,c_pos.y,0));
      this.ScreenNode.setPosition(new Vec3(c_pos.x,c_pos.y,0));

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
