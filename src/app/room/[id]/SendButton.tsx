'use client'

import { IMessage, useMessageContext } from '@/app/context/MessageContext'
import { useSocketContext } from '@/app/context/SocketContext'
import { getDate } from '@/methods/getDate'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { RiSendInsLine } from 'react-icons/ri'

interface SendButtonProps {
	message: IMessage
}

export default function SendButton({ message }: SendButtonProps) {
	const { socket } = useSocketContext()!
	const { setChatContent, chatContent, setMessage } = useMessageContext()
	const chatContentRef = useRef(chatContent)
	const params = useParams()

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
	}

	return (
		<button
			className={`${!message.msg || message?.msg?.trim() === '' ? 'bg-gray-500 cursor-not-allowed' : 'bg-white'} p-2 rounded-2xl cursor-pointer`}
			onClick={sendMessage}
			disabled={message?.msg?.trim() === ''}
		>
			<RiSendInsLine
				size={30}
				color="black"
			/>
		</button>
	)
}
