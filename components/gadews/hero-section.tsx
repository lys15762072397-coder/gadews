"use client";

import { ArrowDown, Play, Compass } from "lucide-react";

const PARTICLES = [
  { left: 8, top: 12, delay: 0, duration: 5.2 },
  { left: 23, top: 45, delay: 1.3, duration: 4.1 },
  { left: 42, top: 78, delay: 2.7, duration: 6.3 },
  { left: 67, top: 22, delay: 0.5, duration: 3.8 },
  { left: 91, top: 55, delay: 3.1, duration: 5.5 },
  { left: 15, top: 88, delay: 4.2, duration: 4.7 },
  { left: 53, top: 33, delay: 1.8, duration: 6.1 },
  { left: 78, top: 67, delay: 0.9, duration: 3.4 },
  { left: 35, top: 15, delay: 2.4, duration: 5.8 },
  { left: 62, top: 92, delay: 3.6, duration: 4.3 },
  { left: 5, top: 52, delay: 1.1, duration: 6.6 },
  { left: 88, top: 8, delay: 4.8, duration: 3.9 },
  { left: 47, top: 61, delay: 0.3, duration: 5.1 },
  { left: 72, top: 38, delay: 2.1, duration: 4.5 },
  { left: 19, top: 74, delay: 3.9, duration: 6.0 },
  { left: 56, top: 5, delay: 1.6, duration: 3.6 },
  { left: 81, top: 85, delay: 4.4, duration: 5.3 },
  { left: 30, top: 28, delay: 0.7, duration: 4.8 },
  { left: 95, top: 42, delay: 2.9, duration: 6.4 },
  { left: 11, top: 95, delay: 3.3, duration: 3.7 },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* Animated particles (CSS-only, deterministic positions) */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            <div className="h-1 w-1 animate-pulse rounded-full bg-primary/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium tracking-wider text-primary uppercase">
            System Operational — Monitoring 47 Countries
          </span>
        </div>

        {/* Main title */}
        <h1 className="mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Proactive Biosecurity
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            for a Blue Future
          </span>
        </h1>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto mt-6 backdrop-blur-md bg-black/40 border border-white/10 rounded-xl p-6 shadow-2xl">
        <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed">
          An integrated global surveillance platform bridging <span className="font-semibold text-white">Environment</span>, <span className="font-semibold text-white">Pathogen</span>, and <span className="font-semibold text-white">Host</span> monitoring — empowering aquaculture stakeholders with early, actionable disease risk intelligence.
        </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group flex items-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
            <Compass className="h-4.5 w-4.5 transition-transform group-hover:rotate-45" />
            Explore System
          </button>
          <button className="group flex items-center gap-2.5 rounded-lg border border-border/40 bg-secondary/50 px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-secondary">
            <Play className="h-4 w-4 text-primary" />
            Watch Demo
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "15,000+", label: "Sensors Active" },
            { value: "47", label: "Countries" },
            { value: "24/7", label: "Monitoring" },
            { value: "<30min", label: "Alert Latency" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl px-4 py-3">
              <p className="text-xl font-bold text-primary sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce-slow flex flex-col items-center gap-1 text-muted-foreground/50">
          <span className="text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
