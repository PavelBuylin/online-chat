'use client'

import { useState } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import Button, { ButtonType } from './components/Button'
import Modal from './components/Modal'

export default function Home() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [buttonType, setButtonType] = useState<ButtonType>('Create')

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="h-[50%] w-100 p-5 flex flex-col items-center justify-center">
				<FiMessageCircle
					size={60}
					color="gray"
					className="p-3 border-1 rounded-[100%] border-gray-500"
				/>
				<p className="mt-8">Настройся на частоту и говори</p>
				<p className="mt-5 text-center text-gray-400">
					Без аккаунтов и истории. Придумай имя, создай комнату или зайди по коду.
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
					Комната и сообщения живут, пока открыта вкладка.
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
