"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Home, ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { MapCanvas } from "@/components/gadews/risk-map/map-canvas";
import { LayerControlPanel } from "@/components/gadews/risk-map/layer-control-panel";
import { TimelineController } from "@/components/gadews/risk-map/timeline-controller";
import { LegendToolkit } from "@/components/gadews/risk-map/legend-toolkit";

export default function RiskMapPage() {
  const [layers, setLayers] = useState({
    boundaries: false,
    waterSystems: false,
    farmDensity: false,
    sst: false,
    chlorophyll: false,
    rainfall: false,
    heatmap: true,
    cases: true,
    coverage: false,
  });

  const [panelOpen, setPanelOpen] = useState(true);

  const handleToggle = (key: string, value: boolean) => {
    setLayers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Full-screen map canvas */}
      <MapCanvas
        showHeatmap={layers.heatmap}
        showCases={layers.cases}
        showCoverage={layers.coverage}
        showSST={layers.sst}
        showChlorophyll={layers.chlorophyll}
        showRainfall={layers.rainfall}
        showBoundaries={layers.boundaries}
        showWaterSystems={layers.waterSystems}
        showFarmDensity={layers.farmDensity}
      />

      {/* ===== FLOATING OVERLAYS ===== */}

      {/* Top bar: Mini header + breadcrumb */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-bold tracking-wide text-foreground">GADEWS</span>
          </Link>
          <span className="h-4 w-px bg-border/40" />
          <nav className="flex items-center gap-1 text-[11px]">
            <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-3 w-3" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            <span className="font-semibold text-primary">Risk Map</span>
          </nav>
        </div>

        {/* Active layers badge */}
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground/80">
              {Object.values(layers).filter(Boolean).length}
            </span>
            {" layers active"}
          </span>
          <span className="h-3 w-px bg-border/30" />
          <span className="text-[11px] text-muted-foreground">
            8 outbreak markers
          </span>
        </div>
      </div>

      {/* Left panel: Layer controller */}
      <div className={`absolute top-20 left-4 z-20 transition-all duration-300 ${panelOpen ? "translate-x-0 opacity-100" : "-translate-x-[calc(100%+16px)] opacity-0"}`}>
        <LayerControlPanel layers={layers} onToggle={handleToggle} />
      </div>

      {/* Left panel toggle button */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className={`absolute z-20 top-20 glass-strong flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground shadow-lg transition-all hover:bg-primary/15 hover:text-primary ${panelOpen ? "left-[300px]" : "left-4"}`}
        aria-label={panelOpen ? "Close panel" : "Open panel"}
      >
        {panelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
      </button>

      {/* Right top: Legend & Toolkit */}
      <div className="absolute top-20 right-4 z-20">
        <LegendToolkit />
      </div>

      {/* Bottom: Timeline controller */}
      <div className="absolute bottom-4 left-4 right-4 z-20 mx-auto max-w-4xl">
        <TimelineController />
      </div>

      {/* Mobile: Collapsed layer panel as bottom sheet trigger */}
      <div className="absolute bottom-28 left-4 z-20 lg:hidden">
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="glass-strong flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground shadow-lg hover:text-foreground"
        >
          <PanelLeftOpen className="h-3.5 w-3.5" />
          Layers
        </button>
      </div>
    </div>
  );
}
