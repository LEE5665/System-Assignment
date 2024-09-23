import NavBar from '@/componets/NavBar';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'AMP',
  description: '출석 관리 웹사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <NavBar />
      <body>{children}</body>
    </html>
  );
}
