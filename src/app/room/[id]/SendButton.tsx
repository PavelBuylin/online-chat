'use client'

import { IMessage, useMessageContext } from '@/app/context/MessageContext'
import { getDate } from '@/methods/getDate'
import { RiSendInsLine } from 'react-icons/ri'

interface SendButtonProps {
	message: IMessage
}

export default function SendButton({ message }: SendButtonProps) {
	const { setChatContent, chatContent, setMessage } = useMessageContext()
	const sendMessage = () => {
		setMessage({ ...message, msg: message.msg })
		const newMessage: IMessage = {
			userID: JSON.parse(localStorage.getItem('user')!).id,
			username: JSON.parse(localStorage.getItem('user')!).name,
			date: getDate(),
			msg: message.msg,
			type: 'default'
		}
		setChatContent([newMessage, ...chatContent])
		setMessage({ userID: '', username: '', date: '', msg: '' })
	}

	return (
		<button
			className={`${!message.msg ? 'bg-gray-500 cursor-not-allowed' : 'bg-white'} p-2 rounded-2xl cursor-pointer`}
			onClick={() => sendMessage()}
			disabled={!message.msg}
		>
			<RiSendInsLine
				size={30}
				color="black"
			/>
		</button>
	)
}
