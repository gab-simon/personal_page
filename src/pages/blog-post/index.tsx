import { Link, useParams } from "react-router-dom";
import FloatingActions from "../../components/fabs";
import Reveal from "../../components/fx/reveal";
import { getBlogPostBySlug } from "../../data/blog-posts";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background px-6 pb-24 pt-16 md:px-12 lg:px-24">
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-warm">
          post not found
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          The article you are looking for does not exist.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors duration-300 hover:text-foreground"
        >
          back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background px-6 pb-24 pt-14 md:px-12 md:pb-32 lg:px-24">
      <Reveal>
        <header className="mb-10 max-w-3xl md:mb-12">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {post.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/70" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.04] tracking-tight text-warm">
            {post.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/85">
            {post.excerpt}
          </p>
        </header>
      </Reveal>

      <div className="max-w-3xl space-y-6">
        {post.content.map((paragraph, index) => (
          <Reveal key={`${post.slug}-${index}`} delay={0.1 + index * 0.08}>
            <p className="text-base md:text-xl leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <FloatingActions />
    </article>
  );
};

export default BlogPostPage;
