var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

const randomBetween = function(start,end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

var aInb = function(a,b) {
    var cona = (b.x < a.x < b.x + b.w)
    var conb = (b.y < a.y < b.y + b.h)
    log('aInb ',cona,conb)
    return cona && conb
}
