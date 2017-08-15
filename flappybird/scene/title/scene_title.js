class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var l = GuaLabel.new(this.game,'hello')
        // this.addElement(l)
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
        // bg
        var bg = GuaImage.new(this.game,'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(this.game)
        this.addElement(this.pipe)
        // 循环移动地面 抽象为ground类
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(this.game,'ground')
            g.x = i * 19
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        var b = GuaAnimation.new(this.game)
        this.birdSpeed = 2
        b.x = 180
        b.y = 100
        this.b = b
        this.addElement(b)
        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }


    setupInputs() {
        var self = this
        var b = this.b
        self.game.registerAction('a',function(keyStatus) {
            b.move(-self.birdSpeed,keyStatus)
        })
        self.game.registerAction('d',function(keyStatus) {
            b.move(self.birdSpeed,keyStatus)
        })
        self.game.registerAction('j',function(keyStatus) {
            b.jump()
        })
    }

    update() {
        super.update()
        this.skipCount--
        var offset = 5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = -15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x -= offset
        }
    }


    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
        // this.game.context.fillText('按 e 编辑关卡', 100, 150)
    }
}
