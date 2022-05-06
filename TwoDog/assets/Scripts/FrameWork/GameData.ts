import { _decorator, Component, Node, Vec2, Vec3 } from "cc";
import { Configuration } from "./Configuration";
import { Constants } from "./Constants";
const { ccclass, property } = _decorator;

@ccclass("RunTimeData")
export class RunTimeData {
    public playerData: PlayerData = null!;
    static _instance: RunTimeData = null!;
    public static instance() {
        if (!this._instance) {
            this._instance = new RunTimeData();
        }

        return this._instance;
    }

    constructor() {
        this.playerData = PlayerData.instance();
    }

    public currProgress = 0;
    public maxProgress = 0;
    public isTakeOver = true;
    public money = 0;
    get curPosition() {
        return this.playerData.playerInfo.position;
    }

    get gameTime() {
        return this.playerData.playerInfo.time;
    }
    get revivePoint(){
        return this.playerData.playerInfo.revivePoint;
    }
}

interface IPlayerInfo {
    position: Vec2,
    time: number,
}

@ccclass("PlayerData")
export class PlayerData {
    public playerInfo: IPlayerInfo = {position: new Vec2(-110,-115), time: 0, revivePoint:1};

    static _instance: PlayerData = null!;
    public static instance() {
        if (!this._instance) {
            this._instance = new PlayerData();
        }

        return this._instance;
    }

    public loadFromCache(){
        const info = Configuration.instance().getConfigData(Constants.PlayerConfigID);
        if(info){
            this.playerInfo = JSON.parse(info);
        }
    }

    public saveGameTime(t:number){
      this.playerInfo.time = t;
    }

    public savePlayePos(pos:Vec3){
      this.playerInfo.position = new Vec2(pos.x,pos.y);
    }
    
    public saverevivePoint(num:number){
        if(num>this.playerInfo.revivePoint){
          this.playerInfo.revivePoint = num;
        }   
    }

    public savePlayerInfoToCache(){
        const data = JSON.stringify(this.playerInfo);
        Configuration.instance().setConfigData(Constants.PlayerConfigID, data);
    }

    public recoverPlayerInfo(){
        this.playerInfo = {position: new Vec2(-110,-115), time: 0, revivePoint:1};
        const data = JSON.stringify(this.playerInfo);
        Configuration.instance().setConfigData(Constants.PlayerConfigID, data);
    }
}
