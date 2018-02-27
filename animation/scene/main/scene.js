const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 30,
    fire_coolDown: 5,
    factor: 0.01,
    particle_system_duration: 40,
}

var aInb = function(a,b) {
    var cona = (b.x < a.x < b.x + b.w)
    var conb = (b.y < a.y < b.y + b.h)
    log('aInb ',cona,conb)
    return cona && conb
}

class Bullet extends YuanImage {
    constructor(game) {
        super(game,'bullet')
        // this.speed = 10
        this.setup()
        // this.setupInputs()
    }

    setup() {
        this.speed = config.bullet_speed
        // this.speed = 10
    }

    update() {
        this.y -= this.speed
    }
}

class Player extends YuanImage {
    constructor(game) {
        super(game,'player')
        this.setup()
        // this.setupInputs()
    }

    setup() {
        this.speed = 10
        this.coolDown = 0
    }

    update() {
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

class Cloud extends YuanImage {
    constructor(game) {
        // var type = randomBetween(1,2)
        // var name = 'enemy' + type
        super(game,'cloud')
        this.setup()
        // this.setupInputs()
    }

    setup() {
        this.speed = config.cloud_speed
        this.x = randomBetween(0,150)
        this.y = -randomBetween(0,200)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }

}

class Enemy extends YuanImage {
    constructor(game) {
        var type = randomBetween(1,5)
        var name = 'enemy' + type
        super(game,name)
        this.setup()
        // this.setupInputs()
    }

    setup() {
        this.speed = randomBetween(2,5)
        this.x = randomBetween(0,350)
        this.y = -randomBetween(0,200)
        this.life = 100
    }

    update(index) {
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
                    s.splice(i,1)
                }
            }
        }
        if (this.life < 0) {
            // 爆炸效果
            var ps = YuanParticleSystem.new(this.game)
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
}


class Scene extends YuanScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        var s = this
        this.numOfEnemies = 5
        this.bg = YuanImage.new(game,'sky')
        this.player = Player.new(game)
        this.cloud = Cloud.new(game)
        this.player.x = 200
        this.player.y = 200
        // this.elements.push(this.bg)
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })

        g.registerAction('d', function(){
            s.player.moveRight()
        })

        g.registerAction('w', function(){
            s.player.moveUp()
        })

        g.registerAction('s', function(){
            s.player.moveDown()
        })

        g.registerAction('j', function(){
            s.player.fire()
        })
    }

    update() {
        super.update()
        this.cloud.y += 1
    }
}
