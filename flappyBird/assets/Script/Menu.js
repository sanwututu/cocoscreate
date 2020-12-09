cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    // onLoad: function () {
    //     this.label.string = this.text;
    // },
    start(){
        cc.data = {};
        cc.data.stopFloor = true;
    },


    //按下按钮，切换场景
    changeScene(){
        
        cc.director.loadScene('GameScene');
    },
    // playAnimate(){
    //     //播放动画。动画组件？
    //     //怎么播放？
    //     //this指的是当前脚本    node节点           this.node当前脚本所在的节点
    //     //getComponent(你想要的组件类型)通过节点拿组件
    //     let anim = this.node.getComponent(cc.Animation);
    //     //拿完动画组件，播放动画？
    //     anim.play('changeScene');
    // },


    // called every frame
    update: function (dt) {

        
    },
});
