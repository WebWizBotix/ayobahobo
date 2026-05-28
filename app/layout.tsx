/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: app/layout.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-05-25
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import CartDrawer from '@/components/CartDrawer'
import PaymentPopup from '@/components/PaymentPopup'
import AuthPopup from '@/components/AuthPopup'
import { Roboto_Slab, Playfair_Display } from 'next/font/google'
import BackButton from '@/components/BackButton'
import GlobalJukebox from '@/components/GlobalJukebox'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Ayoba Scrollytelling',
  description: 'Premium perfume experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__WWZ_SIGNATURE__ = "WWZ-AYOBA-SCROLLYTELLING-2026-911";
              console.log("Built by WebWizSystems \u2014 Signature: WWZ-AYOBA-SCROLLYTELLING-2026-911");
            `,
          }}
        />
      </head>
      <body className={`${robotoSlab.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          <BackButton />
          {children}
          <CartDrawer />
          <AuthPopup />
          <PaymentPopup />
          <GlobalJukebox />
        </CartProvider>
      </body>
    </html>
  )
}