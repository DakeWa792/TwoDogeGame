
import { _decorator, Component, Node, input, Input, EventMouse, EventTouch, Vec3, UITransform, Camera } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = postion
 * DateTime = Sat Apr 30 2022 11:48:57 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = postion.ts
 * FileBasenameNoExtension = postion
 * URL = db://assets/Scripts/postion.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('postion')
export class postion extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    isOffset:Boolean = false;
    spNode:Node = null;
    caNode:Node = null;
    camera:Camera = null;

    canTransform:UITransform = null;

    start () {
      
    }
    onEnable(){
      this.canTransform = this.node.parent.getComponent(UITransform);
      
      this.spNode = this.node.parent.getChildByName("Sprite");
      this.caNode  = this.node.parent.getChildByName("Camera");
      this.camera = this.caNode.getComponent(Camera);

      input.on(Input.EventType.MOUSE_MOVE,this.moveMouse,this);
      this.spNode.on(Node.EventType.TOUCH_START,this.switch,this);
    }
    moveMouse(event:EventMouse){
      let uiPos = event.getUILocation();
      console.log(uiPos);
      console.log(new Vec3((uiPos.x - 480 + this.caNode.worldPosition.x),(uiPos.y - 320 + this.caNode.worldPosition.y),0));
      console.log(this.node.worldPosition);
    }    
    // update (deltaTime: number) {
    switch(){
      if (this.isOffset){
        this.caNode.position = new Vec3(0,0,1000);
        this.isOffset = false;
      }else{
        this.caNode.position = new Vec3(480,0,1000);
        this.isOffset = true;
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
