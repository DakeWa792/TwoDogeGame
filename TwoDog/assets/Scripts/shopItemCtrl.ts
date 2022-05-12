
import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
import { RunTimeData } from './FrameWork/GameData';
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

    //展示icon的Sprite
    @property(Sprite)
    iconSpr:Sprite = null;

    //未解锁的锁定标志
    @property(Node)
    lockNode:Node = null;

    //已解锁的解锁标志
    @property(Node)
    getNode:Node = null;

    //已装备的装备标志
    @property(Node)
    useNode:Node = null;

    isUnlock:boolean = false;
    weaponTag:number = null;
    isEnquiped:boolean = false;

    onLoad () {
      
    }

    initTag(tag:number){
      this.iconSpr.spriteFrame = this.icon[tag];
      this.useNode.active = false;
    }

    isGetWeapon(isGet:boolean){
      if (isGet){
        this.getNode.active = true;
        this.lockNode.active = false;
      }else{
        this.getNode.active = false;
        this.lockNode.active = true;
      }
    }

    useWeapon(bool:boolean){
      this.useNode.active = bool;
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
