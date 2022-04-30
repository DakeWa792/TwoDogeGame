
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Login
 * DateTime = Sat Apr 23 2022 21:54:40 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = Login.ts
 * FileBasenameNoExtension = Login
 * URL = db://assets/Scripts/Login.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Login')
export class Login extends Component {
    // [1]
    // dummy = '';

    client:any = null;
    socket:any = null;
    session:any = null;

    labTxt:Label = null;


    start () {
      console.log("Start Login")
      
      //this.labTxt = this.node.getChildByName("Label").getComponent(Label);
      
      var serverkey = "defaultkey";
      var host = "127.0.0.1";
      var port = 7350;
      const verboseLogging = true;

      var useSSL = false;
      var timeout = 7000; // ms
      this.client = new nakamajs.Client(serverkey, host, port, useSSL, timeout);
      this.client.verbose  = verboseLogging;
      this.socket = this.client.createSocket(useSSL, verboseLogging);
      var self = this;
      
      


      /* let p_:Promise<any> = this.client.authenticateCustom("test_id");
        p_.then(function (sessio) {
          self.labTxt.string = "auth success";
            console.log(" auth success");
        },
        function (error) {
          self.labTxt.string = "auth error "+error;
          console.log(" auth error "+JSON.stringify( error));
        }).catch((err) => {
          console.log(" auth exception: // "+err);
        }); */
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
