
import { _decorator, Component, Node, Vec2, UITransform, Vec3 } from 'cc';
import { CameraCtrl } from './CameraCtrl';
import { Configuration } from './FrameWork/Configuration';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { PlayerData, RunTimeData } from './FrameWork/GameData';
import { InGameScreen } from './InGameScreen';
import { PlayerCtrl } from './PlayerCtrl';
import { StartScreen } from './StartScreen';
import { scoreCtrl } from './UI/scoreCtrl';
const { ccclass, property } = _decorator;

const startPos = new Vec2(-110,-115);

@ccclass('Main')
export class Main extends Component {
    // [1]
    // dummy = '';

    player:Node = null;
    playerCtrl:PlayerCtrl = null;

    main_camear:Node = null;
    cameraCtrl:CameraCtrl = null;

    @property(StartScreen)
    start_Screen:StartScreen = null;

    @property(InGameScreen)
    inGame_Screen:InGameScreen = null;

    @property(Node)
    saveNode:Node = null;

    @property(scoreCtrl)
    score_Ctrl:scoreCtrl = null;

    sceneNode:Node = null;
    seaNode:Node = null;
    showBullNode:Node = null;



    playerPosition:Vec2 = startPos;

    private _runtimeData: RunTimeData = null!;

    onLoad () {
      this.player = this.node.getChildByName("Player");
      this.playerCtrl = this.player.getComponent(PlayerCtrl);

      this.main_camear = this.node.getChildByName("Camera");
      this.cameraCtrl = this.main_camear.getComponent(CameraCtrl);

      this.sceneNode = this.node.getChildByName("Scene");
      this.seaNode = this.node.getChildByName("Sea");
      this.showBullNode = this.node.getChildByName("ShowScreen");

    }

    onEnable(){
      CustomEventListener.on(Constants.EventName.ENTERGAME,this.enterGame,this);
      CustomEventListener.on(Constants.EventName.PAUESEGAME,this.pauseGame,this);
      CustomEventListener.on(Constants.EventName.RESTARTGAME,this.restartGame,this);
      CustomEventListener.on(Constants.EventName.ENDGAME,this.endGame,this);
    }

    onDisable(){
      CustomEventListener.off(Constants.EventName.ENTERGAME,this.enterGame,this);
      CustomEventListener.off(Constants.EventName.PAUESEGAME,this.pauseGame,this);
      CustomEventListener.off(Constants.EventName.RESTARTGAME,this.restartGame,this);
      CustomEventListener.off(Constants.EventName.ENDGAME,this.endGame,this);
    }

    start(){
      this.initGame();
    }

    initGame(){
      this.start_Screen.node.active = true;

      this.player.active = false;
      this.sceneNode.active = false;
      this.seaNode.active = false;
      this.showBullNode.active = false;
      
      this._runtimeData = RunTimeData.instance();
      Configuration.instance().init();
      PlayerData.instance().loadFromCache();

    }

    enterGame(){
      
      let tpStartPos = this._runtimeData.curPosition;

      this.player.active = true;
      

      this.sceneNode.active = true;
      this.seaNode.active = true;
      this.showBullNode.active = true;

      this.start_Screen.node.active = false;
      this.inGame_Screen.node.active = true;
      
      this.playerCtrl.eneterGame(tpStartPos);
      this.cameraCtrl.enterGame(tpStartPos);
      
      this.playerCtrl.openOperate();
      this.score_Ctrl.pauseGame(false);
    }

    restartGame(){
      
      this.start_Screen.node.active = true;
      this.inGame_Screen.node.active = false;
      this.playerCtrl.node.active = false;

      this.sceneNode.active = false;
      this.seaNode.active = false;
      this.showBullNode.active = false;


      this.playerCtrl.restartGame(startPos);
      this.cameraCtrl.leaveGame();

      PlayerData.instance().recoverPlayerInfo();

    }
    //游戏失败，暂停游戏
    pauseGame(){
      this.score_Ctrl.pauseGame(true);
      this.playerCtrl.closeOperate();
      this.cameraCtrl.closeUpdate();
    }

    //视频观看完成，继续游戏
    revivalGame(){
      let pos:Vec2|Vec3 = startPos;
      let saveTag = RunTimeData.instance().revivePoint;

      if (saveTag>0){
        let tpPos = this.saveNode[saveTag-1].worldPosition;
        pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(tpPos);
      }

      this.playerCtrl.restartGame(pos);
      this.cameraCtrl.enterGame(pos);
      
      CustomEventListener.dispatchEvent (Constants.EventName.CLOSEFAILGUI);
      this.playerCtrl.openOperate();
      this.score_Ctrl.pauseGame(false);
    }

    endGame(){
      this.playerCtrl.closeOperate();
      this.cameraCtrl.closeUpdate();
      CustomEventListener.dispatchEvent (Constants.EventName.SHOWWINGUI);
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
