'use client'

import { createContext, useContext } from 'react'
import { Socket } from 'socket.io-client'

interface SocketContextType {
	socket: Socket | null
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined)
export const useSocketContext = () => useContext(SocketContext)
