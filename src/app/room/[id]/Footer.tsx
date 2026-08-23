'use client'

import { useMessageContext } from '@/app/context/MessageContext'
import { useSocketContext } from '@/app/context/SocketContext'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import SendButton from './SendButton'

export default function Footer() {
	const { socket } = useSocketContext()!
	const { message, setMessage } = useMessageContext()
	const [username, setUsername] = useState<string | null>(null)

	const params = useParams()

	useEffect(() => {
		setUsername(JSON.parse(localStorage.getItem('user')!).name)
	}, [])

	const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
		if (message.msg !== '') socket?.emit('CLIENT_USER_TYPING', username, e.target.value, params.id)

		setMessage({ msg: e.target.value!, username: username!, date: '' })
	}

	return (
		<footer className="mt-auto border-t border-gray-500/35 h-15 p-13 flex justify-center items-center gap-5">
			<input
				placeholder="Сообщение..."
				type="text"
				className="border border-gray-500/35 w-[70%] rounded-[10px] outline-none p-2 text-2xl"
				onChange={handleChangeMessage}
				value={message.msg ?? ''}
			/>
			<SendButton message={message} />
		</footer>
	)
}
