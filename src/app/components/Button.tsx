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
	password?: string
}

export default function Button({
	type,
	setIsOpenModal,
	setButtonType,
	name,
	password
}: ButtonProps) {
	const router = useRouter()

	const pushToNewRoom = (e: MouseEvent<HTMLButtonElement>) => {
		const code = nanoid(15)

		e.preventDefault()
		router.push(`/room/${code}`)
	}

	return (
		<button
			onClick={(e: MouseEvent<HTMLButtonElement>) => {
				setIsOpenModal !== undefined && setIsOpenModal(true)
				setButtonType !== undefined && setButtonType(type)

				if (name?.trim() === '' || password?.trim() === '') {
					alert('Введите данные!')
				} else if (name?.length! < 4) {
					alert('Имя должно содержать не менее 4 символов!')
				} else if (password?.length! < 8) {
					alert('Пароль должен содержать не менее 8 символов!')
				} else if (type === 'NextCreate') {
					const user = {
						id: nanoid(5),
						name,
						password
					}
					localStorage.setItem('user', JSON.stringify(user))
					pushToNewRoom(e)
				}
			}}
			className={`p-2 mt-5 w-50 rounded-[10px] cursor-pointer 
          ${type === 'Create' || type === 'NextCreate' || type === 'NextJoin' ? 'bg-white text-black' : 'border border-gray-500/40'}`}
		>
			{(type === 'Create' && 'Создать комнату') ||
				(type === 'Join' && 'Войти по коду') ||
				(type === 'NextCreate' && 'Продолжить') ||
				(type === 'NextJoin' && 'Продолжить')}
		</button>
	)
}
