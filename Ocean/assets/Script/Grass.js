// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        strand:cc.Node,
        branches:cc.Node,
        bush:cc.Node,
        chain:cc.Node,

        maxTopY:0,
        minTopY:0,
        maxBottomY:0,
        minBottomY:0,
        maxX:0,
        minX:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //
        this.branches.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.branches.y = Math.floor((Math.random()*(this.maxTopY - this.minTopY))+this.minTopY)-10;
        this.branches.setScale(0.3);
        //
        this.bush.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.bush.y = Math.floor((Math.random()*(this.maxBottomY - this.minBottomY))+this.minBottomY)+50;
        this.bush.setScale(0.3);
        //
        this.strand.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.strand.y = Math.floor((Math.random()*(this.maxBottomY - this.minBottomY))+this.minBottomY)+50;
        this.strand.setScale(0.3);
        //
        this.chain.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.chain.y = Math.floor((Math.random()*(this.maxBottomY - this.minBottomY))+this.minBottomY);
        this.chain.setScale(0.3);
    },

    start () {
    },

    // update (dt) {},
});
