
cc.Class({
    extends: cc.Component,

    properties: {
        pipePre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //要一直生成
        // this.createPipe();
        // this.schedule(this.createPipe,2);
        // cc.data.self = this;
    },

    start () {

    },

    startCreate(){
        this.schedule(this.createPipe,1);
    },
    //关闭计时器
    stopCreate(){
        this.unschedule(this.createPipe);
    },
    createPipe(){
        //创建水管
        let pipeNode = cc.instantiate(this.pipePre);
        //
        pipeNode.parent = this.node;
        //
        pipeNode.x = cc.winSize.width+50;
        //从屏幕右外面移到左边外面
        let moveBy = cc.moveBy(2,cc.v2(-cc.winSize.width-300,0));
        //移除
        let removeSelf = cc.removeSelf();
        let seq = cc.sequence(moveBy,removeSelf);
        pipeNode.runAction(seq);
    },
    // update (dt) {},
});
