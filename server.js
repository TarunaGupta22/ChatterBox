const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (msg) => {
    io.emit('message', msg); // broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// ✅ Use PORT 3001 to avoid the EADDRINUSE error
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
