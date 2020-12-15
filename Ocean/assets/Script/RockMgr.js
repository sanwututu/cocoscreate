// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rockRre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化生成
    },

    start () {

    },

    createRock(){

        for(let i = 0;i < 25; i++){
            let rockNode = cc.instantiate(this.rockRre);
            //
            rockNode.parent = this.node;
            rockNode.zIndex = 1;
        }
        //
    },



    // update (dt) {},
});
