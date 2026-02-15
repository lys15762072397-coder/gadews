"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Wind,
  OctagonX,
  FlaskConical,
  CheckCircle2,
  Shield,
  Brain,
  Waves,
  Thermometer,
  Droplets,
  ClipboardCheck,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

const PONDS = [
  { id: 1, name: "Pond 1", status: "Safe", color: "text-emerald-400", borderColor: "border-emerald-500/30", bgColor: "bg-emerald-500/10" },
  { id: 2, name: "Pond 2", status: "Safe", color: "text-emerald-400", borderColor: "border-emerald-500/30", bgColor: "bg-emerald-500/10" },
  { id: 3, name: "Pond 3", status: "Critical Alert", color: "text-red-400", borderColor: "border-red-500/50", bgColor: "bg-red-500/10" },
];

const DO_DATA = [
  { time: "00:00", value: 5.2 },
  { time: "02:00", value: 4.8 },
  { time: "04:00", value: 4.3 },
  { time: "06:00", value: 3.9 },
  { time: "08:00", value: 3.5 },
  { time: "10:00", value: 3.1 },
  { time: "12:00", value: 2.8 },
  { time: "14:00", value: 2.5 },
  { time: "16:00", value: 2.3 },
  { time: "Now", value: 2.1 },
];

const ACTIONS = [
  {
    icon: Wind,
    label: "Immediate",
    instruction: "Turn on backup aerators now.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    badgeText: "DO IT",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
  },
  {
    icon: OctagonX,
    label: "Stop",
    instruction: "Suspend feeding for 24 hours.",
    badgeColor: "text-red-400 bg-red-500/10 border-red-500/30",
    badgeText: "STOP",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/15",
  },
  {
    icon: FlaskConical,
    label: "Test",
    instruction: "Check Nitrite (NO2) levels immediately.",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    badgeText: "TEST",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/15",
  },
];

const INITIAL_CHECKLIST = [
  { id: "c1", label: "Disinfect inlet water filters", checked: false },
  { id: "c2", label: "Verify crab fencing integrity", checked: false },
  { id: "c3", label: "Check water exchange rate < 10%/day", checked: false },
  { id: "c4", label: "Inspect dead shrimp traps for early mortality", checked: false },
  { id: "c5", label: "Test post-larvae PCR before stocking", checked: false },
  { id: "c6", label: "Sanitize boots and nets between ponds", checked: false },
];

export function FarmerView() {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = checklist.filter((c) => c.checked).length;

  return (
    <div className="flex flex-col gap-5">
      {/* My Ponds Overview */}
      <div className="glass rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Waves className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              My Ponds Overview
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Real-time health status of your registered ponds
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {PONDS.map((pond) => (
            <div
              key={pond.id}
              className={`relative rounded-xl border p-4 transition-all ${pond.borderColor} ${
                pond.status === "Critical Alert"
                  ? "bg-red-500/[0.04] animate-pulse-glow"
                  : "bg-background/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">
                  {pond.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${pond.color} ${pond.bgColor} ${pond.borderColor}`}
                >
                  {pond.status}
                </span>
              </div>
              {pond.status === "Critical Alert" && (
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-400">
                  <AlertTriangle className="h-3 w-3" />
                  <span>DO critically low — immediate action required</span>
                </div>
              )}
              {pond.status === "Safe" && (
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    28.5°C
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    7.2 pH
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-3 w-3" />
                    5.8 mg/L
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pond 3 Alert Detail + AI Actions */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* Pond 3 Alert Detail */}
        <div className="relative glass rounded-2xl p-6 ring-1 ring-red-500/30">
          {/* Flashing red border effect */}
          <div className="absolute inset-0 rounded-2xl ring-2 ring-red-500/20 animate-pulse pointer-events-none" />

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Pond 3 — Emergency Alert
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Root Cause Analysis: Dissolved Oxygen Critical Drop
                </p>
              </div>
            </div>
            <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-400 uppercase">
              Critical
            </span>
          </div>

          {/* DO Chart */}
          <div className="mb-3 rounded-xl border border-border/30 bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {"Dissolved Oxygen (DO) — Last 20h"}
              </span>
              <span className="text-[10px] font-bold text-red-400">
                {"Current: 2.1 mg/L"}
              </span>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DO_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="doGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 30%, 18%)" opacity={0.4} />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "hsl(210, 15%, 55%)", fontSize: 10 }}
                    axisLine={{ stroke: "hsl(210, 30%, 18%)" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 7]}
                    tick={{ fill: "hsl(210, 15%, 55%)", fontSize: 10 }}
                    axisLine={{ stroke: "hsl(210, 30%, 18%)" }}
                    tickLine={false}
                    unit=" mg/L"
                  />
                  <ReferenceLine
                    y={3}
                    stroke="#ef4444"
                    strokeDasharray="6 3"
                    label={{
                      value: "Danger: 3 mg/L",
                      position: "right",
                      fill: "#ef4444",
                      fontSize: 9,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#doGradient)"
                    dot={{ r: 2, fill: "#ef4444", strokeWidth: 0 }}
                    activeDot={{ r: 4, fill: "#ef4444", stroke: "#1a1a2e", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                {"DO < 3 mg/L = Critical hypoxia zone"}
              </span>
            </div>
          </div>
        </div>

        {/* AI Prescriptive Actions */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  AI Prescriptive Actions
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Context-aware recommendations for Pond 3
                </p>
              </div>
            </div>
            <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              <Brain className="mr-1 inline h-3 w-3" />
              AI Confidence: 98%
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {ACTIONS.map((action, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/30 bg-background/40 p-4 transition-all hover:border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.iconBg}`}
                  >
                    <action.icon className={`h-4 w-4 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${action.badgeColor}`}
                      >
                        {action.badgeText}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        {action.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-foreground">
                      {action.instruction}
                    </p>
                  </div>
                  <span className="mt-1 text-xs font-bold text-muted-foreground/40">
                    {`0${i + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-3">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>
                Actions prioritized by{" "}
                <span className="font-semibold text-primary">
                  GADEWS Decision Engine v2.1
                </span>{" "}
                using real-time sensor data + historical outbreak patterns.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Biosecurity Checklist */}
      <div className="glass rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/15">
              <ClipboardCheck className="h-4 w-4 text-teal-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Biosecurity Self-Check Protocol
              </h3>
              <p className="text-[10px] text-muted-foreground">
                WSSV Prevention — Complete all items for compliance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-muted-foreground">
              {checkedCount}/{checklist.length} completed
            </span>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-teal-400 transition-all duration-500"
                style={{
                  width: `${(checkedCount / checklist.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                item.checked
                  ? "border-teal-500/30 bg-teal-500/[0.04]"
                  : "border-border/30 bg-background/40 hover:border-primary/20"
              }`}
            >
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleCheck(item.id)}
                className="mt-0.5"
              />
              <span
                className={`text-xs leading-relaxed ${
                  item.checked
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>

        {checkedCount === checklist.length && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">
              All biosecurity checks passed — WSSV prevention protocol compliant.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
