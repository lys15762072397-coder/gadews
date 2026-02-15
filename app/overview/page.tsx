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
import { OneHealthMonitor } from "@/components/gadews/overview/one-health-monitor";
import { TriggerAlertFeed } from "@/components/gadews/overview/trigger-alert-feed";
import { RiskForecastChart } from "@/components/gadews/overview/risk-forecast-chart";
import { IntegrationStats } from "@/components/gadews/overview/integration-stats";
import { Home } from "lucide-react";

export const metadata = {
  title: "Global Overview | GADEWS",
  description:
    "Real-time global aquaculture disease monitoring dashboard. One Health perspective with environmental triggers, AI risk forecasting, and data integration overview.",
};

export default function OverviewPage() {
  return (
    <main className="relative min-h-screen">
      <StickyHeader />

      {/* Page header with breadcrumb */}
      <div className="pt-24 pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                    <Home className="h-3.5 w-3.5" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  Global Overview
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
                  Global Overview
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Command center for worldwide aquaculture disease surveillance and early warning
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
                  System Online
                </span>
              </div>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="text-[11px] text-muted-foreground">
                Last updated: <span className="font-medium text-foreground/70">2 min ago</span>
              </span>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="text-[11px] text-muted-foreground">
                Coverage: <span className="font-medium text-foreground/70">47 countries</span>
              </span>
              <span className="hidden h-4 w-px bg-border/50 sm:block" />
              <span className="text-[11px] text-muted-foreground">
                Sensors active: <span className="font-medium text-foreground/70">15,420</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section A: One Health Monitor */}
      <OneHealthMonitor />

      {/* Section B: Core Capabilities - Dual Column */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-6">
            <p className="mb-1.5 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Core Capabilities
            </p>
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              Environmental Trigger Detection & AI Forecasting
            </h3>
          </div>

          <div className="grid gap-5 lg:grid-cols-[6fr_4fr]">
            <TriggerAlertFeed />
            <RiskForecastChart />
          </div>
        </div>
      </section>

      {/* Section C: Integration Stats */}
      <IntegrationStats />

      <Footer />
    </main>
  );
}
