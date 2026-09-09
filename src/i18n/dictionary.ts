import type { JobId, StackGroupId } from "../data/profile";

export type Lang = "pt" | "en";

const pt = {
  meta: {
    htmlLang: "pt-BR",
    title: "Gabriel Simon — Full Stack Developer",
    description:
      "Gabriel Simon, desenvolvedor Full Stack. Desenvolvimento e evolução de plataformas web e e-commerce. Currículo, experiência e contato em uma página.",
  },
  header: {
    languageLabel: "Idioma",
    themeToDark: "Ativar modo escuro",
    themeToLight: "Ativar modo claro",
    cv: "Baixar currículo",
    cvShort: "Currículo",
  },
  hero: {
    status: "Aberto a novas oportunidades",
    location: "Curitiba, BR · Remoto",
    role: "Full Stack Developer",
    firstName: "Gabriel",
    lastName: "Simon.",
    intro:
      "Sou desenvolvedor Full Stack. Trabalho com desenvolvimento de produtos digitais, principalmente aplicações web e e-commerce.",
    personal:
      "Gosto de construir coisas com software e de entender como os sistemas funcionam por dentro. Fora do trabalho, música ocupa boa parte do meu tempo — e explica boa parte da cara deste site.",
    portraitAlt: "Retrato de Gabriel Simon",
    email: "E-mail",
  },
  experience: {
    label: "Experiência",
    years: "5+ anos",
    hint: "Selecione para ver os detalhes",
    platformsLabel: "Plataformas",
    stackLabel: "Stack",
    mainStackLabel: "Stack principal",
    expand: "Expandir",
    collapse: "Recolher",
  },
  jobs: {
    nestle: {
      role: "Desenvolvedor Full Stack Sênior · via Mathex",
      period: "2025 — atual",
      summary: "Manutenção e evolução do terceiro maior e-commerce da Nestlé, construído em Wake Commerce.",
      details: [
        "Entrego novas funcionalidades e cuido da estabilidade, da performance e da escalabilidade da plataforma, com React, Next.js, Node.js e Vite.",
        "Também ajudei a escalar uma plataforma B2B com integrações de ERP, que melhorou o trabalho de varejistas e times de vendas, e mantenho soluções internas de CMS no ecossistema Nestlé Health Science, incluindo um construtor de e-mails low-code usado por marketing e comunicação.",
      ],
      platforms: [
        {
          name: "E-commerce",
          text: "Terceiro maior e-commerce da Nestlé no mundo, construído em Wake Commerce.",
        },
        {
          name: "Plataforma B2B",
          text: "Integrações com ERP para a operação de varejistas e times de vendas.",
        },
      ],
    },
    smart: {
      role: "Desenvolvedor Full Stack",
      period: "2023 — 2025",
      summary: "Base mobile do CADU e do CADU Agente, apps de serviços ao cidadão com mais de 10 mil downloads.",
      details: [
        "Conduzi a arquitetura mobile do CADU e do CADU Agente, usados para agendar atendimentos, abrir solicitações à prefeitura e acompanhar notícias do município.",
        "Construí a arquitetura base, as funcionalidades principais, as publicações nas lojas e o CI/CD com Fastlane, além de push, localização e estado com Redux. No SeniorCheck, plataforma de monitoramento de saúde de idosos, desenvolvi endpoints de cadastro e integrei o aplicativo às APIs existentes.",
      ],
      platforms: [],
    },
    klupp: {
      role: "Desenvolvedor Full Stack",
      period: "2021 — 2023",
      summary: "Aplicativos de benefícios, energia e logística, incluindo o Brasil Convênios, com mais de 50 mil downloads.",
      details: [
        "Trabalhei no ciclo completo dos produtos mobile, da definição de arquiteturas base reaproveitáveis à publicação nas lojas Android e iOS.",
        "Desenvolvi funcionalidades como geolocalização, notificações push e armazenamento offline-first com SQLite e Redux, sempre com atenção a performance e experiência de uso.",
      ],
      platforms: [],
    },
  },
  profile: {
    label: "Detalhes",
    stackTitle: "Tecnologias",
    stackGroups: {
      front: "Front-end",
      back: "Back-end",
      mobile: "Mobile",
      platform: "Plataformas",
    },
    educationTitle: "Formação",
    education: [
      { primary: "Ciência da Computação", secondary: "UFPR · em andamento" },
      { primary: "Idiomas", secondary: "Português · Inglês" },
    ],
  },
  footer: {
    role: "Full Stack Developer",
    location: "Curitiba, BR",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
  notFound: {
    badge: "Erro / 404",
    title: "Nada nesta",
    titleAccent: "frequência.",
    text: "A página que você pediu não está aqui. Ela pode ter sido movida, renomeada, ou nunca ter existido.",
    home: "voltar ao início",
    signal: "SINAL PERDIDO",
    known: "RETORNE A UM CANAL CONHECIDO",
  },
};

export type Copy = typeof pt;

const en: Copy = {
  meta: {
    htmlLang: "en",
    title: "Gabriel Simon — Full Stack Developer",
    description:
      "Gabriel Simon, Full Stack Developer. Building and evolving web and e-commerce platforms. Résumé, experience and contact on a single page.",
  },
  header: {
    languageLabel: "Language",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
    cv: "Download CV",
    cvShort: "CV",
  },
  hero: {
    status: "Open to new opportunities",
    location: "Curitiba, BR · Remote",
    role: "Full Stack Developer",
    firstName: "Gabriel",
    lastName: "Simon.",
    intro:
      "I'm a Full Stack Developer. I work on digital products, mostly web applications and e-commerce.",
    personal:
      "I like building things with software and figuring out how systems work underneath. Outside work, music takes up a good part of my time — and explains a good part of how this site looks.",
    portraitAlt: "Portrait of Gabriel Simon",
    email: "Email",
  },
  experience: {
    label: "Experience",
    years: "5+ years",
    hint: "Select to read the details",
    platformsLabel: "Platforms",
    stackLabel: "Stack",
    mainStackLabel: "Main stack",
    expand: "Expand",
    collapse: "Collapse",
  },
  jobs: {
    nestle: {
      role: "Senior Full Stack Developer · via Mathex",
      period: "2025 — now",
      summary: "Maintaining and evolving the third largest Nestlé e-commerce platform, built on Wake Commerce.",
      details: [
        "I deliver new features and look after the stability, performance and scalability of the platform, using React, Next.js, Node.js and Vite.",
        "I also helped scale a B2B platform with ERP integrations, improving the work of retailers and sales teams, and I maintain internal CMS solutions across the Nestlé Health Science ecosystem, including a low-code email builder used by marketing and communication.",
      ],
      platforms: [
        {
          name: "E-commerce",
          text: "Third largest Nestlé e-commerce platform worldwide, built on Wake Commerce.",
        },
        {
          name: "B2B platform",
          text: "ERP integrations for retailer and sales team operations.",
        },
      ],
    },
    smart: {
      role: "Full Stack Developer",
      period: "2023 — 2025",
      summary: "Mobile foundation of CADU and CADU Agente, citizen-service apps with 10,000+ downloads.",
      details: [
        "I led the mobile architecture of CADU and CADU Agente, used to book appointments, open city hall requests and follow municipal news.",
        "I built the base architecture, the core features, the store releases and CI/CD with Fastlane, along with push notifications, localization and Redux state. On SeniorCheck, a health monitoring platform for elderly users, I developed registration endpoints and integrated the app with existing APIs.",
      ],
      platforms: [],
    },
    klupp: {
      role: "Full Stack Developer",
      period: "2021 — 2023",
      summary: "Benefits, energy and logistics apps, including Brasil Convênios, with 50,000+ downloads.",
      details: [
        "I worked across the full lifecycle of mobile products, from defining reusable base architectures to publishing on the Android and iOS stores.",
        "I built features such as geolocation, push notifications and offline-first storage with SQLite and Redux, always with an eye on performance and user experience.",
      ],
      platforms: [],
    },
  },
  profile: {
    label: "Details",
    stackTitle: "Technologies",
    stackGroups: {
      front: "Front-end",
      back: "Back-end",
      mobile: "Mobile",
      platform: "Platforms",
    },
    educationTitle: "Education",
    education: [
      { primary: "Computer Science", secondary: "UFPR · in progress" },
      { primary: "Languages", secondary: "Portuguese · English" },
    ],
  },
  footer: {
    role: "Full Stack Developer",
    location: "Curitiba, BR",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  notFound: {
    badge: "Error / 404",
    title: "Nothing on",
    titleAccent: "this frequency.",
    text: "The page you asked for is not here. It may have been moved, renamed, or it never existed in the first place.",
    home: "back home",
    signal: "SIGNAL LOST",
    known: "RETURN TO A KNOWN CHANNEL",
  },
};

export const dictionary: Record<Lang, Copy> = { pt, en };

export type JobCopy = Copy["jobs"][JobId];
export type StackGroupLabels = Copy["profile"]["stackGroups"];
export type StackGroupKey = StackGroupId;
