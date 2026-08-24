"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GlowBackground 컴포넌트:
 * 1. 배경에 다채로운 네온 오로라 블러(Blur) 구체를 배치하여 신비롭고 화려한 다크모드 분위기를 연출합니다.
 * 2. 사용자의 마우스 커서 위치를 추적하여 부드럽게 따라오는 반응형 라이트 효과를 제공합니다.
 */
export default function GlowBackground() {
  const [mounted, setMounted] = useState(false);

  // 마우스 위치를 실시간 추적하는 모션 값
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // 마우스 추적에 스프링 관성을 주어 부드럽게 따라오도록 설정
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#05070e]">
      {/* 1. 은은한 정밀 그리드 패턴 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* 2. 상단 중앙 퍼플 오로라 글로우 */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/20 rounded-full blur-[140px] animate-pulse-slow" />

      {/* 3. 좌측 상단 네온 시안 오로라 구체 */}
      <div className="absolute top-[20%] -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] animate-pulse-slow" />

      {/* 4. 우측 중간 네온 핑크 & 바이올렛 오로라 구체 */}
      <div className="absolute top-[45%] -right-40 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-[150px] animate-pulse-slow" />

      {/* 5. 하단 에메랄드 오로라 구체 */}
      <div className="absolute bottom-[5%] left-[20%] w-[550px] h-[550px] bg-emerald-500/12 rounded-full blur-[140px] animate-pulse-slow" />

      {/* 6. 마우스 커서를 따라 부드럽게 유영하는 인터랙티브 스포트라이트 */}
      {mounted && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-violet-500/15 to-cyan-500/15 blur-[90px] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: springX,
            top: springY,
          }}
        />
      )}
    </div>
  );
}
