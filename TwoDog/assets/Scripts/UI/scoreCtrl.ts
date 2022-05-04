
import { _decorator, Component, Node, find, repeat, macro } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = scoreCtrl
 * DateTime = Wed May 04 2022 09:42:38 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = scoreCtrl.ts
 * FileBasenameNoExtension = scoreCtrl
 * URL = db://assets/Scripts/UI/scoreCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('scoreCtrl')
export class scoreCtrl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    player:Node = null;

    onEnable () {
      this.player = find("Canvas/Player");

      this.schedule(this.saveScore,1,macro.REPEAT_FOREVER);
    }

    saveScore(){
      
    }

    onDisable(){
      this.unschedule(this.saveScore);
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
