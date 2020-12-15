// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        foodRre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化生成
    },

    start () {

    },

    createFood(){

            let foodNode = cc.instantiate(this.foodRre);
            //
            foodNode.parent = this.node;
            foodNode.zIndex = -1;
        //
    },



    // update (dt) {},
});
