import { _decorator, Component, Node, Label,Tween } from 'cc';
import { Constants } from '../FrameWork/Constants';
import { CustomEventListener } from '../FrameWork/CustomEventListener';
const { ccclass, property } = _decorator;

@ccclass('tinyTipCtrl')
export class tinyTipCtrl extends Component{


  contLab:Label = null;
  isShowing:boolean = false;

  onLoad(){
  	this.contLab = this.node.getComponent(Label);
  }

  show(text:string){
  	if (this.isShowing){
  	  this.init();
  	}
	
	this.contLab.string = text;

  	this.contLab.color = new Color(0,0,0,255);
  	this.contLab.Enabled = true;

  	let moveTween = new Tween(this.node);
  	moveTween.to(3,{ position: new Vec3(0, 75, 0)}).call(()=>{
  		this.init();
  		this.node.active = false;
  	}).start();

  	let tpC = new Color(0,0,0,255);
  	let colorTween = new Tween(tpC);
  	colorTween.to(3,{r:255, g:255, b:255,a:0},{ "onUpdate": function (target) { this.contLab.color = target; }})start();

  }

  init(){
	this.isShowing = false;
	this.contLab.string = "";
	this.contLab.Enabled = false;
	this.node.setPosition(new Vec3(0,0,0));
  }

}