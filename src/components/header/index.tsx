import LiquidBackground from "../fx/liquid-bg";
import Reveal from "../fx/reveal";

const Header = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-20 relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10">
        <Reveal>
          <p className="font-mono text-xs text-muted-foreground tracking-widest mb-8">
            last update: april 2026
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-6">
            i am <span className="italic text-ember">simon</span>,<br />
            and this is
            <br />a try at a personal website + blog.
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="max-w-md text-muted-foreground text-base leading-relaxed">
            developer, cooker beginner, and lifelong learner. i like to build
            things, write about them, and share what i know. currently exploring
            web development, cooking, and whatever else catches my interest.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Header;
