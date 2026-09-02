import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project 1788382773577',
  description: 'An online marketplace and community hub for vinyl record collectors in Latin America, featuring catalog browsing, condition grading, collector profiles, and a tiered membership system for enthusiasts and shop owners.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0F0F0F', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
