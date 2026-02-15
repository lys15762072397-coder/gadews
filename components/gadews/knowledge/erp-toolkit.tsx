"use client";

import {
  FileText,
  FlaskConical,
  ClipboardCheck,
  Download,
  ExternalLink,
  ShieldAlert,
  BookMarked,
  Calculator,
  Syringe,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Resource {
  icon: typeof FileText;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  format: string;
  formatColor: string;
  tags: string[];
  downloads: string;
}

const RESOURCES: Resource[] = [
  {
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "FAO Standard ERP Template",
    subtitle: "National Emergency Response Plan (Aquaculture) - Editable multi-section template with regional adaptation guidelines",
    format: "DOCX",
    formatColor: "text-blue-400 bg-blue-500/10",
    tags: ["FAO", "Emergency", "Template"],
    downloads: "2,341",
  },
  {
    icon: FlaskConical,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    title: "Disinfection Protocol: Chlorine Dosage Calculator",
    subtitle: "Interactive calculator for pond disinfection. Accounts for organic load, pH, and temperature",
    format: "XLSX",
    formatColor: "text-emerald-400 bg-emerald-500/10",
    tags: ["Disinfection", "Calculator", "Ponds"],
    downloads: "5,678",
  },
  {
    icon: ClipboardCheck,
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10",
    title: "Biosecurity Checklist: Hatchery Level 1 Standards",
    subtitle: "Comprehensive 47-point inspection checklist based on WOAH Aquatic Animal Health Code Chapter 4.1",
    format: "PDF",
    formatColor: "text-red-400 bg-red-500/10",
    tags: ["Biosecurity", "Hatchery", "WOAH"],
    downloads: "3,892",
  },
  {
    icon: Syringe,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    title: "Vaccination Schedule: Salmonid Species",
    subtitle: "Recommended vaccination protocols for Atlantic salmon, Rainbow trout. Includes booster timing and cold chain guidelines",
    format: "PDF",
    formatColor: "text-red-400 bg-red-500/10",
    tags: ["Vaccination", "Salmonid", "Protocol"],
    downloads: "1,204",
  },
  {
    icon: Calculator,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    title: "Stocking Density Calculator",
    subtitle: "Species-specific stocking density optimization tool. Factors in water quality parameters and growth stage",
    format: "XLSX",
    formatColor: "text-emerald-400 bg-emerald-500/10",
    tags: ["Management", "Calculator", "Density"],
    downloads: "4,156",
  },
  {
    icon: FileSpreadsheet,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    title: "Water Quality Monitoring Logbook",
    subtitle: "Standardized daily monitoring template for DO, pH, ammonia, nitrite, salinity, and temperature tracking",
    format: "XLSX",
    formatColor: "text-emerald-400 bg-emerald-500/10",
    tags: ["Monitoring", "Water Quality", "Log"],
    downloads: "7,023",
  },
];

const QUICK_LINKS = [
  { icon: ShieldAlert, label: "WOAH Aquatic Code", color: "text-red-400" },
  { icon: BookMarked, label: "FAO Fisheries Circulars", color: "text-primary" },
  { icon: FlaskConical, label: "NACA Disease Cards", color: "text-emerald-400" },
];

export function ERPToolkit() {
  return (
    <section className="py-10 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Toolkit & ERP Templates
            </p>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Emergency Response Resources
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Standardized templates, calculators, and checklists for aquaculture disease management
            </p>
          </div>
          {/* Quick links */}
          <div className="flex items-center gap-3">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-secondary/30 px-3 py-2 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              >
                <link.icon className={`h-3.5 w-3.5 ${link.color}`} />
                <span className="hidden sm:inline">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resource list */}
        <div className="grid gap-4 lg:grid-cols-2">
          {RESOURCES.map((res, idx) => (
            <div
              key={idx}
              className="group glass flex gap-4 rounded-xl p-5 transition-all hover:ring-1 hover:ring-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Icon */}
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${res.iconBg} ring-1 ring-border/20`}>
                <res.icon className={`h-6 w-6 ${res.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground truncate">{res.title}</h3>
                  <span className={`shrink-0 rounded-md border border-border/20 px-1.5 py-0.5 text-[10px] font-bold ${res.formatColor}`}>
                    {res.format}
                  </span>
                </div>

                <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {res.subtitle}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {res.tags.map((tag) => (
                      <span key={tag} className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground">
                      {res.downloads} downloads
                    </span>
                    <button className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition-all hover:bg-primary/20">
                      <Download className="h-3 w-3" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 glass rounded-xl p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Need a custom protocol?
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Our AI can generate region-specific emergency response plans based on your local conditions and species profile.
            </p>
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90">
            Generate Custom ERP
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
