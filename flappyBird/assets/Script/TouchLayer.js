// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        readyNode:cc.Node,
        tapNode:cc.Node,
        playerNode:cc.Node,
        pipeMgrNode:cc.Node,
        score:cc.Node,

        accel:0,
        speed:0,
        riseSpeed:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //定义一个布尔值，控制update
        this.isMove = false;
    
        cc.data.isMove = false;
        this.birdMove();

        let manager = cc.director.getCollisionManager();
        //打开碰撞系统
        manager.enabled = true;
        //
        // manager.enabledDebugDraw = true;
        // //
        // manager.enabledDrawBoundingBox = true;
    },

    start () {
        //打开一个鼠标事件

        //this.node.on(参数1：事件名称，参数2：回调函数，this);
        this.node.on('touchstart',this.onTouchStart,this);
        this.node.on('touchend',this.onTouchEnd,this);
    },

    onTouchStart(event){
        //小鸟动 速度》0
        this.speed = this.riseSpeed;
    },
    //触摸结束的时候执行
    onTouchEnd(event){
        //触摸结束之后，两张图片消失
        this.readyNode.active = false;
        this.tapNode.active = false;
        this.score.active = true;
        //正式开始游戏，这时候才可以生产水管
        this.playerNode.stopAllActions();


        //
        let pipeMgrJS = this.pipeMgrNode.getComponent('PipeMgr');
        pipeMgrJS.startCreate();
        cc.data.isMove = true;
    },
    
    birdMove(){
        //
        let moveByUp = cc.moveBy(0.3,cc.v2(0,25));
        let moveByDown = cc.moveBy(0.3,cc.v2(0,-25));
        let seq = cc.sequence(moveByUp,moveByDown);
        let repeat = cc.repeatForever(seq);
        this.playerNode.runAction(repeat);

    },
    update (dt) {
        
        if (cc.data.isMove) {
            //已知加速度和初始速度  求当前时间的速度？     vt = v0 + at;
            //利用加速度求某一时刻的速度

            this.speed += this.accel * dt;
            this.playerNode.y += this.speed * dt;
        }

        if(this.speed < 0){
            //
            this.playerNode.rotation += 90*dt;
            if(this.playerNode.rotation >= 90*dt){

                this.playerNode.rotation = 90;
            }
        }
        if(this.speed > 0){
            //
            this.playerNode.rotation = -45;
        }
    },
});
