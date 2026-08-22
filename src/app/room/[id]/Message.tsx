'use client'

import { IMessage } from '@/app/context/MessageContext'
import { LuDot } from 'react-icons/lu'

interface MessageProps {
	message: IMessage
}

export default function Message({ message }: MessageProps) {
	const user = JSON.parse(localStorage.getItem('user')!)

	const isMe = (): boolean => (user.id === message.userID ? true : false)
	return (
		<>
			{message.type === 'default' && (
				<div className={`msg ${isMe() ? 'ml-auto' : ''}`}>
					<div className={`flex items-center text-gray-500/65 ${isMe() && 'justify-end'}`}>
						<p>{isMe() ? 'Ты' : message.username}</p>
						<LuDot />
						<p>{message.date}</p>
					</div>
					<div
						className={`w-fit min-w-10 max-w-100 rounded-tl-2xl rounded-tr-2xl ${!isMe() ? 'border border-gray-500/35 p-2 pr-4  rounded-br-2xl rounded-bl-[5px]' : 'bg-blue-600/65 p-2 pr-4  rounded-br-[5px] rounded-bl-2xl'}`}
					>
						<p className="wrap-break-word">{message.msg}</p>
					</div>
				</div>
			)}{' '}
			{message.type === 'join' && (
				<div className="flex justify-center items-center text-gray-500">
					<p>{message.msg}</p>
					<LuDot />
					<p>{message.date}</p>
				</div>
			)}
			{message.type === 'disconnect' && (
				<div className="flex justify-center items-center text-gray-500">
					<p>{message.msg}</p>
					<LuDot />
					<p>{message.date}</p>
				</div>
			)}
		</>
	)
}
