import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import BottomNav from '@/components/BottomNav'
import { Geist, Geist_Mono, Space_Grotesk, Syne, Bebas_Neue, Cinzel } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
})

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: '400',
  subsets: ['latin'],
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Traveloop - Clerk Next.js Auth',
  description: 'Travel planner powered by Next.js and Clerk',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${spaceGrotesk.variable} ${syne.variable} ${bebasNeue.variable} ${cinzel.variable} antialiased bg-black text-white`}>
        <ClerkProvider>
          <header className="flex justify-between items-center p-4 gap-4 h-16 border-b border-white/10 bg-[#0B1120]">
            <div className="font-bold text-[#14b8a6] text-xl tracking-wider">TRAVELOOP</div>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton mode="modal" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          <main className="pb-20">
            {children}
          </main>
          <BottomNav />
        </ClerkProvider>
      </body>
    </html>
  )
}
