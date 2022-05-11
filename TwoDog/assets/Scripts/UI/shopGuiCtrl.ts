
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Constants } from '../FrameWork/Constants';
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
    //商店界面
    @property(Node)
    shopNode:Node = null;

    //获得物品界面
    @property(Node)
    getItemNode:Node = null;

    //展示物品的layout界面
    @property(Node)
    showItemNode:Node = null;

    //展示的prefab
    @property(Prefab)
    shopChuizi:Prefab = null;

    isOpenGetGui:boolean = false;

    //随机解锁按钮
    @property(Node)
    choose_btn:Node = null;

    //关闭商店界面
    @property(Node)
    close_Shop:Node = null;

    //关闭获得物品界面
    @property(Node)
    close_getGui:Node = null;

    //当前获得物品
    @property(Node)
    curGetItem:Node = null;

    onLoad(){

    }

    onEnable(){

    }

    start () {
        // [3]
    }

    checkAndShowAllWeapons(){
      let i,j;
      for (i=0;i<Constants.WeaponsNum;i++){
        let weap_name = "hammerIcon"+i;
        let weap_icon = this.showItemNode.getChildByName(weap_name);
        if (!weap_icon){
          weap_icon = instantiate(this.shopChuizi);
          weap_icon.name = "hammerIcon"+i;
          weap_icon.parent =this.showItemNode;
        }
      }

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
