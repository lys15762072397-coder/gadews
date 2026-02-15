"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  Brain,
  Clock,
} from "lucide-react";

const TOTAL_DAYS = 37; // 30 past + today + 6 future
const TODAY_INDEX = 30;

const TICK_LABELS = [
  { index: 0, label: "-30d" },
  { index: 7, label: "-23d" },
  { index: 15, label: "-15d" },
  { index: 22, label: "-8d" },
  { index: 30, label: "Today" },
  { index: 33, label: "+3d" },
  { index: 36, label: "+6d" },
];

const SPEEDS = [1, 2, 4];

export function TimelineController() {
  const [value, setValue] = useState(TODAY_INDEX);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isForecast = value > TODAY_INDEX;
  const daysOffset = value - TODAY_INDEX;

  const startPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const stopPlay = useCallback(() => {
    setPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setValue(0);
  }, []);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setValue((prev) => {
          if (prev >= TOTAL_DAYS - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800 / SPEEDS[speedIdx]);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, speedIdx]);

  const pct = (value / (TOTAL_DAYS - 1)) * 100;
  const todayPct = (TODAY_INDEX / (TOTAL_DAYS - 1)) * 100;

  return (
    <div className="glass-strong rounded-2xl px-5 py-4 shadow-2xl shadow-black/30">
      {/* Forecast indicator */}
      {isForecast && (
        <div className="mb-3 flex items-center justify-center gap-2">
          <Brain className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-amber-400">
            {"Viewing: +"}{daysOffset}{" Days Forecast (AI Confidence: 89%)"}
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Play controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={reset}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            aria-label="Reset"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={playing ? stopPlay : startPlay}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary transition-all hover:bg-primary/25"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
          <button
            onClick={() => setSpeedIdx((prev) => (prev + 1) % SPEEDS.length)}
            className="flex h-8 items-center justify-center rounded-lg px-2 text-xs font-mono font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            {"x"}{SPEEDS[speedIdx]}
          </button>
        </div>

        {/* Timeline track */}
        <div className="relative flex-1">
          {/* Labels */}
          <div className="relative mb-1.5 h-4">
            {TICK_LABELS.map((t) => (
              <span
                key={t.index}
                className={`absolute -translate-x-1/2 text-[10px] font-mono ${
                  t.index === TODAY_INDEX
                    ? "font-bold text-primary"
                    : t.index > TODAY_INDEX
                    ? "text-amber-400/70"
                    : "text-muted-foreground/60"
                }`}
                style={{
                  left: `${(t.index / (TOTAL_DAYS - 1)) * 100}%`,
                }}
              >
                {t.label}
              </span>
            ))}
          </div>

          {/* Custom slider track */}
          <div
            className="relative h-2 w-full cursor-pointer rounded-full bg-secondary"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const newVal = Math.round((x / rect.width) * (TOTAL_DAYS - 1));
              setValue(Math.max(0, Math.min(TOTAL_DAYS - 1, newVal)));
            }}
          >
            {/* Past track (solid) */}
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary/50"
              style={{ width: `${Math.min(pct, todayPct)}%` }}
            />
            {/* Forecast track (striped) */}
            {isForecast && (
              <div
                className="absolute top-0 h-full rounded-r-full"
                style={{
                  left: `${todayPct}%`,
                  width: `${pct - todayPct}%`,
                  background:
                    "repeating-linear-gradient(90deg, rgba(251,191,36,0.4), rgba(251,191,36,0.4) 4px, rgba(251,191,36,0.15) 4px, rgba(251,191,36,0.15) 8px)",
                }}
              />
            )}

            {/* Today marker line */}
            <div
              className="absolute top-0 h-full w-px bg-primary"
              style={{ left: `${todayPct}%` }}
            >
              <div className="absolute -top-1 left-1/2 h-4 w-px -translate-x-1/2 bg-primary" />
            </div>

            {/* Forecast zone bg */}
            <div
              className="absolute top-0 h-full rounded-r-full bg-amber-500/5"
              style={{
                left: `${todayPct}%`,
                width: `${100 - todayPct}%`,
              }}
            />

            {/* Thumb */}
            <div
              className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-shadow ${
                isForecast
                  ? "border-amber-400 bg-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                  : "border-primary bg-primary/20 shadow-[0_0_10px_rgba(0,200,220,0.4)]"
              }`}
              style={{ left: `${pct}%` }}
            />
          </div>

          {/* Range labels */}
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground/50">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Past 30 Days
            </div>
            <div className="flex items-center gap-1 text-amber-400/50">
              <Brain className="h-3 w-3" />
              AI Forecast 7 Days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
