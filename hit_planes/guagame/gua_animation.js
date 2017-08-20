class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事 hard code 一套硬编码对象
        this.animations = {
            idle:[],
            run:[],
        }
        for (var i = 1; i < 10; i++) {
            var name = `w${i}`
            var t = textureByName(name)
            this.animations['idle'].push(t)
        }
        for (var i = 1; i < 10; i++) {
            var name = `w${i}`
            var t = textureByName(name)
            this.animations['run'].push(t)
        }
        this.animationState = 'idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
    }

    frames() {
        return this.animations[this.animationState]
    }

    draw() {
        this.game.drawImage(this)
    }

    update() {
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

    move(x,event) {
        this.x += x
        // log('event',event)
        changeAnimation('run')
    }
}
