import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Container} from '@/components/ui/container';
import {homeEcosystem as visibleEcosystem} from '@/content/partner-ecosystem';
/** Names from the preserved partner pages, resolved against content/partner-ecosystem.ts; no invented badges for missing artwork. */
export function HomePartners(){return <section id="partners" aria-labelledby="home-partners-title" className="border-y border-border-subtle bg-surface py-14 md:py-20">
  <Container>
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <div><p className="text-sm font-semibold text-action">Our ecosystem</p><h2 id="home-partners-title" className="mt-3 max-w-2xl text-h2 font-semibold text-foreground">Our partners &amp; technology ecosystem.</h2><p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">Enterprise applications, cloud and specialist technologies, brought together around your business.</p></div>
      <Link href="/partners/" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-action hover:underline">Explore our partners <ArrowUpRight aria-hidden size={18}/></Link>
    </div>
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-surface border border-border-subtle bg-border-subtle sm:grid-cols-3 lg:grid-cols-6">
      {visibleEcosystem.map(partner=><li key={partner.name} className="flex min-h-28 flex-col items-center justify-center gap-3 bg-logo-surface px-4 py-5 text-logo-foreground">
        {partner.logo ? <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={partner.logo} alt="" width={112} height={40} loading="lazy" className="h-10 w-28 object-contain"/><span className="text-xs font-medium">{partner.name}</span>
        </> : <span className="text-xl font-semibold tracking-tight">{partner.name}</span>}
      </li>)}
      <li className="bg-surface"><Link href="/partners/" className="flex h-full min-h-28 items-center justify-center gap-2 p-5 text-sm font-semibold text-action hover:bg-surface-subtle">Full ecosystem <ArrowUpRight size={18} aria-hidden/></Link></li>
    </ul>
  </Container>
</section>;}
