
import { _decorator, Component, Node, sys } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletStorge
 * DateTime = Tue May 03 2022 11:56:47 GMT+0800 (中国标准时间)
 * Author = Dakewang792
 * FileBasename = BulletStorge.ts
 * FileBasenameNoExtension = BulletStorge
 * URL = db://assets/Scripts/FrameWork/BulletStorge.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('BulletStorge')
export class BulletStorge {
  private _jsonData = {};
  private _markSave = false;

  private _cursor:string = null;

  static _instance:BulletStorge;

  public static instance(){
    if (!this._instance){
      this._instance = new BulletStorge();
    }
    return this._instance;
  }

  public init(){
    const bulletStorage = sys.localStorage.getItem(Constants.BulletConfig);

    if(localStorage){
      this._jsonData = JSON.parse(bulletStorage);
      this._cursor = sys.localStorage.getItem(Constants.BulletCursor);
    }

  }

  public getBulStorgeData(){
    return  this._jsonData || '';
  }

  public addBullet(list:Array<string>){

  }

  public updateCursor(cursor:string){
    this._cursor = cursor;
    sys.localStorage.setItem(Constants.BulletCursor,this._cursor);
  }

  public getCursor(){
    return this._cursor;
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
