"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const PORT = Number(process.env.PORT) || 3001;
const io = new socket_io_1.Server(PORT, {
    cors: {
        origin: '*'
    }
});
io.on('connection', socket => {
    console.log('Новый пользователь подключился к сокету:', socket.id);
    socket.on('CLIENT_USER_JOIN', (roomID, username) => {
        console.log(`${username} подключился,`, roomID);
        socket.join(`room/${roomID}`);
        socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_JOIN', username);
    });
    socket.on('CLIENT_USER_TYPING', (username, value, roomID) => {
        socket.join(`room/${roomID}`);
        socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_TYPING', username, value);
    });
    socket.on('CLIENT_SEND_MESSAGE', (message, roomID) => {
        console.log(message);
        socket.join(`room/${roomID}`);
        socket.broadcast.to(`room/${roomID}`).emit('SERVER_SEND_MESSAGE', message);
    });
    const username = socket.handshake.auth.username;
    const roomID = socket.handshake.auth.roomID;
    socket.on('disconnecting', () => {
        console.log(`${username} вышел из комнаты,`, roomID);
        socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_DISCONNECT', username);
    });
});
console.log(`Сервер запущен на порту ${PORT}`);
