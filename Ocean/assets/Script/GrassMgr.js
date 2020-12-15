// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        grassRre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },
    createGrass(){

        for(let i = 0; i < 3; i++){
            let grassNode = cc.instantiate(this.grassRre);
            //
            grassNode.parent = this.node;
        }
        //

    }
    // update (dt) {},
});
