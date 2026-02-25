"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// 动态导入真实的地图组件，禁用服务器端渲染 (SSR)
const RealMap = dynamic(() => import("./real-map"), {
  ssr: false,
  loading: () => (
    // 在地图加载出来的这一两秒内，显示一个很酷的加载动画
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-primary">
      <Loader2 className="h-8 w-8 animate-spin opacity-50" />
      <span className="mt-4 text-xs font-medium tracking-widest opacity-50 uppercase">
        Initializing Global Satellites...
      </span>
    </div>
  ),
});

export function MapCanvas(props: any) {
  return (
    // 绝对定位铺满全屏，且 z-index 为 0，确保你的侧边栏和底部时间轴在它上方
    <div className="absolute inset-0 z-0 bg-slate-950">
      <RealMap {...props} />
    </div>
  );
}