import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo, useAnimationControls, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import cvPdf from "../../assets/gabriel-simon-cv.pdf";
import { contactLinks } from "../../data/profile";
import { useI18n } from "../../i18n/context";

const REST = 2;
const PULL_MAX = 62;
const CUT_REST = 72;

const Hero = () => {
  const { lang } = useI18n();
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const ticketRef = useRef<HTMLElement>(null);
  /* Touch keeps the page scrollable: there the ticket is cut by tapping it, not by dragging. */
  const [coarse] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
  const [printed, setPrinted] = useState(Boolean(reduceMotion));
  const [handled, setHandled] = useState(false);
  const [detached, setDetached] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [cutting, setCutting] = useState(false);
  /* -1 when the sheet is held on its left edge, 1 on its right — the paper tilts around that point. */
  const [tilt, setTilt] = useState(0);
  const pt = lang === "pt";

  useEffect(() => {
    if (reduceMotion) {
      controls.set({ y: REST, rotateX: 0, rotateZ: 0, scaleY: 1 });
      return;
    }
    const print = async () => {
      const height = ticketRef.current?.offsetHeight ?? 320;
      await controls.start({
        y: [-height - 4, -height * 0.66, -height * 0.33, 2, REST],
        rotateX: [-9, -6, -3.5, 1.2, 0],
        rotateZ: [0, -0.18, 0.16, -0.07, 0],
        scaleY: [0.985, 1, 1.006, 0.998, 1],
        transition: {
          duration: 2.3,
          delay: 0.72,
          times: [0, 0.3, 0.6, 0.9, 1],
          ease: ["linear", "linear", "easeOut", "easeOut"],
        },
      });
      setPrinted(true);
    };
    void print();
    return () => controls.stop();
  }, [controls, reduceMotion]);

  const settle = (free = detached) =>
    controls.start({
      y: free ? CUT_REST : REST,
      rotateX: 0,
      rotateZ: free ? tilt * 0.7 : 0,
      scaleY: 1,
      transition: { type: "spring", stiffness: 280, damping: 27, mass: 0.72 },
    });

  const cut = async () => {
    if (!printed || detached) return;
    setHandled(true);
    setPulling(false);
    setCutting(true);
    // the sheet snaps off the blade, then drops free
    await controls.start({ y: PULL_MAX - 6, scaleY: 0.993, rotateX: 1.6, rotateZ: tilt * -0.9, transition: { duration: 0.11, ease: "easeOut" } });
    setDetached(true);
    window.setTimeout(() => setCutting(false), 180);
    await controls.start({
      y: CUT_REST,
      scaleY: 1,
      rotateX: 0,
      rotateZ: tilt * 0.7,
      transition: { type: "spring", stiffness: 200, damping: 15, mass: 0.9 },
    });
  };

  const startPull = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const rect = ticketRef.current?.getBoundingClientRect();
    if (rect && "clientX" in event) {
      setTilt(Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)));
    }
    setHandled(true);
    setPulling(true);
  };

  const endPull = (info: PanInfo) => {
    if (!detached && (info.offset.y > 38 || info.velocity.y > 520)) {
      void cut();
      return;
    }
    setPulling(false);
    void settle();
  };

  const nudge = async () => {
    if (!printed) return;
    if (coarse && !detached) return void cut();
    setHandled(true);
    await controls.start({ y: (detached ? CUT_REST : REST) + 13, rotateX: 1.2, transition: { type: "spring", stiffness: 420, damping: 20 } });
    await settle();
  };

  const state = [
    printed ? "printer--ready" : "printer--printing",
    handled ? "printer--handled" : "",
    pulling ? "printer--pulling" : "",
    cutting ? "printer--cutting" : "",
    detached ? "printer--detached" : "",
    coarse ? "printer--touch" : "",
  ].join(" ");

  return (
    <section id="top" className="ticket-hero" aria-labelledby="ticket-name">
      <div className={`printer ${state}`}>
        <div className="printer-housing" aria-hidden="true">
          <div className="printer-top"><i /></div>
          <div className="printer-front"><div className="printer-slot"><span /></div></div>
        </div>

        <div className="ticket-chute">
          <motion.article
            ref={ticketRef}
            className="ticket"
            initial={reduceMotion ? false : { y: "-101%", rotateX: -9, rotateZ: 0, scaleY: 0.985 }}
            animate={controls}
            drag={printed && !coarse ? "y" : false}
            dragConstraints={detached ? { top: CUT_REST - 16, bottom: CUT_REST + 16 } : { top: 0, bottom: PULL_MAX }}
            dragElastic={{ top: 0, bottom: 0.08 }}
            dragMomentum={false}
            onDragStart={(event) => startPull(event)}
            onDragEnd={(_, info) => endPull(info)}
            onTap={() => void nudge()}
            whileDrag={{ rotateX: 1.2, rotateZ: tilt * 1.7, scaleY: 1.004 }}
            aria-label={pt ? "Bilhete profissional impresso." : "Printed professional ticket."}
          >
            <div className="ticket-sheet">
              <div className="ticket-main">
                <div className="ticket-topline"><span>PORTFOLIO / 2026</span><span>GS 0042</span></div>
                <div className="ticket-identity">
                  <p>PASSENGER</p><h1 id="ticket-name">GABRIEL<br />SIMON</h1>
                  <div><span>ROLE</span><strong>FULL STACK DEVELOPER</strong></div>
                </div>
                <p className="ticket-summary">{pt ? "Produtos digitais simples, úteis e bem construídos." : "Simple, useful and well-built digital products."}</p>
                <div className="ticket-facts">
                  <div><span>BASE</span><strong>CURITIBA, BR · {pt ? "REMOTO" : "REMOTE"}</strong></div>
                  <div><span>{pt ? "EXPERIÊNCIA" : "EXPERIENCE"}</span><strong>5+ {pt ? "ANOS" : "YEARS"}</strong></div>
                  <div><span>{pt ? "FORMAÇÃO" : "EDUCATION"}</span><strong>{pt ? "CIÊNCIA DA COMPUTAÇÃO · UFPR" : "COMPUTER SCIENCE · UFPR"}</strong></div>
                </div>
                <div className="ticket-code"><span>CWB / DEV</span><div className="barcode" aria-hidden="true" /></div>
              </div>

              <div className="ticket-stub">
                <div className="stub-heading"><span>DOC</span><strong>CURRICULUM</strong></div>
                <div className="ticket-actions" aria-label={pt ? "Ações do currículo" : "Résumé actions"}>
                  <Link to="/resume" className="ticket-action" onPointerDown={(event) => event.stopPropagation()}><span>01</span><strong>{pt ? "VER CV" : "VIEW CV"}</strong><b>↗</b></Link>
                  <a href={cvPdf} download="gabriel-simon-cv.pdf" className="ticket-action ticket-action--dark" onPointerDown={(event) => event.stopPropagation()}><span>02</span><strong>{pt ? "BAIXAR PDF" : "DOWNLOAD PDF"}</strong><b>↓</b></a>
                </div>
                <div className="ticket-contact">
                  <span>{pt ? "CONTATO" : "CONTACT"}</span>
                  {contactLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      <b>{link.value}</b><em>↗</em>
                    </a>
                  ))}
                </div>
                <span className="stub-serial">VALID / 2026 · GS</span>
              </div>
            </div>
          </motion.article>
        </div>
        <div className="printer-blade" aria-hidden="true" />
        <div className="printer-contact-shadow" aria-hidden="true" />
      </div>

      <button type="button" className="ticket-hint" onClick={() => void cut()} disabled={!printed || detached}>
        {detached
          ? (pt ? "BILHETE CORTADO" : "TICKET TORN OFF")
          : coarse
            ? (pt ? "TOQUE PARA CORTAR ↓" : "TAP TO TEAR OFF ↓")
            : (pt ? "PUXE O BILHETE ↓" : "PULL THE TICKET ↓")}
      </button>
    </section>
  );
};

export default Hero;
