"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, BookOpen, Star, Waves, Play, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * Hero 컴포넌트:
 * - 청량한 에메랄드빛 바다(Ocean Emerald & Cyan) 테마의 메인 히어로 섹션
 * - 아쿠아 그라디언트 텍스트 및 오션 파티클 폭죽
 */
export default function Hero() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#38bdf8", "#34d399"],
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs text-emerald-300 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-medium tracking-wide">에메랄드빛 바다의 청량함과 인터랙티브 기술의 결합</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>

          {/* 메인 헤드라인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            푸른 파도처럼 넘실대는 <br className="hidden sm:inline" />
            <span className="text-gradient-emerald-ocean drop-shadow-[0_10px_35px_rgba(16,185,129,0.35)]">
              몰입형 디지털 오션 인터랙션
            </span>
          </motion.h1>

          {/* 서브 문구 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-cyan-100/90 max-w-2xl font-light leading-relaxed"
          >
            에메랄드빛 바다를 닮은 시원하고 맑은 감성. 
            Next.js와 부드러운 3D 물리 책장 넘김으로 완성된 독보적인 웹 경험을 만나보세요.
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
              className="relative w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>지금 무료로 탐색하기</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#showcase"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-cyan-500/10 text-cyan-100 hover:text-white font-medium text-base border border-cyan-400/20 backdrop-blur-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>3D E-Book 체험하기</span>
            </a>
          </motion.div>

          {/* 소셜 증명 배지 리스트 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-cyan-200/70"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>에메랄드빛 크리스탈 UI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>실시간 3D 책장 넘김</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.98 / 5.0 만족도</span>
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
          {/* 카드 뒤쪽의 에메랄드 아우라 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 -z-10" />

          {/* 메인 쇼케이스 프레임 */}
          <div className="relative rounded-2xl bg-[#062134]/90 border border-cyan-400/25 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
            
            {/* 윈도우 타이틀 바 */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-400/15">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-cyan-200/70 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  aquasphere-ocean-runtime.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  ● OCEAN LIVE
                </span>
              </div>
            </div>

            {/* 메인 쇼케이스 내용 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              
              {/* 왼쪽: 에디터 및 코드 스니펫 */}
              <div className="lg:col-span-7 font-mono text-xs text-cyan-100 bg-[#03131e]/90 rounded-xl p-4 border border-cyan-400/15 space-y-2 overflow-x-auto">
                <div className="flex items-center justify-between text-cyan-400/60 border-b border-cyan-400/10 pb-2 mb-2">
                  <span>Ocean Physics Canvas v2.6</span>
                  <span className="text-emerald-400">TypeScript</span>
                </div>
                <p><span className="text-emerald-400">import</span> &#123; <span className="text-cyan-300">createOceanCanvas</span> &#125; <span className="text-emerald-400">from</span> <span className="text-teal-300">&quot;@aquasphere/fluid&quot;</span>;</p>
                <p><span className="text-emerald-400">import</span> &#123; <span className="text-cyan-300">Book3DShader</span> &#125; <span className="text-emerald-400">from</span> <span className="text-teal-300">&quot;@aquasphere/3d&quot;</span>;</p>
                <p className="text-cyan-500/70">// Crystal emerald lagoon rendering</p>
                <p><span className="text-sky-400">export const</span> <span className="text-yellow-300">oceanEngine</span> = <span className="text-cyan-300">createOceanCanvas</span>(&#123;</p>
                <p className="pl-4">theme: <span className="text-emerald-300">&quot;emerald-cyan-lagoon&quot;</span>,</p>
                <p className="pl-4">waveSpeed: <span className="text-teal-400">0.05</span>,</p>
                <p className="pl-4">crystalGlass: <span className="text-emerald-400">true</span>,</p>
                <p className="pl-4">pageFlip3D: <span className="text-sky-400">new</span> <span className="text-yellow-300">Book3DShader</span>(),</p>
                <p>&#125;);</p>
                <p className="text-emerald-400 pt-2 flex items-center gap-2">
                  <span className="animate-pulse">▶</span> 120 FPS Stable. Ocean Fluid Ready.
                </p>
              </div>

              {/* 오른쪽: 라이브 비주얼 인터랙티브 카드 */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-teal-900/30 to-cyan-950/40 border border-emerald-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Waves className="w-16 h-16 text-cyan-400" />
                  </div>
                  <div className="text-xs text-emerald-300 font-semibold mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    에메랄드 3D E-Book 뷰어
                  </div>
                  <div className="text-lg font-bold text-white mb-2">실시간 3D 책장 넘김</div>
                  <p className="text-xs text-cyan-100/80 leading-relaxed">
                    실제 책을 넘기는 듯한 부드러운 곡면 셰이더와 청량한 아쿠아 바다빛 질감을 제공합니다.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/20">
                    <div className="text-[11px] text-cyan-300 mb-1">인터랙션 반응속도</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">0.012s</div>
                    <div className="text-[10px] text-teal-300 mt-1">초고속 즉시 반응</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/20">
                    <div className="text-[11px] text-cyan-300 mb-1">스크롤 부드러움</div>
                    <div className="text-xl font-black text-cyan-400 font-mono">120 FPS</div>
                    <div className="text-[10px] text-emerald-300 mt-1">GPU 하드웨어 가속</div>
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
