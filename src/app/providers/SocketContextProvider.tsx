'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SocketContext } from '../context/SocketContext'

interface Props {
	children: React.ReactNode
}

export const SocketContextProvider = ({ children }: Props) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const params = useParams()
	const pathname = usePathname()

	useEffect(() => {
		if (localStorage.getItem('user') && pathname === `/room/${params.id}`) {
			const username = JSON.parse(localStorage.getItem('user')!).name
			const socketInstance = io(`http://${window.location.hostname}:3001`, {
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
	}, [params.id])

	const contextValue = useMemo(() => ({ socket }), [socket])

	return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>
}
