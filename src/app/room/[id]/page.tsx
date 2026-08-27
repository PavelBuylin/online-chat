'use client'

import { IMessage, useMessageContext } from '@/app/context/MessageContext'
import { useSocketContext } from '@/app/context/SocketContext'
import { getDate } from '@/methods/getDate'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Footer from './Footer'
import Header from './Header'
import Message from './Message'

export default function Room() {
	const { chatContent, setChatContent } = useMessageContext()
	const { socket } = useSocketContext()!

	const params = useParams()
	const chatContentRef = useRef(chatContent)

	useEffect(() => {
		chatContentRef.current = chatContent
	}, [chatContent])

	useEffect(() => {
		if (!socket || !params.id) return
		const username = JSON.parse(localStorage.getItem('user')!).name

		socket?.emit('CLIENT_USER_JOIN', params.id, username)
		socket?.on('SERVER_USER_JOIN', (username: string) => {
			console.log(`${username} подключился`)

			const newMessage: IMessage = {
				userID: JSON.parse(localStorage.getItem('user')!).id,
				username: username,
				date: getDate(),
				msg: `${username} подключился`,
				type: 'join'
			}
			setChatContent([newMessage, ...chatContentRef.current])
		})

		socket?.on('SERVER_USER_DISCONNECT', (username: string) => {
			console.log(`${username} вышел`)

			const newMessage: IMessage = {
				userID: JSON.parse(localStorage.getItem('user')!).id,
				username: username,
				date: getDate(),
				msg: `${username} отключился`,
				type: 'disconnect'
			}
			setChatContent([newMessage, ...chatContentRef.current])
		})

		return () => {
			socket?.disconnect()
		}
	}, [socket, params.id])

	return (
		<div className="flex flex-col h-screen w-full bg-black">
			<Header />
			<div className="py-10 px-[15%] flex flex-col-reverse gap-5 flex-1 overflow-y-auto scrollbar-thumb-gray-700">
				{chatContent.map((msg: IMessage, index: number) => (
					<Message
						key={index}
						message={msg}
					/>
				))}
			</div>
			<Footer />
		</div>
	)
}
