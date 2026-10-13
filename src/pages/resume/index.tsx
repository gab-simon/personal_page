import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cvPdf from "../../assets/gabriel-simon-cv.pdf";
import { useI18n } from "../../i18n/context";

// Phones either have no inline PDF viewer (Android) or only paint the first page (iOS), so draw the pages ourselves there.
const nativeViewer = () => navigator.pdfViewerEnabled && !window.matchMedia("(pointer: coarse)").matches;

const PdfPages = ({ fallback }: { fallback: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cancelled = false;
    let destroy = () => {};
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
      const task = pdfjs.getDocument({ url: cvPdf });
      destroy = () => void task.destroy();
      const doc = await task.promise;
      const ratio = window.devicePixelRatio || 1;
      for (let n = 1; n <= doc.numPages && !cancelled; n++) {
        const page = await doc.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (host.clientWidth / base.width) * ratio });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.setAttribute("aria-hidden", "true");
        host.append(canvas);
        await page.render({ canvas, viewport }).promise;
      }
    })().catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; destroy(); host.replaceChildren(); };
  }, []);
  return failed ? <>{fallback}</> : <div ref={ref} className="resume-pages" />;
};

const ResumePage = () => {
  const { lang } = useI18n();
  const pt = lang === "pt";
  const label = pt ? "Currículo de Gabriel Simon" : "Gabriel Simon résumé";
  const fallback = <p>{pt ? "Seu navegador não exibiu o PDF." : "Your browser couldn't display the PDF."} <a href={cvPdf}>{pt ? "Abrir arquivo" : "Open file"}</a>.</p>;
  return <main className="resume-page"><header className="resume-bar"><Link to="/">← {pt ? "VOLTAR" : "BACK"}</Link><p>GABRIEL SIMON / CV</p><a href={cvPdf} download="gabriel-simon-cv.pdf">{pt ? "BAIXAR PDF" : "DOWNLOAD PDF"} ↓</a></header><div className="resume-frame" role="document" aria-label={label}>{nativeViewer() ? <object data={cvPdf} type="application/pdf" aria-label={label}>{fallback}</object> : <PdfPages fallback={fallback} />}</div></main>;
};
export default ResumePage;
