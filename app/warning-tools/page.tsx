"use client";

import { useState } from "react";
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
import { GovernmentView } from "@/components/gadews/warning-tools/government-view";
import { FarmerView } from "@/components/gadews/warning-tools/farmer-view";
import {
  Home,
  Landmark,
  Shell,
  Brain,
  Cpu,
  RefreshCw,
} from "lucide-react";

type Role = "government" | "farmer";

const ROLES: { key: Role; label: string; sublabel: string; icon: typeof Landmark }[] = [
  {
    key: "government",
    label: "Government / Regional Manager",
    sublabel: "Macro-level policy & resource dispatch",
    icon: Landmark,
  },
  {
    key: "farmer",
    label: "Farmer / Local Producer",
    sublabel: "Pond-level alerts & biosecurity",
    icon: Shell,
  },
];

export default function WarningToolsPage() {
  const [activeRole, setActiveRole] = useState<Role>("government");

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
                  Warning Tools
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
                  Intelligent Decision Support System
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  AI-powered early warning and prescriptive action engine for
                  aquaculture biosecurity
                </p>
              </div>
            </div>

            {/* System status bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-border/30 bg-secondary/30 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  AI Inference Engine: Online
                </span>
              </div>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Cpu className="h-3 w-3" />
                Model: GADEWS-DSS v2.1
              </span>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Brain className="h-3 w-3" />
                Last Inference:{" "}
                <span className="font-medium text-foreground/70">Just now</span>
              </span>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <RefreshCw className="h-3 w-3" />
                Next update:{" "}
                <span className="font-medium text-foreground/70">58s</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Toggle */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Select Your Role
            </p>
            <div className="inline-flex rounded-xl border border-border/30 bg-secondary/30 p-1">
              {ROLES.map((role) => {
                const isActive = activeRole === role.key;
                return (
                  <button
                    key={role.key}
                    onClick={() => setActiveRole(role.key)}
                    className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 transition-all ${
                      isActive
                        ? "bg-primary/15 text-foreground ring-1 ring-primary/30 shadow-lg shadow-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                    }`}
                  >
                    <role.icon
                      className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                    />
                    <div className="text-left">
                      <p
                        className={`text-xs font-bold ${
                          isActive ? "text-foreground" : ""
                        }`}
                      >
                        {role.label}
                      </p>
                      <p className="hidden text-[10px] text-muted-foreground sm:block">
                        {role.sublabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic View Content */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {activeRole === "government" ? (
            <GovernmentView />
          ) : (
            <FarmerView />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
