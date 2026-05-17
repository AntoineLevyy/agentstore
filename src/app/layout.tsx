import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consumer AI — Find AI Apps That Actually Help Your Life",
  description:
    "Discover 89+ AI apps for real life: career, health, finance, relationships, travel, shopping & more. Honest reviews, pricing, and what each app actually does for you.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Consumer AI — Find AI Apps That Actually Help Your Life",
    description:
      "Discover 89+ AI apps for real life: career, health, finance, relationships, travel, shopping & more.",
    type: "website",
    siteName: "Consumer AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consumer AI — Find AI Apps That Actually Help Your Life",
    description:
      "Discover 89+ AI apps for real life: career, health, finance, relationships, travel, shopping & more.",
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
