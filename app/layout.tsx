import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const Pretendard = localFont({
  src: "../public/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaemoon99.github.io/"),
  title: "Jaemoon's Portfolio",
  description: "개인 포트폴리오 웹사이트입니다. 저의 경험, 프로젝트, 스킬을 소개합니다.",
  generator: "v0.app",
  openGraph: {
    title: "Jaemoon's Portfolio",
    description: "개인 포트폴리오 웹사이트입니다. 저의 경험, 프로젝트, 스킬을 소개합니다.",
    url: "/",
    type: "website",
    images: [
      {
        url: "https://jaemoon99.github.io/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Jaemoon's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaemoon's Portfolio",
    description: "개인 포트폴리오 웹사이트입니다. 저의 경험, 프로젝트, 스킬을 소개합니다.",
    images: ["/og-banner.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${Pretendard.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}