import { Server } from 'socket.io'

const PORT = Number(process.env.PORT) || 3001

interface IMessage {
	type?: 'default' | 'disconnect' | 'join'
	userID?: string
	username: string
	date: string | number
	msg: string
}

const io = new Server(PORT, {
	cors: {
		origin: '*'
	}
})

io.on('connection', socket => {
	console.log('New user connected to socket:', socket.id)

	socket.on('CLIENT_USER_JOIN', (roomID: string, username: string) => {
		console.log(`${username} connected,`, roomID)
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_JOIN', username)
	})

	socket.on('CLIENT_USER_TYPING', (username: string, value: string, roomID: string) => {
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_TYPING', username, value)
	})

	socket.on('CLIENT_SEND_MESSAGE', (message: IMessage, roomID: string) => {
		console.log(message)
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_SEND_MESSAGE', message)
	})

	socket.on('CLIENT_VOICE_USER_JOIN', (roomID: string) => {
		socket.join(`room/${roomID}`)
		socket.broadcast
			.to(`room/${roomID}`)
			.emit('SERVER_VOICE_USER_JOIN', 'New user connected, give him your signal!')
	})

	socket.on('CLIENT_USER_CALL', (data: JSON, roomID: string) => {
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_CALL', data)
	})

	socket.on('CLIENT_USER_ANSWER', (data: JSON, roomID: string) => {
		// socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_ANSWER', data)
	})

	const username = socket.handshake.auth.username
	const roomID = socket.handshake.auth.roomID

	socket.on('disconnecting', () => {
		console.log(`${username} disconnected from room,`, roomID)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_DISCONNECT', username)
	})
})

console.log(`Server started on port ${PORT}`)
