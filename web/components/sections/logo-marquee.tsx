"use client";
import { useState } from "react";
import type { Client } from "@/content/types";
import { ClientLogo } from "./client-logo";
export function LogoMarquee({ clients, duration = clients.length * 2.6 }: { clients: Client[]; duration?: number }) {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  if (!clients.length) return null;
  return (
    <div role="region" aria-label="Client and client-brand logos">
      <div className="mb-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="homepage-client-ribbon"
          onClick={() => setExpanded(!expanded)}
          className="min-h-11 rounded-control border border-border-strong bg-surface px-3 text-sm text-foreground hover:bg-surface-subtle"
        >
          {expanded ? "Back to animated ribbon" : `View all ${clients.length} client entries`}
        </button>
        {!expanded && (
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
            className="min-h-11 rounded-control border border-border-strong bg-surface px-3 text-sm text-foreground hover:bg-surface-subtle"
          >
            {paused ? "Play client ribbon" : "Pause client ribbon"}
          </button>
        )}
      </div>
      <div
        id="homepage-client-ribbon"
        data-expanded={expanded}
        className="client-ribbon overflow-hidden"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div
          className="client-ribbon-track flex w-max animate-marquee items-center"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              role={copy === 0 ? "list" : undefined}
              aria-hidden={copy === 1 ? true : undefined}
              className={copy === 0 ? "client-ribbon-list flex shrink-0" : "client-ribbon-copy flex shrink-0"}
            >
              {clients.map((client) => (
                <div
                  key={client.slug}
                  data-client={client.slug}
                  role={copy === 0 ? "listitem" : undefined}
                  className="group/logo flex h-20 w-44 shrink-0 items-center justify-center border-r border-border-subtle bg-logo-surface px-4"
                >
                  <ClientLogo client={client} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
