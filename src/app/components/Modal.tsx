'use client'

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Button, { ButtonType } from './Button'

interface ModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	buttonType: ButtonType
}

export default function Modal({ isOpen, setIsOpen, buttonType }: ModalProps) {
	const [name, setName] = useState<string | null>(() => {
		const savedUser = localStorage.getItem('user')
		if (!savedUser) return ''

		try {
			const parsed = JSON.parse(savedUser)
			return parsed?.name || ''
		} catch {
			return ''
		}
	})
	const [roomCode, setRoomCode] = useState<string>('')

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const handleChangeRoomCode = (e: ChangeEvent<HTMLInputElement>) => {
		setRoomCode(e.target.value)
	}

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
				isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div
				className="absolute inset-0"
				onClick={() => setIsOpen(false)}
			/>
			<div
				className={`relative w-full max-w-md rounded-xl bg-[#2d2d2d] p-6 shadow-xl transition-transform duration-300 ${
					isOpen ? 'scale-100' : 'scale-95'
				}`}
			>
				<button
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
				>
					&times;
				</button>
				<div className="mb-6">
					<h3 className="text-xl font-semibold text-white">{`${
						buttonType === 'Create'
							? 'New room'
							: buttonType === 'Join' && 'Enter by room code'
					}`}</h3>
					<input
						placeholder="Your name..."
						type="text"
						className="mt-3 text-white border border-white w-full rounded-[10px] outline-none p-2 text-2xl"
						onChange={handleChangeName}
						value={name!}
					/>
					{buttonType === 'Join' && (
						<input
							placeholder="Room code..."
							type="text"
							className="mt-3 text-white border border-white w-full rounded-[10px] outline-none p-2 text-2xl"
							onChange={handleChangeRoomCode}
							value={roomCode}
						/>
					)}
					<div className="flex justify-center">
						{buttonType === 'Create' && (
							<Button
								type="NextCreate"
								name={name!}
							/>
						)}
						{buttonType === 'Join' && (
							<Button
								type="NextJoin"
								name={name!}
								roomCode={roomCode}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
