import { useI18n } from "../../i18n/context";

const Footer = () => {
  const { lang } = useI18n(); const pt = lang === "pt";
  return (
    <footer className="site-footer">
      <span>GABRIEL SIMON / FULL STACK DEVELOPER</span>
      <a
        className="footer-credit"
        href="https://www.inspora.design/posts/boarding-pass-printer"
        target="_blank"
        rel="noreferrer"
      >
        {pt ? "BILHETE INSPIRADO EM" : "TICKET INSPIRED BY"} “BOARDING PASS PRINTER”, @HEYDAMIR <span>↗</span>
      </a>
      <span>CURITIBA, BR — 2026</span>
      <a href="#top">{pt ? "TOPO" : "TOP"} ↑</a>
    </footer>
  );
};

export default Footer;
