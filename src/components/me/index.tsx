import mePhoto from "../../assets/me.jpg";
import Reveal from "../fx/reveal";

const Me = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
      <div className="divider-subtle mb-12 md:mb-16" />

      <div className="grid items-start gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <Reveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-5">
              about me
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.08] tracking-tight text-warm mb-6">
              a little about my story
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/85 max-w-2xl mb-6">
              I’m Simon. I enjoy many things beyond technology, and lately I’ve
              been trying to do more activities away from the screen, not just
              working, studying, and gaming. I really enjoy cooking and playing
              football.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mb-6">
              Here I combine code, writing, and a bit of life outside the
              screen. Between one idea and another, I like to study new
              technologies, cook, organize thoughts, and document the process.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              This space is an extension of who I am now: someone in
              construction, focused on evolving one step at a time.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="md:pt-6">
          <figure className="group mx-auto w-full max-w-[360px]">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-card">
              <img
                src={mePhoto}
                alt="Retrato de Simon"
                className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 text-right font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              me in Salvador - BA (2025)
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

export default Me;
