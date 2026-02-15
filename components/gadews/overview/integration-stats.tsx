import {
  Wifi,
  FlaskConical,
  Activity,
  ShieldAlert,
} from "lucide-react";

const STATS = [
  {
    label: "Data Integration",
    value: "15,420",
    sub: "Connected IoT Sensors",
    desc: "Standardized Data Stream",
    icon: Wifi,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    glow: "shadow-cyan-400/5",
  },
  {
    label: "Lab Reports",
    value: "850",
    sub: "PCR Uploads Today",
    desc: "Collaborative Network",
    icon: FlaskConical,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    glow: "shadow-primary/5",
  },
  {
    label: "System Status",
    value: "Active",
    sub: "All Systems Online",
    desc: "Real-time Sensing Online",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "shadow-emerald-400/5",
  },
  {
    label: "Action Level",
    value: "Regional Advisory",
    sub: "Response Protocol Activated",
    desc: "Decision Support Active",
    icon: ShieldAlert,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    glow: "shadow-orange-400/5",
  },
];

export function IntegrationStats() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-6">
          <p className="mb-1.5 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Integration & Response
          </p>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            Data Integration & Decision Support
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={`glass group relative overflow-hidden rounded-2xl border ${stat.border} p-5 shadow-lg ${stat.glow} transition-all hover:border-opacity-40`}
            >
              {/* Glow accent */}
              <div className={`absolute top-0 right-0 h-20 w-20 rounded-full ${stat.bg} blur-2xl opacity-50`} />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </span>
                </div>

                <p className={`text-2xl font-extrabold ${stat.color} sm:text-3xl`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-foreground/80">
                  {stat.sub}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
