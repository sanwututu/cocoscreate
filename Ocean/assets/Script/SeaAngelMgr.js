// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
        seaAngelPre:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {

    },

    start () {

    },
    createAngel(pos){

            let seaAngelNode = cc.instantiate(this.seaAngelPre);
            
            seaAngelNode.parent = this.node;
            seaAngelNode.x = pos.x + 5;
            seaAngelNode.y = pos.y + 5;
    },
    // update (dt) {},
});
