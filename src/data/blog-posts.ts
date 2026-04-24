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
    title: "Why I Still Love Mobile Development",
    date: "Feb 2026",
    readingTime: "4 min read",
    excerpt:
      "Mobile development keeps me close to real user problems, where performance and experience matter in every interaction.",
    content: [
      "Mobile apps force us to be intentional. Network is unstable, devices vary a lot, and attention is limited. This environment teaches discipline in architecture and UX decisions.",
      "I still enjoy the challenge of making experiences feel smooth even under constraints. Features like offline support, push notifications, and local caching are hard, but very rewarding when done right.",
      "In the end, mobile reminds me that software is not only about code. It is about trust, reliability, and making life easier for people.",
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
