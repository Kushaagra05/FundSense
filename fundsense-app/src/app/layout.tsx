import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FundSense — Mutual Fund Analyzer",
  description: "Track, analyze, and compare mutual funds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-900 text-white m-0 p-0 overflow-x-hidden pt-[80px]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
