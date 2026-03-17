import './globals.css'
import { DM_Serif_Display, Rubik } from 'next/font/google'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: 'Krushi Mitr',
  description: 'Mandi prices for farmers + MSME credit scorer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  )
}