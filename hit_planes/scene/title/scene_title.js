class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var l = GuaLabel.new(this.game,'hello')
        this.addElement(l)
        // game.registerAction('k', function(){
        //     var s = Scene(game)
        //     game.replaceScene(s)
        // })
        // game.registerAction('e', function(){
        //     var e = SceneEditor.new(game)
        //     game.replaceScene(e)
        // })
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
        
        // var w = GuaAnimation.new(this.game)
        // w.x = 100
        // w.y = 200
        // this.w = w
        // this.addElement(w)
        // this.setupInputs()
    }

    // setupInputs() {
    //     var self = this
    //     self.game.registerAction('a',function(event) {
    //         self.w.move(-2,event)
    //     })
    //     self.game.registerAction('d',function(event) {
    //         self.w.move(2,event)
    //     })
    // }

    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
        // this.game.context.fillText('按 e 编辑关卡', 100, 150)
    }
}
