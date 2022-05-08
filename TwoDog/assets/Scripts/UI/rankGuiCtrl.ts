
import { _decorator, Component, Node, ScrollViewComponent, find, Label, Prefab, instantiate } from 'cc';
import { Login } from '../Login';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = rankGuiCtrl
 * DateTime = Sat May 07 2022 07:02:10 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = rankGuiCtrl.ts
 * FileBasenameNoExtension = rankGuiCtrl
 * URL = db://assets/Scripts/UI/rankGuiCtrl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('rankGuiCtrl')
export class rankGuiCtrl extends Component {
    // [1]
    // dummy = '';
    @property(Prefab)
    itemPrefab:Prefab = null;

    @property(Node)
    close_btn:Node = null;

    @property(ScrollViewComponent)
    rank_scroll:ScrollViewComponent = null;

    @property(Label)
    emptyLab:Label = null;

    _login:Login = null;

    onLoad(){
      this._login = find("Login").getComponent(Login); 
    }

    onEnable () {
       this.close_btn.on(Node.EventType.TOUCH_START,this.close,this);
       
       
        let len = this._login.listBoard.length;
        if (len <= 0){
        this.emptyLab.node.active = true;
        if(this._login.getBoardFail){
            this.emptyLab.string = "网络连接失败,未能成功读取排行榜";
        }else{
            this.emptyLab.string = "空空如也，就等你来上榜了~~";
        }
       }else{
        this.emptyLab.node.active = false;

        let content = this.rank_scroll.content;
        
        content.children.forEach(element =>{
            if(Number(element.name)>=len){
                element.destroy();
            }
        });

        let i;
        for (i=0;i<len;i++){
            
            let tpName = i;
            let rankItem = content.getChildByName(tpName);
            if (!rankItem){
                rankItem = instantiate(this.itemPrefab);
                rankItem.parent = content;
                rankItem.name = i;
            }
            rankItem.children[0].getComponent(Label).string = i+1;
            rankItem.children[1].getComponent(Label).string = this._login.listBoard[i].name;
            rankItem.children[2].getComponent(Label).string = this._login.listBoard[i].score;
        }

       }
    }

    close(){
        this.node.active = false;
    }

    onDisable(){
        this.close_btn.off(Node.EventType.TOUCH_START,this.close,this);
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
