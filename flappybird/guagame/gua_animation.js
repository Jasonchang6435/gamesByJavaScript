class GuaAnimation {
    constructor(game,name) {
        this.game = game
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
        this.rotation = -45
    }


    frames() {
        return this.animations[this.animationName]
    }

    draw() {
        var context = this.game.context
        // if (this.flipX) {
            context.save()
            // var x = this.x + this.w / 2
            var w2 = this.w / 2
            var h2 = this.h / 2
            context.translate(this.x + w2, this.y + h2)
            if (this.flipX) {
                context.scale(-1, 1)
            }
            context.globalAlpha = this.alpha
            // log('debug',this.rotation )
            context.rotate(this.rotation * Math.PI / 180)
            context.translate(-w2,-h2)
            context.drawImage(this.texture, 0,0)
            context.restore()
        // } else {
        //     context.drawImage(this.texture,this.x,this.y)
        // }

        // if (this.flipX) {
        //     context.save()
        //     var x = this.x + this.w / 2
        //     context.translate(x, 0)
        //     context.scale(-1, 1)
        //     // context.drawImage(this.texture, this.x,this.y)
        //     context.drawImage(this.texture, 0,this.y)
        //     context.restore()
        // } else {
        //     context.drawImage(this.texture,this.x,this.y)
        // }

    }

    update() {
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
        // log('keyStatus',keyStatus)
        // var animationNames = {
        //     down: 'run',
        //     idle: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
        // if (keyStatus === 'down') {
        //     changeAnimation('run')
        // } else if(keyStatus === 'idle') {
        //     changeAnimation('idle')
        //     // keyStatus
        // }

    }
}
