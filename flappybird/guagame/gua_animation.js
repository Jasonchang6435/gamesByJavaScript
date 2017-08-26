class GuaAnimation {
    constructor(game,name) {
        this.game = game
        this.setup()
    }

    setup() {
        // 为了省事 hard code 一套硬编码对象
        this.animations = {
            idle:[],
            // run:[],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = this.game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false

        this.rotation = 0
        this.alpha = 1
        //重力加速度
        this.gy = 10
        this.vy = 0
    }

    jump() {
        this.vy = -10
        if (this.scene.end) {
            return
        }
        this.rotation = -45
    }


    frames() {
        return this.animations[this.animationName]
    }

    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2,-h2)
        context.drawImage(this.texture, 0,0)
        context.restore()

    }

    __toggleScene(begin) {
        var self = this
        window.addEventListener('click',function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if ( begin.x < x && x < begin.x + begin.w) {
                if (begin.y < y && y < begin.y + begin.h) {
                    var s = SceneTitle.new(self.game)
                    self.game.replaceScene(s)
                }
            }
        })
    }

    __sceneEnd() {
        this.scene.end = true
        this.scene.birdSpeed = 0
        var gameOver = GuaImage.new(this.game,'gm')
        // var end = SceneEnd.new(this.game)
        gameOver.x = 50
        gameOver.y = 100
        this.scene.addElement(gameOver)
        var begin = GuaImage.new(this.game,'begin')
        begin.x = 80
        begin.y = 190
        this.scene.addElement(begin)
        this.__toggleScene(begin)

    }

    __updateHit(e) {
        for (let j = 0; j < e.pipes.length; j+=2) {
            var p = e.pipes[j]
            var p2 = e.pipes[j+1]
            var b = this
            if (p.x - b.w < b.x && b.x < p.x + p.w) {
                p.birdIn = true
                if (p.y + p.h < b.y && b.y < p2.y - b.h) {
                    continue
                } else {
                    this.__sceneEnd()
                }
            } else if (p.x + p.w < b.x && p.birdIn) {
                p.birdIn = false
                this.scene.score++
            }
        }


    }

    update() {
        // log('bird update',this.scene.elements)
        var elements = this.scene.elements
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i]
            if (e instanceof Pipes) {
                // log('bird update debug',e.pipes,e.pipes.length / 2)
                this.__updateHit(e)
            }
        }
        // 更新alpha
        if (this.alpha > 0) {
            this.alpha -= 0.1
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 410
        if (this.y > h) {
            this.y = h
        }
        if (this.y < 0) {
            this.y = 0
        }
        // log('width',this.game.canvas.width)
        if (this.x + this.w > this.game.canvas.width) {
            this.x = this.game.canvas.width - this.w
        }
        if (this.x < 0) {
            this.x = 0
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    changeAnimation(name) {
        this.animationName = name
    }

    static new(game) {
        return new this(game)
    }

    move(x,keyStatus) {
        this.flipX = (x < 0)
        this.x += x

    }
}
