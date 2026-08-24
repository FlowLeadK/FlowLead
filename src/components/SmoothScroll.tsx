"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * SmoothScroll 컴포넌트:
 * 1. Lenis 라이브러리를 사용하여 브라우저 스크롤을 실크처럼 부드러운 관성 스크롤로 변환합니다.
 * 2. Framer Motion을 사용하여 화면 상단에 스크롤 진행률을 나타내는 네온 프로그레스 바를 렌더링합니다.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // 현재 스크롤 진행률 (0부터 1까지)을 추적합니다.
  const { scrollYProgress } = useScroll();
  
  // 프로그레스 바의 움직임을 부드러운 스프링 물리 효과로 감쌉니다.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);

    // Lenis 스무스 스크롤 인스턴스 초기화
    const lenis = new Lenis({
      duration: 1.2, // 스크롤 지속 시간 (초)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 감속 곡선
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // RequestAnimationFrame 루프로 Lenis 갱신
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 화면 최상단 네온 스크롤 진행률 인디케이터 바 */}
      {mounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 origin-left z-50 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ scaleX }}
        />
      )}

      {/* 내부 페이지 컨텐츠 */}
      {children}
    </>
  );
}
