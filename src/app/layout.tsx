import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GlowBackground from "@/components/GlowBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03131e",
};

export const metadata: Metadata = {
  title: "AQUASPHERE — 에메랄드빛 바다 3D 인터랙티브 플랫폼",
  description: "Next.js와 Tailwind CSS, 에메랄드빛 바다 감성과 3D 책장 넘김 물리 엔진으로 완성된 차세대 인터랙티브 웹 플랫폼",
  keywords: ["Next.js", "TailwindCSS", "Ocean Theme", "Emerald Lagoon", "Smooth Scroll", "3D Page Flip", "E-Book"],
  authors: [{ name: "AQUASPHERE Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#03131e] text-[#e0f2fe] min-h-screen antialiased selection:bg-emerald-500/35 selection:text-white`}
      >
        <SmoothScroll>
          {/* 청량한 에메랄드 바다 오로라 배경 */}
          <GlowBackground />
          
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
