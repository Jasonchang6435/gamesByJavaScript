class Pipes {
    constructor(game) {
        this.game = game
        this.setup()
    }

    setup() {
        this.pipes = []
        this.管子横向间距 = 100
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            this.pipeSpace = 150
            var p1 = GuaImage.new(this.game,'pipe')
            p1.flipY = true
            // 参考 canvas width
            // p1.x = 500 + i * 200
            p1.x = 280 + i * 130
            var p2 = GuaImage.new(this.game,'pipe')
            p2.x = p1.x
            this.resetPipePosition(p1,p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipePosition(p1,p2) {
        p1.y = randomBetween(-210,-30)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    static new(game) {
        return new this(game)
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

    __updateHit(p1,p2) {
        for (var i = 0; i < this.scene.elements.length; i++) {
            var e = this.scene.elements[i]
            if (e instanceof GuaAnimation) {
                var p = p1
                var b = e
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
    }

    update() {
        for (var i = 0; i < this.pipes.length / 2; i+= 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -50) {
                p1.x += this.管子横向间距 * this.columsOfPipes
            }
            if (p2.x < -50) {
                p2.x += this.管子横向间距 * this.columsOfPipes
                this.resetPipePosition(p1,p2)
            }
            this.__updateHit(p1,p2)
        }

    }


    debug() {
        this.管子横向间距 = config.管子横向间距.value
        // log('debuger',this.管子横向间距)
        this.pipeSpace = config.pipe_space.value
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            // if (p.flipX) {
                context.scale(scaleX, scaleY)
            // }
            // context.globalAlpha = p.alpha
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2,-h2)
            context.drawImage(p.texture, 0,0)
            context.restore()
        }
    }
}
