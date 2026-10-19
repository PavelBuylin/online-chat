'use client'

import { IMessage, useMessageContext } from '@/app/context/MessageContext'
import { useSocketContext } from '@/app/context/SocketContext'
import { getDate } from '@/methods/getDate'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import SendButton from './SendButton'

export default function Footer() {
	const { socket } = useSocketContext()!
	const { message, setMessage, setChatContent, chatContent } = useMessageContext()
	const params = useParams()
	const chatContentRef = useRef(chatContent)
	const [username, setUsername] = useState<string | null>(null)

	useEffect(() => {
		setUsername(JSON.parse(localStorage.getItem('user')!).name)
	}, [])

	useEffect(() => {
		chatContentRef.current = chatContent
	}, [chatContent])

	useEffect(() => {
		const handleMessage = (message: IMessage) => {
			setChatContent([message, ...chatContentRef.current])
		}
		socket?.on('SERVER_SEND_MESSAGE', (message: IMessage) => handleMessage(message))

		return () => {
			socket?.off('SERVER_SEND_MESSAGE', handleMessage)
		}
	}, [socket])

	const sendMessage = () => {
		setMessage({ ...message, msg: message.msg })
		const newMessage: IMessage = {
			userID: JSON.parse(localStorage.getItem('user')!).id,
			username: JSON.parse(localStorage.getItem('user')!).name,
			date: getDate(),
			msg: message.msg,
			type: 'default'
		}

		socket?.emit('CLIENT_SEND_MESSAGE', newMessage, params.id)

		setChatContent([newMessage, ...chatContentRef.current])
		setMessage({ userID: '', username: '', date: '', msg: '' })
		socket?.emit('CLIENT_USER_TYPING', '', '', params.id)
	}

	const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
		if (message.msg !== '') socket?.emit('CLIENT_USER_TYPING', username, e.target.value, params.id)

		setMessage({ msg: e.target.value!, username: username!, date: '' })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (message.msg && e.key === 'Enter') sendMessage()
	}

	return (
		<footer className="mt-auto border-t border-gray-500/35 h-15 p-13 flex justify-center items-center gap-5">
			<input
				placeholder="Message..."
				type="text"
				className="border border-gray-500/35 w-[70%] rounded-[10px] outline-none p-2 text-2xl text-white"
				onChange={handleChangeMessage}
				onKeyDown={handleKeyDown}
				value={message.msg ?? ''}
			/>
			<SendButton
				message={message}
				sendMessage={sendMessage}
			/>
		</footer>
	)
}
