
import { _decorator, Component, Node, find, repeat, macro, Label } from 'cc';
import { PlayerData, RunTimeData } from '../FrameWork/GameData';
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

    @property(Label)
    timeLb:Label = null;

    @property(Label)
    heightLb:Label = null;

    player:Node = null;
    startTime:number = null;
    height:number =0;

    isInGame:boolean = false;
    isPauseing:boolean = false;

    _runTimeData:RunTimeData = null;
    onEnable () {
      this.player = find("Canvas/Player");
      this._runTimeData = RunTimeData.instance();

      this.startTime = this._runTimeData.gameTime;

      this.schedule(this.saveScore,1,macro.REPEAT_FOREVER);
    }

    saveScore(){
      if (!this.player){
        return;
      }
      this.isInGame = true;
      this.updateTime();
      this.heightLb.string = `Height:${Math.floor((this.player.position.y+500)/10)}`;
      this._runTimeData.playerData.savePlayePos(this.player.position);
    }

    pauseGame(bool:boolean){
      this.isPauseing = bool;
    }

    updateTime(){
      if(!this.isInGame || this.isPauseing){
        return;
      }

      this.startTime++;
      let h = Math.floor(this.startTime/3600);
      let m = Math.floor((this.startTime - h*3600)/60);
      let s = this.startTime - h*3600 - m*60;
      this.timeLb.string = `${h<10?('0'+h):h}:${m<10?('0'+m):m}:${s<10?('0'+s):s}`;
      this._runTimeData.playerData.saveGameTime(this.startTime);
    }

    onDisable(){
      this.isInGame = false;
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
