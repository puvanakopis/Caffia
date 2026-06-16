import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Story } from "./Story";
import { FeaturedMenu } from "./FeaturedMenu";
import { Ticker } from "./Ticker";
import { AtelierTeaser } from "./AtelierTeaser";
import { JournalPreview } from "./JournalPreview";
import { VisitCTA } from "./VisitCTA";
import { Footer } from "./Footer";

export function Landing() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Story />
      <FeaturedMenu />
      <Ticker />
      <AtelierTeaser />
      <JournalPreview />
      <VisitCTA />
      <Footer />
    </main>
  );
}