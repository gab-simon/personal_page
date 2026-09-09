import { Link } from "react-router-dom";
import cvPdf from "../../assets/gabriel-simon-cv.pdf";
import { useI18n } from "../../i18n/context";
const ResumePage = () => { const { lang } = useI18n(); const pt = lang === "pt"; return <main className="resume-page"><header className="resume-bar"><Link to="/">← {pt ? "VOLTAR" : "BACK"}</Link><p>GABRIEL SIMON / CV</p><a href={cvPdf} download="gabriel-simon-cv.pdf">{pt ? "BAIXAR PDF" : "DOWNLOAD PDF"} ↓</a></header><div className="resume-frame"><object data={cvPdf} type="application/pdf" aria-label={pt ? "Currículo de Gabriel Simon" : "Gabriel Simon résumé"}><p>{pt ? "Seu navegador não exibiu o PDF." : "Your browser couldn't display the PDF."} <a href={cvPdf}>{pt ? "Abrir arquivo" : "Open file"}</a>.</p></object></div></main>; };
export default ResumePage;
