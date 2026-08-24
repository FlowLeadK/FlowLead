"use client";

import { motion } from "framer-motion";
import { Users, Star, Zap, Award, Quote } from "lucide-react";

/**
 * Stats 컴포넌트:
 * - 에메랄드빛 바다 테마의 성과 지표 통계 및 신뢰 지표
 */
export default function Stats() {
  const stats = [
    { label: "누적 독자 및 사용자", value: "140,000+", icon: Users, desc: "글로벌 독자 참여", color: "text-emerald-400" },
    { label: "유체 스크롤 프레임", value: "120 FPS", icon: Zap, desc: "지연 없는 청량함", color: "text-cyan-400" },
    { label: "평균 평점 만족도", value: "4.99 / 5.0", icon: Star, desc: "1,800+ 실제 리뷰", color: "text-teal-300" },
    { label: "3D 인터랙션 만족도", value: "99.8%", icon: Award, desc: "업계 최고 몰입감", color: "text-emerald-300" },
  ];

  const testimonials = [
    {
      name: "김민수",
      role: "시니어 프론트엔드 리드",
      comment: "에메랄드빛 바다 느낌의 색감이 정말 청량하고 세련되었습니다. 3D 전자책 넘김 효과와 스크롤 관성 모션의 완성도가 압도적입니다.",
      avatar: "M",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "이지원",
      role: "프로덕트 디자이너",
      comment: "크리스탈 글래스모피즘과 아쿠아 조명이 자연스럽게 어우러집니다. 눈이 편안하면서도 화려한 감각을 완벽히 잡았습니다.",
      avatar: "J",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "박준혁",
      role: "테크 아카데미 교육자",
      comment: "학생들에게 Next.js와 CSS 3D 모션의 모범 사례로 보여주기에 최적의 퀄리티입니다. 언제 봐도 감탄이 나옵니다.",
      avatar: "P",
      color: "from-cyan-500 to-sky-500",
    },
  ];

  return (
    <section id="stats" className="relative py-28 md:py-36 bg-[#020e17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 통계 지표 4개 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#062034]/80 border border-cyan-400/20 backdrop-blur-xl text-center group hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex p-3 rounded-xl bg-white/[0.04] mb-3 text-cyan-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-2xl sm:text-4xl font-black font-mono tracking-tight mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-cyan-300/60">
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 사용자 추천사 헤더 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            전문가와 독자들이 전하는 <br />
            <span className="text-gradient-emerald-ocean">생생한 찬사</span>
          </h3>
        </div>

        {/* 3개 추천사 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative p-6 rounded-2xl bg-[#062034]/60 border border-cyan-400/20 backdrop-blur-xl flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-cyan-400/20 mb-4" />
              <p className="text-sm text-cyan-100/80 leading-relaxed mb-6">
                &quot;{t.comment}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-cyan-400/15">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-cyan-300/60">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
