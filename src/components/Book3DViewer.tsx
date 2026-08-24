"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Rotate3d, 
  Eye, 
  Sparkles, 
  Play, 
  Pause, 
  CheckCircle2, 
  HelpCircle, 
  Code2, 
  Bookmark,
  Volume2,
  VolumeX,
  RotateCcw,
  Palette,
  Keyboard,
  Waves
} from "lucide-react";
import confetti from "canvas-confetti";

/**
 * Web Audio API를 활용한 무설치 실시간 종이 넘김(Page Flip) 효과음
 */
function playPaperFlipSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
    filter.Q.value = 3.0;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // 오디오 미지원 브라우저 예외 처리
  }
}

/**
 * Book3DViewer 컴포넌트:
 * - 청량한 에메랄드빛 바다(Ocean Emerald) 테마를 기본으로 탑재한 3D 전자책 뷰어입니다.
 */
export default function Book3DViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const [viewMode, setViewMode] = useState<"perspective" | "flat" | "tilt">("perspective");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 기본 테마를 'emerald'(에메랄드빛 바다)로 설정
  const [themePreset, setThemePreset] = useState<"emerald" | "cyan" | "violet" | "sunset">("emerald");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const themeStyles = {
    emerald: {
      coverGradient: "from-[#082b26] via-[#051e22] to-[#03131e]",
      borderGlow: "border-emerald-400/50 hover:border-emerald-300/80",
      accentBadge: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
      glowColor: "bg-emerald-400/35",
      titleColor: "text-gradient-emerald-ocean",
      name: "에메랄드 라군 (기본)",
    },
    cyan: {
      coverGradient: "from-[#072436] via-[#081e2c] to-[#03131e]",
      borderGlow: "border-cyan-400/50 hover:border-cyan-300/80",
      accentBadge: "text-cyan-300 bg-cyan-500/15 border-cyan-400/30",
      glowColor: "bg-cyan-400/35",
      titleColor: "text-gradient-neon",
      name: "몰디브 시안",
    },
    violet: {
      coverGradient: "from-[#15102a] via-[#0d1222] to-[#03131e]",
      borderGlow: "border-violet-500/40 hover:border-violet-400/70",
      accentBadge: "text-violet-300 bg-violet-500/15 border-violet-500/30",
      glowColor: "bg-violet-600/30",
      titleColor: "text-gradient-purple-cyan",
      name: "딥 오션 바이올렛",
    },
    sunset: {
      coverGradient: "from-[#241113] via-[#1a0f18] to-[#03131e]",
      borderGlow: "border-pink-500/40 hover:border-pink-400/70",
      accentBadge: "text-pink-300 bg-pink-500/15 border-pink-500/30",
      glowColor: "bg-pink-500/30",
      titleColor: "text-gradient-gold",
      name: "선셋 코랄",
    },
  };

  const currentTheme = themeStyles[themePreset];

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      if (soundEnabled) playPaperFlipSound();
      setCurrentPage((prev) => {
        const next = prev + 1;
        if (next === totalPages) {
          confetti({
            particleCount: 100,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#10b981", "#06b6d4", "#38bdf8", "#34d399"],
          });
        }
        return next;
      });
    }
  }, [currentPage, totalPages, soundEnabled]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      if (soundEnabled) playPaperFlipSound();
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        goToPrevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        if (soundEnabled) playPaperFlipSound();
        setCurrentPage((prev) => (prev >= totalPages ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages, soundEnabled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== "tilt" || !bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -32;
    setMousePos({ x, y });
  };

  const getBookTransform = () => {
    if (viewMode === "flat") {
      return "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
    }
    if (viewMode === "tilt") {
      return `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(0.96)`;
    }
    return currentPage === 0 
      ? "rotateX(15deg) rotateY(-22deg) rotateZ(3deg) scale(0.95)"
      : "rotateX(12deg) rotateY(-8deg) rotateZ(1deg) scale(0.95)";
  };

  return (
    <div 
      className="relative w-full rounded-2xl bg-[#041927]/90 border border-cyan-400/20 p-4 sm:p-8 flex flex-col items-center justify-between min-h-[660px] select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={bookContainerRef}
    >
      {/* 1. 상단 조작 툴바 */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-cyan-400/15 z-20">
        
        <div className="flex items-center flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${currentTheme.accentBadge}`}>
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            OCEAN 3D PAGE FLIP
          </span>

          <div className="flex items-center gap-1 bg-cyan-950/40 p-1 rounded-xl border border-cyan-400/20">
            <Palette className="w-3.5 h-3.5 text-cyan-300 ml-1.5 mr-0.5" />
            {(["emerald", "cyan", "violet", "sunset"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setThemePreset(t)}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                  t === "emerald" ? "bg-emerald-400" :
                  t === "cyan" ? "bg-cyan-400" :
                  t === "violet" ? "bg-violet-500" : "bg-pink-500"
                } ${themePreset === t ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"}`}
                title={themeStyles[t].name}
              />
            ))}
          </div>

          <span className="text-xs text-cyan-300/70 hidden lg:inline font-mono">
            {currentPage === 0 ? "표지 (Ocean Cover)" : `섹션 ${currentPage} / ${totalPages}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-cyan-950/40 border border-cyan-400/20 rounded-xl">
            <button
              onClick={() => setViewMode("perspective")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "perspective" ? "bg-emerald-600 text-white shadow-sm" : "text-cyan-200/70 hover:text-white"
              }`}
              title="3D 입체 쿼터뷰"
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D 쿼터뷰</span>
            </button>

            <button
              onClick={() => setViewMode("flat")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "flat" ? "bg-emerald-600 text-white shadow-sm" : "text-cyan-200/70 hover:text-white"
              }`}
              title="정면 펼침 뷰"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">정면 뷰</span>
            </button>

            <button
              onClick={() => setViewMode("tilt")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "tilt" ? "bg-cyan-600 text-white shadow-sm" : "text-cyan-200/70 hover:text-white"
              }`}
              title="마우스 반응형 틸트"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">마우스 틸트</span>
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              soundEnabled 
                ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" 
                : "bg-cyan-950/40 border-cyan-400/20 text-gray-500"
            }`}
            title={soundEnabled ? "종이 넘김 효과음 켜짐" : "효과음 음소거"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              isAutoPlaying 
                ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300" 
                : "bg-cyan-950/40 border-cyan-400/20 text-cyan-200/70 hover:text-white"
            }`}
            title="자동 페이지 넘김"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playPaperFlipSound();
              setCurrentPage(0);
            }}
            className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-400/20 text-cyan-200/70 hover:text-white transition-colors cursor-pointer"
            title="표지로 돌아가기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. 메인 3D 책 렌더링 무대 */}
      <div 
        className="relative w-full flex-1 flex items-center justify-center py-6 min-h-[400px]"
        style={{ perspective: "1800px" }}
      >
        <div 
          className="absolute w-[440px] sm:w-[620px] h-[40px] bg-black/75 blur-2xl rounded-full translate-y-48 transition-all duration-700 pointer-events-none" 
          style={{
            transform: `translateY(190px) scale(${currentPage === 0 ? 0.7 : 1})`,
          }}
        />

        <div 
          className="relative transition-transform duration-700 ease-out flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: getBookTransform(),
            width: currentPage === 0 ? "300px" : "600px",
            height: "400px",
          }}
        >
          {/* 표지 모드 */}
          {currentPage === 0 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={goToNextPage}
              className={`relative w-[300px] h-[400px] rounded-r-2xl rounded-l-md bg-gradient-to-br ${currentTheme.coverGradient} border-2 ${currentTheme.borderGlow} p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer group transition-all duration-300 overflow-hidden`}
              style={{
                boxShadow: "15px 15px 40px rgba(0, 0, 0, 0.8), inset -5px 0 15px rgba(255, 255, 255, 0.12)",
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-emerald-900/60 to-transparent border-r border-cyan-400/20" />
              <div className={`absolute -top-16 -right-16 w-36 h-36 ${currentTheme.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500`} />
              <div className={`absolute -bottom-16 -left-16 w-36 h-36 ${currentTheme.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500`} />

              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-emerald-400 font-bold">
                    OCEAN 2026 EDITION
                  </span>
                  <Bookmark className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-emerald-400/40 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2 text-center py-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <div className="w-full h-full bg-[#031724] rounded-[11px] flex items-center justify-center">
                    <Waves className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  AQUA<span className={currentTheme.titleColor}>SPHERE</span>
                </h2>
                <p className="text-[11px] text-cyan-100/90 font-light leading-relaxed">
                  에메랄드빛 바다 & 3D 인터랙티브 디지털 북
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-cyan-400/15 flex items-center justify-between">
                <div className="text-[10px] text-cyan-300/70">
                  클릭하거나 방향키(→)로 열기
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  열기 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          )}

          {/* 펼침 모드 */}
          {currentPage > 0 && (
            <div 
              className="relative w-[320px] sm:w-[600px] h-[390px] rounded-xl flex shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-30 pointer-events-none" />

              {/* 좌측 페이지 */}
              <div className="w-1/2 h-full bg-[#051e2c] rounded-l-xl border-y border-l border-cyan-400/20 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent" />
                
                {currentPage === 1 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      CHAPTER 01 · OVERVIEW
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      에메랄드빛 바다 디자인
                    </h3>
                    <p className="text-xs text-cyan-100/80 leading-relaxed">
                      투명한 라군과 심해의 색채를 조화롭게 배치하여, 눈의 피로를 최소화하면서도 압도적인 시각적 청량감을 제공합니다.
                    </p>
                    
                    <div className="pt-2 space-y-1.5 text-xs text-cyan-300/80 font-mono">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 1. 크리스탈 글래스모피즘
                      </div>
                      <div className="flex items-center gap-2 text-cyan-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> 2. 파도형 유체 스크롤
                      </div>
                      <div className="flex items-center gap-2 text-cyan-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3. 3D 공간 물리 렌더링
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">
                        CHAPTER 02 · 3D PHYSICS
                      </span>
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      3D 책장 넘김 알고리즘
                    </h3>
                    <div className="p-2.5 rounded-lg bg-[#03131e] border border-cyan-400/20 font-mono text-[10px] text-cyan-100 leading-relaxed overflow-hidden">
                      <p><span className="text-emerald-400">const</span> oceanTransform = &#123;</p>
                      <p className="pl-2">rotateY: <span className="text-cyan-300">-180deg</span>,</p>
                      <p className="pl-2">origin: <span className="text-yellow-300">&quot;left center&quot;</span>,</p>
                      <p className="pl-2">perspective: <span className="text-teal-400">1800</span></p>
                      <p>&#125;;</p>
                    </div>
                    <p className="text-[11px] text-cyan-200/70">
                      CSS 3D의 원근감과 Y축 회전으로 자연스러운 종이 넘김 곡선을 계산합니다.
                    </p>
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">
                      CHAPTER 03 · METRICS
                    </div>
                    <h3 className="text-base font-bold text-white">
                      렌더링 퍼포먼스 비교
                    </h3>
                    <div className="space-y-2 pt-1 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] text-cyan-200 mb-1">
                          <span>GPU 가속 오션 캔버스</span>
                          <span className="text-emerald-400 font-mono">120 FPS</span>
                        </div>
                        <div className="h-2 rounded-full bg-cyan-950 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-[95%] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-cyan-400/60 mb-1">
                          <span>일반 브라우저 렌더링</span>
                          <span className="text-cyan-400/60 font-mono">45 FPS</span>
                        </div>
                        <div className="h-2 rounded-full bg-cyan-950 overflow-hidden">
                          <div className="h-full bg-cyan-700 w-[45%] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-cyan-400/60 font-mono pt-2 border-t border-cyan-400/10 flex justify-between">
                  <span>AQUASPHERE GUIDE</span>
                  <span>Page {currentPage * 2 - 1}</span>
                </div>
              </div>

              {/* 우측 페이지 */}
              <div className="w-1/2 h-full bg-[#041724] rounded-r-xl border-y border-r border-cyan-400/20 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-400 to-transparent" />

                {currentPage === 1 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                      CRYSTAL ARCHITECTURE
                    </div>
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/50 to-cyan-950/50 border border-emerald-400/30 text-center">
                      <div className="text-xs font-bold text-white mb-1">Emerald Crystal Glass</div>
                      <div className="text-[11px] text-cyan-100/80">
                        맑은 산호초 바다의 깊이감을 투명한 반투명 레이어로 시각화합니다.
                      </div>
                    </div>
                    <p className="text-xs text-cyan-100/80 leading-relaxed">
                      방향키(→)나 우측 하단 버튼을 눌러 퀴즈와 다음 챕터를 확인해 보세요!
                    </p>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 font-bold">
                      <HelpCircle className="w-3.5 h-3.5" />
                      INTERACTIVE QUIZ
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Q. 유체처럼 부드러운 스크롤을 구현하는 최적의 원리는?
                    </h4>

                    <div className="space-y-1.5 pt-1">
                      {[
                        { id: 0, text: "A. DOM 요소를 강제로 매번 리페인트", correct: false },
                        { id: 1, text: "B. requestAnimationFrame + GPU transform", correct: true },
                        { id: 2, text: "C. 무한 setTimeout 반복문 실행", correct: false },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedQuizAnswer(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all border cursor-pointer ${
                            selectedQuizAnswer === item.id
                              ? item.correct
                                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold"
                                : "bg-red-500/20 border-red-500 text-red-300"
                              : "bg-cyan-950/40 border-cyan-400/20 text-cyan-100 hover:bg-cyan-900/40"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>

                    {selectedQuizAnswer === 1 && (
                      <p className="text-[10px] text-emerald-400 font-medium">
                        🎉 정답입니다! GPU 가속으로 부드러운 프레임을 유지합니다.
                      </p>
                    )}
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-3 text-center py-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <div className="w-full h-full bg-[#031522] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      오션 가이드북 완독 완료!
                    </h3>
                    <p className="text-xs text-cyan-100/80">
                      실시간 책장 넘김 효과와 모든 챕터를 성공적으로 확인하셨습니다.
                    </p>
                    <button
                      onClick={() => {
                        if (soundEnabled) playPaperFlipSound();
                        setCurrentPage(0);
                      }}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      처음 표지로 되돌아가기
                    </button>
                  </div>
                )}

                <div className="text-[10px] text-cyan-400/60 font-mono pt-2 border-t border-cyan-400/10 flex justify-between">
                  <span>Page {currentPage * 2}</span>
                  <span>END OF SPREAD</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* 3. 하단 페이지 네비게이션 컨트롤러 */}
      <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-cyan-400/15 z-20">
        
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === 0 
              ? "opacity-30 cursor-not-allowed text-gray-500 bg-white/[0.02]" 
              : "text-cyan-100 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/20 active:scale-95"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전 페이지</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (soundEnabled) playPaperFlipSound();
                  setCurrentPage(index);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentPage === index 
                    ? "w-6 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                    : "w-2 bg-cyan-800/40 hover:bg-cyan-700/60"
                }`}
                title={`${index === 0 ? "표지" : `섹션 ${index}`}로 이동`}
              />
            ))}
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-cyan-300/70 font-mono bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-400/15">
            <Keyboard className="w-3 h-3 text-emerald-400" /> 좌우 방향키로도 조작 가능
          </span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === totalPages 
              ? "opacity-30 cursor-not-allowed text-gray-500 bg-white/[0.02]" 
              : "text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
          }`}
        >
          <span>{currentPage === 0 ? "책장 넘기기" : "다음 페이지"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
