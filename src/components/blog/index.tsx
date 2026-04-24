import { Link } from "react-router-dom";
import Reveal from "../fx/reveal";
import { blogPosts } from "../../data/blog-posts";

const Blog = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
      <div className="divider-subtle mb-12 md:mb-16" />

      <Reveal>
        <p className="font-mono text-xs text-muted-foreground tracking-[0.25em] mb-5 uppercase">
          blog
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.08] tracking-tight text-warm">
            simple notes
          </h2>

          <Link
            to="/blog"
            className="w-fit font-mono text-xs uppercase tracking-[0.2em] text-foreground/75 transition-colors duration-300 hover:text-foreground"
          >
            view all posts
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.14 + index * 0.08}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block h-full rounded-md border border-white/10 bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {post.date}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                  {post.readingTime}
                </span>
              </div>

              <h3 className="font-display text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-white">
                {post.title}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                read more
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Blog;
