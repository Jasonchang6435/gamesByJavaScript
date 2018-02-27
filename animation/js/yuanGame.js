
var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 15,
    }
    var paddle = o
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }
    return o
}

var YuanGame = function() {
    var g = {}
    var canvas = e('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    setInterval(function(){
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
    }, 1000/30)
    return g
}

var __main = function() {
    // var game = YuanGame()
    var canvas = e('#id-canvas')
    var context = canvas.getContext('2d')
    var paddle = Paddle()

    var leftDown = false
    var rightDown = false

    setInterval(function(){
        if (leftDown) {
            paddle.moveLeft()
        } else if(rightDown) {
            paddle.moveRight()
        }
        context.clearRect(0,0,canvas.width,canvas.height)
        context.drawImage(paddle.image,paddle.x,paddle.y)
    }, 1000/30)

}
__main()
