
import { _decorator, Component, Node, Button, Label, EditBox, Scene, find } from 'cc';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
import { Login } from './Login';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletCtrl
 * DateTime = Mon May 02 2022 07:28:07 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = BulletCtrl.ts
 * FileBasenameNoExtension = BulletCtrl
 * URL = db://assets/Scripts/BulletCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('BulletCtrl')
export class BulletCtrl extends Component {
    // [1]
    // dummy = '';

    isShowBullet:boolean = null;

    canEdit:boolean = false;

    @property(Button)
    switchBtn:Button = null;
    
    editBox:EditBox = null;
    sendBtn:Button = null;

    login:Login = null;

    onLoad(){
      this.login = find("Login").getComponent(Login);
      
      this.editBox = this.node.getChildByName("EditBox").getComponent(EditBox);
      this.sendBtn = this.node.getChildByName("SendBtn").getComponent(Button);
      this.initEditBox();
    }

    onEnable () {
      this.isShowBullet = false;
      this.showBullet();

      this.switchBtn.node.on(Button.EventType.CLICK,this.showBullet,this);
      this.sendBtn.node.on(Button.EventType.CLICK,this.sendMessage,this);
      CustomEventListener.on(Constants.EventName.UNLOCKBULLET,this.unlockBullet,this);
    }

    onDisable(){
      this.switchBtn.node.off(Button.EventType.CLICK,this.showBullet,this);
      this.sendBtn.node.off(Button.EventType.CLICK,this.sendMessage,this);
    }

    showBullet(){
      let lab = this.switchBtn.node.children[0].getComponent(Label);
      if (!this.isShowBullet){
        this.isShowBullet = true;
        lab.string = "关弹幕";
        this.editBox.node.active = true;
        this.sendBtn.node.active = true;
      }else{
        this.isShowBullet = false;
        lab.string = "开弹幕";
        this.editBox.node.active = false;
        this.sendBtn.node.active = false;
      }
    }
    
    unlockBullet(){
      this.canEdit = true;
      this.initEditBox();
    }

    initEditBox(){
      if (!this.canEdit){
        this.editBox.node.children[1].getComponent(Label).string = "视频解锁";
      }else{
        this.editBox.node.children[1].getComponent(Label).string = "说点什么...";
      }
    }

    sendMessage(){
      if (!this.canEdit){
        CustomEventListener.dispatchEvent(Constants.EventName.SHOWCHOOSETIP,"是否看视频解锁发送弹幕功能",Constants.EventName.UNLOCKBULLET);
      }else{
        let textLb = this.editBox.node.children[0].getComponent(Label);
        if (textLb.string == ""){
          CustomEventListener.dispatchEvent(Constants.EventName.CONFIRMTIP,"输入内容为空，请重新输入");
        } else{
          if (!this.login.checkNetWork()){
            console.error("当前没有网络连接！");
            CustomEventListener.dispatchEvent(Constants.EventName.CONFIRMTIP,"当前没有网络连接！");
            return;
          }

          if (this.login.checkChat){
            let P_sendChat:Promise<any> = this.login.socket.writeChatMessage(Constants.GrounpId,"测试聊天是否成功");
            
            P_sendChat.then(function(){
              textLb.string == "";
              console.log("发送聊天信息成功！！！！！");
            },function(error){
              console.log(" P_sendChat rject "+JSON.stringify( error));
            }).catch((err) => {
             console.log(" P_sendChat erro: // "+err);
           });
            
          }
          //let p_chat:Promise<boolean> = this.login.chat(textLb.string);
          


        }
      }
    }


    spawnBullet(){

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
