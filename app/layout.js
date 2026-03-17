import './globals.css'

export const metadata = {
  title: 'Krushi Mitr',
  description: 'Mandi prices for farmers + MSME credit scorer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}