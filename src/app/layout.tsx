import type { Metadata } from "next";
import { Instrument_Sans } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Experience",
  description: "Professional experience showcase",
};

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
