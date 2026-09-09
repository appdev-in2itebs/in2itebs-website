import {pageMetadata} from "@/lib/metadata";
import {BreadcrumbJsonLd} from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow, Accent } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {cookies} from 'next/headers';

export const metadata = pageMetadata("/thank-you/", {
  robots: {index: false, follow: true},
  title: "Thank You",
  description: "Enquiry confirmation and next steps.",
});

export default async function ThankYouPage() {
  const receipt=(await cookies()).get('in2it-lead-receipt')?.value;
  const accepted=Boolean(receipt && /^[a-f0-9-]{36}$/.test(receipt));
  return (
    <section className="theme-on-brand relative flex min-h-[70vh] items-center overflow-hidden bg-brand py-32 text-on-brand md:py-40">
      <BreadcrumbJsonLd path="/thank-you/" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute -right-20 top-10 h-[34rem] w-[34rem] origin-center rotate-45 border-[72px] border-blue-light" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] origin-center rotate-45 border-[48px] border-blue-light" />
      </div>
      <Container>
        <Reveal className="flex max-w-3xl flex-col gap-7">
          <Eyebrow onDark>{accepted ? 'Request accepted' : 'Enquiry confirmation'}</Eyebrow>
          <h1 className="text-display font-serif font-bold leading-[1.03] text-white">
            {accepted ? <>Thank you. Your request has been <Accent>accepted</Accent>.</> : <>Let’s start a <Accent>conversation</Accent>.</>}
          </h1>
          <p className="max-w-measure text-lg leading-relaxed text-blue-light md:text-xl">
            {accepted ? 'Your request was accepted by our delivery service. Keep the reference below if you need to follow up.' : 'There is no recent enquiry confirmation in this browser. Visit Contact to send a request or reach us by email.'}
          </p>
          {accepted && <p className="break-all text-sm text-on-brand">Reference: {receipt}</p>}
          <div className="pt-2">
            <Button href={accepted ? '/' : '/contact/'} variant="on-dark" withArrow>
              {accepted ? 'Back to home' : 'Contact In2IT EBS'}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
