"use client";

import { useState, useRef } from "react";
import {
  Microscope,
  Upload,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const QUICK_TAGS = [
  "#WSSV",
  "#AHPND",
  "#TiLV",
  "#EHP",
  "#FAO-ERP",
  "#Vibrio",
  "#ISA",
  "#KHV",
];

type DiagnosisState = "idle" | "scanning" | "done";

export function AIDiagnosticLab() {
  const [diagState, setDiagState] = useState<DiagnosisState>("idle");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(name: string) {
    setUploadedFileName(name);
    setDiagState("scanning");
    setTimeout(() => setDiagState("done"), 2400);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file.name);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file.name);
  }

  function resetDiagnosis() {
    setDiagState("idle");
    setUploadedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,200,220,0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0,200,220,0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(0,200,220,0.2) 0%, transparent 50%)`
      }} />

      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8">
          <p className="mb-1.5 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            AI-Powered Diagnostics
          </p>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            AI Rapid Diagnosis Lab
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: AI Upload Tool */}
          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <Microscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  AI Rapid Diagnosis Assistant
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Model: GADEWS-Vision v2.0
                </p>
              </div>
              <Badge className="ml-auto border-primary/30 bg-primary/10 text-primary text-[10px]">
                <Sparkles className="mr-1 h-3 w-3" /> AI
              </Badge>
            </div>

            {diagState === "idle" && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className={`mx-auto mb-3 h-8 w-8 transition-colors ${
                  dragActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                }`} />
                <p className="text-sm font-medium text-foreground">
                  Drag & Drop Clinical Image
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  e.g., shrimp carapace, gills, liver tissue
                </p>
                <p className="mt-3 text-[10px] text-muted-foreground">
                  Supports JPG, PNG, TIFF up to 25MB
                </p>
              </div>
            )}

            {diagState === "scanning" && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-primary/5 p-10">
                <Loader2 className="mb-3 h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  Analyzing Image...
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {uploadedFileName}
                </p>
                <div className="mt-4 w-full max-w-xs">
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: "70%" }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                    <span>Feature Extraction</span>
                    <span>CNN Inference</span>
                    <span>Classification</span>
                  </div>
                </div>
              </div>
            )}

            {diagState === "done" && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                      Pathogen Detected
                    </span>
                  </div>
                  <button
                    onClick={resetDiagnosis}
                    className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <h4 className="text-lg font-bold text-foreground">
                  White Spot Syndrome Virus (WSSV)
                </h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Family: Nimaviridae | dsDNA Virus
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Confidence</p>
                    <p className="mt-0.5 text-xl font-extrabold text-red-400">98.5%</p>
                    <p className="text-[10px] text-emerald-400 font-medium">HIGH</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk Level</p>
                    <p className="mt-0.5 text-xl font-extrabold text-red-400">Critical</p>
                    <p className="text-[10px] text-muted-foreground">OIE-Listed Disease</p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-background/50 p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Similar Cases in Database
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>Matched 342 records across 12 countries</span>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 flex items-center justify-center gap-1.5">
                  View Treatment Protocol
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Global Search Engine */}
          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 ring-1 ring-cyan-500/30">
                <Search className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Global Knowledge Search
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Pathogens, protocols, primers & literature
                </p>
              </div>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pathogens, PCR Primers, or Protocols..."
                className="w-full rounded-xl border border-border/50 bg-secondary/30 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Quick tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag.replace("#", ""))}
                  className="rounded-lg border border-border/30 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Mock search results */}
            {searchQuery && (
              <div className="mt-5 space-y-2.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Suggested Results
                </p>
                {[
                  {
                    title: "WSSV Detection Protocol (OIE 2.2.1)",
                    type: "Protocol",
                    typeColor: "text-primary bg-primary/10",
                  },
                  {
                    title: "PCR Primer Set: ICP11 / VP28",
                    type: "Primer",
                    typeColor: "text-emerald-400 bg-emerald-500/10",
                  },
                  {
                    title: "AHPND/EMS Field Guide - FAO 2024",
                    type: "Literature",
                    typeColor: "text-orange-400 bg-orange-500/10",
                  },
                ].map((result, idx) => (
                  <button
                    key={idx}
                    className="flex w-full items-center gap-3 rounded-lg border border-border/20 bg-background/30 p-3 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${result.typeColor}`}>
                      {result.type}
                    </div>
                    <span className="flex-1 text-xs font-medium text-foreground">
                      {result.title}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Pathogens", value: "127" },
                { label: "Protocols", value: "450+" },
                { label: "Papers", value: "12,800" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-secondary/40 p-3 text-center">
                  <p className="text-lg font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
