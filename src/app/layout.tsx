import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vivienda 2 Hab Santutxu',
  description:
    'Apartamento de 2 habitaciones en Santutxu, Bilbao. Reformado, amueblado y bien comunicado.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/message/T7MRHP2DZ2VJD1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          className="whatsapp-float-btn"
        >
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            width={40}
            height={40}
            style={{ display: 'block' }}
            priority
          />
        </a>
      </body>
    </html>
  );
}


