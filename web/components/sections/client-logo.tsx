import type { Client } from "@/content/types";
import { cn } from "@/lib/utils";

/** A single client mark. Real logo if available, else a refined wordmark plate
 *  (deck-fallback) so the wall stays consistent. Logos are deck-sourced only. */
export function ClientLogo({ client, className }: { client: Client; className?: string }) {
  if (client.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        className={cn(
          "h-8 w-auto max-w-[140px] object-contain opacity-55 grayscale saturate-0 transition-[filter,opacity,transform] duration-300 ease-out group-hover/logo:scale-[1.035] group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:saturate-100",
          className,
        )}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center font-serif text-base font-semibold text-logo-foreground transition-opacity duration-300",
        className,
      )}
    >
      {client.name}
    </span>
  );
}
