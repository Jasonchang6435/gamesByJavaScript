class SceneEditor  extends YuanScene{
    constructor(game) {
        super()
        this.blocks = []
        this.game = game
        this.clickSetup()
        this.draw()
        game.registerAction('b', function(){
            var e = SceneTitle.new(game)
            game.replaceScene(e)
            game.registerAction('b',function() {})
        })
    }

    clickSetup() {
        var s = this
        s.img = imageFromPath('./img/block.png')
        // draw
        window.addEventListener('click',(event) => {
            var x = event.offsetX
            var y = event.offsetY
            var cw = s.game.canvas.width
            var ch = s.game.canvas.height
            if ( 0 < x && x < cw && 0 < y && y < ch ) {
                var img = s.img
                var bw = img.width
                var bh = img.height
                var bx = Math.floor( x / bw) * bw
                var by = Math.floor( y / bh) * bh
                // log('SceneEditor clickSetup',x,y,cw,ch,bw,bh,bx,by)
                s.__addBlock(bx,by)
                // console.log('debug blocks',s.blocks)
                s.update()
            }
        })
        window.addEventListener('keydown',(event) => {
            if (event.key == 'b') {
                // levels.unshift([s.blocks])
                // console.log('保存',[s.blocks],levels,levels.length)
                levels = [s.blocks]
            }
        })
    }

    __addBlock(bx,by) {
        this.blocks.push([bx,by])
    }

    draw() {
        var s = this
        // draw 背景
        s.game.context.fillStyle = "#554"
        s.game.context.fillRect(0, 0, 400, 300)
        //
        if (s.blocks.length == 0) {
            return
        }
        for (var i = 0; i < s.blocks.length; i++) {
            var block = s.blocks[i]
            s.game.context.drawImage(s.img, block[0],block[1])
        }

    }

    update() {
        var s = this
        s.game.context.clearRect(0, 0, s.game.canvas.width, s.game.canvas.height)
        s.draw()

    }
}
