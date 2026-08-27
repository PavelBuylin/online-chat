'use client'

import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { Dispatch, MouseEvent, SetStateAction } from 'react'

export type ButtonType = 'Create' | 'Join' | 'NextCreate' | 'NextJoin'

interface ButtonProps {
	type: ButtonType
	isOpen?: boolean
	setIsOpenModal?: Dispatch<SetStateAction<boolean>>
	setButtonType?: Dispatch<SetStateAction<ButtonType>>
	name?: string
	roomCode?: string
}

export default function Button({
	type,
	setIsOpenModal,
	setButtonType,
	name,
	roomCode
}: ButtonProps) {
	const router = useRouter()

	const pushToNewRoom = (e: MouseEvent<HTMLButtonElement>) => {
		const code = nanoid(15)

		e.preventDefault()
		router.push(`/room/${code}`)
	}

	const validateData = (): boolean => {
		if (name?.length! < 4) {
			alert('Имя должно содержать не менее 4 символов!')
			return false
		}
		return true
	}

	const createUser = () => {
		const user = {
			id: nanoid(5),
			name
		}
		localStorage.setItem('user', JSON.stringify(user))
	}

	return (
		<button
			onClick={(e: MouseEvent<HTMLButtonElement>) => {
				setIsOpenModal !== undefined && setIsOpenModal(true)
				setButtonType !== undefined && setButtonType(type)

				switch (type) {
					case 'NextCreate':
						if (validateData()) {
							createUser()
							pushToNewRoom(e)
							break
						}
						break
					case 'NextJoin':
						if (validateData()) {
							if (roomCode?.trim() === '') {
								alert('Введите данные!')
								break
							} else {
								createUser()
								router.push(`/room/${roomCode}`)
								break
							}
						}
						break
				}
			}}
			className={`p-2 mt-5 w-50 rounded-[10px] cursor-pointer text-white
          ${type === 'Create' || type === 'Join' ? 'border border-gray-500/40 ' : 'border'}`}
		>
			{(type === 'Create' && 'Создать комнату') ||
				(type === 'Join' && 'Войти по коду') ||
				(type === 'NextCreate' && 'Продолжить') ||
				(type === 'NextJoin' && 'Продолжить')}
		</button>
	)
}
