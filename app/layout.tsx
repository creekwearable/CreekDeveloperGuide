import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://creek-developer-guide.beanhy1714.chatgpt.site'),
  title: 'Creek 开发者中心',
  description: '面向 Android、iOS、Flutter 和 HarmonyOS 的 Creek SDK 开发指南。',
  openGraph: {
    title: 'Creek 开发者中心',
    description: 'Android · iOS · Flutter · HarmonyOS SDK 开发指南',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Creek 开发者中心' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creek 开发者中心',
    description: 'Android · iOS · Flutter · HarmonyOS SDK 开发指南',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
