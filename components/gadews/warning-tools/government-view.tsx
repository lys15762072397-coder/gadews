"use client";

import {
  AlertTriangle,
  FileText,
  Truck,
  Download,
  MapPin,
  ChevronRight,
  Shield,
  Eye,
  Lock,
  Brain,
  CheckCircle2,
  Package,
} from "lucide-react";

const REGIONS = [
  {
    region: "Mekong Delta",
    country: "Vietnam",
    risk: "Critical",
    riskColor: "text-red-400",
    riskBg: "bg-red-500/15 border-red-500/30",
    trigger: "Salinity Crash",
    triggerIcon: "salinity",
    action: "Lockdown Recommended",
    actionColor: "text-red-400",
    actionBg: "bg-red-500/10",
    sensors: 2340,
    lastUpdate: "2 min ago",
  },
  {
    region: "Guangdong",
    country: "China",
    risk: "Warning",
    riskColor: "text-orange-400",
    riskBg: "bg-orange-500/15 border-orange-500/30",
    trigger: "Temp Fluctuation",
    triggerIcon: "temp",
    action: "Surveillance++",
    actionColor: "text-orange-400",
    actionBg: "bg-orange-500/10",
    sensors: 1820,
    lastUpdate: "5 min ago",
  },
  {
    region: "East Java",
    country: "Indonesia",
    risk: "Warning",
    riskColor: "text-orange-400",
    riskBg: "bg-orange-500/15 border-orange-500/30",
    trigger: "WSSV Detected",
    triggerIcon: "pathogen",
    action: "Quarantine Advisory",
    actionColor: "text-orange-400",
    actionBg: "bg-orange-500/10",
    sensors: 960,
    lastUpdate: "8 min ago",
  },
  {
    region: "Guayaquil",
    country: "Ecuador",
    risk: "Elevated",
    riskColor: "text-yellow-400",
    riskBg: "bg-yellow-500/15 border-yellow-500/30",
    trigger: "pH Anomaly",
    triggerIcon: "ph",
    action: "Monitor Closely",
    actionColor: "text-yellow-400",
    actionBg: "bg-yellow-500/10",
    sensors: 740,
    lastUpdate: "12 min ago",
  },
  {
    region: "Tamil Nadu",
    country: "India",
    risk: "Safe",
    riskColor: "text-emerald-400",
    riskBg: "bg-emerald-500/15 border-emerald-500/30",
    trigger: "None",
    triggerIcon: "none",
    action: "Routine Monitoring",
    actionColor: "text-emerald-400",
    actionBg: "bg-emerald-500/10",
    sensors: 1100,
    lastUpdate: "15 min ago",
  },
];

export function GovernmentView() {
  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      {/* Left: Regional Risk Monitor */}
      <div className="glass rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Regional Risk Monitor
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Province-level surveillance status across monitored territories
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
              1 Critical
            </span>
          </span>
        </div>

        {/* Table header */}
        <div className="mb-2 grid grid-cols-[2fr_1fr_1.2fr_1.5fr_0.8fr] gap-3 px-3 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span>Region</span>
          <span>Risk Level</span>
          <span>Trigger</span>
          <span>Recommended Action</span>
          <span className="text-right">Sensors</span>
        </div>

        <div className="flex flex-col gap-2">
          {REGIONS.map((r) => (
            <div
              key={r.region}
              className={`group grid grid-cols-[2fr_1fr_1.2fr_1.5fr_0.8fr] items-center gap-3 rounded-xl border p-3 transition-all hover:border-primary/20 hover:bg-background/60 ${
                r.risk === "Critical"
                  ? "border-red-500/20 bg-red-500/[0.03]"
                  : "border-border/30 bg-background/40"
              }`}
            >
              {/* Region */}
              <div className="flex items-center gap-2.5">
                <MapPin className={`h-3.5 w-3.5 shrink-0 ${r.riskColor}`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.region}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {r.country}
                  </p>
                </div>
              </div>

              {/* Risk */}
              <span
                className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${r.riskColor} ${r.riskBg}`}
              >
                {r.risk}
              </span>

              {/* Trigger */}
              <span className="text-xs text-muted-foreground">
                {r.trigger}
              </span>

              {/* Action */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${r.actionColor} ${r.actionBg}`}
                >
                  {r.action}
                </span>
              </div>

              {/* Sensors */}
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">
                  {r.sensors.toLocaleString()}
                </p>
                <p className="text-[9px] text-muted-foreground">
                  {r.lastUpdate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: AI Action Items */}
      <div className="flex flex-col gap-5">
        {/* Report Generation */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Regional Risk Assessment Report
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Auto-generated from current surveillance data
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-border/30 bg-background/40 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                Analysis Complete
              </span>
            </div>
            <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Report type:</span>
                <span className="font-medium text-foreground/80">
                  Weekly Risk Assessment
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Coverage:</span>
                <span className="font-medium text-foreground/80">
                  5 Regions, 47 Countries
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data points:</span>
                <span className="font-medium text-foreground/80">
                  1.2M sensor readings
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Generated:</span>
                <span className="font-medium text-foreground/80">
                  Just now
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              <Brain className="mr-1 inline h-3 w-3" />
              AI Confidence: 96%
            </span>
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        {/* Resource Dispatch */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15">
              <Truck className="h-4 w-4 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Resource Allocation
              </h3>
              <p className="text-[10px] text-muted-foreground">
                AI-optimized logistics recommendation
              </p>
            </div>
          </div>

          {/* Mini map placeholder */}
          <div className="relative mb-4 rounded-xl border border-border/30 bg-background/60 overflow-hidden h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Simplified supply map */}
                <svg
                  width="200"
                  height="100"
                  viewBox="0 0 200 100"
                  className="opacity-40"
                >
                  {/* Grid lines */}
                  <line
                    x1="0" y1="25" x2="200" y2="25"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                  <line
                    x1="0" y1="50" x2="200" y2="50"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                  <line
                    x1="0" y1="75" x2="200" y2="75"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                  <line
                    x1="50" y1="0" x2="50" y2="100"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                  <line
                    x1="100" y1="0" x2="100" y2="100"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                  <line
                    x1="150" y1="0" x2="150" y2="100"
                    stroke="hsl(187, 80%, 48%)" strokeWidth="0.3" opacity="0.3"
                  />
                </svg>
                {/* Stock low area */}
                <div className="absolute top-3 left-6 flex items-center gap-1">
                  <Package className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-[9px] font-bold text-red-400">
                    Low Stock
                  </span>
                </div>
                {/* Arrow */}
                <div className="absolute top-8 left-16 flex items-center gap-0.5">
                  <div className="h-px w-12 bg-primary" />
                  <ChevronRight className="h-3 w-3 text-primary" />
                </div>
                {/* Target */}
                <div className="absolute top-5 right-6 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[9px] font-bold text-primary">
                    Soc Trang
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-1.5 right-2 text-[8px] text-muted-foreground/40">
              PCR Kit Supply Chain Map
            </div>
          </div>

          {/* Priority dispatch instruction */}
          <div className="mb-4 rounded-xl border border-orange-500/20 bg-orange-500/[0.04] p-3.5">
            <div className="mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[10px] font-bold tracking-wider text-orange-400 uppercase">
                Priority Dispatch
              </span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/90">
              {"\"Dispatch Expert Team & 500 PCR Kits to "}
              <span className="font-bold text-primary">Soc Trang Province</span>
              {" immediately.\""}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <Brain className="mr-1 inline h-3 w-3" />
                AI Confidence: 98%
              </span>
              <span className="text-[9px] text-muted-foreground">
                Based on outbreak trajectory model
              </span>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-orange-500/90 hover:shadow-lg hover:shadow-orange-500/20">
            <Truck className="h-4 w-4" />
            Approve Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}
