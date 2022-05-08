
import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = shopItemCtrl
 * DateTime = Sun May 08 2022 15:23:17 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = shopItemCtrl.ts
 * FileBasenameNoExtension = shopItemCtrl
 * URL = db://assets/Scripts/FrameWork/shopItemCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('shopItemCtrl')
export class shopItemCtrl extends Component {
    // [1]
    // dummy = '';

    @property([SpriteFrame])
    icon:SpriteFrame[] = [];

    start () {
        // [3]
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
