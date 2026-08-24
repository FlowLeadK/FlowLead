"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowRight, BookOpen, Layers, ShieldCheck, Zap } from "lucide-react";

/**
 * Navbar 컴포넌트:
 * - 상단 고정 플로팅 에메랄드 크리스탈 글래스 네비게이션
 * - 청량한 아쿠아 바다빛 테두리와 블러 효과
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "핵심 기능", href: "#features", icon: Zap },
    { name: "3D 쇼케이스", href: "#showcase", icon: Layers },
    { name: "프로세스", href: "#timeline", icon: BookOpen },
    { name: "성과 지표", href: "#stats", icon: ShieldCheck },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 transition-all duration-300">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[#062034]/90 backdrop-blur-xl border border-cyan-400/25 shadow-[0_10px_30px_-10px_rgba(2,20,30,0.9)] py-3 px-5"
            : "bg-[#062034]/45 backdrop-blur-md border border-cyan-400/15 py-4 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* 1. 로고 영역 */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#031522] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                AQUA<span className="text-gradient-emerald-ocean font-black">SPHERE</span>
              </span>
              <span className="text-[10px] text-cyan-300 tracking-widest uppercase">Ocean Edition</span>
            </div>
          </a>

          {/* 2. 데스크톱 네비게이션 링크 */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-cyan-400/15 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-cyan-100/80 hover:text-white hover:bg-cyan-500/15 rounded-full transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* 3. 우측 CTA 버튼 & 모바일 토글 버튼 */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="relative hidden sm:inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-medium transition-all duration-300 group hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-400 group-hover:from-emerald-400 group-hover:to-cyan-300"></span>
              <span className="relative px-4 py-1.5 transition-all ease-out bg-[#062034] rounded-full text-xs font-semibold text-white group-hover:bg-opacity-0 flex items-center gap-1.5">
                지금 시작하기
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-200 hover:text-white rounded-lg bg-cyan-900/30 border border-cyan-400/20"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 4. 모바일 드롭다운 메뉴 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-4 pt-4 border-t border-cyan-400/20 flex flex-col gap-2 overflow-hidden"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg shadow-lg"
              >
                무료로 체험하기
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
