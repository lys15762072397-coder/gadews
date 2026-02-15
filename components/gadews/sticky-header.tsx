"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Map,
  Wrench,
  BookOpen,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navLinks = [
  { label: "Global Overview", icon: Globe, href: "/overview" },
  { label: "Risk Map", icon: Map, href: "/risk-map" },
  { label: "Warning Tools", icon: Wrench, href: "/warning-tools" },
  { label: "Knowledge Bank", icon: BookOpen, href: "/knowledge-bank" },
];

const languages = ["English", "中文", "Español"];

export function StickyHeader() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-foreground">
              GADEWS
            </p>
            <p className="text-[10px] leading-tight tracking-wider text-muted-foreground">
              Global Aquaculture Disease Early Warning System
            </p>
          </div>
          <span className="text-sm font-bold tracking-wide text-foreground sm:hidden">
            GADEWS
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              {selectedLang}
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="glass-strong absolute right-0 mt-1 w-32 rounded-lg py-1 shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-primary/10 ${
                      lang === selectedLang
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          <div className="hidden items-center gap-2 sm:flex">
            <button className="rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              Login
            </button>
            <button className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Register
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-strong border-t border-border/30 px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-border/20 pt-3">
            <button className="flex-1 rounded-md border border-border/30 px-3 py-2 text-xs text-muted-foreground">
              Login
            </button>
            <button className="flex-1 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
