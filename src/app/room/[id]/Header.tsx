'use client'

import { useMessageContext } from '@/app/context/MessageContext'
import { useParams, useRouter } from 'next/navigation'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegCopy } from 'react-icons/fa6'
import Pulse from './Pulse'

export default function Header() {
	const params = useParams()
	const router = useRouter()

	const { setChatContent } = useMessageContext()

	return (
		<header className="border-b border-gray-500/35 h-15 p-5 grid grid-cols-2">
			<div className="flex items-center gap-3">
				<div className="w-10 flex justify-center">
					<Pulse />
				</div>
				<p className="mr-5 text-green-500">В эфире</p>
				<strong>{params.id}</strong>
				<CopyToClipboard text={params.id as string}>
					<FaRegCopy className="cursor-pointer" />
				</CopyToClipboard>
			</div>
			<strong
				className="ml-auto text-red-600 cursor-pointer"
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
