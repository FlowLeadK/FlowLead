"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Mail, Waves } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * CtaSection 컴포넌트:
 * - 에메랄드 바다빛 네온 아우라 백드롭과 이메일 구독 인터랙션
 */
export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#10b981", "#06b6d4", "#38bdf8", "#34d399"],
    });

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section id="cta" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* 네온 글로우 백드롭 박스 */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#08283e] to-[#041724] border border-cyan-400/30 p-8 sm:p-16 text-center shadow-[0_0_80px_rgba(16,185,129,0.25)] overflow-hidden">
          
          {/* 내부 에메랄드 오로라 빛 */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none" />

          {/* 컨텐츠 영역 */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300 shadow-md"
            >
              <Waves className="w-4 h-4 text-cyan-300" />
              <span>JOIN THE OCEAN REVOLUTION</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              에메랄드 바다처럼 청량한 <br />
              <span className="text-gradient-emerald-ocean">디지털 인터랙션을 시작하세요</span>
            </h2>

            <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed">
              유려한 3D 책장 넘김과 부드러운 스크롤, 크리스탈 글래스모피즘까지. <br />
              당신의 프로젝트에 최고급 인터랙티브 웹 경험을 즉시 도입해 보세요.
            </p>

            {/* 입력 폼 */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm flex items-center justify-center gap-2 font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>성공적으로 신청되었습니다! 에메랄드 오션 최신 가이드북을 곧 전달해 드리겠습니다.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-cyan-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full bg-cyan-950/40 border border-cyan-400/25 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-cyan-300/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>시작하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="text-[11px] text-cyan-200/60 pt-2">
              신용카드 등록 불필요 · 1분 만에 시작 · 무제한 무료 체험 지원
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
