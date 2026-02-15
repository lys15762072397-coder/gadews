import Link from "next/link";
import {
  Globe,
  MapPin,
  FlaskConical,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    icon: Globe,
    title: "Global Overview",
    href: "/overview",
    description:
      "Comprehensive dashboard visualizing worldwide aquaculture health status with aggregated risk indices across all monitored regions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    ringColor: "ring-primary/20",
  },
  {
    icon: MapPin,
    title: "Risk Map",
    href: "/risk-map",
    description:
      "Interactive GIS-powered map overlaying environmental stressors, pathogen detections, and host vulnerability data in real-time spatial layers.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    ringColor: "ring-cyan-500/20",
  },
  {
    icon: FlaskConical,
    title: "Analysis Tools",
    href: "/warning-tools",
    description:
      "Advanced analytical suite for researchers and policymakers — including outbreak modeling, trend forecasting, and multi-variate risk assessment.",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    ringColor: "ring-teal-500/20",
  },
  {
    icon: BookOpen,
    title: "Knowledge Bank",
    href: "/knowledge-bank",
    description:
      "Curated encyclopedia of aquatic pathogens, diagnostic protocols (OIE/WOAH standards), treatment guidelines, and peer-reviewed literature.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    ringColor: "ring-emerald-500/20",
  },
];

export function CoreModules() {
  return (
    <section className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Platform Modules
          </p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Core Functional Systems
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Four integrated modules designed to provide end-to-end disease
            surveillance, risk assessment, and knowledge management.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="group glass rounded-2xl p-6 transition-all hover:ring-1 hover:ring-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${mod.bgColor} ring-1 ${mod.ringColor}`}
              >
                <mod.icon className={`h-6 w-6 ${mod.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {mod.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {mod.description}
              </p>
              <Link href={mod.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                Access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
