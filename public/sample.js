// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var sender = document.getElementById('sender'),
  receiver = document.getElementById('receiver'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function() {
  socket.emit('grant', {
    sender: sender.value,
    receiver: receiver.value
  });
});

sender.addEventListener('keyup', function() {
  socket.emit('register', sender.value);
});

// Event listener
socket.on('granted', function(data) {
  output.innerHTML += '<p><strong>You are granted new permission. Please reload this page to take effect.</strong></p>';
});
socket.on('warning', function(data) {
  output.innerHTML += '<p><strong>' + data + '</strong></p>';
});