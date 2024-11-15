// app/layout.tsx

// This is a server component
export const metadata = {
  title: 'Recession Assistance Program',
  description: 'Support for individuals and small businesses during the great U.S recession.',
};

import './globals.css';
import { Inter } from 'next/font/google';
import RootLayout from './RootLayout';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout inter={inter}>
      {children}
    </RootLayout>
  );
}
