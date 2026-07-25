import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shashi Madan Public School | Chandausi',
  description: 'Welcome to Shashi Madan Public School (SMPS) - An inclusive community of lifelong learners run by the M.P. Singh Foundation in Chandausi, Sambhal, Uttar Pradesh.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1e1e2a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.className} antialiased`} style={{ fontFamily: inter.style.fontFamily }}>
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
