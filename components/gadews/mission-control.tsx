"use client";

import {
  AlertTriangle,
  Bug,
  Thermometer,
  Terminal,
} from "lucide-react";

/* ── Active Alerts Card ── */
function ActiveAlertsCard() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            Active Alerts
          </h3>
        </div>
        <span className="rounded-md bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400 tracking-wider uppercase">
          Live
        </span>
      </div>
      <p className="text-5xl font-extrabold text-red-500 sm:text-6xl">12</p>
      <p className="mt-1 text-xs text-muted-foreground">
        across 8 countries this week
      </p>
      {/* Mini bar chart */}
      <div className="mt-5 flex items-end gap-1.5">
        {[
          { color: "bg-red-500", h: "h-10", label: "High 5" },
          { color: "bg-orange-500", h: "h-7", label: "Med 4" },
          { color: "bg-yellow-500", h: "h-4", label: "Low 3" },
        ].map((bar) => (
          <div key={bar.label} className="flex-1">
            <div className={`${bar.color} ${bar.h} rounded-t-sm opacity-80`} />
            <p className="mt-1 text-center text-[9px] text-muted-foreground">
              {bar.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── High Risk Species Card ── */
function HighRiskSpeciesCard() {
  const species = [
    { name: "Penaeus vannamei", risk: 87, label: "Whiteleg Shrimp" },
    { name: "Oncorhynchus mykiss", risk: 62, label: "Rainbow Trout" },
    { name: "Pangasius spp.", risk: 45, label: "Pangasius" },
  ];
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Bug className="h-5 w-5 text-orange-500" />
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          High Risk Species
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {species.map((s) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {s.label}
                </p>
                <p className="text-[10px] italic text-muted-foreground">
                  {s.name}
                </p>
              </div>
              <span
                className={`text-xl font-bold ${
                  s.risk > 80
                    ? "text-red-500"
                    : s.risk > 60
                    ? "text-orange-500"
                    : "text-yellow-500"
                }`}
              >
                {s.risk}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${
                  s.risk > 80
                    ? "bg-red-500"
                    : s.risk > 60
                    ? "bg-orange-500"
                    : "bg-yellow-500"
                }`}
                style={{ width: `${s.risk}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Environment Pressure Index Card ── */
function EnvPressureCard() {
  const value = 72;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          Env. Pressure Index
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative h-36 w-36">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="hsl(210, 30%, 14%)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="gaugeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="hsl(187, 80%, 48%)" />
                <stop offset="50%" stopColor="hsl(48, 96%, 53%)" />
                <stop offset="100%" stopColor="hsl(0, 72%, 51%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-foreground">
              {value}
            </span>
            <span className="text-[10px] text-orange-400 uppercase tracking-wider font-medium">
              Elevated
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Temp", val: "+1.8°C", color: "text-red-400" },
          { label: "Salinity", val: "-2.1 ppt", color: "text-orange-400" },
          { label: "DO", val: "4.2 mg/L", color: "text-yellow-400" },
        ].map((m) => (
          <div key={m.label}>
            <p className={`text-xs font-bold ${m.color}`}>{m.val}</p>
            <p className="text-[9px] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Real-time Intelligence Feed ── */
function IntelFeedCard() {
  const feedLines = [
    { time: "10:42", level: "ALERT", msg: "Mekong Delta — Salinity Drop > 5ppt", color: "text-red-400" },
    { time: "10:38", level: "WARN", msg: "East Java — WSSV RT-PCR Positive (Ct 18)", color: "text-orange-400" },
    { time: "10:35", level: "INFO", msg: "Norway — ISA surveillance report submitted", color: "text-primary" },
    { time: "10:31", level: "ALERT", msg: "Ecuador — Vibrio parahaemolyticus detected", color: "text-red-400" },
    { time: "10:27", level: "INFO", msg: "Thailand — Sensor Batch #4521 calibrated OK", color: "text-primary" },
    { time: "10:22", level: "WARN", msg: "India — Abnormal mortality Penaeus monodon", color: "text-orange-400" },
    { time: "10:18", level: "INFO", msg: "Chile — Water quality within normal range", color: "text-emerald-400" },
    { time: "10:14", level: "ALERT", msg: "Vietnam — EHP spore count exceeds threshold", color: "text-red-400" },
    { time: "10:09", level: "INFO", msg: "Bangladesh — New data feed connected", color: "text-primary" },
    { time: "10:05", level: "WARN", msg: "Philippines — Temperature anomaly +2.3°C", color: "text-orange-400" },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            Intelligence Feed
          </h3>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider">
            Live
          </span>
        </span>
      </div>
      <div className="h-[220px] overflow-hidden rounded-lg bg-background/60 p-3 font-mono text-[11px] leading-relaxed">
        <div className="flex flex-col gap-1.5">
          {feedLines.map((line, i) => (
            <div key={i} className="flex gap-1.5">
              <span className="text-muted-foreground shrink-0">
                [{line.time}]
              </span>
              <span className={`font-bold shrink-0 ${line.color}`}>
                {line.level}:
              </span>
              <span className="text-foreground/80">{line.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mission Control Section ── */
export function MissionControl() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Mission Control
          </p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Key Indicators & Intelligence Stream
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Real-time aggregated data from global sensor networks, laboratory
            reports, and field observations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ActiveAlertsCard />
          <HighRiskSpeciesCard />
          <EnvPressureCard />
          <IntelFeedCard />
        </div>
      </div>
    </section>
  );
}
