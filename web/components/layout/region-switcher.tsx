"use client";
import {regions} from "@/content/site";
import {useRegion} from "./region-preference";
export function RegionSwitcher({onDark = false}: {onDark?: boolean}) {
  const {code, choose} = useRegion();
  return <label className={onDark ? "text-on-brand" : "text-foreground-muted"}>
    <span className="sr-only">Preferred contact region</span>
    <select aria-label="Preferred contact region" value={code} onChange={event => choose(event.target.value)}
      className="min-h-11 max-w-44 rounded-control border border-border-strong bg-surface px-2 text-sm text-foreground">
      {regions.map(region => <option key={region.code} value={region.code}>{region.name}</option>)}
    </select>
  </label>;
}
