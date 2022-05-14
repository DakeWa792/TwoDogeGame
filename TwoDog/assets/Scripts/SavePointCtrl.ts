
import { _decorator, Component, Node, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact, tiledLayerAssembler, RigidBody2D } from 'cc';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { Constants } from './FrameWork/Constants';
import { RunTimeData } from './FrameWork/GameData';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EndPoint
 * DateTime = Thu May 05 2022 06:37:08 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = EndPoint.ts
 * FileBasenameNoExtension = EndPoint
 * URL = db://assets/Scripts/EndPoint.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('SavePointCtrl')
export class SavePointCtrl extends Component {
    // [1]
    @property(Number)
    saveTag:number = null;

    isTrigger:boolean = false;
    isSaved:boolean = false;

    onEnable () {  
      this.node.getComponent(RigidBody2D).enabledContactListener = true;
      this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT,this.enterSavePoint,this);
      this.node.getComponent(BoxCollider2D).on(Contact2DType.END_CONTACT,this.leaveSavePoint,this);
      CustomEventListener.on(Constants.VideoEvent.SAVEPOINTSUC,this.savePointSucess,this);
    }

    onDisable(){
      this.node.getComponent(RigidBody2D).enabledContactListener = false;
      this.isTrigger = false;
      this.isSaved = false;
      this.node.getComponent(BoxCollider2D).off(Contact2DType.BEGIN_CONTACT,this.enterSavePoint,this);
      this.node.getComponent(BoxCollider2D).off(Contact2DType.END_CONTACT,this.leaveSavePoint,this);
      CustomEventListener.off(Constants.VideoEvent.SAVEPOINTSUC,this.savePointSucess,this);
    }

    enterSavePoint(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
      console.log('SavePointCtrl');
      console.log(otherCollider.tag);
      console.log(this.isTrigger);
      console.log(this.isSaved);
      if (otherCollider.tag == 1 && !this.isTrigger && !this.isSaved){
        
        console.log('SavePointCtrl');
        this.isTrigger = true;

      //触发视频后：
        RunTimeData.instance().playerData.saverevivePoint(this.saveTag);
        this.isSaved = true;
      }
    }
    leaveSavePoint(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
      if (otherCollider.tag == 1 && this.isTrigger){
        this.isTrigger = false;
      }
    }

    savePointSucess(tag:number){
      if (tag ==this.saveTag && !this.isSaved){
        RunTimeData.instance().playerData.saverevivePoint(this.saveTag);
        this.isSaved = true;
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
