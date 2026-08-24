"use client";

import { Sparkles, Heart, Globe, MessageSquare, Share2 } from "lucide-react";

/**
 * Footer 컴포넌트:
 * - 에메랄드 바다빛 테마에 맞춘 깔끔하고 세련된 하단 푸터
 */
export default function Footer() {
  const footerNavigation = {
    product: [
      { name: "핵심 기능", href: "#features" },
      { name: "3D 쇼케이스", href: "#showcase" },
      { name: "오션 로드맵", href: "#timeline" },
      { name: "성과 지표", href: "#stats" },
    ],
    resources: [
      { name: "오션 디자인 시스템", href: "#" },
      { name: "Next.js 가이드", href: "#" },
      { name: "3D Page Flip 문서", href: "#" },
      { name: "Lenis 부드러운 스크롤", href: "#" },
    ],
    company: [
      { name: "소개", href: "#" },
      { name: "블로그", href: "#" },
      { name: "개인정보처리방침", href: "#" },
      { name: "이용약관", href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-cyan-400/20 bg-[#020b12] pt-16 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-cyan-400/15">
          
          {/* 1. 좌측 로고 및 설명 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#031522] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                AQUA<span className="text-gradient-emerald-ocean font-black">SPHERE</span>
              </span>
            </div>

            <p className="text-xs text-cyan-200/70 max-w-sm leading-relaxed">
              Next.js와 Tailwind CSS, 그리고 청량한 에메랄드빛 바다 감성으로 제작된 차세대 3D 인터랙티브 플랫폼입니다.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub 링크" 
                className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="커뮤니티 링크" 
                className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                aria-label="공유하기 링크" 
                className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. 링크 컬럼들 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">제품</h4>
            <ul className="space-y-2">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-xs text-cyan-300/70 hover:text-emerald-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">자료실</h4>
            <ul className="space-y-2">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-xs text-cyan-300/70 hover:text-emerald-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">회사</h4>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-xs text-cyan-300/70 hover:text-emerald-300 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 하단 카피라이트 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cyan-400/50 gap-4">
          <p>© 2026 AQUASPHERE Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 inline" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
