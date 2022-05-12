
import { _decorator, Component, Node, Prefab, instantiate, random, randomRange, randomRangeInt } from 'cc';
import { RunTimeData } from '../FrameWork/GameData';
import { Constants } from '../FrameWork/Constants';
import { shopItemCtrl } from '../shopItemCtrl';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
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

    curEquoedWeapTag:number = null;

    ownWeaponTagArray:number[] = new Array();

    onLoad(){

    }

    onEnable(){
      this.ownWeaponTagArray = [];
      this.ownWeaponTagArray = RunTimeData.instance().ownWeapon;
      
      this.checkAndShowAllWeapons();

      this.close_Shop.on(Node.EventType.TOUCH_START,this.closeShop,this);
      this.choose_btn.on(Node.EventType.TOUCH_START,this.watchVideo,this);

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

        let weap_icon_ctrl = weap_icon.getComponent(shopItemCtrl);
        weap_icon_ctrl.initTag(i);
      }

      this.ownWeaponTagArray.forEach(element =>{
        let weap_name = "hammerIcon"+element;
        let weap_icon = this.showItemNode.getChildByName(weap_name);

        if (weap_icon){
          let weap_icon_ctrl = weap_icon.getComponent(shopItemCtrl);
          weap_icon_ctrl.isGetWeapon(true);
        }
      })

      let euipedTag = RunTimeData.instance().euipedWeapon;
      let euiped_Name:string ="hammerIcon" +euipedTag;
      let euiped_icon = this.showItemNode.getChildByName(euiped_Name);

      if (euiped_icon){
        let weap_icon_ctrl = euiped_icon.getComponent(shopItemCtrl);
        weap_icon_ctrl.useWeapon(true);
      }
      this.curEquoedWeapTag = euipedTag;
    }

    randomUnlock(){
      if (this.ownWeaponTagArray.length >= Constants.WeaponsNum){
        CustomEventListener.dispatchEvent(Constants.EventName.TINYTIP,"你已经拥有了所有武器!");
      }

      let tpArray:number[] = new Array();

      //新建一个数组，下标对应武器tag，值均为0
      let i;
      for(i=0;i<Constants.WeaponsNum;i++){
        tpArray[i] =0;
      }

      //已经拥有的武器tag，对应下标值置为1
      this.ownWeaponTagArray.forEach(value =>{
        tpArray[value] =1;
      });

      let randomArray:number[] = new Array();
      tpArray.forEach((value,index) =>{
        randomArray.push(index);
      })

      let randomTag = randomRangeInt(0,randomArray.length-1);

      let weapon_tag:number = randomArray[randomTag]
      this.showGetItemNode(weapon_tag);
      this.unlockWeapon(weapon_tag);

    }

    unlockWeapon(tag:number){
      this.ownWeaponTagArray.push(tag);
      RunTimeData.instance().playerData.saveOwnWeapon(tag);

      let weapon_icon_name = "hammerIcon"+tag;
      let euiped_icon = this.showItemNode.getChildByName(weapon_icon_name);
      if (euiped_icon){
        let weap_icon_ctrl = euiped_icon.getComponent(shopItemCtrl);
        weap_icon_ctrl.isGetWeapon(true);
      }
    }

    showGetItemNode(tag:number){

    }

    closeGetItemNode(){
      
    }

    watchVideo(){

    }

    closeShop(){
      this.node.active = false;
    }

    onDisable(){
      if (this.getItemNode.active){
        this.getItemNode.active = false;
      }

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
