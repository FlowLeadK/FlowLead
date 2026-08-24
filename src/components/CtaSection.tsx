"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * CtaSection 컴포넌트:
 * - 화면 하단에서 강렬한 시각적 인상을 남기는 네온 글로우 전환 유도 섹션
 * - 이메일 입력 및 즉시 시작 버튼 상호작용
 */
export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // 성공 폭죽 효과 실행
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981"],
    });

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section id="cta" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* 네온 글로우 백드롭 박스 */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1428] to-[#080c18] border border-white/20 p-8 sm:p-16 text-center shadow-[0_0_80px_rgba(139,92,246,0.25)] overflow-hidden">
          
          {/* 내부 오로라 빛 */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px] pointer-events-none" />

          {/* 컨텐츠 영역 */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-xs font-bold text-violet-300 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>START YOUR JOURNEY</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              지금, 완전히 새로운 <br />
              <span className="text-gradient-purple-cyan">디지털 인터랙션을 시작하세요</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              부드러운 스크롤, 화려한 다크모드 미학, 실시간 인터랙션까지. <br />
              당신의 프로젝트에 미래형 웹 경험을 즉시 도입해 보세요.
            </p>

            {/* 입력 폼 */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-center gap-2 font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>성공적으로 신청되었습니다! 최신 가이드라인과 혜택을 곧 전달해 드리겠습니다.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>시작하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="text-[11px] text-gray-400 pt-2">
              신용카드 등록 불필요 · 1분 만에 시작 · 무제한 무료 체험 지원
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
