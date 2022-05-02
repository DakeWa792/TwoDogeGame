
import { _decorator, Component, Node, Label, sys } from 'cc';
import { Constants } from './FrameWork/Constants';
const { ccclass, property } = _decorator;




 
@ccclass('Login')
export class Login extends Component {
    // [1]
    // dummy = '';


    client:any = null;
    socket:any = null;
    session:any = null;
    channel:any = null;

    authtoken:any = null;

    labTxt:Label = null;

    start(){
      this.initClinet();
      this.initSession();
      this.initSocket();
    }

    initClinet(){
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
      console.log(this.session);
    }

    initSocket () {
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
                },
                function(error) {
                  console.error("connect failed:", JSON.stringify(error));
                }
        );

    }

    checkSession(){
      if (this.session.isexpired(Date.now() / 1000)){
        this.session = nakamajs.Session.restore(this.authtoken);
      }
    }

    checkNetWork(){
      let connect = true;
      if (!this.client || !this.session || !this.socket){
        connect = false;
      }
      return connect;
    }

    checkChat(){
      if (!this.channel){
        this.checkSession();
        
        const persistence = true;
        const hidden = false;
        // 1 = Room, 2 = Direct Message, 3 = Group
        let p_channel:Promise<any> = this.socket.joinChat(Constants.GrounpId,3,false,false);

        p_channel.then(()=>{
          return true;
        },()=>{
          return false;
        })
      }
    }

}


