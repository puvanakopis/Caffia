import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Footer() {
  return (
    <footer id="visit" className="relative overflow-hidden bg-cream-deep pt-20 md:pt-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <Reveal>
          <h2 className="max-w-4xl font-display text-[13vw] leading-[0.95] text-espresso sm:text-[10vw] md:text-[8.5rem] md:leading-[0.9]">
            Come for a cup. <span className="italic text-terracotta">Stay</span> for the hour.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-espresso/10 pt-10 md:mt-16 md:grid-cols-12 md:gap-12 md:pt-12">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.28em] text-terracotta">Visit</span>
            <p className="mt-5 font-display text-2xl leading-tight text-espresso sm:text-3xl">
              28 Linden Lane,<br />Atelier No. 4<br />Brooklyn, NY
            </p>
            <div className="mt-6">
              <MagneticButton href="#">Get Directions</MagneticButton>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.28em] text-espresso/60">Hours</span>
            <ul className="mt-5 space-y-2 text-sm text-espresso/80">
              <li className="flex justify-between"><span>Mon — Fri</span><span>7 — 19</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>8 — 20</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>9 — 17</span></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.28em] text-espresso/60">Newsletter</span>
            <form className="mt-5 flex items-center border-b border-espresso/30 pb-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm text-espresso placeholder:text-espresso/40 focus:outline-none"
              />
              <button type="submit" className="text-xs uppercase tracking-[0.22em] text-espresso transition-colors hover:text-terracotta">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-espresso/50">
              Seasonal menus and quiet invitations. Never spam.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-espresso/10 py-8 text-[10px] uppercase tracking-[0.22em] text-espresso/60 sm:text-xs md:mt-20 md:flex-row md:items-center">
          <span>© Caffia Atelier — Crafted in Brooklyn</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-espresso">Instagram</a>
            <a href="#" className="hover:text-espresso">Journal</a>
            <a href="#" className="hover:text-espresso">Privacy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}