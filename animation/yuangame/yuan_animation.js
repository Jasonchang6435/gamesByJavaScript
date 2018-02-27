class YuanAnimation {
    constructor(game) {
        this.game = game
        // 为了省事 hard code 一套硬编码对象
        this.animations = {
            idle:[],
            run:[],
        }
        for (var i = 1; i < 10; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (var i = 1; i < 5; i++) {
            var name = `r${i}`
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false
    }

    frames() {
        return this.animations[this.animationName]
    }

    draw() {
        var context = this.game.context
        if (this.flipX) {
            context.save()
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            // context.drawImage(this.texture, this.x,this.y)
            context.drawImage(this.texture, 0,this.y)
            context.restore()
        } else {
            context.drawImage(this.texture,this.x,this.y)
        }
    }

    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
            // log('debu frameCount',this.frameCount,this.frameIndex,this.texture)
        }
    }

    changeAnimation(name) {
        this.animationName = name
    }

    static new(game) {
        return new this(game)
    }

    move(x,keyStatus) {
        this.flipX = x < 0
        this.x += x
        log('keyStatus',keyStatus)
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
}
