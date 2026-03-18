import { useEffect, useState } from "react";
import { ArrowUp, Download } from "lucide-react";
import cvPdf from "../../assets/gabriel-simon-cv.pdf";

const FloatingActions = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className={[
          "group flex h-12 w-12 items-center justify-center rounded-2xl",
          "border border-white/10 bg-black/55 text-white/85",
          "shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl",
          "transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/70 hover:text-white",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
          showTopButton
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-2 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ArrowUp className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      <a
        href={cvPdf}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download CV"
        title="Download CV"
        className={[
          "group flex h-12 items-center gap-2 rounded-2xl px-4",
          "border border-white/10 bg-primary/90 text-primary-foreground",
          "shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl",
          "transition-all duration-300",
          "hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_14px_36px_rgba(0,0,0,0.32)]",
          "focus:outline-none focus:ring-2 focus:ring-primary/30",
        ].join(" ")}
      >
        <Download className="h-4 w-4" />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
          CV
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
