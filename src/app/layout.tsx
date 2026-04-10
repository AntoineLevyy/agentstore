import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Store — The App Store for AI Agents",
  description:
    "Discover, compare, and find the best AI agents for any task. The marketplace for AI agents.",
  openGraph: {
    title: "Agent Store — The App Store for AI Agents",
    description:
      "Discover, compare, and find the best AI agents for any task. The marketplace for AI agents.",
    type: "website",
    siteName: "Agent Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Store — The App Store for AI Agents",
    description:
      "Discover, compare, and find the best AI agents for any task. The marketplace for AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#08090a] font-[family-name:var(--font-inter)]">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
