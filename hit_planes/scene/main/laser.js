class Laser extends GuaImage {
    constructor(game) {
        super(game,'laser')
        this.setup()
    }

    setup() {
        this.speed = config.bullet_speed
    }

    update(index) {
        this.y += 10
        // this.y += this.speed
        if (this.y > this.game.canvas.height) {
            this.scene.elements.splice(index,1)
        }
        // hit player
        var p = this.scene.player
        var e = this
        if (p.x < e.x &&　e.x < p.x + p.w) {
            if ( p.y < e.y + e.h &&　e.y + e.h <　p.y + p.h ) {
                p.life -= 15
                p.scene.elements.splice(index,1)
                if (p.life < 0) {
                    var end = SceneEnd.new(this.game)
                    this.game.replaceScene(end)
                }
            }
        }

    }
}
