class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    addElement(img) {
        // ?
        img.scene = this
        this.elements.push(img)
    }

    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // this.game.drawImage(e)
            // log('findout',e)
            e.draw()
        }
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
        // for(var e of this.elements) {
            var e = this.elements[i]
            // log('debug update',e )
            if ( (e instanceof GuaParticleSystem) && e.duration === -1) {
                    this.elements.splice(i,1)
                    // 子弹要循环判断碰撞，就要在离开页面时删除不需要判断的子弹
            }else if ( (e instanceof Bullet) && e.y < 0){
                this.elements.splice(i,1)
            } else if (e instanceof Laser) {
                // log('Laser',this.elements,e.y)
                if (e.y > this.game.canvas.height) {
                    this.elements.splice(i,1)
                } else {
                    e.update(i)
                }
            } else {
                e.update(i)
            }

        }
    }
}
