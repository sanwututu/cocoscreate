// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        topPipe:cc.Node,
        bottomPipe:cc.Node,

        maxTopY:0,
        minTopY:0,
        maxSpace:0,
        minSpace:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.topPipe.y = Math.floor((Math.random()*(this.maxTopY - this.minTopY))+this.minTopY);
        let space = Math.floor((Math.random()*(this.maxSpace - this.minSpace))+this.minSpace);
        this.bottomPipe.y = this.topPipe.y - space;
    },

    start () {

    },

    // update (dt) {},
});
