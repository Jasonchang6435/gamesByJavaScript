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

    update(index) {
        this.y -= this.speed
        // 子弹要循环判断碰撞，就要在离开页面时删除不需要判断的子弹
        if (this.y < 0) {
            this.scene.elements.splice(index,1)
        }

    }
}
