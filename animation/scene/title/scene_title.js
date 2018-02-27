class SceneTitle extends YuanScene {
    constructor(game) {
        super(game)
        var bg = YuanImage.new(this.game,'bg')
        this.addElement(bg)
        //
        var w = YuanAnimation.new(this.game)
        w.x = 100
        w.y = 200
        this.w = w
        //
        this.addElement(w)
        this.setupInputs()
    }

    setupInputs() {
        var self = this
        self.game.registerAction('a',function(keyStatus) {
            self.w.move(-2,keyStatus)
        })
        self.game.registerAction('d',function(keyStatus) {
            self.w.move(2,keyStatus)
        })
    }

    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
        // this.game.context.fillText('按 e 编辑关卡', 100, 150)
    }
}
