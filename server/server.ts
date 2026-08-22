import { Server } from 'socket.io'

const PORT = 3001

const io = new Server(PORT, {
	cors: {
		origin: '*'
	}
})

io.on('connection', socket => {
	console.log('Новый пользователь подключился к сокету:', socket.id)

	socket.on('CLIENT_USER_JOIN', (roomID: string, username: string) => {
		console.log(`${username} подключился,`, roomID)
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_JOIN', username)
	})

	const username = socket.handshake.auth.username
	const roomID = socket.handshake.auth.roomID

	socket.on('disconnecting', () => {
		console.log(`${username} вышел из комнаты,`, roomID)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_DISCONNECT', username)
	})
})

console.log(`Сервер запущен на порту ${PORT}`)
