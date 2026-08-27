import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { MessageContextProvider } from './providers/MessageContextProvider'
import { SocketContextProvider } from './providers/SocketContextProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Онлайн чат',
	description: 'Это онлайн чат, написанный при помощи Next JS, Socket.io и Socket.io-client',
	keywords: ['Next.js', 'React', 'SEO Optimization', 'Web Development', 'Sockets', 'Online chat'],
	icons: {
		icon: '/public/icon.ico',
		shortcut: '/public/shortcut.png'
	}
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<MessageContextProvider>
					<SocketContextProvider>{children}</SocketContextProvider>
				</MessageContextProvider>
			</body>
		</html>
	)
}
