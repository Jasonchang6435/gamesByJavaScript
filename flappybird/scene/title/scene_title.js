class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
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
        b.x = 80
        b.y = 100
        this.b = b
        this.addElement(b)
        // 生命系统
        this.end = false
        this.score = 0
        // var sname = "" + this.score
        // var score = GuaImage.new(this.game,)
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
        // 横线和竖线同时与另一个矩形的竖线和横线相交，则两矩形相交
        // 鸟和管子不碰撞简化为：p.x - b.w < b.x < p.x + p.w && 间隔上y p1.y+p1.h< b.y < p2.y - b.h
        if (!this.end) {
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

    }


    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
        // this.game.context.fillText('按 e 编辑关卡', 100, 150)
        var score = '' + this.score
        var x = 0
        var y = 0
        for (let i = 0; i < score.length; i++) {
            let s = score[i]
            let num = GuaImage.new(this.game,'s' + s)
            num.x = x
            num.y = y
            this.game.drawImage(num,x,y)
            x += 20
        }
    }
}
