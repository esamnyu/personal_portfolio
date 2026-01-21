import './globals.css';
import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Ethan Sam - Portfolio',
  description: 'AI Security Engineer & Software Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}