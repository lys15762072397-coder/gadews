"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Bug, Microscope, ArrowRight, FileText } from "lucide-react";

interface LiteratureItem {
  Title: string;
  Authors: string;
  "Journal/Publisher": string;
  Pub_Year: number;
  DOI: string;
  Abstract: string;
  Category: string;
  file_name: string;
  collection: "wssv" | "streptococcosis";
}

const COLLECTION_CONFIG = {
  wssv: {
    label: "WSSV",
    sublabel: "White Spot Syndrome",
    description: "White Spot Syndrome Virus — the most economically devastating viral pathogen in global shrimp aquaculture.",
    icon: Bug,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    ringColor: "hover:ring-cyan-400/30",
    glowColor: "hover:shadow-[0_0_20px_rgba(0,200,220,0.15)]",
    href: "/knowledge-bank/literature?collection=wssv",
  },
  streptococcosis: {
    label: "Streptococcosis",
    sublabel: "Tilapia Streptococcosis",
    description: "Bacterial streptococcal disease in tilapia — a leading cause of economic losses in tropical and subtropical fish farming.",
    icon: Microscope,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    ringColor: "hover:ring-emerald-400/30",
    glowColor: "hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    href: "/knowledge-bank/literature?collection=streptococcosis",
  },
} as const;

function CollectionCard({
  collectionId,
  items,
}: {
  collectionId: "wssv" | "streptococcosis";
  items: LiteratureItem[];
}) {
  const cfg = COLLECTION_CONFIG[collectionId];
  const Icon = cfg.icon;

  const catCount = useMemo(
    () => new Set(items.map((item) => item.Category)).size,
    [items]
  );

  // Latest 3 papers sorted by year desc
  const latestThree = useMemo(
    () =>
      [...items]
        .sort((a, b) => (b.Pub_Year ?? 0) - (a.Pub_Year ?? 0))
        .slice(0, 3),
    [items]
  );

  return (
    <div
      className={`glass rounded-xl p-6 flex flex-col gap-5 transition-all duration-200
        hover:ring-1 ${cfg.ringColor} ${cfg.glowColor}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${cfg.bgColor}`}>
          <Icon className={`h-5 w-5 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-lg text-foreground`}>{cfg.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{cfg.sublabel}</p>
          <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed line-clamp-2">
            {cfg.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex-1 rounded-lg bg-secondary/30 px-4 py-2.5 text-center">
          <p className={`font-mono text-2xl font-bold ${cfg.color}`}>{items.length}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Papers</p>
        </div>
        <div className="flex-1 rounded-lg bg-secondary/30 px-4 py-2.5 text-center">
          <p className={`font-mono text-2xl font-bold ${cfg.color}`}>{catCount}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Categories</p>
        </div>
      </div>

      {/* Latest papers preview */}
      {latestThree.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            Recent Papers
          </p>
          {latestThree.map((paper, i) => (
            <div key={i} className="flex items-start gap-2 group">
              <FileText className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${cfg.color} opacity-60`} />
              <p className="text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors">
                <span className="font-mono text-[10px] mr-1.5 opacity-60">{paper.Pub_Year}</span>
                {paper.Title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        href={cfg.href}
        className={`mt-auto flex items-center justify-center gap-2 rounded-lg border border-border/30
          px-4 py-2.5 text-sm font-semibold ${cfg.color}
          hover:border-current hover:bg-primary/5 transition-all group`}
      >
        Browse All Papers
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function LiteratureOverview() {
  const [data, setData] = useState<LiteratureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/literature.json")
      .then((res) => res.json())
      .then((json: LiteratureItem[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const wssvItems = useMemo(() => data.filter((d) => d.collection === "wssv"), [data]);
  const streItems = useMemo(() => data.filter((d) => d.collection === "streptococcosis"), [data]);

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-primary" />
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
                Academic Resources
              </p>
              <h2 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
                Literature &amp; Research
              </h2>
            </div>
          </div>
          <Link
            href="/knowledge-bank/literature"
            className="group hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            Full Repository
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Collection cards */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse h-72" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <CollectionCard collectionId="wssv" items={wssvItems} />
            <CollectionCard collectionId="streptococcosis" items={streItems} />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/knowledge-bank/literature"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold
              text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,200,220,0.3)] transition-all"
          >
            Enter Full Literature Repository
            <ArrowRight className="h-4 w-4" />
          </Link>
          {!loading && (
            <p className="mt-2 text-xs text-muted-foreground">
              {data.length} papers across {new Set(data.map((d) => d.collection)).size} disease collections
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
