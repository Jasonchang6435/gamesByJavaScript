class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        var s = this
        this.numOfEnemies = 5
        this.coolDown = 0
        this.score = 0
        // bg
        this.bg = GuaImage.new(game,'sky')
        // player
        this.player = Player.new(game)
        this.player.x = 200
        this.player.y = 200
        // cloud
        this.cloud = Cloud.new(game)
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
            var l = Laser.new(this.game)
            l.x = e.x + e.w / 2 - l.w / 2
            l.y = e.y +　e.h
            this.addElement(l)
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
        if (this.coolDown > 0) {
            this.coolDown--
        }
    }

    __drawLife() {
        var life = '' + this.player.life
        var x = 0
        var y = 0
        for (let i = 0; i < life.length; i++) {
            let s = life[i]
            let num = GuaImage.new(this.game,'s' + s)
            num.x = x
            num.y = y
            this.game.drawImage(num,x,y)
            x += 20
        }
    }

    __drawScore() {
        var score = '' + this.score
        var a = 0
        var b = this.game.canvas.height
        for (let i = 0; i < score.length; i++) {
            let s = score[i]
            let num = GuaImage.new(this.game,'s' + s)
            num.x = a
            num.y = b - num.h
            this.game.drawImage(num,a,b)
            a += 20
        }
    }

    draw() {
        super.draw()
        if (this.coolDown === 0) {
            this.coolDown = 40
        }
        // draw life
        this.__drawLife()
        // draw score
        this.__drawScore()
        // draw labels
        // this.game.drawImage(this.bg)
        // this.game.drawImage(this.player)
    }
}
