"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Bot, BarChart3, Check, Sparkles, Copy, Send } from "lucide-react";
import Book3DViewer from "@/components/Book3DViewer";

/**
 * InteractiveShowcase 컴포넌트:
 * - 4가지 핵심 모드(에메랄드 3D E-Book 뷰어, 코드 랩, AI 튜터, 실시간 분석)를 탭으로 전환
 */
export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"reader" | "code" | "ai" | "analytics">("reader");
  const [copied, setCopied] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "안녕하세요! 에메랄드 바다빛 3D 전자책 뷰어와 인터랙션에 대해 질문해 보세요." },
    { sender: "user", text: "에메랄드빛 바다 테마의 시각적 특징이 뭐야?" },
    { sender: "ai", text: "투명한 산호초 라군을 닮은 크리스탈 글래스모피즘과 에메랄드빛 오로라가 결합되어 눈이 편안하면서도 매우 청량한 감성을 선사합니다." }
  ]);

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: aiMessage },
      { sender: "ai", text: "'" + aiMessage + "' 관련 에메랄드 3D 렌더링 파이프라인이 즉시 적용되었습니다!" }
    ]);
    setAiMessage("");
  };

  const tabs = [
    { id: "reader", label: "🌊 에메랄드 3D E-Book 뷰어", icon: BookOpen },
    { id: "code", label: "⚡ 오션 코드 랩", icon: Code },
    { id: "ai", label: "🤖 AI 오션 튜터", icon: Bot },
    { id: "analytics", label: "📊 실시간 성과 분석", icon: BarChart3 },
  ];

  return (
    <section id="showcase" className="relative py-28 md:py-36 bg-[#020e17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 섹션 타이틀 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OCEAN 3D INTERACTIVE STUDIO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            실시간 3D 책장 넘김 <br />
            <span className="text-gradient-emerald-ocean">에메랄드 쇼케이스</span>
          </motion.h2>

          <p className="mt-4 text-base sm:text-lg text-cyan-200/80">
            직접 마우스로 3D 책장을 넘기고, 퀴즈를 풀며 화려한 에메랄드 바다빛을 체험해 보세요.
          </p>
        </div>

        {/* 탭 버튼 네비게이션 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                    : "text-cyan-200/70 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-400/15"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-showcase-tab"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-cyan-300"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 탭 컨텐츠 박스 */}
        <div className="relative rounded-2xl bg-[#062034]/90 border border-cyan-400/25 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[550px]">
          
          <AnimatePresence mode="wait">
            
            {/* 1. 3D E-Book 실시간 책장 넘김 뷰어 탭 */}
            {activeTab === "reader" && (
              <motion.div
                key="reader"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <Book3DViewer />
              </motion.div>
            )}

            {/* 2. 실시간 코드 랩 탭 */}
            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-cyan-200 font-mono flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <span>ocean-3d-page-flip.tsx</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-cyan-100 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "복사 완료!" : "코드 복사"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#03131e] border border-cyan-400/20 font-mono text-xs text-cyan-100 overflow-x-auto leading-relaxed">
                  <p><span className="text-emerald-400">export function</span> <span className="text-cyan-300">useOcean3DFlip</span>() &#123;</p>
                  <p className="pl-4"><span className="text-emerald-400">const</span> oceanPerspective = <span className="text-orange-400">1800</span>;</p>
                  <p className="pl-4"><span className="text-emerald-400">const</span> flipSound = <span className="text-yellow-300">playPaperFlipSound</span>();</p>
                  <p className="pl-4"><span className="text-emerald-400">return</span> &#123; oceanPerspective, flipSound &#125;;</p>
                  <p>&#125;</p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>실제 에메랄드 3D 뷰어에 적용되어 실시간으로 동작하고 있는 코드입니다.</span>
                </div>
              </motion.div>
            )}

            {/* 3. AI 튜터 챗봇 탭 */}
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-4 flex flex-col h-[480px]"
              >
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-emerald-600 text-white rounded-br-none"
                            : "bg-cyan-950/60 border border-cyan-400/20 text-cyan-100 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    placeholder="AI 튜터에게 에메랄드 테마와 3D 전자책에 대해 질문해보세요"
                    className="flex-1 bg-cyan-950/40 border border-cyan-400/20 rounded-xl px-4 py-3 text-xs text-white placeholder-cyan-300/40 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span>전송</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* 4. 분석 대시보드 탭 */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-400/20 flex flex-col justify-between">
                  <span className="text-xs text-cyan-300">3D 책장 넘김 반응 시간</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-emerald-400 font-mono">0.008</span>
                    <span className="text-sm text-cyan-300 ml-1">초</span>
                  </div>
                  <span className="text-xs text-emerald-400">GPU 하드웨어 가속 최적화</span>
                </div>

                <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-400/20 flex flex-col justify-between">
                  <span className="text-xs text-cyan-300">인터랙티브 퀴즈 정답률</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-cyan-400 font-mono">98.2%</span>
                  </div>
                  <span className="text-xs text-cyan-300">실시간 피드백 연동</span>
                </div>

                <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-400/20 flex flex-col justify-between">
                  <span className="text-xs text-cyan-300">오션 비주얼 몰입도</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-teal-300 font-mono">100%</span>
                  </div>
                  <span className="text-xs text-teal-300">청량한 사용자 만족도</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
