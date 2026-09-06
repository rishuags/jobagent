import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
} from "next/font/google";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "JobAgent",
  description:
    "AI-powered career intelligence based on real job market demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geist.variable}
          ${geistMono.variable}
          ${pressStart.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}