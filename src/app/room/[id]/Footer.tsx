'use client'

import { useMessageContext } from '@/app/context/MessageContext'
import { ChangeEvent } from 'react'
import SendButton from './SendButton'

export default function Footer() {
	const { message, setMessage } = useMessageContext()

	const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
		setMessage({ msg: e.target.value!, username: '', date: '' })

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
