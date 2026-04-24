import { Link } from "react-router-dom";
import FloatingActions from "../../components/fabs";
import Reveal from "../../components/fx/reveal";
import { blogPosts } from "../../data/blog-posts";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background px-6 pb-24 pt-14 md:px-12 md:pb-32 lg:px-24">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            back home
          </Link>

          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.04] tracking-tight text-warm">
            blog
          </h1>

          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
            A simple space where I share ideas, lessons, and things I am
            learning while building products.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 md:gap-6 lg:grid-cols-2">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.1 + index * 0.08}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block rounded-md border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {post.date}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                  {post.readingTime}
                </span>
              </div>

              <h2 className="font-display text-3xl leading-tight text-foreground transition-colors duration-300 group-hover:text-white">
                {post.title}
              </h2>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                open post
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <FloatingActions />
    </div>
  );
};

export default BlogPage;
