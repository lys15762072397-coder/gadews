"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    // 1. 获取容器宽度，确保响应式
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    // 2. 初始化地球
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3, // 地球倾斜角度
      dark: 1, // 1 = 黑色背景模式
      diffuse: 2.0, // 亮度
      mapSamples: 20000, // 数据点的数量，越多越细腻（但也越卡）
      mapBrightness: 6,
      baseColor: [0.05, 0.1, 0.3], // 地球基底颜色 (深蓝) RGB: 0~1
      markerColor: [1, 0.2, 0.2], // 标记点颜色 (红色警报)
      glowColor: [0.1, 0.3, 0.5], // 发光晕圈颜色
      opacity: 0.8, // 透明度
      markers: [
        // 这里模拟几个警报点：{ location: [纬度, 经度], size: 大小 }
        { location: [37.7595, -122.4367], size: 0.05 }, // 旧金山
        { location: [22.3193, 114.1694], size: 0.07 }, // 香港 (WSSV Alert)
        { location: [13.7563, 100.5018], size: 0.05 }, // 曼谷
        { location: [-0.1807, -78.4678], size: 0.06 }, // 厄瓜多尔 (虾业主产区)
      ],
      onRender: (state) => {
        // 3. 动画循环：让地球自转
        state.phi = phi;
        phi += 0.003; // 自转速度
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center justify-center z-10">
      
      {/* 标题区域 */}
      <div className="text-center mb-10 relative z-20 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-4 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          LIVE SURVEILLANCE FEED
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Situational Awareness</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Real-time visualization of environmental triggers and pathogen hotspots across 47 active monitoring zones.
        </p>
      </div>

      {/* 3D 地球容器 */}
      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
        {/* 背景光晕装饰 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl opacity-50" />
        
        {/* 地球 Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "800px",
            aspectRatio: "1",
          }}
          className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* 悬浮数据卡片 (装饰用) */}
        <div className="absolute top-1/4 left-10 md:left-0 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg text-xs text-cyan-300 hidden md:block animate-float">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-white">ALERT DETECTED</span>
          </div>
          <p className="text-gray-400">Mekong Delta, VN</p>
          <p className="text-gray-400">Salinity: 5.2 ppt (↓)</p>
        </div>

        <div className="absolute bottom-1/4 right-10 md:right-0 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg text-xs text-cyan-300 hidden md:block animate-float" style={{animationDelay: '1.5s'}}>
           <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="font-bold text-white">SYSTEM NORMAL</span>
          </div>
          <p className="text-gray-400">Guangdong, CN</p>
          <p className="text-gray-400">Active Sensors: 4,203</p>
        </div>

      </div>
    </section>
  );
}