"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Lightbulb, Code2, Rocket } from "lucide-react";

/**
 * Timeline 컴포넌트:
 * - 에메랄드빛 바다 테마의 4단계 프로세스 로드맵
 * - 스크롤에 따라 빛나는 청량한 오션 네온 연결선
 */
export default function Timeline() {
  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "오션 디자인 토큰 & 비주얼 기획",
      desc: "에메랄드빛 바다와 크리스탈 글래스모피즘 계층을 정의하고 청량한 감성의 디자인 토큰을 수립합니다.",
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400",
    },
    {
      number: "02",
      icon: Code2,
      title: "물리 기반 유체 스크롤 엔진 연동",
      desc: "Lenis 부드러운 스크롤 엔진과 Framer Motion 스프링을 연동하여 파도처럼 매끄러운 모션을 완성합니다.",
      color: "from-teal-500 to-cyan-500",
      accent: "text-teal-300",
    },
    {
      number: "03",
      icon: Compass,
      title: "3D 전자책(E-Book) 실시간 책장 넘김",
      desc: "CSS 3D 원근감과 Web Audio 종이 효과음을 결합하여 실제 책처럼 만지고 넘기는 입체감을 구현합니다.",
      color: "from-cyan-500 to-sky-500",
      accent: "text-cyan-300",
    },
    {
      number: "04",
      icon: Rocket,
      title: "글로벌 Vercel 고속 배포",
      desc: "Next.js의 빌드 최적화로 전 세계 어디서든 60fps 이상의 안정적인 성능으로 무료 웹사이트를 서빙합니다.",
      color: "from-sky-500 to-emerald-400",
      accent: "text-sky-300",
    },
  ];

  return (
    <section id="timeline" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>HOW IT WORKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            물결처럼 자연스럽게 완성되는 <br />
            <span className="text-gradient-emerald-ocean">4단계 오션 로드맵</span>
          </motion.h2>
        </div>

        {/* 타임라인 컨테이너 */}
        <div className="relative">
          {/* 중앙 세로 에메랄드 네온 연결선 */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400 opacity-40 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 중앙 네온 노드 포인트 */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#031522] border-2 border-emerald-400 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.7)]">
                    <span className="text-xs font-mono font-bold text-emerald-300">{step.number}</span>
                  </div>

                  {/* 카드 컨텐츠 영역 */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="group p-6 rounded-2xl bg-[#062034]/80 border border-cyan-400/20 backdrop-blur-xl hover:border-emerald-400/40 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]">
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color} text-white`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-xs font-bold font-mono ${step.accent}`}>STEP {step.number}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-cyan-100/70 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
