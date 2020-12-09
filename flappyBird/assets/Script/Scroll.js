// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    


        floorNode1:cc.Node,
        floorNode2:cc.Node,
        //
        speed:0,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {


    },

    update (dt) {

        //
        if(cc.data.stopFloor){
            this.floorNode1.x += this.speed * dt;
            this.floorNode2.x += this.speed * dt;
            //地板移出重置
            let width1 = this.floorNode1.width;
            let width2 = this.floorNode2.width;

            if(this.floorNode1.x <= -width1){
                //重置地板1坐标，使其连在地板二后面
                this.floorNode1.x=this.floorNode2.x+this.floorNode2.width;
            }
            if(this.floorNode2.x <= -width2){
                //重置地板1坐标，使其连在地板二后面
                this.floorNode2.x=this.floorNode1.x+this.floorNode1.width;
            }
        }
    },
});
