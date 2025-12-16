import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { noyh } from './font';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Viewport configuration for better mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: '2 ODDS - The Future of Betting',
  description:
    'Join the most exclusive crypto betting platform. Experience cutting-edge technology, unbeatable odds, and premium high rewards.',
  keywords: ['crypto betting', 'sports betting', 'odds', 'p2p', 'blockchain', 'cryptocurrency'],
  authors: [{ name: 'Two Odds' }],
  openGraph: {
    title: '2 ODDS - The Future of Betting',
    description: 'Join the most exclusive crypto betting platform with unbeatable odds.',
    url: 'https://two-odds.com',
    siteName: '2 ODDS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '2 ODDS Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 ODDS - The Future of Betting',
    description: 'Join the most exclusive crypto betting platform with unbeatable odds.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body
      suppressHydrationWarning
      className="antialiased pt-15 md:pt-20 lg:pt-15"
    >
      {children}
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${noyh.variable} scroll-smooth`}
    >
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
