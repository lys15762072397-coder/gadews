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
import { AIDiagnosticLab } from "@/components/gadews/knowledge/ai-diagnostic-lab";
import { PathogenEncyclopedia } from "@/components/gadews/knowledge/pathogen-encyclopedia";
import { ERPToolkit } from "@/components/gadews/knowledge/erp-toolkit";
import {
  Home,
  BookOpen,
  Database,
  Microscope,
  ShieldAlert,
} from "lucide-react";
import { LiteratureOverview } from "@/components/gadews/knowledge/literature-overview"; // New component for literature overview

export const metadata = {
  title: "Knowledge Bank | GADEWS",
  description:
    "Comprehensive aquaculture pathogen encyclopedia, AI-powered diagnostic tools, PCR primer database, and emergency response resource library.",
};

export default function KnowledgeBankPage() {
  return (
    <main className="relative min-h-screen">
      <StickyHeader />

      {/* Page header */}
      <div className="pt-24 pb-6">
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
                <BreadcrumbPage className="text-primary">
                  Knowledge Bank
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page title */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-primary" />
              <div>
                <h1 className="text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
                  Knowledge Bank & Toolkit
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Integrated academic database, AI diagnostic lab, and emergency
                  response resource center
                </p>
              </div>
            </div>

            {/* Quick stats bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-border/30 bg-secondary/30 px-5 py-3">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] text-muted-foreground">
                  Pathogens:{" "}
                  <span className="font-medium text-foreground/70">127</span>
                </span>
              </div>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <div className="flex items-center gap-2">
                <Microscope className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-[11px] text-muted-foreground">
                  Diagnostic Protocols:{" "}
                  <span className="font-medium text-foreground/70">450+</span>
                </span>
              </div>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              {/* This is the existing literature link, we'll keep it but modify its purpose */}
              <Link href="/knowledge-bank/literature" className="flex items-center gap-2 group">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-[11px] text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  Literature:{" "}
                  <span className="font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                    172
                  </span>
                </span>
              </Link>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[11px] text-muted-foreground">
                  ERP Templates:{" "}
                  <span className="font-medium text-foreground/70">36</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section A: AI Diagnostic Lab */}
      <AIDiagnosticLab />

      {/* Section B: Pathogen Encyclopedia */}
      <PathogenEncyclopedia />

      {/* Section C: ERP Toolkit */}
      <ERPToolkit />

      {/* Section D: Literature Overview - New Section */}
      <LiteratureOverview />

      <Footer />
    </main>
  );
}

