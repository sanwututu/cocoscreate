// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        topRock:cc.Node,
        bottomRock:cc.Node,
        
        maxTopY:0,
        minTopY:0,
        maxBottomY:0,
        minBottomY:0,
        maxX:0,
        minX:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //Math.floor(a);舍小数点，也可以用parseInt
        
        this.topRock.y = Math.floor((Math.random()*(this.maxTopY - this.minTopY))+this.minTopY);
        this.bottomRock.y =  Math.floor((Math.random()*(this.maxBottomY - this.minBottomY))+this.minBottomY);

        this.topRock.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        this.bottomRock.x = Math.floor((Math.random()*(this.maxX - this.minX))+this.minX);
        if(this.topRock.y < 300){
            
            this.topRock.y = Math.floor((Math.random()*(100))+10);
            if(this.topRock.x < 0){
                this.topRock.y = Math.floor((Math.random()*(50))+10);
                this.topRock.x = Math.floor((Math.random()*(-100))-550);
                return;
            }
            this.topRock.x = Math.floor((Math.random()*(50))+550);
        }
        if(this.bottomRock.y > -300){
            this.bottomRock.y = Math.floor((Math.random()*(-100))+10);
            if(this.bottomRock.x < 0){
                
                this.bottomRock.x = Math.floor((Math.random()*(-100)-550));
                return;
            }
            this.bottomRock.x = Math.floor((Math.random()*(50))+550);
        }
        this.topRock.setScale(Math.floor((Math.random()*2)));
        this.bottomRock.setScale(Math.floor((Math.random()*1.5) + 0.5));
        this.topRock.angle = Math.floor(Math.random()* 180);
        this.bottomRock.angle = Math.floor(Math.random()* 180);

        

    },

    getBoundingBoxTop(){
        let rc = this.topRock.getBoundingBoxToWorld();
        return rc;
    },

    getBoundingBoxBottom(){
        let rc = this.bottomRock.getBoundingBoxToWorld();
        return rc;
    },

    start () {

    },

    // update (dt) {},
});
