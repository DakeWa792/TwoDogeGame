
import { _decorator, Component, Node, Vec2 } from 'cc';
import { CameraCtrl } from './CameraCtrl';
import { Configuration } from './FrameWork/Configuration';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { PlayerData, RunTimeData } from './FrameWork/GameData';
import { InGameScreen } from './InGameScreen';
import { PlayerCtrl } from './PlayerCtrl';
import { StartScreen } from './StartScreen';
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
      CustomEventListener.on(Constants.EventName.RESTARTGAME,this.restartGame,this);
      CustomEventListener.on(Constants.EventName.ENDGAME,this.endGame,this);
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
      let startPos = this._runtimeData.curPosition;

      this.player.active = true;
      this.sceneNode.active = true;
      this.seaNode.active = true;
      this.showBullNode.active = true;

      this.start_Screen.node.active = false;
      this.inGame_Screen.node.active = true;
      
      this.playerCtrl.eneterGame(startPos);
      this.cameraCtrl.enterGame(startPos);
      
      this.playerCtrl.openOperate();
    }

    restartGame(){
      //重载分数，重载存储数据

      //重载看视频保存点数据


    }
    //进入开始界面（读取数据）

    endGame(){
      this.playerCtrl.closeOperate();
      this.cameraCtrl.closeUpdate();
    }

    // 进入游戏(玩家传送到位，镜头传送到位)


    //退出游戏，回到开始界面
    
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
