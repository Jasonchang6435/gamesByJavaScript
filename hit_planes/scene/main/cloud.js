class Cloud extends GuaImage {
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
