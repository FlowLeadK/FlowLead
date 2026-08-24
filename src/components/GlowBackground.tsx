"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * GlowBackground 컴포넌트:
 * - 에메랄드빛 바다(Ocean Emerald)와 맑은 아쿠아 블루 오로라를 배경에 배치합니다.
 * - 마우스 커서를 따라오는 청량한 크리스탈 스포트라이트 조명 효과를 제공합니다.
 */
export default function GlowBackground() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#03131e]">
      {/* 1. 은은한 오션 그리드 패턴 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* 2. 상단 중앙 에메랄드빛 오션 오로라 */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-emerald-500/20 rounded-full blur-[140px] animate-pulse-slow" />

      {/* 3. 좌측 상단 청량한 아쿠아 시안 구체 */}
      <div className="absolute top-[20%] -left-40 w-[550px] h-[550px] bg-cyan-400/20 rounded-full blur-[130px] animate-pulse-slow" />

      {/* 4. 우측 중간 몰디브 틸 & 스카이 블루 구체 */}
      <div className="absolute top-[45%] -right-40 w-[600px] h-[600px] bg-teal-400/18 rounded-full blur-[150px] animate-pulse-slow" />

      {/* 5. 하단 심해 딥 에메랄드 구체 */}
      <div className="absolute bottom-[5%] left-[20%] w-[550px] h-[550px] bg-emerald-400/15 rounded-full blur-[140px] animate-pulse-slow" />

      {/* 6. 마우스 커서를 따라 부드럽게 유영하는 아쿠아 스포트라이트 */}
      {mounted && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-[90px] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: springX,
            top: springY,
          }}
        />
      )}
    </div>
  );
}
