import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

/**
 * HomePage 메인 페이지 컴포넌트:
 * - 트렌디하고 화려한 다크모드 디자인의 모든 섹션을 조합합니다.
 * - 스크롤에 따라 실크처럼 부드러운 애니메이션과 다이내믹 인터랙션이 연쇄적으로 펼쳐집니다.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. 상단 플로팅 글래스 네비게이션 */}
      <Navbar />

      {/* 2. 메인 히어로 섹션 (오로라 글로우 & 3D 인터랙티브 코드/뷰어 프리뷰) */}
      <Hero />

      {/* 3. 핵심 기능 쇼케이스 (스크롤 스태거 애니메이션 글래스 그리드) */}
      <Features />

      {/* 4. 실시간 인터랙티브 데모 (탭 전환 쇼케이스 & 라이브 코드/AI 튜터) */}
      <InteractiveShowcase />

      {/* 5. 스크롤 반응형 단계별 로드맵 타임라인 */}
      <Timeline />

      {/* 6. 성과 지표 통계 및 전문가 추천사 */}
      <Stats />

      {/* 7. 대형 네온 백드롭 전환 CTA 섹션 */}
      <CtaSection />

      {/* 8. 세련된 다크모드 푸터 */}
      <Footer />
    </>
  );
}
