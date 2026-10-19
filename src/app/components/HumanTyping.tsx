'use client'

import { useEffect, useRef, useState } from 'react'
import { LuDot } from 'react-icons/lu'
import { useMessageContext } from '../context/MessageContext'
import { useSocketContext } from '../context/SocketContext'
import '../styles/typing.css'

export default function HumanTyping() {
	const { message } = useMessageContext()
	const { socket } = useSocketContext()!

	const [username, setUsername] = useState<string | null>(null)
	const [value, setValue] = useState<string>('')

	const usernameRef = useRef<string | null>(null)

	useEffect(() => {
		usernameRef.current = username
	}, [message.username])

	useEffect(() => {
		const handleUsername = (username: string | null, value: string) => {
			setUsername(username)
			setValue(value)
		}
		socket?.on('SERVER_USER_TYPING', (username: string, value: string) =>
			handleUsername(username, value)
		)

		return () => {
			socket?.off('SERVER_USER_TYPING', handleUsername)
		}
	}, [socket])

	return (
		<div className="flex justify-center items-center">
			{value && (
				<div className="flex justify-center items-center">
					<p className="humanTyping text-center text-gray-500">{username} is typing</p>
					<div className="flex mt-2 text-gray-500">
						<LuDot
							size={10}
							id="dot1"
						/>
						<LuDot
							size={10}
							id="dot2"
						/>
						<LuDot
							size={10}
							id="dot3"
						/>
					</div>
				</div>
			)}
		</div>
	)
}
