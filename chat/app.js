var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var message = []
var connections = []
app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.render('index.html')
})
server.listen(3000)
io.on('connection', socket => {
  connections.push(socket)
  for (var i in message) {
    io.sockets.emit("display message", message[i])
  }
  socket.on('diconnect', data => {
    connections.splice(connections.indexOf(socket), 1)
  })
  socket.on("send message", data => {
    message.push(data)
    io.sockets.emit("display message", data)
  })
})
