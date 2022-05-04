
import { _decorator, Component, Node, BoxCollider2D, Contact2DType } from 'cc';
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
 
@ccclass('EndPointCtrl')
export class EndPointCtrl extends Component {
    // [1]
    // dummy = '';

    // [2]
    //@property
    // serializableDummy = 0;

    start () {
      this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT,this.enterEndPoint,this);
    }

    enterEndPoint(){
      this.scheduleOnce(function(){

      },5);
    }

    onDisable(){
      this.node.getComponent(BoxCollider2D).off(Contact2DType.BEGIN_CONTACT,this.enterEndPoint,this);
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
