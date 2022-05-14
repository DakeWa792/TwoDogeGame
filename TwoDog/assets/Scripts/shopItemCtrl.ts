
import { _decorator, Component, Node, SpriteFrame, Sprite, TangentWeightMode } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
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

    isCanClick:boolean = true;

    onLoad () {
      
    }

    onEnable(){
      this.node.on(Node.EventType.TOUCH_START,this.beClick,this);
    }

    onDisable(){
      this.node.off(Node.EventType.TOUCH_START,this.beClick,this);
    }

    initTag(tag:number){
      this.weaponTag = tag;
      this.iconSpr.spriteFrame = this.icon[tag];
      this.useNode.active = false;
      this.getNode.active = false;
      this.lockNode.active = true;
    }

    isGetWeapon(isGet:boolean){
      if (isGet){
        this.getNode.active = true;
        this.lockNode.active = false;
        this.isUnlock = true;
      }else{
        this.getNode.active = false;
        this.lockNode.active = true;
      }
    }

    useWeapon(bool:boolean){
      this.useNode.active = bool;
      this.isEnquiped = bool;
    }

    canClick(bool:boolean){
      this.isCanClick = bool;
    }
    
    beClick(){
      console.log("can be click");
      if (this.isCanClick){
        console.log("isCanClick");
        if (!this.isUnlock){
          CustomEventListener.dispatchEvent(Constants.EventName.TINYTIP,"你无法装备尚未解锁的锤子");
        }else{
          if(this.isEnquiped){
            CustomEventListener.dispatchEvent(Constants.EventName.TINYTIP,"无法取消装备,你想空手爬么");
          }else{
            CustomEventListener.dispatchEvent(Constants.EventName.USEWEAPICON,this.weaponTag);
          }
        } 
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
