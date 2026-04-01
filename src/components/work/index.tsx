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
    company: "Nestlé Health Science - Puravida",
    role: "Software Engineer",
    period: "Feb 2025 - Present",
    summary:
      "Working on e-commerce and B2B platforms, focusing on performance, scalability, and user experience. Contributed to projects within Nestlé Health Science, integrating digital health and nutrition solutions.",
    highlights: [
      "Improved platform performance and stability in production environments.",
      "Developed and maintained scalable front-end applications.",
      "Collaborated with cross-functional teams on product-driven solutions.",
    ],
  },
  {
    company: "Smart Innovation",
    role: "Software Engineer",
    period: "Feb 2023 - Feb 2025",
    summary:
      "Developed mobile and web applications from architecture to deployment, contributing to citizen services and health monitoring solutions.",
    highlights: [
      "Built and maintained React Native apps published on iOS and Android.",
      "Implemented features like push notifications, localization, and CI/CD pipelines.",
      "Worked across front-end and back-end, improving app reliability and user experience.",
    ],
  },
  {
    company: "Klupp",
    role: "Full-Stack Developer",
    period: "Sep 2021 - Feb 2023",
    summary:
      "Worked across the full development lifecycle, building mobile applications with focus on performance and user experience.",
    highlights: [
      "Developed features using React Native and TypeScript.",
      "Integrated APIs and handled data management across platforms.",
      "Supported deployment and maintenance of mobile applications.",
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
