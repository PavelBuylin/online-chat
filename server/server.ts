import { Server } from 'socket.io'

const PORT = Number(process.env.PORT) || 3001

interface IMessage {
	type?: 'default' | 'disconnect' | 'join'
	userID?: string
	username: string
	date: string | number
	msg: string
}

interface RoomUserState {
	sockets: Set<string>
	disconnectTimeout: NodeJS.Timeout | null
}

const io = new Server(PORT, {
	cors: {
		origin: '*'
	}
})

const roomUsers = new Map<string, RoomUserState>()
const getKey = (roomID: string, username: string) => `${roomID}/${username}`

io.on('connection', socket => {
	console.log('Новый пользователь подключился к сокету:', socket.id)

	socket.on('CLIENT_USER_JOIN', (roomID: string, username: string) => {
		socket.join(`room/${roomID}`)
		const key = getKey(roomID, username)

		let state = roomUsers.get(key)
		if (!state) {
			state = { sockets: new Set(), disconnectTimeout: null }
			roomUsers.set(key, state)
		}

		state.sockets.add(socket.id)

		if (state.disconnectTimeout) {
			clearTimeout(state.disconnectTimeout)
			state.disconnectTimeout = null
			console.log(`${username} переподключился, уведомления не отправляются`)
		} else if (state.sockets.size === 1) {
			console.log(`${username} подключился,`, roomID)
			socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_JOIN', username)
		}
	})

	socket.on('CLIENT_USER_TYPING', (username: string, value: string, roomID: string) => {
		console.log(`${username} печатает: ${value}, комната: ${roomID}`)
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_TYPING', username, value)
	})

	socket.on('CLIENT_SEND_MESSAGE', (message: IMessage, roomID: string) => {
		console.log(message)
		socket.join(`room/${roomID}`)
		socket.broadcast.to(`room/${roomID}`).emit('SERVER_SEND_MESSAGE', message)
	})

	const username = socket.handshake.auth.username
	const roomID = socket.handshake.auth.roomID

	socket.on('disconnecting', () => {
		const key = getKey(roomID, username)
		const state = roomUsers.get(key)
		if (!state) return

		state.sockets.delete(socket.id)

		if (state.sockets.size === 0) {
			state.disconnectTimeout = setTimeout(() => {
				console.log(`${username} вышел из комнаты,`, roomID)
				socket.broadcast.to(`room/${roomID}`).emit('SERVER_USER_DISCONNECT', username)
				roomUsers.delete(key)
			}, 2000)
		}
	})
})

console.log(`Сервер запущен на порту ${PORT}`)
