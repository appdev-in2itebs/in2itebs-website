import { Container } from "@/components/ui/container";
import { Eyebrow, Accent, Headline, Lead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden theme-on-brand bg-brand py-40 text-on-brand md:py-52">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute -right-20 top-10 h-[34rem] w-[34rem] origin-center rotate-45 border-[72px] border-blue-light" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] origin-center rotate-45 border-[48px] border-blue-light" />
      </div>
      <Container>
        <div className="flex max-w-3xl flex-col gap-7">
          <Eyebrow onDark>Error 404</Eyebrow>
          <Headline level={1}>
            This page has <Accent>moved on</Accent>.
          </Headline>
          <Lead onDark>
            The page you were looking for could not be found. It may have been
            relocated, or the link may be out of date.
          </Lead>
          <div className="mt-2 flex flex-wrap gap-4">
            <Button href="/" variant="on-dark" withArrow>
              Back to home
            </Button>
            <Button href="/contact/" variant="ghost" className="text-white hover:text-blue-light">
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
