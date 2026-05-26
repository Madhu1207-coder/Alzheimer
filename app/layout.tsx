import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
export const metadata: Metadata = {
  title: 'NeuroJarvis CDSS - AI-Powered Alzheimer\'s Detection',
  description: 'Clinical Decision Support System for Early Alzheimer\'s Disease Detection Using Multi-Modal Biomarker Integration',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#243146',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
     <body className="min-h-screen antialiased bg-white text-slate-900">
        <LanguageProvider>
          <div className="w-full">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}