'use client'

import { createContext, useContext } from 'react'

type MessageType = 'default' | 'join' | 'disconnect'

export interface IMessage {
	type?: MessageType
	userID?: string
	username: string
	date: string | number
	msg: string
}

export interface MessageContent {
	message: IMessage
	setMessage: (m: IMessage) => void
	chatContent: IMessage[]
	setChatContent: (m: IMessage[]) => void
}

export const MessageContext = createContext<MessageContent>({} as MessageContent)
export const useMessageContext = () => useContext(MessageContext)
