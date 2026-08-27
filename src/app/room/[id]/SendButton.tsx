'use client'

import { IMessage } from '@/app/context/MessageContext'
import { RiSendInsLine } from 'react-icons/ri'

interface SendButtonProps {
	message: IMessage
	sendMessage: () => void
}

export default function SendButton({ message, sendMessage }: SendButtonProps) {
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
