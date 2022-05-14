import { _decorator, Component, Node, Label,Tween, Color, Vec3 } from 'cc';
import { Constants } from '../FrameWork/Constants';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

@ccclass('tinyTipCtrl')
export class tinyTipCtrl extends Component{


  contLab:Label = null;
  isShowing:boolean = false;

  moveTween:any = null;
  colorTween:any = null;

  onLoad(){
  	this.contLab = this.node.getComponent(Label);
  }

  show(text:string){
  	if (this.isShowing){
  	  this.init();
  	}
    this.isShowing = true;
	  this.contLab.string = text;

  	this.contLab.color = new Color(0,0,0,255);
  	this.contLab.enabled = true;

  	this.moveTween = new Tween(this.node);
  	this.moveTween.to(3,{ position: new Vec3(0, 250, 0)}).call(()=>{
      this.init();
  		this.node.active = false;
  	}).start();

  	let tpC = new Color(0,0,0,255);
  	this.colorTween = new Tween(tpC);
    let tpLab = this.contLab;
  	this.colorTween.to(3,{r:255, g:255, b:255,a:50},{ "onUpdate": function (target:Color){
      tpLab.color = target; 
      }
    }).start();

  }

  init(){
  console.log("init tiny tip");
  this.moveTween.stop();
  this.colorTween.stop();

	this.isShowing = false;
	this.contLab.string = "";
	this.contLab.enabled = false;
	this.node.position = (new Vec3(0,0,0));
  this.contLab.color = new Color(255,255,255,255);
  }

}