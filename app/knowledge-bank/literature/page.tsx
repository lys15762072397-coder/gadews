"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { StickyHeader } from "@/components/gadews/sticky-header";
import { Footer } from "@/components/gadews/footer";
import {
  Home,
  Bug,
  Microscope,
  Search,
  LayoutGrid,
  List,
  BookOpen,
  FileText,
  ExternalLink,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const PDF_BASE_URL = "http://59.110.161.54/literature/";

const COLLECTIONS = [
  {
    id: "wssv" as const,
    label: "WSSV",
    sublabel: "White Spot Syndrome",
    icon: Bug,
    color: "text-cyan-400",
    ringColor: "ring-cyan-400/50",
    glowColor: "shadow-[0_0_20px_rgba(0,200,220,0.2)]",
  },
  {
    id: "streptococcosis" as const,
    label: "Streptococcosis",
    sublabel: "Tilapia Streptococcosis",
    icon: Microscope,
    color: "text-emerald-400",
    ringColor: "ring-emerald-400/50",
    glowColor: "shadow-[0_0_20px_rgba(52,211,153,0.2)]",
  },
];

const SORT_OPTIONS = [
  { value: "year_desc", label: "Year: Newest First" },
  { value: "year_asc", label: "Year: Oldest First" },
];

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-20 rounded bg-secondary/60" />
        <div className="h-4 w-10 rounded bg-secondary/60" />
      </div>
      <div className="h-4 w-full rounded bg-secondary/60 mb-2" />
      <div className="h-4 w-3/4 rounded bg-secondary/60 mb-3" />
      <div className="h-3 w-1/2 rounded bg-secondary/40 mb-4" />
      <div className="h-10 w-full rounded bg-secondary/40 mb-4" />
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-14 rounded-full bg-secondary/40" />
        ))}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-border/20">
        <div className="h-4 w-16 rounded bg-secondary/40" />
        <div className="h-8 w-24 rounded bg-secondary/40" />
      </div>
    </div>
  );
}

// ─── Abstract Expander ─────────────────────────────────────────────────────────

function AbstractText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!text)
    return (
      <p className="text-xs text-muted-foreground italic">
        No abstract available.
      </p>
    );
  return (
    <div>
      <p
        className={`text-xs text-muted-foreground leading-relaxed transition-all ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className="mt-1 flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-3 w-3" /> Collapse
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3" /> Expand
          </>
        )}
      </button>
    </div>
  );
}

// ─── Literature Card ───────────────────────────────────────────────────────────

function LiteratureCard({
  item,
  onOpen,
}: {
  item: LiteratureItem;
  onOpen: (item: LiteratureItem) => void;
}) {
  const pdfUrl = PDF_BASE_URL + encodeURIComponent(item.file_name);
  const subcategory = item.Category.split("-")[1] ?? item.Category;

  return (
    <div
      className="group glass rounded-xl p-5 flex flex-col gap-3 cursor-pointer
        hover:ring-1 hover:ring-primary/30 hover:shadow-lg hover:shadow-primary/5
        border-b-2 border-transparent hover:border-primary/50 transition-all duration-200"
      onClick={() => onOpen(item)}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide rounded px-2 py-0.5 truncate max-w-[70%]">
          {subcategory}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground flex-shrink-0">
          {item.Pub_Year || "—"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
        {item.Title}
      </h3>

      {/* Authors */}
      {item.Authors && (
        <p className="text-[11px] text-muted-foreground italic truncate">
          {item.Authors}
        </p>
      )}

      {/* Journal */}
      <div className="flex items-center gap-1.5">
        <BookOpen className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
        <span className="text-xs text-muted-foreground truncate">
          {item["Journal/Publisher"] || "Unknown Publisher"}
        </span>
      </div>

      {/* Abstract */}
      <AbstractText text={item.Abstract} />

      {/* Tags */}
      {subcategory && (
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-secondary/60 text-muted-foreground text-[10px] rounded-full px-2 py-0.5">
            {subcategory}
          </span>
        </div>
      )}

      {/* Bottom actions */}
      <div
        className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {item.DOI ? (
          <a
            href={
              item.DOI.startsWith("http")
                ? item.DOI
                : `https://doi.org/${item.DOI}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            DOI
          </a>
        ) : (
          <span />
        )}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold
            text-primary-foreground transition-all
            hover:shadow-[0_0_12px_rgba(0,200,220,0.4)] hover:bg-primary/90"
        >
          <FileText className="h-3.5 w-3.5" />
          Full Text
        </a>
      </div>
    </div>
  );
}

// ─── List Row ──────────────────────────────────────────────────────────────────

function LiteratureRow({
  item,
  index,
  onOpen,
}: {
  item: LiteratureItem;
  index: number;
  onOpen: (item: LiteratureItem) => void;
}) {
  const pdfUrl = PDF_BASE_URL + encodeURIComponent(item.file_name);
  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border-b border-border/20
        hover:bg-primary/5 cursor-pointer transition-colors group"
      onClick={() => onOpen(item)}
    >
      <span className="font-mono text-xs text-muted-foreground w-6 flex-shrink-0 text-right">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {item.Title}
        </p>
        <p className="text-[11px] text-muted-foreground italic truncate mt-0.5">
          {item.Authors || "—"}
        </p>
      </div>
      <div className="hidden md:block w-36 flex-shrink-0">
        <p className="text-xs text-muted-foreground truncate">
          {item["Journal/Publisher"]}
        </p>
      </div>
      <span className="font-mono text-xs text-muted-foreground w-10 flex-shrink-0 text-center">
        {item.Pub_Year}
      </span>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 flex-shrink-0 transition-colors"
      >
        <FileText className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Read</span>
      </a>
    </div>
  );
}

// ─── Detail Drawer ─────────────────────────────────────────────────────────────

function DetailDrawer({
  item,
  onClose,
}: {
  item: LiteratureItem | null;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const pdfUrl = item ? PDF_BASE_URL + encodeURIComponent(item.file_name) : "";
  const subcategory = item?.Category.split("-")[1] ?? item?.Category ?? "";
  const authorList = item?.Authors
    ? item.Authors.split(/[,;]+/)
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          item ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-full max-w-[480px] z-50 glass-strong border-l border-border/20
          flex flex-col transition-transform duration-300 ease-in-out ${
            item ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {item && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 p-5 border-b border-border/20">
              <div className="flex-1 min-w-0">
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide rounded px-2 py-0.5">
                  {subcategory}
                </span>
                <h2 className="mt-2 text-xl font-bold text-foreground leading-snug">
                  {item.Title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Authors */}
              {authorList.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                    Authors
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {authorList.map((author, i) => (
                      <span
                        key={i}
                        className="bg-secondary/60 text-foreground/80 text-[11px] rounded-full px-2.5 py-0.5"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal info */}
              <div className="rounded-lg bg-secondary/30 px-4 py-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-foreground/90 font-medium">
                    {item["Journal/Publisher"] || "Unknown Publisher"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-mono">{item.Pub_Year}</span>
                  {item.DOI && (
                    <a
                      href={
                        item.DOI.startsWith("http")
                          ? item.DOI
                          : `https://doi.org/${item.DOI}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors truncate"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      {item.DOI}
                    </a>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-lg bg-secondary/30 px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Year</p>
                  <p className="font-mono text-lg font-bold text-foreground">
                    {item.Pub_Year || "—"}
                  </p>
                </div>
                <div className="flex-1 rounded-lg bg-secondary/30 px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                    Category
                  </div>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {subcategory}
                  </p>
                </div>
              </div>

              {/* Abstract */}
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                  Abstract
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.Abstract || "No abstract available."}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-4 border-t border-border/20 flex gap-3">
              {item.DOI && (
                <a
                  href={
                    item.DOI.startsWith("http")
                      ? item.DOI
                      : `https://doi.org/${item.DOI}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border/40
                    px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  DOI Link
                </a>
              )}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary
                  px-4 py-2.5 text-sm font-semibold text-primary-foreground
                  hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(0,200,220,0.4)] transition-all"
              >
                <FileText className="h-4 w-4" />
                Full Text
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Inner Content (uses useSearchParams) ─────────────────────────────────────
// Must be wrapped in <Suspense> by the parent export

function LiteratureContent() {
  const searchParams = useSearchParams();
  const initialCollection =
    (searchParams.get("collection") as "wssv" | "streptococcosis") ?? "wssv";

  const [data, setData] = useState<LiteratureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCollection, setActiveCollection] = useState<
    "wssv" | "streptococcosis"
  >(initialCollection);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("year_desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<LiteratureItem | null>(null);

  // Fetch data
  useEffect(() => {
    fetch("/data/literature.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: LiteratureItem[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Reset filters when switching collection
  useEffect(() => {
    setActiveCategory("all");
    setSearchQuery("");
  }, [activeCollection]);

  // Derived data
  const collectionData = useMemo(
    () => data.filter((item) => item.collection === activeCollection),
    [data, activeCollection]
  );

  const categories = useMemo(() => {
    const cats = new Set(
      collectionData.map((item) => item.Category.split("-")[1] ?? item.Category)
    );
    return Array.from(cats).filter(Boolean);
  }, [collectionData]);

  const filteredData = useMemo(() => {
    let result = collectionData;

    if (activeCategory !== "all") {
      result = result.filter(
        (item) =>
          (item.Category.split("-")[1] ?? item.Category) === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.Title?.toLowerCase().includes(q) ||
          item.Authors?.toLowerCase().includes(q) ||
          item.Abstract?.toLowerCase().includes(q) ||
          item["Journal/Publisher"]?.toLowerCase().includes(q) ||
          item.Category?.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "year_desc") return (b.Pub_Year ?? 0) - (a.Pub_Year ?? 0);
      if (sortBy === "year_asc") return (a.Pub_Year ?? 0) - (b.Pub_Year ?? 0);
      return 0;
    });

    return result;
  }, [collectionData, activeCategory, searchQuery, sortBy]);

  // Collection counts
  const wssvCount = useMemo(
    () => data.filter((d) => d.collection === "wssv").length,
    [data]
  );
  const streCount = useMemo(
    () => data.filter((d) => d.collection === "streptococcosis").length,
    [data]
  );
  const wssvCatCount = useMemo(
    () =>
      new Set(
        data.filter((d) => d.collection === "wssv").map((d) => d.Category)
      ).size,
    [data]
  );
  const streCatCount = useMemo(
    () =>
      new Set(
        data
          .filter((d) => d.collection === "streptococcosis")
          .map((d) => d.Category)
      ).size,
    [data]
  );

  return (
    <main className="relative min-h-screen">
      <StickyHeader />

      {/* ── Area 1: Hero ──────────────────────────────────────────────────────── */}
      <div
        className="pt-24 pb-10 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,220,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,220,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/knowledge-bank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Knowledge Bank
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  Literature Repository
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title + Stats */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
                Knowledge Bank
              </p>
              <h1 className="mt-1 text-3xl font-extrabold text-foreground sm:text-4xl">
                Literature Repository
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Structured academic database for aquaculture biosecurity
              </p>
            </div>
            <div className="flex gap-3">
              <div className="glass rounded-lg px-4 py-2 text-center">
                <p className="font-mono text-xl font-bold text-primary">
                  {loading ? "—" : data.length}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Total Papers
                </p>
              </div>
              <div className="glass rounded-lg px-4 py-2 text-center">
                <p className="font-mono text-xl font-bold text-emerald-400">
                  {loading ? "—" : new Set(data.map((d) => d.collection)).size}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Disease Collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Area 2: Collection Tabs ────────────────────────────────────────────── */}
      <div className="pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COLLECTIONS.map((col) => {
              const isActive = activeCollection === col.id;
              const count = col.id === "wssv" ? wssvCount : streCount;
              const catCount = col.id === "wssv" ? wssvCatCount : streCatCount;
              const Icon = col.icon;
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveCollection(col.id)}
                  className={`glass rounded-xl p-5 text-left transition-all duration-200
                    ${
                      isActive
                        ? `ring-2 ${col.ringColor} ${col.glowColor}`
                        : "hover:ring-1 hover:ring-border/50"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg
                        ${isActive ? "bg-primary/15" : "bg-secondary/50"}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? col.color : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-bold text-base ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {col.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {col.sublabel}
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <div>
                          <p
                            className={`font-mono text-xl font-bold ${
                              isActive ? col.color : "text-foreground/60"
                            }`}
                          >
                            {loading ? "—" : count}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Papers
                          </p>
                        </div>
                        <div className="h-8 w-px bg-border/30" />
                        <div>
                          <p
                            className={`font-mono text-xl font-bold ${
                              isActive ? col.color : "text-foreground/60"
                            }`}
                          >
                            {loading ? "—" : catCount}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Categories
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Area 3: Filter Bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 border-b border-border/20">
        <div className="glass px-4 lg:px-8 py-3 mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                All ({collectionData.length})
              </button>
              {categories.map((cat) => {
                const count = collectionData.filter(
                  (item) =>
                    (item.Category.split("-")[1] ?? item.Category) === cat
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search + Sort + View */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, author, keyword..."
                  className="h-8 w-48 sm:w-64 rounded-md border border-border/30 bg-secondary/30 pl-8 pr-3 text-xs
                    text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 rounded-md border border-border/30 bg-secondary/30 px-2 text-xs text-muted-foreground
                  focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* View toggle */}
              <div className="flex items-center rounded-md border border-border/30 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-8 w-8 items-center justify-center transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-8 w-8 items-center justify-center transition-colors ${
                    viewMode === "list"
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Area 4: Content ───────────────────────────────────────────────────── */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Result count */}
          {!loading && !error && (
            <p className="mb-4 text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredData.length}
              </span>{" "}
              {filteredData.length === 1 ? "paper" : "papers"}
              {searchQuery && (
                <>
                  {" "}
                  for &ldquo;
                  <span className="text-primary">{searchQuery}</span>
                  &rdquo;
                </>
              )}
            </p>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="glass rounded-xl p-8 text-center">
              <p className="text-muted-foreground mb-3">
                Failed to load literature data.
              </p>
              <button
                onClick={() => {
                  setError(false);
                  setLoading(true);
                }}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="h-16 w-16 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground">No papers found.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Try adjusting your search or filter.
              </p>
            </div>
          )}

          {/* Grid view */}
          {!loading && !error && filteredData.length > 0 && viewMode === "grid" && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredData.map((item, i) => (
                <LiteratureCard key={i} item={item} onOpen={setSelectedItem} />
              ))}
            </div>
          )}

          {/* List view */}
          {!loading && !error && filteredData.length > 0 && viewMode === "list" && (
            <div className="glass rounded-xl overflow-hidden">
              {/* List header */}
              <div className="flex items-center gap-4 px-4 py-2 border-b border-border/30 bg-secondary/20">
                <span className="w-6" />
                <span className="flex-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Title
                </span>
                <span className="hidden md:block w-36 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Journal
                </span>
                <span className="w-10 text-center text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Year
                </span>
                <span className="w-12 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  Read
                </span>
              </div>
              {filteredData.map((item, i) => (
                <LiteratureRow
                  key={i}
                  item={item}
                  index={i}
                  onOpen={setSelectedItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Drawer ─────────────────────────────────────────────────────── */}
      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />

      <Footer />
    </main>
  );
}

// ─── Page Export — wraps content in Suspense (required for useSearchParams) ───

export default function LiteraturePage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen">
          <StickyHeader />
          <div className="pt-32 pb-8">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </main>
      }
    >
      <LiteratureContent />
    </Suspense>
  );
}
