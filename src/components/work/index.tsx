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
    role: "Full stack Developer",
    period: "2025 jan - today",
    summary:
      "Atuei em produtos web com foco em performance, consistencia visual e melhor experiencia para o usuario final. Trabalhei de perto com design e produto para transformar ideias em interfaces reais.",
    highlights: [
      "Criei e evolui componentes reutilizaveis, reduzindo retrabalho nas entregas.",
      "Melhorei fluxos criticos da aplicacao, com foco em clareza e navegacao.",
      "Participei de revisoes de codigo e padronizacao do front-end do time.",
    ],
  },
  {
    company: "Smart Innovation",
    role: "Mobile Developer",
    period: "2022 - 2024",
    summary:
      "Participei da construcao de features do inicio ao fim, conectando front-end e back-end. Foi um periodo importante para fortalecer visao de produto, comunicacao com o time e senso de ownership.",
    highlights: [
      "Implementei novas funcionalidades em React e APIs para suportar fluxos internos.",
      "Corrigi bugs recorrentes e reduzi chamados com melhorias incrementais.",
      "Documentei solucoes tecnicas para facilitar onboarding e manutencao.",
    ],
  },
  {
    company: "Klupp",
    role: "Full stack Developer (internship)",
    period: "2021 - 2022",
    summary:
      "Meu primeiro contato profissional com desenvolvimento. Aprendi fundamentos de colaboracao em equipe, versionamento e entrega continua, sempre com acompanhamento de pessoas mais experientes.",
    highlights: [
      "Apoiei manutencao de interfaces e ajustes em tarefas de baixa e media complexidade.",
      "Aprendi boas praticas de Git, revisao de PR e escrita de codigo legivel.",
      "Ganhei base tecnica e mentalidade de melhoria continua.",
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
