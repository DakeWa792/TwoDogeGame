
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = bulletTipCtrl
 * DateTime = Fri May 06 2022 06:38:02 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = bulletTipCtrl.ts
 * FileBasenameNoExtension = bulletTipCtrl
 * URL = db://assets/Scripts/UI/bulletTipCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('bulletTipCtrl')
export class bulletTipCtrl extends Component {
    // [1]
    // dummy = '';

    @property(Node)
    return_Btn:Node = null;

    @property(Node)
    agree_Btn:Node = null;

    onEnable () {
      
    }

    close(){
      this.node.active = false;
    }
    
    onDisable(){

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
