class Player extends GuaImage {
    constructor(game) {
        super(game,'player')
        this.setup()
        // this.setupInputs()
    }

    setup() {
        this.speed = 10
        this.coolDown = 0
        this.life = 500
    }

    __in(e) {
        var s = this
        var leftDown = ( e.y < s.y && s.y < e.y + e.h ) && ( e.y < s.x + s.w && s.x + s.w < e.y + e.w)
        var rightDown = ( e.y < s.y && s.y < e.y + e.h ) && ( e.y < s.x && s.x < e.y + e.w)
        var leftUP = ( e.y < s.y && s.y < e.y + e.h ) && ( e.y < s.x + s.w && s.x + s.w < e.y + e.w)
        var rightUp = ( e.y < s.y + s.h && s.y + s.h < e.y + e.h ) && ( e.y < s.x && s.x < e.y + e.w)
        return (leftDown ||　rightDown || leftUP || rightUp)
    }

    __hit() {
        for (var i = 0; i < this.scene.elements.length; i++) {
            var e = this.scene.elements[i]
            if (e instanceof Enemy) {
                // // 四个角撞击
                if (this.__in(e)) {
                    // log('撞飞机')
                    this.life = 0
                    var end = SceneEnd.new(this.game)
                    this.game.replaceScene(end)
                }
            }
        }
    }

    update() {
        this.__hit()

        this.speed = config.player_speed
        if (this.coolDown > 0) {
            this.coolDown -= 1
        }
    }

    fire() {
        if (this.coolDown === 0) {
            this.coolDown = config.fire_coolDown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }

    moveRight() {
        // log('debug',this,g.canvas.width,g.canvas.height)
        var g = this.game
        this.x += this.speed
        if (this.x + this.w > g.canvas.width) {
            this.x = g.canvas.width - this.w
        }
    }

    moveUp() {
        this.y -= this.speed
        if (this.y < 0) {
            this.y = 0
        }
    }

    moveDown() {
        // log('debug',this,g)
        var g = this.game
        this.y += this.speed
        if (this.y + this.h > g.canvas.height) {
            this.y = g.canvas.height - this.h
        }
    }
}
