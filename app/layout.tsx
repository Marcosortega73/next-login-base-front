import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Profesionales Confiables',
	description: 'App de profesionales confiables',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body className="w-[100wh] h-[100vh]">{children}</body>
		</html>
	)
}
