import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourWallet Swap Dokümantasyonu',
  description: 'YourWallet Swap API ve Mobil Uygulama Dokümantasyonu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
