'use client'

import HumanTyping from '@/app/components/HumanTyping'
import { useMessageContext } from '@/app/context/MessageContext'
import { useSocketContext } from '@/app/context/SocketContext'
import { useParams, useRouter } from 'next/navigation'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegCopy } from 'react-icons/fa6'
import SimplePeer from 'simple-peer'
import Pulse from './Pulse'

export default function Header() {
	const { setChatContent } = useMessageContext()
	const { socket } = useSocketContext()!

	const params = useParams()
	const router = useRouter()

	const joinToVoice = () => {
		navigator.mediaDevices
			.getUserMedia({
				audio: true
			})
			.then(stream => {
				const peerIncome = new SimplePeer({ initiator: true, trickle: false, stream })
				const peerOutcome = new SimplePeer({ trickle: false })

				socket?.emit('CLIENT_VOICE_USER_JOIN', params.id)

				socket?.on('SERVER_VOICE_USER_JOIN', data => {
					console.log(data)
				})

				peerIncome.on('signal', data => {
					socket?.emit('CLIENT_USER_CALL', data, params.id)
				})
				socket?.on('SERVER_USER_CALL', data => {
					peerOutcome.signal(JSON.stringify(data))
					console.log('SIGNAL', JSON.stringify(data))
				})

				// peerIncome.on('signal', data => {
				// 	socket?.emit('CLIENT_USER_CALL', data, params.id)
				// })

				// socket?.on('SERVER_USER_CALL', data => {
				// 	peerOutcome.signal(JSON.stringify(data))
				// 	console.log('SIGNAL', JSON.stringify(data))
				// })

				// peerOutcome.on('signal', data => {
				// 	socket?.emit('CLIENT_USER_ANSWER', data, params.id)
				// })

				// socket?.on('SERVER_USER_ANSWER', data => {
				// 	peerIncome.signal(JSON.stringify(data))
				// 	console.log('ANSWER', JSON.stringify(data))

				// 	// peerOutcome.on('connect', () => {
				// 	// 	console.log('Connected 2')
				// 	// })

				// 	peerOutcome.on('stream', stream => {
				// 		var audio = document.querySelector('audio')
				// 		audio!.srcObject = stream

				// 		audio!.play()
				// 	})

				// 	// peerIncome.on('connect', () => {
				// 	// 	console.log('Connected 1')
				// 	// })
				// })
			})
			.catch(e => {
				console.log(e)
			})
	}

	const leaveFromVoice = () => {}

	return (
		<header className="border-b border-gray-500/35 h-15 p-4 grid grid-cols-3">
			<div className="flex items-center gap-3">
				<div className="w-10 flex justify-center">
					<Pulse />
				</div>
				<p className="inStream mr-5 text-green-500">In live</p>
				<strong className="roomID text-white">{params.id}</strong>
				<CopyToClipboard text={params.id as string}>
					<FaRegCopy
						color="white"
						className="cursor-pointer"
					/>
				</CopyToClipboard>
				<div className="flex gap-2 text-black">
					<button
						className="bg-white p-1.25 rounded cursor-pointer"
						onClick={joinToVoice}
					>
						Join
					</button>
					<button
						className="bg-white p-1.25 rounded cursor-pointer"
						onClick={leaveFromVoice}
					>
						Leave
					</button>
					<audio controls />
				</div>
			</div>
			<HumanTyping />
			<strong
				className="ml-auto text-red-600 cursor-pointer flex items-center"
				onClick={() => {
					router.push('/')
					setChatContent([])
				}}
			>
				Exit
			</strong>
		</header>
	)
}
