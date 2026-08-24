"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Compass, ShieldCheck, Rocket, Zap, MousePointerClick } from "lucide-react";

/**
 * Features 컴포넌트:
 * - 화면 스크롤 시 각 카드가 순차적(Stagger)으로 부드럽게 떠오르는 인터랙션
 * - 호버 시 네온 보더 및 스포트라이트 글로우 활성화
 */
export default function Features() {
  const featureList = [
    {
      icon: Zap,
      title: "초부드러운 관성 스크롤",
      description: "고급 물리 엔진 기반의 Lenis 스크롤이 적용되어 마우스 휠 조작 시 부드럽고 묵직한 관성 모션을 제공합니다.",
      tag: "Smooth Motion",
      color: "from-violet-500 to-indigo-500",
      glow: "group-hover:border-violet-500/50",
    },
    {
      icon: Layers,
      title: "트렌디한 글래스모피즘",
      description: "반투명 유리 질감의 백드롭 블러와 은은한 네온 엣지 하이라이트를 결합하여 압도적인 다크모드 미학을 구현합니다.",
      tag: "UI Aesthetics",
      color: "from-cyan-500 to-blue-500",
      glow: "group-hover:border-cyan-500/50",
    },
    {
      icon: MousePointerClick,
      title: "인터랙티브 3D 인터랙션",
      description: "마우스 커서의 움직임과 스크롤 각도에 따라 반응하는 3D 틸트 카드와 실시간 시각 피드백을 제공합니다.",
      tag: "3D Interaction",
      color: "from-pink-500 to-rose-500",
      glow: "group-hover:border-pink-500/50",
    },
    {
      icon: Cpu,
      title: "AI 스마트 어시스턴트",
      description: "문맥을 이해하는 내장 인텔리전스를 통해 핵심 내용 요약, 실시간 Q&A, 맞춤형 학습 추천을 지원합니다.",
      tag: "AI Powered",
      color: "from-purple-500 to-cyan-500",
      glow: "group-hover:border-purple-500/50",
    },
    {
      icon: Rocket,
      title: "초고속 Next.js 최적화",
      description: "최신 App Router 아키텍처와 최적화된 번들링으로 첫 화면 로딩부터 페이지 전환까지 딜레이 없는 속도를 자랑합니다.",
      tag: "High Performance",
      color: "from-emerald-500 to-teal-500",
      glow: "group-hover:border-emerald-500/50",
    },
    {
      icon: ShieldCheck,
      title: "철저한 보안 & 데이터 암호화",
      description: "사용자 데이터 보호를 위한 최상위 암호화 표준을 준수하며, 안전하고 신뢰할 수 있는 디지털 환경을 보장합니다.",
      tag: "Enterprise Grade",
      color: "from-amber-500 to-orange-500",
      glow: "group-hover:border-amber-500/50",
    },
  ];

  // 카드 컨테이너 스태거 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // 개별 카드 애니메이션 설정
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXCLUSIVE CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            독보적인 기술력으로 완성한 <br />
            <span className="text-gradient-purple-cyan">차원 높은 사용자 경험</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400"
          >
            시각적 화려함뿐만 아니라 성능과 기능성까지 겸비한 핵심 기능들을 확인해 보세요.
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
                className={`group relative rounded-2xl bg-[#090d1a]/70 border border-white/10 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(139,92,246,0.25)] ${feature.glow} overflow-hidden`}
              >
                {/* 상단 뱃지 및 아이콘 */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5">
                    {feature.tag}
                  </span>
                </div>

                {/* 카드 제목 */}
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>

                {/* 카드 설명 */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* 호버 시 하단 네온 라인 효과 */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
