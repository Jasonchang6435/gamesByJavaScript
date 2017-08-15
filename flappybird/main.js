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
        bg: 'img/bg.png',
        pipe: 'img/pipe.png',
        ground: 'img/ground.png',
        b1: 'img/b1.png',
        b2: 'img/b2.png',
        b3: 'img/b3.png',
        // sky: 'img/sky.jpg',
        // enemy5: 'img/enemy5.png',
        // enemy1: 'img/enemy1.png',
        // enemy2: 'img/enemy2.png',
        // enemy3: 'img/enemy3.png',
        // enemy4: 'img/enemy4.png',
        // fire: 'img/fire.png',
        // 走路动画
        // w1:'img/w1.png',
        // w2:'img/w1.png',
        // w3:'img/w1.png',
        // w4:'img/w1.png',
        // w5:'img/w1.png',
        // w6:'img/w6.png',
        // w7:'img/w7.png',
        // w8:'img/w8.png',
        // w9:'img/w9.png',
        // 多状态动画

    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
