"use client";

import { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Locate,
  Ruler,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const LEGEND_ITEMS = [
  { color: "#22c55e", label: "Safe / Low Risk" },
  { color: "#eab308", label: "Warning / Moderate" },
  { color: "#f97316", label: "Elevated Risk" },
  { color: "#ef4444", label: "High Risk / Outbreak" },
  { color: "#64748b", label: "Low Coverage Zone" },
];

const TOOLS = [
  { icon: ZoomIn, label: "Zoom In" },
  { icon: ZoomOut, label: "Zoom Out" },
  { icon: Locate, label: "My Location" },
  { icon: Ruler, label: "Measure" },
  { icon: Download, label: "Export PDF" },
];

export function LegendToolkit() {
  const [legendOpen, setLegendOpen] = useState(true);

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Legend card */}
      <div className="glass-strong rounded-2xl shadow-2xl shadow-black/30" style={{ width: "200px" }}>
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className="flex w-full items-center justify-between px-4 py-2.5"
        >
          <span className="text-xs font-bold tracking-wider text-foreground uppercase">
            Legend
          </span>
          {legendOpen ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
        {legendOpen && (
          <div className="space-y-2 border-t border-border/20 px-4 pb-3 pt-2.5">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="glass-strong flex flex-col gap-1 rounded-2xl p-2 shadow-2xl shadow-black/30">
        {TOOLS.map((tool) => (
          <button
            key={tool.label}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-primary/15 hover:text-primary"
            aria-label={tool.label}
            title={tool.label}
          >
            <tool.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
