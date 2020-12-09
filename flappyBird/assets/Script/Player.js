// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        playerBird:cc.Node,
        touchLayer:cc.Node,
        PipeMgr:cc.Node,
        gameOver:cc.Node,
        scoreNode:cc.Node,
        score:cc.Label,
        scoreL:cc.Label,//指代文本组件
        maxScoreL:cc.Label,
        grayGoal:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.num = 0;
        this.maxNum = cc.sys.localStorage.getItem('maxNum');
        if(!this.maxNum){
            //
            cc.sys.localStorage.setItem('maxNum',0);
        }
        this.maxScoreL.string =this.maxNum;
        this.scoreL.string = this.num;
    },

    start () {

    },

    onCollisionEnter(other,self){


        if(other.tag === 3){
            //加分数
            this.num++;
            this.score.string = this.num;
            this.scoreL.string = this.num;
            //判断是否为最高分
            if(this.num > this.maxNum){
                this.maxNum = this.num;
                this.maxScoreL.string = this.maxNum;
                //max发生改变
                cc.sys.localStorage.setItem('maxNum',this.maxNum);
                this.grayGoal.active = false;
            }
        }else{
            let manager = cc.director.getCollisionManager();
            manager.enabled = false;
            //
            this.touchLayer.pauseSystemEvents(true);
            //
            cc.data.isMove = false;
            //移除所有水管
            this.PipeMgr.removeAllChildren();
    
            if(other.tag === 1){
                this.node.y = -440;
            }else if(other.tag === 2){
                let moveTo = cc.moveTo(1,cc.v2(-100,-440));
                let rotateTo = cc.rotateTo(1,45);
                let spawn = cc.spawn(moveTo,rotateTo);
                this.node.runAction(spawn);
            }

            //产生碰撞，游戏结束
            this.gameOver.active = true;
            this.score.node.active = false;
            let moveTo = cc.moveTo(2,cc.v2(0,800));
            this.scoreNode.runAction(moveTo);
            //控制地板全局变量
            cc.data.stopFloor = false;
            //产生碰撞后消失
            let pipeMgrJS = this.PipeMgr.getComponent('PipeMgr');
            pipeMgrJS.stopCreate();
            //停止挥动翅膀
            let anim = this.node.getComponent(cc.Animation);
            anim.stop();
        }
        
    },
    update (dt) {

    },
});
