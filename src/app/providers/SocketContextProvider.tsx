'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SocketContext } from '../context/SocketContext'

interface Props {
	children: React.ReactNode
}

export const SocketContextProvider = ({ children }: Props) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const params = useParams()

	useEffect(() => {
		if (localStorage.getItem('user')) {
			const username = JSON.parse(localStorage.getItem('user')!).name
			const socketInstance = io('http://localhost:3001', {
				auth: {
					username,
					roomID: params.id
				}
			})
			setSocket(socketInstance)

			return () => {
				socketInstance.disconnect()
			}
		}
	}, [])

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
