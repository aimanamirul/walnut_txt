import './globals.css'
import { Rubik } from 'next/font/google'

const mainFont = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'walnut_txt',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  )
}
