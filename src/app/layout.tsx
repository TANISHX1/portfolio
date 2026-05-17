import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jbMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'TANXOS | Tanish Shivhare',
  description: 'System Programming & OS Concentrated Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jbMono.variable}`}>
      <body className="bg-black text-green-500 font-mono antialiased">
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
