'use client'

import { useState } from 'react'
import { IMessage, MessageContext } from '../context/MessageContext'

interface Props {
	children: React.ReactNode
}

export const MessageContextProvider = ({ children }: Props) => {
	const [message, setMessage] = useState<IMessage>({} as IMessage)
	const [chatContent, setChatContent] = useState<IMessage[]>([])

	return (
		<MessageContext.Provider value={{ message, setMessage, chatContent, setChatContent }}>
			{children}
		</MessageContext.Provider>
	)
}
