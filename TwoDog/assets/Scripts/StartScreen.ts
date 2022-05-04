
import { _decorator, Component, Node } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = StartScreen
 * DateTime = Wed May 04 2022 14:48:34 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = StartScreen.ts
 * FileBasenameNoExtension = StartScreen
 * URL = db://assets/Scripts/StartScreen.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('StartScreen')
export class StartScreen extends Component {
    // [1]
    // dummy = '';
    @property(Node)
    start_Game_Btn:Node = null;

    @property(Node)
    reStart_Game_Btn:Node = null;

    @property(Node)
    show_Rank_Btn:Node = null;

    @property(Node)
    show_Shop_Btn:Node = null;

    @property(Node)
    collect_Game_Btn:Node = null;

    @property(Node)
    weapon_Shop_Gui:Node = null;

    curNode:Node = null;

    onLoad(){

    }

    onEnable(){
      this.start_Game_Btn.on(Node.EventType.TOUCH_START,this.startGame,this);
      this.reStart_Game_Btn.on(Node.EventType.TOUCH_START,this.restartGame,this);
      this.show_Rank_Btn.on(Node.EventType.TOUCH_START,this.showRankGui,this);
      this.show_Shop_Btn.on(Node.EventType.TOUCH_START,this.showShopGui,this);
      this.collect_Game_Btn.on(Node.EventType.TOUCH_START,this.collectGame,this);
    }

    start () {
        // [3]
    }

    startGame(){
      CustomEventListener.dispatchEvent(Constants.EventName.ENTERGAME);
    }

    restartGame(){
      CustomEventListener.dispatchEvent(Constants.EventName.SHOWCHOOSETIP,"重新开始将丢失当前进度，是否确认？",Constants.EventName.RESTARTGAME);
    }

    showRankGui(){

    }

    showShopGui(){
      if (this.curNode){
        this.curNode.active = false;
      }
      
      this.curNode = this.weapon_Shop_Gui;

      this.weapon_Shop_Gui.active = true;
    }

    collectGame(){

    }

    onDisable(){
      this.start_Game_Btn.off(Node.EventType.TOUCH_START,this.startGame,this);
      this.reStart_Game_Btn.off(Node.EventType.TOUCH_START,this.restartGame,this);
      this.show_Rank_Btn.off(Node.EventType.TOUCH_START,this.showRankGui,this);
      this.show_Shop_Btn.off(Node.EventType.TOUCH_START,this.showShopGui,this);
      this.collect_Game_Btn.off(Node.EventType.TOUCH_START,this.collectGame,this);
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
