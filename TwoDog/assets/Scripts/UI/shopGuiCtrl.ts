
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = shopGuiCtrl
 * DateTime = Sun May 08 2022 15:09:16 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = shopGuiCtrl.ts
 * FileBasenameNoExtension = shopGuiCtrl
 * URL = db://assets/Scripts/UI/shopGuiCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('shopGuiCtrl')
export class shopGuiCtrl extends Component {
    // [1]
    // dummy = '';

    @property(Node)
    shopNode:Node = null;

    @property(Node)
    getItemNode:Node = null;

    isOpenGetGui:boolean = false;

    @property(Node)
    choose_btn:Node = null;

    @property(Node)
    close_Shop:Node = null;

    @property(Node)
    close_getGui:Node = null;

    @property(Node)
    curGetItem:Node = null;

    onLoad(){

    }

    onEnable(){

    }

    start () {
        // [3]
    }

    onDisable(){

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
