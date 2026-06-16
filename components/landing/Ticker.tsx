const faces = [
  "Elena · Head Barista",
  "Marco · Roast Master",
  "Yuki · Pastry Chef",
  "Dani · Sommelier of Coffee",
  "Theo · Sourcing",
  "Aria · Pastry",
  "Noor · Service",
  "Kai · Mornings",
];

export function Ticker() {
  const loop = [...faces, ...faces];
  return (
    <section className="overflow-hidden bg-espresso py-16 text-cream md:py-28">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-3xl leading-[1] sm:text-4xl md:text-6xl">
            Meet the Faces Behind Your <span className="italic text-gold">Favorite Brews</span>.
          </h2>
          <p className="max-w-sm text-sm text-cream/60">
            Twelve craftspeople, one counter. The hands that source, roast, bake
            and pour everything you taste at Caffia.
          </p>
        </div>
      </div>

      <div className="relative mt-16 flex w-full overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16">
          {loop.map((f, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-display text-[clamp(3rem,7vw,8rem)] leading-none">
                {f}
              </span>
              <span className="h-3 w-3 rounded-full bg-terracotta" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}