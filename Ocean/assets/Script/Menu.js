// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rockMgrNode:cc.Node,
        grassMgrNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        let rockMgrJS = this.rockMgrNode.getComponent('RockMgr');
        rockMgrJS.createRock();
        let grassMgrJS = this.grassMgrNode.getComponent('GrassMgr');
        grassMgrJS.createGrass();
    },

    start () {

    },

    startGame(){
        cc.director.loadScene('GameScene');
    },
    // update (dt) {},
});
