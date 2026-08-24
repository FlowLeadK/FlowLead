import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GlowBackground from "@/components/GlowBackground";

// 구글 폰트(Geist Sans, Geist Mono) 설정
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 뷰포트 설정 (Next.js 권장 규격 분리)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070e",
};

// 웹사이트 메타데이터 및 SEO 설정
export const metadata: Metadata = {
  title: "NEOSPHERE — 트렌디한 다크모드 인터랙티브 플랫폼",
  description: "Next.js와 Tailwind CSS, 물리 기반 스무스 스크롤 및 Framer Motion으로 완성된 차세대 다크모드 웹 플랫폼",
  keywords: ["Next.js", "TailwindCSS", "Dark Mode", "Smooth Scroll", "Framer Motion", "E-Book", "Interactive UI"],
  authors: [{ name: "NEOSPHERE Team" }],
};

/**
 * RootLayout 컴포넌트:
 * - 웹 애플리케이션의 최상위 레이아웃
 * - Lenis 부드러운 스크롤 및 마우스 추적 네온 오로라 배경을 전역에 적용합니다.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#05070e] text-[#f1f5f9] min-h-screen antialiased selection:bg-violet-600/30 selection:text-white`}
      >
        <SmoothScroll>
          {/* 인터랙티브 마우스 스포트라이트 및 은은한 오로라 배경 */}
          <GlowBackground />
          
          {/* 페이지 메인 컨텐츠 영역 */}
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
