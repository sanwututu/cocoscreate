// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        boomAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //绑定事件
        
    },
    start () {

        this.timer = 0;
    },
    
    onCollisionEnter(other,self){

        if(other.tag === 3){
            this.current = cc.audioEngine.play(this.boomAudio, false, 1);
            let removeSelf = cc.removeSelf();
            self.node.runAction(removeSelf);
            let canNode = cc.find("Canvas");
            let canNodeJS = canNode.getComponent('Game');
            let xBoom = self.node.x;
            let yBoom = self.node.y;
            canNodeJS.changeRadio();
            canNodeJS.sendBoomPos(xBoom,yBoom);
            let i = 1;
        }
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {

        this.onContact = true;
    },
    myColli(vec,speed,degree){
        
        if(!this.onContact){
            this.node.angle = -degree;
        //设置海天使刚体速度
            let rigidBody = this.node.getComponent(cc.RigidBody);
            rigidBody.linearVelocity  = cc.v2(vec.x*speed,vec.y*speed);
        }
        else{     
            // //设置海天使角度       
            //this.node.angle = degree;
        }
        
    },
    update(dt){
        if(!this.onContact){
            return;
        }
        this.timer++;
        if(this.timer > 3){
            this.onContact = false;
            this.timer = 0;
        }
    }
});
