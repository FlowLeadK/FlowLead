"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, BookOpen, Star, Cpu, Play, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * Hero 컴포넌트:
 * - 랜딩 페이지의 첫인상을 결정짓는 강력하고 화려한 다크모드 히어로 섹션입니다.
 * - Framer Motion의 staggerChildren 및 3D 틸트 호버 인터랙션 적용
 * - CTA 클릭 시 인터랙티브 컨페티 효과 발생
 */
export default function Hero() {
  // CTA 버튼 클릭 시 화려한 폭죽(Confetti) 효과 실행
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981"],
    });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 1. 상단 텍스트 및 CTA 영역 */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          
          {/* 반짝이는 상단 배지 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/30 text-xs text-violet-300 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span className="font-medium tracking-wide">차세대 다크모드 & 인터랙티브 디지털 플랫폼</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          {/* 메인 헤드라인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            경계를 뛰어넘는 <br className="hidden sm:inline" />
            <span className="text-gradient-purple-cyan drop-shadow-[0_10px_35px_rgba(139,92,246,0.35)]">
              몰입형 디지털 인터랙션
            </span>
          </motion.h1>

          {/* 서브 문구 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-gray-300 max-w-2xl font-light leading-relaxed"
          >
            Next.js와 Tailwind CSS, 그리고 정교한 모션 엔진으로 구축된 차세대 UI. 
            스크롤과 함께 펼쳐지는 매끄러운 시각적 경험을 만나보세요.
          </motion.p>

          {/* CTA 버튼 그룹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
          >
            <button
              onClick={triggerConfetti}
              className="relative w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 via-cyan-500 to-indigo-600 text-white font-semibold text-base shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>지금 무료로 탐색하기</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#showcase"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-gray-200 hover:text-white font-medium text-base border border-white/10 backdrop-blur-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              <span>라이브 데모 보기</span>
            </a>
          </motion.div>

          {/* 소셜 증명 배지 리스트 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-gray-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>무설치 웹 즉시 체험</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>초고속 부드러운 스크롤 (60fps+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9 / 5.0 만족도</span>
            </div>
          </motion.div>
        </div>

        {/* 2. 하단 3D 인터랙티브 글래스 쇼케이스 프리뷰 */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="mt-14 relative mx-auto max-w-5xl"
        >
          {/* 카드 뒤쪽의 네온 아우라 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-cyan-500 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 -z-10" />

          {/* 메인 쇼케이스 프레임 */}
          <div className="relative rounded-2xl bg-[#090e1c]/90 border border-white/15 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
            
            {/* 윈도우 타이틀 바 */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-violet-400" />
                  neosphere-runtime.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● LIVE RUNNING
                </span>
              </div>
            </div>

            {/* 메인 쇼케이스 내용 (코드 + 비주얼 그리드) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              
              {/* 왼쪽: 에디터 및 코드 스니펫 */}
              <div className="lg:col-span-7 font-mono text-xs text-gray-300 bg-[#05070e]/80 rounded-xl p-4 border border-white/5 space-y-2 overflow-x-auto">
                <div className="flex items-center justify-between text-gray-500 border-b border-white/5 pb-2 mb-2">
                  <span>Interactive Engine v3.4</span>
                  <span className="text-cyan-400">TypeScript</span>
                </div>
                <p><span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">createMotionCanvas</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@neosphere/core&quot;</span>;</p>
                <p><span className="text-purple-400">import</span> &#123; <span className="text-cyan-300">SmoothScroller</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@neosphere/physics&quot;</span>;</p>
                <p className="text-gray-500">// Initialize ultra-responsive dark-mode runtime</p>
                <p><span className="text-blue-400">export const</span> <span className="text-yellow-300">experience</span> = <span className="text-cyan-300">createMotionCanvas</span>(&#123;</p>
                <p className="pl-4">theme: <span className="text-emerald-300">&quot;cyber-neon-dark&quot;</span>,</p>
                <p className="pl-4">fpsTarget: <span className="text-orange-400">120</span>,</p>
                <p className="pl-4">ambientLighting: <span className="text-purple-400">true</span>,</p>
                <p className="pl-4">smoothPhysics: <span className="text-blue-400">new</span> <span className="text-yellow-300">SmoothScroller</span>(&#123; damping: <span className="text-orange-400">0.85</span> &#125;),</p>
                <p>&#125;);</p>
                <p className="text-cyan-400 pt-2 flex items-center gap-2">
                  <span className="animate-pulse">▶</span> Ready. 0 errors detected.
                </p>
              </div>

              {/* 오른쪽: 라이브 비주얼 인터랙티브 카드 */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/40 via-purple-900/20 to-cyan-950/40 border border-violet-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Cpu className="w-16 h-16 text-cyan-400" />
                  </div>
                  <div className="text-xs text-violet-300 font-semibold mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    디지털 E-Book 인터랙티브 뷰어
                  </div>
                  <div className="text-lg font-bold text-white mb-2">실시간 3D 페이지 전환</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    페이지 넘김 시 물리 기반 회전 셰이더와 글래스모피즘 텍스처를 적용하여 종이보다 실감나는 독서 경험을 제공합니다.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] text-gray-400 mb-1">인터랙션 반응속도</div>
                    <div className="text-xl font-black text-cyan-400 font-mono">0.016s</div>
                    <div className="text-[10px] text-emerald-400 mt-1">↑ 99.4% 더 빠름</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] text-gray-400 mb-1">렌더링 효율</div>
                    <div className="text-xl font-black text-violet-400 font-mono">60+ FPS</div>
                    <div className="text-[10px] text-cyan-400 mt-1">GPU 하드웨어 가속</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
