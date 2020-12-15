// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        food:cc.Node,
        radial:cc.Node,
        
        maxY:0,
        minY:0,
        maxX:0,
        minX:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.food.y = Math.floor((Math.random()*(this.maxY - this.minY))+this.minY);
        this.radial.y = this.food.y;

        this.food.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.radial.x = this.food.x;

        let rotateBy = cc.rotateBy(1.5, -360);
        let repeat = cc.repeatForever(rotateBy);
        this.food.runAction(repeat);
        this.radial.runAction(repeat);
    },

    getBoundingBox(){

        let rc = this.food.getBoundingBoxToWorld();
        return rc;
    },
    start () {

    },

    // update (dt) {},
});
