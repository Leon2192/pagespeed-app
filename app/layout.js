import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Solution PageSpeed App ',
  description: 'Mayorista de informatica y telecomunicaciones',
  manifest: '/manifest.json',
  icons: { apple: "/apple-touch-icon.png" },
  themeColor: '#000000'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
