var express = require('express')
var grass = require('./class.grass')
var grassEater = require('./class.grasseater')
var predator = require('./class.predator')
var spider = require('./class.spider')
var dragon = require('./class.dragon')

var app = express()
app.use(express.static('./'))
app.get('/', (req, res) => {[
    res.render('index.html')
]})
app.listen(3000)
