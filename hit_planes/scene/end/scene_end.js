class SceneEnd extends YuanScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    __newScene() {
        var self = this
        var begin = this.begin
        window.addEventListener('click',function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if ( begin.x < x && x < begin.x + begin.w) {
                if (begin.y < y && y < begin.y + begin.h) {
                    var s = Scene.new(self.game)
                    self.game.replaceScene(s)
                }
            }
        })
    }

    setupInputs() {
        var game = this.game
        game.registerAction('r', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
            game.registerAction('r',function() {})
        })
        this.__newScene()

    }

    setup() {
        var game = this.game
        // bg
        this.bg = YuanImage.new(game,'sky')
        // game over
        this.gm = YuanImage.new(game,'gm')
        this.gm.x = 160
        this.gm.y = 200
        // begin image
        this.begin = YuanImage.new(game,'begin')
        this.begin.x = 200
        this.begin.y = 300
        this.addElement(this.bg)
        this.addElement(this.gm)
        this.addElement(this.begin)
    }

}
