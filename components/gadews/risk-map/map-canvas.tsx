"use client";

import { useRef, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Static data arrays — fully deterministic, no Math.random()        */
/* ------------------------------------------------------------------ */

/* Outbreak markers (lon, lat in normalized 0–100 viewport coords) */
const OUTBREAK_MARKERS = [
  { x: 73.5, y: 52, label: "Mekong Delta", severity: 0.92 },
  { x: 68.2, y: 48, label: "East Java", severity: 0.85 },
  { x: 18.5, y: 38, label: "Ecuador Coast", severity: 0.78 },
  { x: 64.0, y: 54, label: "Tamil Nadu", severity: 0.71 },
  { x: 71.0, y: 46, label: "Hainan, China", severity: 0.68 },
  { x: 20.5, y: 56, label: "Ceara, Brazil", severity: 0.62 },
  { x: 53.0, y: 58, label: "Mozambique", severity: 0.58 },
  { x: 67.5, y: 56, label: "Bangladesh", severity: 0.54 },
];

/* Heatmap hotspot ellipses (cx, cy, rx, ry as %) */
const HEATMAP_ZONES = [
  { cx: 73, cy: 51, rx: 6, ry: 4, intensity: 0.9 },
  { cx: 68, cy: 49, rx: 5, ry: 3.5, intensity: 0.8 },
  { cx: 18, cy: 39, rx: 4, ry: 3, intensity: 0.7 },
  { cx: 64, cy: 55, rx: 5, ry: 3, intensity: 0.65 },
  { cx: 71, cy: 47, rx: 4, ry: 3, intensity: 0.6 },
  { cx: 53, cy: 57, rx: 3.5, ry: 2.5, intensity: 0.5 },
  { cx: 42, cy: 34, rx: 6, ry: 4, intensity: 0.25 },
  { cx: 10, cy: 30, rx: 5, ry: 3, intensity: 0.2 },
];

/* Surveillance blind zones (grayed out areas) */
const BLIND_ZONES = [
  { cx: 46, cy: 22, rx: 8, ry: 5 },
  { cx: 30, cy: 62, rx: 6, ry: 4 },
  { cx: 82, cy: 60, rx: 5, ry: 3 },
];

/* Simplified continent outlines (array of polyline points as %) */
const CONTINENTS: { points: string; name: string }[] = [
  // North America
  { name: "NA", points: "5,18 8,12 12,10 18,12 22,18 22,28 20,34 16,36 10,34 5,30" },
  // South America
  { name: "SA", points: "18,40 22,38 24,42 24,50 22,58 20,64 16,60 16,52 17,44" },
  // Europe
  { name: "EU", points: "42,12 44,10 48,10 52,12 52,18 50,22 46,22 42,20" },
  // Africa
  { name: "AF", points: "42,26 48,24 54,28 56,36 54,48 52,56 48,58 44,54 40,46 40,36" },
  // Asia
  { name: "AS", points: "54,10 60,8 68,10 76,14 80,18 78,26 76,32 72,36 68,38 64,36 58,30 54,24 52,18" },
  // SE Asia / Oceania
  { name: "SEA", points: "66,40 70,38 74,40 78,42 80,46 78,52 74,54 70,52 68,48 66,44" },
  // Australia
  { name: "AU", points: "74,58 78,56 84,58 86,62 84,68 78,70 74,66 72,62" },
];

/* Grid lines for the dark satellite theme */
const GRID_LATS = [20, 40, 50, 60, 80];
const GRID_LONS = [20, 40, 60, 80];

interface MapCanvasProps {
  showHeatmap: boolean;
  showCases: boolean;
  showCoverage: boolean;
  showSST: boolean;
  showChlorophyll: boolean;
  showRainfall: boolean;
  showBoundaries: boolean;
  showWaterSystems: boolean;
  showFarmDensity: boolean;
}

export function MapCanvas({
  showHeatmap,
  showCases,
  showCoverage,
  showSST,
  showChlorophyll,
  showRainfall,
  showBoundaries,
  showWaterSystems,
  showFarmDensity,
}: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Draw the ocean wave animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* Deep ocean background gradient */
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#040e1a");
      bg.addColorStop(0.5, "#071a2e");
      bg.addColorStop(1, "#0a1628");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* Subtle animated wave lines */
      ctx.strokeStyle = "rgba(0, 200, 220, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y =
            h * 0.3 +
            i * (h * 0.1) +
            Math.sin((x + frame * 0.5) * 0.008 + i) * 12;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* SVG overlay for map elements */}
      <svg
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Glow filter for outbreak markers */}
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for heatmap zones */}
          {HEATMAP_ZONES.map((z, i) => (
            <radialGradient key={`hg-${i}`} id={`hg-${i}`}>
              <stop
                offset="0%"
                stopColor={
                  z.intensity > 0.7
                    ? "#ef4444"
                    : z.intensity > 0.4
                    ? "#f97316"
                    : "#22c55e"
                }
                stopOpacity={0.45 * z.intensity}
              />
              <stop
                offset="100%"
                stopColor={
                  z.intensity > 0.7
                    ? "#ef4444"
                    : z.intensity > 0.4
                    ? "#f97316"
                    : "#22c55e"
                }
                stopOpacity="0"
              />
            </radialGradient>
          ))}
        </defs>

        {/* Grid lines */}
        <g opacity="0.08" stroke="#22d3ee" strokeWidth="0.08">
          {GRID_LATS.map((y) => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="100" y2={y} />
          ))}
          {GRID_LONS.map((x) => (
            <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="80" />
          ))}
        </g>

        {/* Continent outlines */}
        <g>
          {CONTINENTS.map((c) => (
            <polygon
              key={c.name}
              points={c.points}
              fill="rgba(10, 30, 60, 0.6)"
              stroke="rgba(0, 200, 220, 0.15)"
              strokeWidth="0.15"
            />
          ))}
        </g>

        {/* Administrative boundaries */}
        {showBoundaries && (
          <g opacity="0.25" stroke="#38bdf8" strokeWidth="0.1" strokeDasharray="0.5,0.5" fill="none">
            <line x1="48" y1="10" x2="48" y2="22" />
            <line x1="42" y1="22" x2="56" y2="22" />
            <line x1="54" y1="28" x2="54" y2="48" />
            <line x1="40" y1="36" x2="56" y2="36" />
            <line x1="66" y1="38" x2="66" y2="54" />
            <line x1="60" y1="30" x2="76" y2="30" />
          </g>
        )}

        {/* Water systems */}
        {showWaterSystems && (
          <g opacity="0.3" stroke="#06b6d4" strokeWidth="0.12" fill="none">
            <path d="M 67 42 Q 69 44 71 43 Q 73 42 74 44" />
            <path d="M 64 52 Q 65 54 67 53 Q 69 55 70 54" />
            <path d="M 17 40 Q 18 42 20 41 Q 22 43 23 42" />
            <path d="M 46 30 Q 48 32 50 30 Q 52 32 53 31" />
            <path d="M 56 18 Q 58 20 60 18 Q 62 20 64 19" />
          </g>
        )}

        {/* Farm density clusters */}
        {showFarmDensity && (
          <g>
            {[
              { cx: 72, cy: 50, r: 3 },
              { cx: 68, cy: 47, r: 2.5 },
              { cx: 64, cy: 54, r: 2 },
              { cx: 18, cy: 38, r: 2 },
              { cx: 71, cy: 44, r: 1.8 },
              { cx: 20, cy: 55, r: 1.5 },
            ].map((f, i) => (
              <circle
                key={`farm-${i}`}
                cx={f.cx}
                cy={f.cy}
                r={f.r}
                fill="rgba(168, 85, 247, 0.12)"
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="0.1"
                strokeDasharray="0.3,0.3"
              />
            ))}
          </g>
        )}

        {/* SST overlay */}
        {showSST && (
          <g opacity="0.35">
            <rect x="60" y="38" width="22" height="18" rx="1" fill="url(#sst-grad)" />
            <linearGradient id="sst-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
            </linearGradient>
            <rect x="14" y="34" width="14" height="10" rx="1" fill="url(#sst-grad2)" />
            <linearGradient id="sst-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
          </g>
        )}

        {/* Chlorophyll-a overlay */}
        {showChlorophyll && (
          <g opacity="0.3">
            {[
              { cx: 70, cy: 46, rx: 4, ry: 2.5 },
              { cx: 65, cy: 52, rx: 3, ry: 2 },
              { cx: 18, cy: 36, rx: 3, ry: 2 },
              { cx: 50, cy: 42, rx: 5, ry: 3 },
            ].map((a, i) => (
              <ellipse
                key={`algae-${i}`}
                cx={a.cx}
                cy={a.cy}
                rx={a.rx}
                ry={a.ry}
                fill="rgba(34, 197, 94, 0.25)"
                stroke="rgba(34, 197, 94, 0.4)"
                strokeWidth="0.08"
              />
            ))}
          </g>
        )}

        {/* Rainfall overlay */}
        {showRainfall && (
          <g opacity="0.25">
            {[
              { cx: 72, cy: 48, rx: 7, ry: 5 },
              { cx: 62, cy: 53, rx: 5, ry: 3.5 },
              { cx: 16, cy: 40, rx: 4, ry: 3 },
              { cx: 48, cy: 32, rx: 6, ry: 4 },
            ].map((r, i) => (
              <ellipse
                key={`rain-${i}`}
                cx={r.cx}
                cy={r.cy}
                rx={r.rx}
                ry={r.ry}
                fill="rgba(59, 130, 246, 0.2)"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="0.1"
                strokeDasharray="0.4,0.3"
              />
            ))}
          </g>
        )}

        {/* AI Risk Heatmap */}
        {showHeatmap && (
          <g>
            {HEATMAP_ZONES.map((z, i) => (
              <ellipse
                key={`heat-${i}`}
                cx={z.cx}
                cy={z.cy}
                rx={z.rx}
                ry={z.ry}
                fill={`url(#hg-${i})`}
              />
            ))}
          </g>
        )}

        {/* Surveillance blind zones */}
        {showCoverage && (
          <g>
            {BLIND_ZONES.map((z, i) => (
              <ellipse
                key={`blind-${i}`}
                cx={z.cx}
                cy={z.cy}
                rx={z.rx}
                ry={z.ry}
                fill="rgba(100, 116, 139, 0.2)"
                stroke="rgba(100, 116, 139, 0.35)"
                strokeWidth="0.12"
                strokeDasharray="0.6,0.4"
              />
            ))}
            {BLIND_ZONES.map((z, i) => (
              <text
                key={`bt-${i}`}
                x={z.cx}
                y={z.cy}
                textAnchor="middle"
                fill="rgba(148, 163, 184, 0.6)"
                fontSize="1"
                fontFamily="monospace"
              >
                LOW COVERAGE
              </text>
            ))}
          </g>
        )}

        {/* Confirmed outbreak markers with animated concentric circles */}
        {showCases && (
          <g filter="url(#glow-red)">
            {OUTBREAK_MARKERS.map((m, i) => (
              <g key={`ob-${i}`}>
                {/* Outer pulse ring */}
                <circle cx={m.x} cy={m.y} r="1.2" fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="0.08">
                  <animate attributeName="r" from="0.6" to="1.8" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                </circle>
                {/* Middle ring */}
                <circle cx={m.x} cy={m.y} r="0.8" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="0.06">
                  <animate attributeName="r" from="0.4" to="1.2" dur="2s" begin={`${i * 0.25 + 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" begin={`${i * 0.25 + 0.5}s`} repeatCount="indefinite" />
                </circle>
                {/* Core dot */}
                <circle cx={m.x} cy={m.y} r="0.35" fill="#ef4444" opacity="0.9" />
                <circle cx={m.x} cy={m.y} r="0.15" fill="#fbbf24" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
