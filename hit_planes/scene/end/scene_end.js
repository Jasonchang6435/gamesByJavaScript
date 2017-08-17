class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setupInputs() {
        var game = this.game
        game.registerAction('r', function(){
            var s = Scene.new(game)
            // var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        var self = this
        var begin = this.begin
        window.addEventListener('click',function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if ( begin.x < x && x < begin.x + begin.w) {
                if (begin.y < y && y < begin.y + begin.h) {
                    log('debug',self.game)
                    var s = Scene.new(self.game)
                    self.game.replaceScene(s)
                }
            }
        })
    }

    setup() {
        var game = this.game
        this.bg = GuaImage.new(game,'sky')
        this.gm = GuaImage.new(game,'gm')
        this.gm.x = 160
        this.gm.y = 200
        this.begin = GuaImage.new(game,'begin')
        this.begin.x = 200
        this.begin.y = 300
        this.addElement(this.bg)
        this.addElement(this.gm)
        this.addElement(this.begin)
    }

    // draw() {
    //     // draw labels
    //     this.game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
    // }
}
