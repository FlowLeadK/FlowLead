"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Waves, Compass, ShieldCheck, Rocket, Zap, MousePointerClick } from "lucide-react";

/**
 * Features 컴포넌트:
 * - 청량한 에메랄드빛 바다(Ocean Emerald) 테마의 6개 핵심 기능 그리드
 * - 스크롤 시 부드럽게 떠오르는 Stagger 모션
 */
export default function Features() {
  const featureList = [
    {
      icon: Zap,
      title: "초부드러운 물결 스크롤",
      description: "바다의 유려한 파도처럼 부드럽게 미끄러지는 Lenis 물리 엔진 스크롤을 탑재했습니다.",
      tag: "Fluid Motion",
      color: "from-emerald-500 to-teal-500",
      glow: "group-hover:border-emerald-400/60",
    },
    {
      icon: Layers,
      title: "크리스탈 오션 글래스모피즘",
      description: "투명하고 맑은 에메랄드 라군을 닮은 백드롭 블러와 은은한 아쿠아 하이라이트를 구현합니다.",
      tag: "Lagoon Glass",
      color: "from-teal-500 to-cyan-500",
      glow: "group-hover:border-teal-400/60",
    },
    {
      icon: MousePointerClick,
      title: "실시간 3D 책장 넘김",
      description: "CSS 3D 입체 공간에서 실제 물리적인 종이가 넘어가는 리얼한 애니메이션을 제공합니다.",
      tag: "3D Page Flip",
      color: "from-cyan-500 to-sky-500",
      glow: "group-hover:border-cyan-400/60",
    },
    {
      icon: Waves,
      title: "인터랙티브 파도 & 마우스 스포트라이트",
      description: "마우스 커서의 움직임에 반응하여 맑고 투명한 에메랄드 조명이 화면을 비춥니다.",
      tag: "Ocean Light",
      color: "from-emerald-400 to-cyan-500",
      glow: "group-hover:border-emerald-400/60",
    },
    {
      icon: Rocket,
      title: "초고속 Next.js 최적화",
      description: "최신 Turbopack과 App Router 아키텍처로 딜레이 없는 쾌적한 반응 속도를 선사합니다.",
      tag: "Lightning Fast",
      color: "from-teal-400 to-emerald-500",
      glow: "group-hover:border-teal-400/60",
    },
    {
      icon: ShieldCheck,
      title: "철저한 보안 및 안전성",
      description: "최신 웹 보안 표준을 적용하여 안전하고 신뢰할 수 있는 디지털 환경을 보장합니다.",
      tag: "Ocean Shield",
      color: "from-sky-500 to-teal-500",
      glow: "group-hover:border-sky-400/60",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="features" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OCEAN CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            청량하고 깊은 바다처럼 <br />
            <span className="text-gradient-emerald-ocean">완벽한 인터랙티브 경험</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-cyan-200/80"
          >
            에메랄드빛 디자인과 차세대 인터랙션 기능들을 확인해 보세요.
          </motion.p>
        </div>

        {/* 6개 기능 그리드 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featureList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative rounded-2xl bg-[#062034]/75 border border-cyan-400/20 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.3)] ${feature.glow} overflow-hidden`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-300 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/20">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-cyan-100/70 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
