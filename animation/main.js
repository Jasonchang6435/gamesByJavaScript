var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
            // log('blocks log',blocks)
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud1.png',
        player: 'img/player.png',
        sky: 'img/sky.jpg',
        enemy5: 'img/enemy5.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        bg: 'img/bg.png',
        // 走路动画
        w1:'img/w1.gif',
        w2:'img/w2.gif',
        w3:'img/w3.gif',
        w4:'img/w4.gif',
        w5:'img/w5.gif',
        w6:'img/w6.gif',
        w7:'img/w7.gif',
        w8:'img/w8.gif',
        w9:'img/w9.gif',
        // 多状态动画
        r1:'img/r1.gif',
        r2:'img/r2.gif',
        r3:'img/r3.gif',
        r4:'img/r4.gif',
        r5:'img/r5.gif',
        r6:'img/r6.gif',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
