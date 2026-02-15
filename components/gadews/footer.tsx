import { ShieldCheck, Mail, ExternalLink } from "lucide-react";

const partners = [
  { name: "FAO", full: "Food and Agriculture Organization" },
  { name: "WOAH", full: "World Organisation for Animal Health" },
  { name: "NACA", full: "Network of Aquaculture Centres in Asia-Pacific" },
  { name: "WorldFish", full: "WorldFish Center" },
  { name: "CGIAR", full: "CGIAR Research Program" },
];

const footerLinks = {
  Platform: ["Global Overview", "Risk Map", "Analysis Tools", "Knowledge Bank"],
  Resources: ["Documentation", "API Reference", "Data Standards", "Publications"],
  Organization: ["About GADEWS", "Partners", "Governance", "Contact"],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background">
      {/* Partners strip */}
      <div className="border-b border-border/20 py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            In Partnership With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {partners.map((p) => (
              <div
                key={p.name}
                className="group flex flex-col items-center gap-1"
                title={p.full}
              >
                <span className="text-xl font-extrabold tracking-wider text-muted-foreground/40 transition-colors group-hover:text-foreground/70">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide text-foreground">
                  GADEWS
                </p>
                <p className="text-[10px] tracking-wider text-muted-foreground">
                  Global Aquaculture Disease Early Warning System
                </p>
              </div>
            </div>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Empowering sustainable aquaculture through proactive disease
              surveillance, early warning, and evidence-based biosecurity
              management worldwide.
            </p>
            <a
              href="mailto:contact@gadews.org"
              className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
            >
              <Mail className="h-4 w-4" />
              contact@gadews.org
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} GADEWS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Use
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Data License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
