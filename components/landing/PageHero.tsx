import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  italicWord,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-cream pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-28">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.28em] text-terracotta sm:text-xs">
            — {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 font-display text-[14vw] leading-[0.95] text-espresso sm:text-[10vw] md:mt-6 md:text-[8rem] md:leading-[0.92]">
            {title}
            {italicWord && (
              <>
                {" "}
                <span className="italic text-terracotta">{italicWord}</span>
              </>
            )}
            .
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-espresso/70 sm:mt-8 sm:text-base">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}