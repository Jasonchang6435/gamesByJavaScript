class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
            game.registerAction('k',function() {})
        })
        game.registerAction('e', function(){
            var e = SceneEditor.new(game)
            game.replaceScene(e)
            game.registerAction('e',function() {})
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 e 编辑关卡', 100, 150)
    }
}
