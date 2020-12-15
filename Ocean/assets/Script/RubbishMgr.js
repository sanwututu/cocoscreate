// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rubbishPre1:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.dir = 1;
    },

    start () {

    },
    createRubbish(){
        // for(let i = 0; i < 2; i++){
            let rubbishNode = cc.instantiate(this.rubbishPre1);
            rubbishNode.parent = this.node;
    
            rubbishNode.x = Math.floor((Math.random()*(100))+600);
            rubbishNode.y = Math.floor((Math.random()*(500))-250);
            let rubbishBody = rubbishNode.getComponent(cc.RigidBody);
            let speed = -20*this.dir;
            rubbishBody.linearVelocity  = cc.v2(speed,2);
        // }
    },
    update (dt) {
        
        let rubbish = this.node.children;
        let speed = -20*this.dir;
        for(let i = 0;i<rubbish.length;i++){
            let rubbishBody = rubbish[i].getComponent(cc.RigidBody);
            if(rubbish[i].x <-600){
                this.dir = -1;
            }
            else if(rubbish[i].x > 600){
                this.dir = 1;            
            }
            rubbishBody.linearVelocity  = cc.v2(speed,0);
        }    

    },
});
