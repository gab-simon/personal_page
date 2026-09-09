import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/context";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col justify-between bg-background py-8">
      <div className="shell-inner flex items-center justify-between border-b border-border pb-5">
        <Link
          to="/"
          className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          Gabriel<span className="text-primary">/</span>Simon
        </Link>
        <span className="panel-label text-primary">{t.notFound.signal}</span>
      </div>

      <div className="shell-inner flex-1 py-16">
        <p className="eyebrow mb-6">{t.notFound.badge}</p>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.86] tracking-[-0.045em] text-foreground">
          {t.notFound.title}
          <br />
          <span className="italic text-primary">{t.notFound.titleAccent}</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/60">{t.notFound.text}</p>

        <Link to="/" className="cta-primary mt-9">
          {t.notFound.home}
        </Link>
      </div>

      <div className="shell-inner flex items-center gap-3 border-t border-border pt-5">
        <span className="status-led dim" aria-hidden="true" />
        <span className="panel-label">{t.notFound.known}</span>
      </div>
    </div>
  );
};

export default NotFound;
