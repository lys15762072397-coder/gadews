"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Dna,
  Microscope,
  Download,
  ExternalLink,
  ChevronRight,
  Bug,
  Pill,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PathogenCard {
  name: string;
  abbrev: string;
  family: string;
  type: "Virus" | "Bacteria" | "Parasite";
  typeColor: string;
  typeBg: string;
  riskLevel: "Critical" | "High" | "Moderate";
  riskColor: string;
  hosts: string[];
  pcrPrimer: string;
  pathology: string;
  description: string;
  image: string;
}

const PATHOGENS: PathogenCard[] = [
  {
    name: "White Spot Syndrome Virus",
    abbrev: "WSSV",
    family: "Nimaviridae",
    type: "Virus",
    typeColor: "text-red-400",
    typeBg: "bg-red-500/10 border-red-500/20",
    riskLevel: "Critical",
    riskColor: "text-red-400",
    hosts: ["P. vannamei", "P. monodon", "M. rosenbergii"],
    pcrPrimer: "5'-GAT GAC AGA GAT GAT AGA GA-3'",
    pathology: "Hypertrophied nuclei in cuticular epithelium, eosinophilic inclusion bodies",
    description: "Highly virulent dsDNA virus causing mass mortality in penaeid shrimp. OIE/WOAH listed. Cumulative mortality can reach 100% within 3-10 days.",
    image: "/images/wssv-clinical.jpg",
  },
  {
    name: "Acute Hepatopancreatic Necrosis Disease",
    abbrev: "AHPND",
    family: "Vibrionaceae",
    type: "Bacteria",
    typeColor: "text-orange-400",
    typeBg: "bg-orange-500/10 border-orange-500/20",
    riskLevel: "Critical",
    riskColor: "text-red-400",
    hosts: ["P. vannamei", "P. monodon"],
    pcrPrimer: "5'-ATG AGT AAC AAT ATA AAA CAT GAA AC-3'",
    pathology: "Severe atrophy of hepatopancreas, sloughing of tubule epithelial cells",
    description: "Caused by Vibrio parahaemolyticus carrying pirAB toxin genes. Formerly known as EMS. Mortality up to 70% in first 30 days.",
    image: "/images/wssv-clinical.jpg",
  },
  {
    name: "Tilapia Lake Virus",
    abbrev: "TiLV",
    family: "Amnoonviridae",
    type: "Virus",
    typeColor: "text-red-400",
    typeBg: "bg-red-500/10 border-red-500/20",
    riskLevel: "High",
    riskColor: "text-orange-400",
    hosts: ["O. niloticus", "O. mossambicus", "Tilapia hybrids"],
    pcrPrimer: "5'-TAT GCA GTA CTA TTC CAC CCT GCC-3'",
    pathology: "Syncytial hepatocytes, multifocal hepatic necrosis, encephalitis",
    description: "Emerging orthomyxo-like virus affecting tilapia worldwide. Mortality 20-90%. Rapid global spread since 2014.",
    image: "/images/wssv-clinical.jpg",
  },
  {
    name: "Enterocytozoon hepatopenaei",
    abbrev: "EHP",
    family: "Enterocytozoonidae",
    type: "Parasite",
    typeColor: "text-teal-400",
    typeBg: "bg-teal-500/10 border-teal-500/20",
    riskLevel: "Moderate",
    riskColor: "text-yellow-400",
    hosts: ["P. vannamei", "P. monodon"],
    pcrPrimer: "5'-GCC GCC AAG TGA TAA GGA ATA-3'",
    pathology: "Spore clusters in hepatopancreatic tubule epithelium, growth retardation",
    description: "Microsporidian parasite causing severe growth retardation. Does not cause acute mortality but significant economic losses due to slow growth.",
    image: "/images/wssv-clinical.jpg",
  },
  {
    name: "Infectious Salmon Anaemia",
    abbrev: "ISA",
    family: "Orthomyxoviridae",
    type: "Virus",
    typeColor: "text-red-400",
    typeBg: "bg-red-500/10 border-red-500/20",
    riskLevel: "High",
    riskColor: "text-orange-400",
    hosts: ["S. salar", "O. mykiss", "S. trutta"],
    pcrPrimer: "5'-GGA GAT GGC TCC TGA TAG-3'",
    pathology: "Severe anemia, hemorrhagic liver necrosis, renal interstitial hemorrhage",
    description: "Orthomyxovirus of Atlantic salmon. OIE/WOAH listed. Major economic impact in Norway and Chile. Spread through horizontal transmission.",
    image: "/images/wssv-clinical.jpg",
  },
  {
    name: "Koi Herpesvirus Disease",
    abbrev: "KHV",
    family: "Alloherpesviridae",
    type: "Virus",
    typeColor: "text-red-400",
    typeBg: "bg-red-500/10 border-red-500/20",
    riskLevel: "High",
    riskColor: "text-orange-400",
    hosts: ["C. carpio", "Koi varieties"],
    pcrPrimer: "5'-GAC ACC ACA TCT GCA AGG AG-3'",
    pathology: "Gill necrosis, nephritis, skin lesions with pale patches",
    description: "Highly contagious herpesvirus of common carp and koi. OIE/WOAH listed. Mortality can reach 80-100% at 18-25 degrees Celsius.",
    image: "/images/wssv-clinical.jpg",
  },
];

function getTypeIcon(type: string) {
  switch (type) {
    case "Virus": return Bug;
    case "Bacteria": return Pill;
    case "Parasite": return Microscope;
    default: return Bug;
  }
}

export function PathogenEncyclopedia() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("All");

  const filteredPathogens = filterType === "All"
    ? PATHOGENS
    : PATHOGENS.filter((p) => p.type === filterType);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              WOAH Listed Diseases Database
            </p>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Pathogen Encyclopedia
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Comprehensive reference for aquatic animal pathogens with clinical data, PCR primers, and diagnostic protocols
            </p>
          </div>
          {/* Filter */}
          <div className="flex items-center gap-2">
            {["All", "Virus", "Bacteria", "Parasite"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  filterType === t
                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPathogens.map((pathogen, idx) => {
            const TypeIcon = getTypeIcon(pathogen.type);
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={pathogen.abbrev}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group glass rounded-2xl overflow-hidden transition-all hover:ring-1 hover:ring-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Image with microscopy overlay */}
                <div className="relative h-44 overflow-hidden bg-secondary/50">
                  <Image
                    src={pathogen.image}
                    alt={`Clinical image of ${pathogen.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Microscopy overlay grid */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,200,220,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,200,220,0.15) 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  {/* Scale bar */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-md bg-background/70 px-2 py-1 backdrop-blur-sm">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-[9px] font-mono text-primary">{'100 \u00B5m'}</span>
                  </div>
                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <div className={`flex items-center gap-1 rounded-md border px-2 py-1 backdrop-blur-sm ${pathogen.typeBg}`}>
                      <TypeIcon className={`h-3 w-3 ${pathogen.typeColor}`} />
                      <span className={`text-[10px] font-bold ${pathogen.typeColor}`}>{pathogen.type}</span>
                    </div>
                  </div>
                  {/* Risk badge */}
                  <div className="absolute top-2 right-2">
                    <div className={`flex items-center gap-1 rounded-md bg-background/70 px-2 py-1 backdrop-blur-sm`}>
                      <ShieldAlert className={`h-3 w-3 ${pathogen.riskColor}`} />
                      <span className={`text-[10px] font-bold ${pathogen.riskColor}`}>{pathogen.riskLevel}</span>
                    </div>
                  </div>

                  {/* Hover overlay: PCR & Pathology */}
                  <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/90 to-transparent p-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Dna className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">PCR Primer</p>
                          <p className="font-mono text-[11px] text-foreground/80 leading-tight">{pathogen.pcrPrimer}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Microscope className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                        <div>
                          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Pathology</p>
                          <p className="text-[11px] text-foreground/80 leading-tight">{pathogen.pathology}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground leading-tight">{pathogen.name}</h3>
                    <Badge className="shrink-0 border-border/30 bg-secondary text-[10px] text-muted-foreground">
                      {pathogen.abbrev}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2.5">
                    Family: {pathogen.family}
                  </p>

                  <p className="text-xs leading-relaxed text-muted-foreground mb-3 line-clamp-2">
                    {pathogen.description}
                  </p>

                  {/* Host badges */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {pathogen.hosts.map((host) => (
                      <span key={host} className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground italic">
                        {host}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/20">
                      <BookOpen className="h-3.5 w-3.5" />
                      View Guidelines
                    </button>
                    <button className="flex items-center justify-center gap-1.5 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5">
            View all 127 pathogens in database
            <ChevronRight className="h-4 w-4 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
