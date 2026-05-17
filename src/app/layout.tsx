import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentstore — The Complete Directory of Consumer AI Apps",
  description:
    "Every AI app for real life in one place. Career, health, finance, relationships, travel, shopping & more. Reviews, pricing, and what each app actually does for you.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Agentstore — The Complete Directory of Consumer AI Apps",
    description:
      "Every AI app for real life in one place. Career, health, finance, relationships, travel, shopping & more.",
    type: "website",
    siteName: "Agentstore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentstore — The Complete Directory of Consumer AI Apps",
    description:
      "Every AI app for real life in one place. Career, health, finance, relationships, travel, shopping & more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#fafafa] font-[family-name:var(--font-inter)]">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
