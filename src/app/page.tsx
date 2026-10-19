'use client'

import { useState } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import Button, { ButtonType } from './components/Button'
import Modal from './components/Modal'

export default function Home() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [buttonType, setButtonType] = useState<ButtonType>('Create')

	return (
		<div className="h-screen flex justify-center items-center bg-black">
			<div className="h-[50%] w-100 p-5 flex flex-col items-center justify-center">
				<FiMessageCircle
					size={60}
					color="white"
					className="p-3 border rounded-[100%] border-gray-500"
				/>
				<p className="mt-8 text-gray-400">Tune in and start talking</p>
				<p className="mt-5 text-center text-gray-400">
					No accounts, no history. Pick a name, create a room, or join with a code.
				</p>
				<Button
					type="Create"
					isOpen={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					setButtonType={setButtonType}
				/>
				<Button
					type="Join"
					isOpen={isOpenModal}
					setIsOpenModal={setIsOpenModal}
					setButtonType={setButtonType}
				/>
				<p className="text-center text-gray-400 text-[13px] mt-5">
					Rooms and messages last only while the tab is open.
				</p>
			</div>
			{isOpenModal && (
				<Modal
					isOpen={isOpenModal}
					setIsOpen={setIsOpenModal}
					buttonType={buttonType}
				/>
			)}
		</div>
	)
}