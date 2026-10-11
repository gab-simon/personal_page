import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/context";
const Header = () => {
  const { lang, setLang } = useI18n(); const pt = lang === "pt";
  /* Once the page moves, a frosted band slides in so the menu never sits straight on top of the copy. */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}><Link to="/" className="site-mark">GS<span>●</span></Link><nav aria-label={pt ? "Navegação principal" : "Main navigation"}><a href="/#about">{pt ? "SOBRE" : "ABOUT"}</a><a href="/#experience">{pt ? "EXPERIÊNCIA" : "EXPERIENCE"}</a></nav><div className="language-switch" role="group" aria-label={pt ? "Idioma" : "Language"}><button onClick={() => setLang("pt")} aria-pressed={lang === "pt"}>PT</button><span>/</span><button onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button></div></header>;
};
export default Header;
