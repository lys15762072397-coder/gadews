"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Layers,
  Thermometer,
  Activity,
  CloudRain,
  Flame,
  Target,
  EyeOff,
  MapPin,
  Droplets,
  Grid3x3,
} from "lucide-react";

interface LayerControlPanelProps {
  layers: {
    boundaries: boolean;
    waterSystems: boolean;
    farmDensity: boolean;
    sst: boolean;
    chlorophyll: boolean;
    rainfall: boolean;
    heatmap: boolean;
    cases: boolean;
    coverage: boolean;
  };
  onToggle: (key: string, value: boolean) => void;
}

export function LayerControlPanel({ layers, onToggle }: LayerControlPanelProps) {
  return (
    <div className="glass-strong rounded-2xl p-4 shadow-2xl shadow-black/30" style={{ width: "280px" }}>
      {/* Panel header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
          <Layers className="h-4 w-4 text-primary" />
        </div>
        <span className="text-xs font-bold tracking-wider text-foreground uppercase">
          Map Layers
        </span>
      </div>

      <Accordion type="multiple" defaultValue={["base", "env", "disease"]} className="space-y-0">
        {/* Base Layers */}
        <AccordionItem value="base" className="border-border/20">
          <AccordionTrigger className="py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:no-underline">
            Base Layers
          </AccordionTrigger>
          <AccordionContent className="space-y-2.5 pb-3 pt-0">
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={layers.boundaries}
                onCheckedChange={(v) => onToggle("boundaries", !!v)}
                className="h-3.5 w-3.5"
              />
              <Grid3x3 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Administrative Boundaries</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={layers.waterSystems}
                onCheckedChange={(v) => onToggle("waterSystems", !!v)}
                className="h-3.5 w-3.5"
              />
              <Droplets className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Water Systems & Hydrology</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={layers.farmDensity}
                onCheckedChange={(v) => onToggle("farmDensity", !!v)}
                className="h-3.5 w-3.5"
              />
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Farm Density Clusters</span>
            </label>
          </AccordionContent>
        </AccordionItem>

        {/* Environmental Layers */}
        <AccordionItem value="env" className="border-border/20">
          <AccordionTrigger className="py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:no-underline">
            Environmental Layers
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-3 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-xs text-muted-foreground">Sea Surface Temp (SST)</span>
              </div>
              <Switch
                checked={layers.sst}
                onCheckedChange={(v) => onToggle("sst", v)}
                className={`h-5 w-9 ${layers.sst ? "shadow-[0_0_8px_rgba(251,146,60,0.5)]" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-green-400" />
                <span className="text-xs text-muted-foreground">{"Chlorophyll-a (Algal)"}</span>
              </div>
              <Switch
                checked={layers.chlorophyll}
                onCheckedChange={(v) => onToggle("chlorophyll", v)}
                className={`h-5 w-9 ${layers.chlorophyll ? "shadow-[0_0_8px_rgba(74,222,128,0.5)]" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs text-muted-foreground">Rainfall Distribution</span>
              </div>
              <Switch
                checked={layers.rainfall}
                onCheckedChange={(v) => onToggle("rainfall", v)}
                className={`h-5 w-9 ${layers.rainfall ? "shadow-[0_0_8px_rgba(96,165,250,0.5)]" : ""}`}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Disease Risk Layers */}
        <AccordionItem value="disease" className="border-border/20 border-b-0">
          <AccordionTrigger className="py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:no-underline">
            Disease Risk Layers
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-1 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs font-medium text-foreground/80">AI Risk Heatmap</span>
              </div>
              <Switch
                checked={layers.heatmap}
                onCheckedChange={(v) => onToggle("heatmap", v)}
                className={`h-5 w-9 ${layers.heatmap ? "shadow-[0_0_8px_rgba(239,68,68,0.4)]" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-red-500" />
                <span className="text-xs font-medium text-foreground/80">Confirmed Cases</span>
              </div>
              <Switch
                checked={layers.cases}
                onCheckedChange={(v) => onToggle("cases", v)}
                className={`h-5 w-9 ${layers.cases ? "shadow-[0_0_8px_rgba(239,68,68,0.4)]" : ""}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs text-muted-foreground">Surveillance Coverage</span>
              </div>
              <Switch
                checked={layers.coverage}
                onCheckedChange={(v) => onToggle("coverage", v)}
                className="h-5 w-9"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
