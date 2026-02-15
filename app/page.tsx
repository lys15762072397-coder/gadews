import { StickyHeader } from "@/components/gadews/sticky-header";
import { HeroSection } from "@/components/gadews/hero-section";
import { GlobeSection } from "@/components/gadews/globe-section";
import { MissionControl } from "@/components/gadews/mission-control";
import { CoreModules } from "@/components/gadews/core-modules";
import { Footer } from "@/components/gadews/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* --- 新增：固定背景图层 --- */}
      <div className="fixed inset-0 z-0">
        {/* 背景图片 */}
        <img 
          src="/hero-bg.jpg"   // 确保 public 文件夹里有这张图
          alt="Deep Sea Background"
          className="w-full h-full object-cover opacity-100" // 可以调低 opacity 让背景暗一点
        />
        {/* 叠加一层深色渐变，保证文字清晰度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* --- 原有内容：加个 relative 和 z-10 让它浮在图片上面 --- */}
      <div className="relative z-10">
        <StickyHeader />
        <HeroSection />
        <GlobeSection />
        <MissionControl />
        <CoreModules />
        <Footer />
      </div>
    </main>
  );
}