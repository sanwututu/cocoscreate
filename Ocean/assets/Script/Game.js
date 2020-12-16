// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bloopAudio: {
            default: null,
            type: cc.AudioClip
        },
        cursor:cc.Node,
        whale:cc.Node,
        rockMgrNode:cc.Node,
        grassMgrNode:cc.Node,
        foodMgrNode:cc.Node,
        seaAngelMgrNode:cc.Node,
        rubbishMgrNode:cc.Node,
        boomMgrNode:cc.Node,
        mainCamera:cc.Node,
        score:cc.Label,
        radio:cc.Label,
        mScore:cc.Label,
        gameOver:cc.Node,
        addScore:cc.Node,
        speed:0,
        speedWhale:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    this.dir = 1;
    this.foodDistance = 0;  
    this.time = 0;
    this.boolRubbish = false;
    //绑定鼠标事件
    this.node.on(cc.Node.EventType.MOUSE_MOVE,this.mouseFun,this);
    // cc._canvas.style.cursor =null;
    //最高分
    this.maxScore = cc.sys.localStorage.getItem('maxScore');
        if(!this.maxScore){
            //
            cc.sys.localStorage.setItem('maxScore',0);
        }
        this.mScore.string = this.maxScore;
    //开启物理组件
    cc.director.getPhysicsManager().enabled=true;
    cc.director.getPhysicsManager().gravity = cc.v2();
    //打开碰撞组件
    let manager = cc.director.getCollisionManager();
    //打开碰撞系统
    manager.enabled = true;
    //包围盒
    // manager.enabledDebugDraw = true;
    // manager.enabledDrawBoundingBox = true;

    let foodMgrJS = this.foodMgrNode.getComponent('FoodMgr');
    foodMgrJS.createFood();
    this.reCreateFood();
    let rubbishMgrJS = this.rubbishMgrNode.getComponent('RubbishMgr');
    rubbishMgrJS.createRubbish();
    let rockMgrJS = this.rockMgrNode.getComponent('RockMgr');
    rockMgrJS.createRock();
    let grassMgrJS = this.grassMgrNode.getComponent('GrassMgr');
    grassMgrJS.createGrass();
    let seaAngelMgrJS = this.seaAngelMgrNode.getComponent('SeaAngelMgr');
    seaAngelMgrJS.createAngel(this.cursor.getPosition());
    
    },

    start () {

    },
    mouseFun(event){
        // 
        //cc.game.canvas.style.cursor = "none";
        //console.log('鼠标移动了');
        var pos=new cc.Vec2(event.getLocationX(),event.getLocationY());
        //转换为UI坐标
        pos=this.node.convertToNodeSpaceAR(pos);
        let cameraPos = this.mainCamera.getPosition();
        let vecCamera = pos.sub(cameraPos);
        vecCamera.normalizeSelf();
        //给要移动的物体赋值
        //只移动x轴,Y轴同理
        
        // this.mainCamera.x = vecCamera.x*this.cameraSpeed;
        // this.mainCamera.x = vecCamera.y*this.cameraSpeed;
        let camera =this.mainCamera.getComponent(cc.Camera)
        let mult =camera.zoomRatio;

        this.cursor.x = pos.x/mult + cameraPos.x;
        this.cursor.y = pos.y/mult + cameraPos.y;

        this.mainCamera.x = pos.x/mult;
        this.mainCamera.y = pos.y/mult;    
        
        
    },
    changeRadio(){
        
        this.radio.string = 1;
    },
    sendBoomPos(posX,posY){

        let boomMgrJS = this.boomMgrNode.getComponent('BoomMgr');
        boomMgrJS.createBoom(posX,posY);
    },
    reStartScene(){
        cc.director.loadScene('GameScene');
    },
    reCreateFood(){ 
        
        let foodMgrJS = this.foodMgrNode.getComponent('FoodMgr');
        let food = this.foodMgrNode.children;
        let foodJS = food[0].getComponent('Food');
        let rcFood = foodJS.getBoundingBox();
        //
        let rockNode = this.rockMgrNode.children;
        //判断食物是否与岩石包围盒重合
        for(let i = 0; i < rockNode.length ;i++){
            let rockJS = rockNode[i].getComponent('Rock');
            let rcRockTop = rockJS.getBoundingBoxTop();
            let rcRockBottom = rockJS.getBoundingBoxBottom();
            let intersect = false;
            if(rcRockTop.intersects(rcFood) || rcRockBottom.intersects(rcFood)){
                intersect = true;
                this.foodMgrNode.removeAllChildren();
                
            }
            if(intersect){
                foodMgrJS.createFood();
                // this.reCreateFood();
                return;
            }
        }
    },
    whaleControl(dt){
        //鲸鱼速度方向控制
        let whalePos = this.whale.getPosition();
        
        let cursorPos = this.cursor.getPosition();
        let vec = cursorPos.sub(whalePos);
        let distance = vec.mag(); 

        
        let speedadd = distance/10;

        
        whalePos.x -= (this.speedWhale+speedadd)*this.dir*dt;
        //出屏幕改变y轴坐标，改变朝向
        if(whalePos.x < -cc.winSize.width){

            whalePos.y = Math.floor((Math.random()*(500))-250);
            this.whale.scaleX = -0.5;
            this.dir = -1;
        }

        if(whalePos.x > cc.winSize.width){

            whalePos.y = Math.floor((Math.random()*(500))-250);
            this.whale.scaleX = 0.5;
            this.dir = 1;
        }
        this.whale.setPosition(whalePos);
    },
    seaAngelControl(){


        this.time++;
        if(this.time > 150){
            this.addScore.active = false;
            this.time = 0;
        }
        //
        let seaAngelMgrJS = this.seaAngelMgrNode.getComponent('SeaAngelMgr');
        let foodMgrJS = this.foodMgrNode.getComponent('FoodMgr');
        let seaAngel = this.seaAngelMgrNode.children;
        let food = this.foodMgrNode.children;
        let foodJS = food[0].getComponent('Food');
        let rcFood = foodJS.getBoundingBox();
        let cursorPos = this.cursor.getPosition();
        let camera =this.mainCamera.getComponent(cc.Camera);
        if(seaAngel.length <1){
            if(camera.zoomRatio >1){
                camera.zoomRatio -= 0.01;
            }else{
                this.gameOver.active = true;
            }
            this.mainCamera.x = 0;
            this.mainCamera.y = 0;
            return;
        }
        //控制相机视野
        let foodChild = food[0].children;
        let foodPos = foodChild[0].getPosition();
        let vecFood = cursorPos.sub(foodPos);
        let distance = vecFood.mag(); 
        
        if(distance < 1000){
            if(this.isEat){
                this.foodDistance += distance/50000;
                if(this.foodDistance >= distance/1000){
                    this.foodDistance = distance/1000;
                    this.isEat = false;
                    this.foodDistance = 0;
                    return;
                }
                camera.zoomRatio = 2 - this.foodDistance;
            }
            else{
                camera.zoomRatio = 2 - (distance/1000);
            }
        }

        for(let i = 0;i < seaAngel.length; i++){

            let seaPos = seaAngel[i].getPosition();
            let vec = cursorPos.sub(seaPos);
            let comVec = cc.v2(0, 1);  // 水平向右的对比向量
            
            let radian = cc.v2(vec).signAngle(comVec);    // 求方向向量与对比向量间的弧度
            let degree = cc.misc.radiansToDegrees(radian);  
            //单位化向量
            vec.normalizeSelf();
            
            let seaAngelJS = seaAngel[i].getComponent('SeaAngel');
            seaAngelJS.myColli(vec,this.speed,degree);
            
            //判断海天使是否碰到食物
            let rcSea = seaAngel[i].getBoundingBoxToWorld();
            if(rcSea.intersects(rcFood)){
                //console.log('碰到了');
                //播放音效
                this.current = cc.audioEngine.play(this.bloopAudio, false, 1);
                //移除食物
                let removeSelf = cc.removeSelf();
                food[0].runAction(removeSelf);
                //增加海天使
                seaAngelMgrJS.createAngel(seaAngel[i].getPosition());
                this.radio.string ++;
                let nradio = parseInt(this.radio.string);
                let nScore = parseInt(this.score.string);
                let addScore = seaAngel.length*nradio*nradio;
                this.score.string = nScore + addScore ;
                let addLabel = this.addScore.getComponent(cc.Label);

                addLabel.string = addScore;
                this.addScore.active = true;
                if(addScore > 2000){
                    let rubbishMgrJS = this.rubbishMgrNode.getComponent('RubbishMgr');
                    rubbishMgrJS.createRubbish();
                }
                if(parseInt(this.score.string) > parseInt(this.mScore.string)){
                    this.mScore.string = this.score.string;
                    cc.sys.localStorage.setItem('maxScore',parseInt(this.mScore.string));
                }

                //创建食物
                foodMgrJS.createFood();
                //重新创建食物
                //this.reCreateFood();
                this.isEat = true;
                return;
            }

        }
    },
    update (dt) {

        let rubbishMgrJS = this.rubbishMgrNode.getComponent('RubbishMgr');
        //食物重合判断
        this.reCreateFood();
        //
        //鲸鱼控制
        this.whaleControl(dt);
        //
        //海天使控制
        this.seaAngelControl();
    },
    
});
