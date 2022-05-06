
import { _decorator, Component, Node, Label, sys } from 'cc';
import { BulletStorge } from './FrameWork/BulletStorge';
import { Constants } from './FrameWork/Constants';
import { CustomEventListener } from './FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;




 
@ccclass('Login')
export class Login extends Component {
    // [1]
    // dummy = '';


    client:any = null;
    socket:any = null;
    session:any = null;
    channelID:any = null;

    authtoken:any = null;

    labTxt:Label = null;

    listCursor:any = null;
    listBullet:any = new Array();

    joinChat:boolean = false;

    chatSucess:boolean = false;

    chatConnect:number = 0;

    onLoad(){
      this.initLitsBullet();
      
      this.initClinet();
      this.initSession();
      this.initSocket();

      this.chatConnect = 0;
      this.schedule(function(){
        this.chatConnect ++;
        if (this.joinChat){
          return;
        }

        if (!this.client || !this.session || !this.socket){
          return
        }

        this.checkChat();

      },1,10)
    }

    onEnable(){
      CustomEventListener.on(Constants.EventName.upLoadScore,this.upLoadScore,this);
    }

    onDisable(){
      CustomEventListener.off(Constants.EventName.upLoadScore,this.upLoadScore,this);
    }

    initLitsBullet(){
      this.listCursor = BulletStorge.instance().getCursor();
    }

    getListBullet(){
      var self = this;
      let p_getList:Promise<any> = this.client.listChannelMessages(this.session,this.channelID,100,true,this.listCursor);
      
      p_getList.then(function(respone){
        console.log(" getListBullet success");
        console.log(respone);
        self.closeSocket();

        if (respone.cacheable_cursor){
          self.listCursor = respone.cacheable_cursor;
          BulletStorge.instance().updateCursor(self.listCursor);
        }

        if (respone.messages){
          respone.messages.forEach(element => {
            if (element.content){
              let tpString = element.content.message;

              if (tpString){
                self.listBullet.push(tpString);
              }

            }
          });
          self.updateListStorge();
        }
        
      },function(error){
        self.closeSocket();
        console.log(" auth error "+JSON.stringify( error));
      });
    }

    updateListStorge(){
      if (this.listBullet){
        BulletStorge.instance().addBullet(this.listBullet);
        this.listBullet = [];
      }
    }

    initClinet(){
      if (this.client){
        return;
      }
      
      console.log("Start Login")

      var serverkey = "defaultkey";
      var host = "127.0.0.1";
      var port = 7350;
      const verboseLogging = true;

      var useSSL = false;
      var timeout = 7000; // ms
      this.client = new nakamajs.Client(serverkey, host, port, useSSL, timeout);

    }
    
    initSession(){
      if (this.session){
        return;
      }
      
      var self = this;
      
      let p_:Promise<any> = this.client.authenticateCustom("test_id",true,"");

      p_.then(function (sess) {
        console.log(" auth success");
        sys.localStorage.setItem("nkauthtoken",sess.token);       
      },
      function (error) {

        console.log(" auth error "+JSON.stringify( error));
      }).catch((err) => {
        console.log(" auth exception: // "+err);
      });
      
      this.authtoken = sys.localStorage.getItem("nkauthtoken");
      this.session = nakamajs.Session.restore(this.authtoken);
      //this.checkChat();
      console.log(this.session);
    }

    initSocket () {
      if (this.socket){
        if (this.socket.adapter._isConnected){
          return;
        }else{
          this.socket.connect(this.session);
        }
      }  
      
      const secure = false; // enable if server is run with an SSL certificate
        const trace = false;
        const createStatus = false;    // set `true` to send presence events to subscribed users.
        this.socket = this.client.createSocket(secure, trace);
        this.socket.ondisconnect = (evt) => {
          console.log("Disconnected from the server. Event:", JSON.stringify(evt));
        };
        
        let p_socket:Promise<any> = this.socket.connect(this.session, createStatus);

        p_socket.then(
          function() {
            console.log("Socket Connected");
            //this.checkChat();
          },
          function(error) {
            console.error("connect failed:", JSON.stringify(error));
          }
        );

        console.log(this.socket);
        

    }

    closeSocket(){
      this.socket.disconnect();
      this.channelID = null;
    }

    checkSession(){
      if (this.session.isexpired(Date.now() / 1000)){
        this.session = nakamajs.Session.restore(this.authtoken);
      }
    }

    checkChat(test:string){
      this.checkSession();

      var self = this;

      if (!this.channelID){
        const persistence = true;
        const hidden = false;
        // 1 = Room, 2 = Direct Message, 3 = Group
        let p_channel:Promise<any> = this.socket.joinChat(Constants.GrounpId,1,true,false);

        p_channel.then((response)=>{
          console.log("Successfully joined channel:", response);
          self.channelID = response.id;
          self.joinChat = true;

          if (test){
            self.sendChatMessage(test);
          }else{
            self.getListBullet();
          }
          
          
        },(error)=>{
          if (this.chatConnect === 10){
            self.closeSocket();
            if (test){
              CustomEventListener.dispatchEvent(Constants.EventName.CHATFAIL);
            }
            console.error("Join channel failed!Connect try end!")
          }
          console.error("join channel failed:", JSON.stringify(error));          
        })
      }else{
        this.joinChat = true;
        if (test){
          self.sendChatMessage(test);
        }else{
          self.getListBullet();
        }
      }
    }

    chat(test:string){
      this.chatSucess = false;
      this.joinChat = false;

      console.log(this.client);
      console.log(this.session);
      console.log(this.socket);


      this.initClinet();
      this.initSession();
      this.initSocket();

      this.chatConnect = 0;
      this.schedule(function(){
        if (this.joinChat){
          return;
        }
        if (!this.client || !this.session || !this.socket){
          return
        }

        this.checkChat(test);

      },1,10)

    }

    sendChatMessage(test:string) {
      console.log("this.channelID:",this.channelID);
      var self = this;

      this.socket.writeChatMessage(this.channelID, {"message": test}).then(
          function(messageAck) {
            console.log("Successfully sent chat message:", JSON.stringify(messageAck));
            self.getListBullet();
            CustomEventListener.dispatchEvent(Constants.EventName.CHATSUCCESS);
          },
          function(error) {
            self.closeSocket();
            CustomEventListener.dispatchEvent(Constants.EventName.CHATFAIL);
            console.error("send message failed:", JSON.stringify(error));
          }
      );
    }

    upLoadScore(){

      this.initClinet();
      this.initSession();
      this.initSocket();

      let score = RunTimeData.instance().gameTime;
      let P_score:Promise<any> = this.client.writeLeaderboardRecord(this.session,"TwoDog_time",score);

      P_score.then((response)=>{
        console.log("Successfully uplaod score");
        CustomEventListener.dispatchEvent (Constants.EventName.UPLOADSUCEES,true);
      },(error)=>{
        //弹出提示文字，提示上传失败
        CustomEventListener.dispatchEvent (Constants.EventName.UPLOADSUCEES,false);
        CustomEventListener.dispatchEvent (Constants.EventName.TINYTIP,"分数上传排行榜失败，请检查您的网络后重试");
        console.error("Uplaod score failed!");
      });

    }

}


