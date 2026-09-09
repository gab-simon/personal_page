import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/context";
const Header = () => { const { lang, setLang } = useI18n(); const pt = lang === "pt"; return <header className="site-header"><Link to="/" className="site-mark">GS<span>●</span></Link><nav aria-label={pt ? "Navegação principal" : "Main navigation"}><a href="/#about">{pt ? "SOBRE" : "ABOUT"}</a><a href="/#experience">{pt ? "EXPERIÊNCIA" : "EXPERIENCE"}</a></nav><div className="language-switch"><button onClick={() => setLang("pt")} aria-pressed={lang === "pt"}>PT</button><span>/</span><button onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button></div></header>; };
export default Header;
