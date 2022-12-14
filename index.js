const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var express = require('express');
app.use("/public", express.static('public')); 

var playerMap = new Map();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('buy input', msg => {
    io.emit('buy input', msg);
  });

  socket.on('real', msg => {
    io.emit('real', msg);
  });

  socket.on('adjust', msg => {
    io.emit('adjust');
  })

  socket.on('profitUpdate', (profit,user) => {
    playerMap[user] = profit;
    io.emit('user', playerMap);
  })

  socket.on('sell input', msg => {
    io.emit('sell input', msg);
  });

  socket.on('username', msg => {
    playerMap[msg] = Number(0);
    io.emit('username', msg);
  });

  socket.on('table', msg => {
    io.emit('table');
  })

  socket.on("topicEvent", message => {
    io.emit("topicEvent", message);
  });

  socket.on('end', msg => {
    playerMap = {};
  }) 
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

