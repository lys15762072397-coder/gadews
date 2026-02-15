"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { BrainCircuit } from "lucide-react";

const DATA = [
  { day: "Feb 8", actual: 32, forecast: null, type: "past" },
  { day: "Feb 9", actual: 38, forecast: null, type: "past" },
  { day: "Feb 10", actual: 45, forecast: null, type: "past" },
  { day: "Feb 11", actual: 52, forecast: 52, type: "today" },
  { day: "Feb 12", actual: null, forecast: 58, type: "future" },
  { day: "Feb 13", actual: null, forecast: 63, type: "future" },
  { day: "Feb 14", actual: null, forecast: 67, type: "future" },
  { day: "Feb 15", actual: null, forecast: 61, type: "future" },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-[11px] text-muted-foreground">
          {p.dataKey === "actual" ? "Observed" : "Predicted"}:{" "}
          <span className="font-bold text-foreground">{p.value}%</span>
        </p>
      ))}
    </div>
  );
}

export function RiskForecastChart() {
  return (
    <div className="glass flex h-full flex-col rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <BrainCircuit className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              7-Day Risk Forecast
            </h3>
            <p className="text-[10px] text-muted-foreground">
              AI-powered outbreak probability model
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1">
          <BrainCircuit className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold text-primary">
            AI Confidence: 92%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 rounded-full bg-cyan-400" />
          <span className="text-[10px] text-muted-foreground">Observed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-5 rounded-full border-b border-dashed border-orange-400" />
          <span className="text-[10px] text-muted-foreground">AI Predicted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-5 rounded-sm bg-orange-400/10" />
          <span className="text-[10px] text-muted-foreground">Forecast Zone</span>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(210, 30%, 14%)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "hsl(210, 15%, 55%)" }}
              axisLine={{ stroke: "hsl(210, 30%, 14%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(210, 15%, 55%)" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Forecast zone shading */}
            <ReferenceArea
              x1="Feb 11"
              x2="Feb 15"
              fill="hsl(30, 90%, 55%)"
              fillOpacity={0.06}
            />

            {/* Today marker */}
            <ReferenceLine
              x="Feb 11"
              stroke="hsl(210, 15%, 55%)"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: "Today",
                position: "top",
                fontSize: 10,
                fill: "hsl(210, 15%, 55%)",
              }}
            />

            {/* Observed line (solid) */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#22d3ee"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#22d3ee", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#22d3ee", strokeWidth: 2, stroke: "#0b3d91" }}
              connectNulls={false}
            />

            {/* Forecast line (dashed) */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#fb923c"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={{ r: 3, fill: "#fb923c", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#fb923c", strokeWidth: 2, stroke: "#0b3d91" }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight strip */}
      <div className="mt-4 rounded-lg border border-orange-400/20 bg-orange-400/5 px-4 py-2.5">
        <p className="text-[11px] leading-relaxed text-orange-300">
          <span className="font-bold">AI Insight:</span> Rising outbreak probability
          detected in SE Asia corridor. Peak risk expected Feb 13-14 driven by monsoon
          salinity disruption and elevated WSSV prevalence.
        </p>
      </div>
    </div>
  );
}
