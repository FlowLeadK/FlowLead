"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Bot, BarChart3, Check, Sparkles, Copy, Send } from "lucide-react";
import Book3DViewer from "@/components/Book3DViewer";

/**
 * InteractiveShowcase 컴포넌트:
 * - 4가지 핵심 모드(3D E-Book 뷰어, 코드 샌드박스, AI 튜터, 실시간 분석)를 탭으로 전환
 * - 3D E-Book 뷰어 탭에서는 실시간 책장 넘김 물리 효과와 시점 조절을 직접 테스트할 수 있습니다.
 */
export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"reader" | "code" | "ai" | "analytics">("reader");
  const [copied, setCopied] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "안녕하세요! 3D 전자책 뷰어와 인터랙티브 다크 테마에 대해 궁금한 점을 물어보세요." },
    { sender: "user", text: "3D 책장 넘김 효과는 어떤 원리로 구현되었나요?" },
    { sender: "ai", text: "CSS 3D의 perspective와 transform-style: preserve-3d를 기반으로, rotateY 축 회전과 Gutter 음영 레이어를 결합하여 종이 질감의 3차원 곡선을 물리적으로 재현했습니다." }
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
      { sender: "ai", text: "질문해주신 '" + aiMessage + "' 관련 3D 렌더링 및 모션 파이프라인이 정상적으로 활성화되었습니다!" }
    ]);
    setAiMessage("");
  };

  const tabs = [
    { id: "reader", label: "📖 3D E-Book 뷰어 (책장 넘김)", icon: BookOpen },
    { id: "code", label: "⚡ 실시간 코드 랩", icon: Code },
    { id: "ai", label: "🤖 AI 튜터 어시스턴트", icon: Bot },
    { id: "analytics", label: "📊 학습 성과 분석", icon: BarChart3 },
  ];

  return (
    <section id="showcase" className="relative py-28 md:py-36 bg-[#04060b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 섹션 타이틀 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D INTERACTIVE E-BOOK STUDIO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            직접 넘겨보고 조작하는 <br />
            <span className="text-gradient-purple-cyan">3D E-Book & 라이브 쇼케이스</span>
          </motion.h2>

          <p className="mt-4 text-base sm:text-lg text-gray-400">
            실시간 3D 책장 넘김 효과를 직접 마우스와 버튼으로 테스트해보세요.
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
                    ? "text-white shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                    : "text-gray-400 hover:text-gray-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-showcase-tab"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 탭 컨텐츠 박스 */}
        <div className="relative rounded-2xl bg-[#080c18]/90 border border-white/15 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[550px]">
          
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
                {/* 3D 책장 넘김 실시간 뷰어 컴포넌트 */}
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
                  <div className="text-sm text-gray-300 font-mono flex items-center gap-2">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span>book-3d-flip-shader.tsx</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "복사 완료!" : "코드 복사"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#04060d] border border-white/10 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed">
                  <p><span className="text-violet-400">export function</span> <span className="text-cyan-300">use3DPageFlip</span>(currentPage: <span className="text-orange-400">number</span>) &#123;</p>
                  <p className="pl-4"><span className="text-violet-400">const</span> isFlipped = currentPage &gt; <span className="text-orange-400">0</span>;</p>
                  <p className="pl-4"><span className="text-violet-400">return</span> &#123;</p>
                  <p className="pl-8">transform: isFlipped ? <span className="text-emerald-300">&quot;rotateY(-180deg)&quot;</span> : <span className="text-emerald-300">&quot;rotateY(0deg)&quot;</span>,</p>
                  <p className="pl-8">transformOrigin: <span className="text-emerald-300">&quot;left center&quot;</span>,</p>
                  <p className="pl-8">transition: <span className="text-emerald-300">&quot;transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)&quot;</span>,</p>
                  <p className="pl-4">&#125;;</p>
                  <p>&#125;</p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>이 코드는 실제 3D E-Book 뷰어의 회전 물리 엔진에 적용되어 실시간으로 동작하고 있는 로직입니다.</span>
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
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-violet-600 text-white rounded-br-none"
                            : "bg-white/[0.06] border border-white/10 text-gray-200 rounded-bl-none"
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
                    placeholder="AI 튜터에게 전자책이나 인터랙션에 대해 질문해보세요"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
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
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">3D 책장 넘김 반응 시간</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-violet-400 font-mono">0.008</span>
                    <span className="text-sm text-gray-400 ml-1">초</span>
                  </div>
                  <span className="text-xs text-emerald-400">GPU 하드웨어 가속 최적화</span>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">인터랙티브 퀴즈 정답률</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-cyan-400 font-mono">96.4%</span>
                  </div>
                  <span className="text-xs text-cyan-400">실시간 피드백 연동</span>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <span className="text-xs text-gray-400">3D 시점 전환 매끄러움</span>
                  <div className="my-3">
                    <span className="text-3xl font-black text-emerald-400 font-mono">100%</span>
                  </div>
                  <span className="text-xs text-emerald-400">프레임 드랍 0회 달성</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
