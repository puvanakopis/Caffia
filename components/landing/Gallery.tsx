const g1 = "/assets/gallery-1.jpg";
const g2 = "/assets/gallery-2.jpg";
const g3 = "/assets/gallery-3.jpg";
const g4 = "/assets/gallery-4.jpg";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const tiles = [
  { src: g1, label: "The Counter", span: "md:col-span-5 md:row-span-2 aspect-[3/4]" },
  { src: g2, label: "Slow Mornings", span: "md:col-span-7 aspect-[16/10]" },
  { src: g3, label: "Quiet Hours", span: "md:col-span-4 aspect-[4/5]" },
  { src: g4, label: "Behind the Bar", span: "md:col-span-3 aspect-[3/4]" },
];

export function Gallery() {
  return (
    <section className="bg-background py-20 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.28em] text-terracotta sm:text-xs">— The Atelier</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-espresso sm:mt-5 sm:text-5xl md:text-7xl">
              A Room That Holds the <span className="italic">Hour</span>.
            </h2>
          </div>
          <MagneticButton to="/visit" variant="ghost">Plan Your Visit</MagneticButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:mt-16 sm:gap-5 md:grid-cols-12">
          {tiles.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className={t.span + " group relative overflow-hidden rounded-sm bg-cream"}>
              <img
                src={t.src}
                alt={t.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso/70 to-transparent p-6 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-display text-2xl">{t.label}</span>
                <span className="text-xs uppercase tracking-[0.22em]">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}