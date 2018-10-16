var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function () {
  console.log('listen to request on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);
var clients = new Map();
io.on('connection', function (socket) {
  socket.on('register', function (data) {
    clients.set(data, socket.id);
  });

  socket.on('grant', function (data) {
    if (data.sender === 'admin') {
      receiver = clients.get(data.receiver);
      if (receiver !== undefined && io.sockets.connected[receiver]) {
        io.sockets.connected[receiver].emit('granted', data);
      }
    } else {
      socket.emit('warning', 'You don\'t have permission to do this action.');
    }
  });
});