'use client'

import HumanTyping from '@/app/components/HumanTyping'
import { useMessageContext } from '@/app/context/MessageContext'
import { useParams, useRouter } from 'next/navigation'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegCopy } from 'react-icons/fa6'
import Pulse from './Pulse'

export default function Header() {
	const { setChatContent } = useMessageContext()

	const params = useParams()
	const router = useRouter()

	return (
		<header className="border-b border-gray-500/35 h-15 p-4 grid grid-cols-3">
			<div className="flex items-center gap-3">
				<div className="w-10 flex justify-center">
					<Pulse />
				</div>
				<p className="inStream mr-5 text-green-500">В эфире</p>
				<strong className='roomID text-white'>{params.id}</strong>
				<CopyToClipboard text={params.id as string}>
					<FaRegCopy color='white' className="cursor-pointer" />
				</CopyToClipboard>
			</div>
			<HumanTyping />
			<strong
				className="ml-auto text-red-600 cursor-pointer flex items-center"
				onClick={() => {
					router.push('/')
					setChatContent([])
				}}
			>
				Выйти
			</strong>
		</header>
	)
}
