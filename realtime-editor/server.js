const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const ACTIONS = require('./src/Actions');
 // Ensure this file exists and is correctly imported

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
}

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    console.log(`User ${username} joined room ${roomId}`);
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    console.log('Clients in room', roomId, clients);

    io.to(roomId).emit('clients', clients);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
      socket.leave(roomId);
      const clients = getAllConnectedClients(roomId);
      io.to(roomId).emit('clients', clients);
    });
    delete userSocketMap[socket.id];
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
