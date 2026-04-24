import Reveal from "../fx/reveal";

type WorkEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

const workEntries: WorkEntry[] = [
  {
    company: "Nestlé (via Mathex Consulting)",
    role: "Senior Software Developer",
    period: "Feb 2025 - Present",
    summary:
      "Maintaining and evolving the third largest Nestlé e-commerce platform, built on Wake Commerce, delivering new features and ensuring stability, performance, and scalability using React, Node.js, Next.js, and Vite.",
    highlights: [
      "Contributed to scaling a B2B platform with ERP integrations, improving workflows for retailers and sales teams and optimizing operational efficiency.",
      "Designed, maintained, and developed multiple CMS solutions within the Nestlé Health Science ecosystem, including a standardized low-code email builder platform for marketing and communication operations.",
      "Technologies: React, Next.js, Vite, TypeScript, Docker, React Native, Azure DevOps, CI/CD, Git, Wake.",
    ],
  },
  {
    company: "Smart Innovation",
    role: "Software Engineer",
    period: "Feb 2023 - Feb 2025",
    summary:
      "Architected and led the mobile foundation of CADU and CADU Agente, citizen service apps focused on scheduling appointments, opening city hall requests, and accessing municipal news.",
    highlights: [
      "Built the base architecture, developed core features, managed store releases, and implemented CI/CD with Fastlane, push notifications, localization, and scalable Redux state management — surpassing 10,000+ downloads.",
      "Worked on SeniorCheck, a healthcare monitoring platform for elderly users, developing secure backend endpoints for user registration and integrating mobile features with existing APIs.",
      "Technologies: React Native, Redux, React, Styled Components, Firebase, TypeScript, Fastlane, Jest, Detox, Python, Django, Ionic, Docker.",
    ],
  },
  {
    company: "Klupp",
    role: "Full-Stack Software Engineer",
    period: "Sep 2021 - Feb 2023",
    summary:
      "Worked as a Mobile Application Developer across the full project lifecycle, from defining scalable base architectures to publishing applications on Android and iOS stores.",
    highlights: [
      "Developed critical features such as geolocation, push notifications, offline-first storage with SQLite and Redux, and integrations focused on performance and user experience.",
      "Contributed to projects across benefits, energy, logistics, and offline operation systems — including Brasil Convênios, which surpassed 50,000+ downloads.",
      "Technologies: React Native, TypeScript, Node.js, Firebase, Ionic, SQLite, Redux, Android, iOS, JavaScript, Git.",
    ],
  },
  {
    company: "BRF",
    role: "Logistics Intern",
    period: "Jan 2021 - Sep 2021",
    summary:
      "Supported logistics operations by improving data organization and process efficiency in cargo distribution.",
    highlights: [
      "Created and maintained spreadsheets for load tracking.",
      "Helped optimize operational workflows.",
    ],
  },
];

const Work = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
      <div className="divider-subtle mb-12 md:mb-16" />

      <Reveal>
        <p className="font-mono text-xs text-muted-foreground tracking-[0.25em] mb-5 uppercase">
          work
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.08] tracking-tight text-warm mb-6 md:mb-8">
          my professional journey
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mb-10 md:mb-12">
          A little bit of what I went through in each company, what I learned
          and achieved. Each step was important for my evolution, and each
          challenge taught me something new about technology, teamwork, and
          problem-solving.
        </p>
      </Reveal>

      <div className="space-y-8 md:space-y-10">
        {workEntries.map((entry, index) => (
          <Reveal key={entry.company} delay={0.2 + index * 0.08}>
            <article className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-60" />

              <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="font-display text-2xl md:text-4xl leading-tight text-foreground">
                    {entry.company}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-foreground/75">
                    {entry.role}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {entry.period}
                </span>
              </div>

              <p className="relative text-base md:text-lg leading-relaxed text-muted-foreground mb-6 max-w-4xl">
                {entry.summary}
              </p>

              <ul className="relative space-y-3">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-foreground/85"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Work;
