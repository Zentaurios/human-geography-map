import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/providers/query-provider';
import { AppLayoutWrapper } from '@/components/layout/AppLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://humangeographymap.com'),
  title: 'Human Geography Map - Interactive World Explorer',
  description: 'Explore the world through an interactive geography map with countries, economic data, geographic features, and detailed information.',
  keywords: [
    'geography',
    'world map',
    'countries',
    'interactive map',
    'economic data',
    'geographic features',
    'education',
    'exploration'
  ],
  authors: [{ name: 'Human Geography Map' }],
  creator: 'Human Geography Map',
  publisher: 'Human Geography Map',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Human Geography Map - Interactive World Explorer',
    description: 'Explore the world through an interactive geography map with countries, economic data, and geographic features.',
    siteName: 'Human Geography Map',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Human Geography Map Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Human Geography Map - Interactive World Explorer',
    description: 'Explore the world through an interactive geography map with countries, economic data, and geographic features.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://humangeographymap.com',
    types: {
      'application/rss+xml': [
        { url: 'https://humangeographymap.com/news', title: 'Geography News RSS Feed' },
      ],
    },
  },
  category: 'education',
  classification: 'Educational Tool',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Basic meta tags */}
        <meta name="format-detection" content="telephone=no, address=no, email=no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Human Geography Map',
              url: 'https://humangeographymap.com',
              description: 'Interactive world explorer for learning human geography with countries, economic data, and geographic features.',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web Browser',
              creator: {
                '@type': 'Person',
                name: 'Human Geography Map Team'
              },
              educationalLevel: 'High School, College',
              educationalUse: 'Instruction, Study, Research',
              learningResourceType: 'Interactive Map, Educational Tool',
              audience: {
                '@type': 'Audience',
                audienceType: 'Students, Educators, Geography Enthusiasts'
              },
              about: {
                '@type': 'Subject',
                name: 'Human Geography'
              },
              keywords: 'geography, world map, countries, interactive map, education, human geography, demographics, economics',
              inLanguage: 'en-US',
              isAccessibleForFree: true,
              license: 'Educational Use'
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>
          <AppLayoutWrapper>
            {children}
          </AppLayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
