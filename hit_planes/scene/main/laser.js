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
        
    }
}
