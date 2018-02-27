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
        laser: 'img/laser.png',
        gm: 'img/gm.png',
        begin: 'img/begin.png',
        s0: 'img/s0.png',
        s1: 'img/s1.png',
        s2: 'img/s2.png',
        s3: 'img/s3.png',
        s4: 'img/s4.png',
        s5: 'img/s5.png',
        s6: 'img/s6.png',
        s7: 'img/s7.png',
        s8: 'img/s8.png',
        s9: 'img/s9.png',

    }
    var game = YuanGame.instance(30, images, function(g){
        var s = Scene.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
