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
  Keyboard
} from "lucide-react";
import confetti from "canvas-confetti";

/**
 * Web Audio API를 활용하여 외부 오디오 파일 다운로드 없이
 * 순수 브라우저 신디사이저로 부드러운 '종이 넘김(Page Flip)' 효과음을 실시간 합성합니다.
 */
function playPaperFlipSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // 화이트 노이즈 버퍼 생성 (종이 마찰음 시뮬레이션)
    const bufferSize = ctx.sampleRate * 0.08; // 80ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // 대역통과 필터로 부드러운 스위시 사운드로 정제
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
    filter.Q.value = 3.0;

    // 볼륨 엔벨로프 (부드러운 페이드아웃)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // 오디오 미지원 환경 무시
  }
}

/**
 * Book3DViewer 컴포넌트:
 * - 사실적인 CSS 3D Transforms 및 Framer Motion을 결합한 실시간 전자책(E-Book) 뷰어입니다.
 * - 책 표지와 내지 페이지들이 실제 물리적인 축을 중심으로 회전(rotateY)하며 넘어갑니다.
 * - [신규] 4가지 네온 컬러 테마 프리셋, 키보드 방향키 조작, 실시간 Web Audio 종이 효과음 탑재.
 */
export default function Book3DViewer() {
  // 현재 펼쳐진 페이지 인덱스 (0: 표지, 1: 1-2페이지, 2: 3-4페이지, 3: 5-6페이지/뒷표지)
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  // 3D 뷰 모드 ('perspective': 3D 쿼터뷰, 'flat': 정면 펼침뷰, 'tilt': 마우스 반응 틸트)
  const [viewMode, setViewMode] = useState<"perspective" | "flat" | "tilt">("perspective");

  // 자동 재생(Auto-Play) 상태
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 퀴즈 정답 선택 상태
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  // 효과음 활성화 여부
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 책 커버 컬러 테마 프리셋
  const [themePreset, setThemePreset] = useState<"violet" | "cyan" | "emerald" | "sunset">("violet");

  // 마우스 반응형 틸트를 위한 좌표
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // 테마별 색상 구성 객체
  const themeStyles = {
    violet: {
      coverGradient: "from-[#15102a] via-[#0d1222] to-[#080c18]",
      borderGlow: "border-violet-500/40 hover:border-violet-400/70",
      accentBadge: "text-violet-300 bg-violet-500/15 border-violet-500/30",
      glowColor: "bg-violet-600/30",
      titleColor: "text-gradient-purple-cyan",
      name: "사이버 바이올렛",
    },
    cyan: {
      coverGradient: "from-[#081a26] via-[#091420] to-[#050b13]",
      borderGlow: "border-cyan-500/40 hover:border-cyan-400/70",
      accentBadge: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
      glowColor: "bg-cyan-500/30",
      titleColor: "text-gradient-neon",
      name: "네온 시안",
    },
    emerald: {
      coverGradient: "from-[#071c18] via-[#091516] to-[#040d0f]",
      borderGlow: "border-emerald-500/40 hover:border-emerald-400/70",
      accentBadge: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      glowColor: "bg-emerald-500/30",
      titleColor: "text-gradient-neon",
      name: "매트릭스 에메랄드",
    },
    sunset: {
      coverGradient: "from-[#241113] via-[#1a0f18] to-[#0e0711]",
      borderGlow: "border-pink-500/40 hover:border-pink-400/70",
      accentBadge: "text-pink-300 bg-pink-500/15 border-pink-500/30",
      glowColor: "bg-pink-500/30",
      titleColor: "text-gradient-gold",
      name: "선셋 핑크",
    },
  };

  const currentTheme = themeStyles[themePreset];

  // 페이지 이동 함수
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      if (soundEnabled) playPaperFlipSound();
      setCurrentPage((prev) => {
        const next = prev + 1;
        if (next === totalPages) {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981"],
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

  // 키보드 좌/우 방향키로 페이지 넘기기 지원
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

  // 자동 재생 타이머
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

  // 마우스 이동 시 틸트 각도 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== "tilt" || !bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 32; // -16deg ~ +16deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -32; // -16deg ~ +16deg
    setMousePos({ x, y });
  };

  // 현재 뷰 모드에 따른 3D 회전 스타일 계산
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
      className="relative w-full rounded-2xl bg-[#060913]/90 border border-white/10 p-4 sm:p-8 flex flex-col items-center justify-between min-h-[660px] select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={bookContainerRef}
    >
      {/* 1. 상단 조작 툴바 */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 z-20">
        
        {/* 상태 및 테마 프리셋 선택 */}
        <div className="flex items-center flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${currentTheme.accentBadge}`}>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            3D REAL-TIME PAGE FLIP
          </span>

          {/* 컬러 테마 선택 드롭다운/버튼 */}
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <Palette className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-0.5" />
            {(["violet", "cyan", "emerald", "sunset"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setThemePreset(t)}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                  t === "violet" ? "bg-violet-500" :
                  t === "cyan" ? "bg-cyan-400" :
                  t === "emerald" ? "bg-emerald-400" : "bg-pink-500"
                } ${themePreset === t ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"}`}
                title={themeStyles[t].name}
              />
            ))}
          </div>

          <span className="text-xs text-gray-400 hidden lg:inline font-mono">
            {currentPage === 0 ? "표지 (Cover)" : `섹션 ${currentPage} / ${totalPages}`}
          </span>
        </div>

        {/* 뷰 모드 및 조작 버튼들 */}
        <div className="flex items-center gap-2">
          
          {/* 3D 뷰 전환 버튼 그룹 */}
          <div className="flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-xl">
            <button
              onClick={() => setViewMode("perspective")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "perspective" ? "bg-violet-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
              title="3D 입체 쿼터뷰"
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D 쿼터뷰</span>
            </button>

            <button
              onClick={() => setViewMode("flat")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "flat" ? "bg-violet-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
              title="정면 펼침 뷰"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">정면 뷰</span>
            </button>

            <button
              onClick={() => setViewMode("tilt")}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "tilt" ? "bg-cyan-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
              title="마우스 반응형 틸트"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">마우스 틸트</span>
            </button>
          </div>

          {/* 사운드 토글 */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              soundEnabled 
                ? "bg-violet-500/20 border-violet-500/40 text-violet-300" 
                : "bg-white/5 border-white/10 text-gray-500"
            }`}
            title={soundEnabled ? "종이 넘김 효과음 켜짐" : "효과음 음소거"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* 자동 넘김 토글 */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
              isAutoPlaying 
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" 
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
            title="자동 페이지 넘김"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* 초기화 버튼 */}
          <button
            onClick={() => {
              if (soundEnabled) playPaperFlipSound();
              setCurrentPage(0);
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
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
        
        {/* 책 그림자 바닥 효과 */}
        <div 
          className="absolute w-[440px] sm:w-[620px] h-[40px] bg-black/75 blur-2xl rounded-full translate-y-48 transition-all duration-700 pointer-events-none" 
          style={{
            transform: `translateY(190px) scale(${currentPage === 0 ? 0.7 : 1})`,
          }}
        />

        {/* 3D 책 본체 */}
        <div 
          className="relative transition-transform duration-700 ease-out flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: getBookTransform(),
            width: currentPage === 0 ? "300px" : "600px",
            height: "400px",
          }}
        >

          {/* ========================================================================= */}
          {/* [표지 모드 (currentPage === 0)] : 닫혀있는 화려한 3D 하드커버 */}
          {/* ========================================================================= */}
          {currentPage === 0 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={goToNextPage}
              className={`relative w-[300px] h-[400px] rounded-r-2xl rounded-l-md bg-gradient-to-br ${currentTheme.coverGradient} border-2 ${currentTheme.borderGlow} p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer group transition-all duration-300 overflow-hidden`}
              style={{
                boxShadow: "15px 15px 40px rgba(0, 0, 0, 0.8), inset -5px 0 15px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* 책등(Spine) 입체 표현 */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-violet-900/60 to-transparent border-r border-white/10" />

              {/* 표지 네온 빛 효과 */}
              <div className={`absolute -top-16 -right-16 w-36 h-36 ${currentTheme.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500`} />
              <div className={`absolute -bottom-16 -left-16 w-36 h-36 ${currentTheme.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500`} />

              {/* 표지 상단 메타데이터 */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400 font-bold">
                    VOL. 2026 EDITION
                  </span>
                  <Bookmark className="w-4 h-4 text-violet-400 fill-violet-400" />
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-violet-500/40 to-transparent" />
              </div>

              {/* 표지 메인 타이틀 */}
              <div className="relative z-10 space-y-2 text-center py-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  <div className="w-full h-full bg-[#070a14] rounded-[11px] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  NEO<span className={currentTheme.titleColor}>SPHERE</span>
                </h2>
                <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                  미래형 인터랙티브 웹 디자인 & 다크모드 아키텍처
                </p>
              </div>

              {/* 표지 하단 클릭 유도 */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] text-gray-400">
                  클릭하거나 방향키(→)로 열기
                </div>
                <span className="px-3 py-1 rounded-full bg-violet-600/30 text-cyan-300 text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  열기 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* [펼침 모드 (currentPage > 0)] : 좌/우 2페이지 스프레드 구조 */}
          {/* ========================================================================= */}
          {currentPage > 0 && (
            <div 
              className="relative w-[320px] sm:w-[600px] h-[390px] rounded-xl flex shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 중앙 책 접힘선(Gutter Spine) 그림자 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/70 to-black/40 z-30 pointer-events-none" />

              {/* 좌측 페이지 (Left Page) */}
              <div className="w-1/2 h-full bg-[#0c1020] rounded-l-xl border-y border-l border-white/10 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-transparent" />
                
                {currentPage === 1 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-violet-400 font-bold uppercase">
                      CHAPTER 01 · OVERVIEW
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      다크모드의 새로운 정의
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      단순한 어두운 색조를 넘어, 빛의 반사와 투과를 과학적으로 계산하여 사용자 집중력을 높이는 인터랙티브 시각 경험을 제시합니다.
                    </p>
                    
                    <div className="pt-2 space-y-1.5 text-xs text-gray-400 font-mono">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 1. 글래스모피즘 심도
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> 2. 물리 스크롤 감속
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3. 3D 공간 레이아웃
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        CHAPTER 02 · 3D PHYSICS
                      </span>
                      <Code2 className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      3D 책장 넘김 알고리즘
                    </h3>
                    <div className="p-2.5 rounded-lg bg-[#04060e] border border-white/10 font-mono text-[10px] text-gray-300 leading-relaxed overflow-hidden">
                      <p><span className="text-purple-400">const</span> transform = &#123;</p>
                      <p className="pl-2">rotateY: <span className="text-cyan-300">-180deg</span>,</p>
                      <p className="pl-2">origin: <span className="text-yellow-300">&quot;left center&quot;</span>,</p>
                      <p className="pl-2">perspective: <span className="text-orange-400">1600</span></p>
                      <p>&#125;;</p>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      CSS의 원근감(Perspective)과 Y축 회전을 결합하여 자연스러운 종이 곡선을 계산합니다.
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
                        <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                          <span>Lenis + GPU 가속</span>
                          <span className="text-cyan-400 font-mono">120 FPS</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-[95%] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                          <span>일반 브라우저 스크롤</span>
                          <span className="text-gray-400 font-mono">45 FPS</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gray-500 w-[45%] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-gray-500 font-mono pt-2 border-t border-white/5 flex justify-between">
                  <span>NEOSPHERE GUIDE</span>
                  <span>Page {currentPage * 2 - 1}</span>
                </div>
              </div>

              {/* 우측 페이지 (Right Page) */}
              <div className="w-1/2 h-full bg-[#0a0e1c] rounded-r-xl border-y border-r border-white/10 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-500 to-transparent" />

                {currentPage === 1 && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      VISUAL ARCHITECTURE
                    </div>
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-900/30 to-cyan-900/30 border border-cyan-500/20 text-center">
                      <div className="text-xs font-bold text-white mb-1">Layered Glassmorphism</div>
                      <div className="text-[11px] text-gray-300">
                        배경 흐림(Blur 16px) + 반투명 10% 테두리로 시각적 깊이를 만듭니다.
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      키보드 방향키(→)나 우측 하단 버튼을 눌러 퀴즈를 풀어보세요!
                    </p>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold">
                      <HelpCircle className="w-3.5 h-3.5" />
                      INTERACTIVE QUIZ
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Q. 부드러운 스크롤을 구현할 때 최적의 FPS를 내는 원리는?
                    </h4>

                    <div className="space-y-1.5 pt-1">
                      {[
                        { id: 0, text: "A. DOM 요소를 강제로 매번 리페인트한다", correct: false },
                        { id: 1, text: "B. requestAnimationFrame + GPU transform", correct: true },
                        { id: 2, text: "C. 무한 setTimeout 반복문 실행", correct: false },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedQuizAnswer(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all border cursor-pointer ${
                            selectedQuizAnswer === item.id
                              ? item.correct
                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                                : "bg-red-500/20 border-red-500 text-red-300"
                              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>

                    {selectedQuizAnswer === 1 && (
                      <p className="text-[10px] text-emerald-400 font-medium">
                        🎉 정답입니다! GPU 하드웨어 가속을 활용합니다.
                      </p>
                    )}
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-3 text-center py-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <div className="w-full h-full bg-[#070a14] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      3D 가이드북 완독 완료!
                    </h3>
                    <p className="text-xs text-gray-300">
                      실시간 책장 넘김 효과와 모든 챕터를 성공적으로 확인하셨습니다.
                    </p>
                    <button
                      onClick={() => {
                        if (soundEnabled) playPaperFlipSound();
                        setCurrentPage(0);
                      }}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      처음 표지로 되돌아가기
                    </button>
                  </div>
                )}

                <div className="text-[10px] text-gray-500 font-mono pt-2 border-t border-white/5 flex justify-between">
                  <span>Page {currentPage * 2}</span>
                  <span>END OF SPREAD</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* 3. 하단 페이지 네비게이션 컨트롤러 */}
      <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-white/10 z-20">
        
        {/* 이전 페이지 버튼 */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === 0 
              ? "opacity-30 cursor-not-allowed text-gray-600 bg-white/[0.02]" 
              : "text-gray-200 bg-white/10 hover:bg-white/20 border border-white/10 active:scale-95"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전 페이지</span>
        </button>

        {/* 페이지 닷 및 키보드 힌트 */}
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
                    ? "w-6 bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                title={`${index === 0 ? "표지" : `섹션 ${index}`}로 이동`}
              />
            ))}
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <Keyboard className="w-3 h-3 text-cyan-400" /> 좌우 방향키로도 조작 가능
          </span>
        </div>

        {/* 다음 페이지 버튼 */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === totalPages 
              ? "opacity-30 cursor-not-allowed text-gray-600 bg-white/[0.02]" 
              : "text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 shadow-[0_0_15px_rgba(139,92,246,0.4)] active:scale-95"
          }`}
        >
          <span>{currentPage === 0 ? "책장 넘기기" : "다음 페이지"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
