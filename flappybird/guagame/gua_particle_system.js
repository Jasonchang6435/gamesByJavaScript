class GuaParticle extends GuaImage {
    constructor(game) {
        super(game,'fire')
        // this.speed = 10
        this.setup()
        // this.setupInputs()
    }

    init(x,y,vx,vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    setup() {
        this.life = 30
        // this.speed = 10
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = config.factor
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game,text) {
        this.game = game
        this.text = text
        this.setup()
    }

    static new(game,text) {
        return new this(game,text)
    }

    setup() {
        this.duration = config.particle_system_duration
        this.x = 100
        this.y = 150
        this.numberOfParticles = 15
        this.particles = []
    }

    update() {
        if (this.duration > 0) {
            this.duration--
        } else {
            this.duration = -1
            // return
        }
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var speed = 2
            var vx = randomBetween(-speed,speed)
            var vy = randomBetween(-speed,speed)
            p.init(this.x,this.y,vx,vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        for(var p of this.particles) {
            p.draw()
        }
    }
}
