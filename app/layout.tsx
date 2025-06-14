import type { Metadata } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-sans-thai',
});

export const metadata: Metadata = {
  title: 'Calorie Diary - Track Your Health Journey',
  description:
    'A modern calorie tracking and wellness application with Thai language support. Track calories, monitor activity, and achieve your health goals.',
  keywords: ['calorie tracker', 'health', 'wellness', 'diet', 'fitness', 'thai food'],
  authors: [{ name: 'Calorie Diary Team' }],
  openGraph: {
    title: 'Calorie Diary',
    description: 'Track your health journey with our comprehensive calorie and wellness app',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansThai.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
