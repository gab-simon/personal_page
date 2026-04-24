export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-still-love-mobile",
    title: "Por que eu ainda gosto de desenvolvimento mobile",
    date: "Feb 2026",
    readingTime: "4 min read",
    excerpt:
      "Desenvolvimento mobile sempre me mantém perto dos problemas reais das pessoas, onde performance e experiência fazem diferença em cada toque na tela.",
    content: [
      "Criar apps exige intenção em cada detalhe. A internet nem sempre funciona bem, os aparelhos são diferentes entre si e a atenção do usuário é curta. Esse cenário ensina muito sobre simplicidade, arquitetura e boas decisões de experiência.",
      "Eu ainda gosto do desafio de fazer tudo parecer leve e fluido mesmo com limitações. Recursos como modo offline, notificações push e cache local dão trabalho, mas quando funcionam bem, o resultado é muito satisfatório.",
      "No fim, mobile sempre me lembra que software não é só código. É confiança, praticidade e facilitar a vida de quem usa.",
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
