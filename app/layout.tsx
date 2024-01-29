import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Context Translate",
  description: "Translate phrases with context",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col items-center`}>
        <h1 className="text-5xl font-bold mt-4">Context Translate</h1>
        {children}
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2">Built by <a href="https://www.olliecookie.com" className="underline" target="_blank">Ollie Cook</a>&#x1f36a;</p>
        <Analytics />
      </body>
    </html>
  );
}
