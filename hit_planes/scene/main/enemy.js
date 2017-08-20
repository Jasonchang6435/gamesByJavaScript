class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(1,5)
        var name = 'enemy' + type
        super(game,name)
        this.setup()
    }

    setup() {
        this.speed = randomBetween(2,5)
        this.x = randomBetween(0,350)
        this.y = -randomBetween(0,200)
        this.life = 100
        this.coolDown = 30
    }

    update(index) {
        // 发射子弹
        // log('enemy fire')
        // 击落检测
        var s = this.scene.elements
        // log('scene',s)
        for (var i = 0; i < s.length; i++) {
            var e = s[i]
            if (e instanceof Bullet) {
                var a = e
                var b = this
                var cona = b.x< e.x && e.x<b.x + b.w
                var conb = b.y < a.y && a.y< b.y + b.h
                // log('xphr',e.x,e.y,a.x,a.y)
                // log('xphr',,)
                if (cona && conb) {
                    // log('xphr')
                    this.life -= 20
                    // 计算系统
                    this.scene.score += 20
                    s.splice(i,1)
                }
            }
        }
        if (this.life < 0) {
            // 爆炸效果
            var ps = GuaParticleSystem.new(this.game)
            ps.x = this.x + this.w / 2
            ps.y = this.y + this.h / 2
            s.splice(index,1)
            s.push(ps)
            var ele = Enemy.new(this.game)
            this.scene.addElement(ele)
        }
        this.y += this.speed
        if (this.y + this.h > this.game.canvas.height) {
            this.setup()
        }
    }

    draw() {
        super.draw()
        this.coolDown --
        if (this.coolDown === 0) {
            this.coolDown = 30
            var e = this
            var l = Laser.new(this.game)
            l.x = e.x + e.w / 2 - l.w / 2
            l.y = e.y + e.h
            this.scene.addElement(l)
        }
    }
}
