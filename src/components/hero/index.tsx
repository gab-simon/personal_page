import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type PanInfo, useAnimationControls, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import cvPdf from "../../assets/gabriel-simon-cv.pdf";
import { contactLinks } from "../../data/profile";
import { useI18n } from "../../i18n/context";

const REST = 2;
/* The sheet only creeps out of the slot while attached: pulling further tears it off instead of
   exposing a tall blank band of paper above the ticket. */
const PULL_MAX = 28;
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
  const [reinserting, setReinserting] = useState(false);
  /* -1 when the sheet is held on its left edge, 1 on its right — the paper tilts around that point. */
  const [tilt, setTilt] = useState(0);
  /* How far the loose sheet may travel before it would run past the hero and get clipped. */
  const [room, setRoom] = useState({ left: -120, right: 120, down: 120 });
  const pt = lang === "pt";

  const measureRoom = useCallback(() => {
    const ticket = ticketRef.current;
    const chute = ticket?.parentElement;
    const hero = ticket?.closest("section");
    if (!ticket || !chute || !hero) return;
    const heroBox = hero.getBoundingClientRect();
    const chuteBox = chute.getBoundingClientRect();
    const gap = 30;
    const baseLeft = chuteBox.left + ticket.offsetLeft;
    const baseRight = baseLeft + ticket.offsetWidth;
    const available = (value: number, minimum = 0) => Math.max(minimum, Math.round(value));
    setRoom({
      left: -available(baseLeft - heroBox.left - gap),
      right: available(heroBox.right - gap - baseRight),
      down: available(heroBox.bottom - gap - (chuteBox.top + ticket.offsetHeight), 40),
    });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(measureRoom);
    const hero = ticketRef.current?.closest("section");
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureRoom);
    if (hero) observer?.observe(hero);
    if (ticketRef.current) observer?.observe(ticketRef.current);
    window.addEventListener("resize", measureRoom);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measureRoom);
    };
  }, [measureRoom]);

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
    // Tension builds against the blade before the paper gives way.
    await controls.start({ y: PULL_MAX - 10, scaleY: 0.997, rotateX: 0.8, rotateZ: tilt * -0.35, transition: { duration: 0.13, ease: "easeOut" } });
    await controls.start({ y: PULL_MAX + 3, scaleY: 0.991, rotateX: 1.7, rotateZ: tilt * -0.9, transition: { duration: 0.09, ease: "easeIn" } });
    setDetached(true);
    await controls.start({
      y: CUT_REST,
      scaleY: 1,
      rotateX: 0,
      rotateZ: tilt * 0.7,
      transition: { type: "spring", stiffness: 230, damping: 19, mass: 0.82 },
    });
    setCutting(false);
  };

  const reinsert = async () => {
    if (!detached || reinserting) return;
    setPulling(false);
    setReinserting(true);
    // The rollers first centre the loose sheet, then pull its leading edge in.
    await controls.start({ x: 0, y: 25, rotateX: -1.2, rotateZ: 0, scaleY: 0.997, transition: { type: "spring", stiffness: 330, damping: 27, mass: 0.72 } });
    setDetached(false);
    await controls.start({ x: 0, y: REST, rotateX: 0, rotateZ: 0, scaleY: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } });
    setReinserting(false);
    setHandled(false);
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
    if (!detached) {
      if (info.offset.y > 38 || info.velocity.y > 520) {
        void cut();
        return;
      }
      setPulling(false);
      void settle();
      return;
    }
    const ticketBox = ticketRef.current?.getBoundingClientRect();
    const chuteBox = ticketRef.current?.parentElement?.getBoundingClientRect();
    const nearSlot = ticketBox && chuteBox
      ? ticketBox.top - chuteBox.top < 46 && Math.abs((ticketBox.left + ticketBox.width / 2) - (chuteBox.left + chuteBox.width / 2)) < Math.min(130, ticketBox.width * 0.28)
      : false;
    if (nearSlot) {
      void reinsert();
      return;
    }
    /* Once cut the sheet is loose: it stays wherever it is dropped, only the tilt eases out. */
    setPulling(false);
    void controls.start({ rotateX: 0, rotateZ: tilt * 0.8, scaleY: 1, transition: { type: "spring", stiffness: 240, damping: 22 } });
  };

  const nudge = async () => {
    if (!printed) return;
    if (coarse) return void (detached ? reinsert() : cut());
    setHandled(true);
    if (detached) {
      // a loose sheet flutters where it lies instead of jumping back
      await controls.start({ rotateZ: tilt * 0.8 + 0.9, rotateX: 1.2, transition: { duration: 0.12, ease: "easeOut" } });
      await controls.start({ rotateZ: tilt * 0.8, rotateX: 0, transition: { type: "spring", stiffness: 300, damping: 12 } });
      return;
    }
    await controls.start({ y: REST + 13, rotateX: 1.2, transition: { type: "spring", stiffness: 420, damping: 20 } });
    await settle();
  };

  const state = [
    printed ? "printer--ready" : "printer--printing",
    handled ? "printer--handled" : "",
    pulling ? "printer--pulling" : "",
    cutting ? "printer--cutting" : "",
    reinserting ? "printer--reinserting" : "",
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
            drag={printed && !coarse && !reinserting ? (detached ? true : "y") : false}
            dragConstraints={detached ? { top: 26, bottom: room.down, left: room.left, right: room.right } : { top: 0, bottom: PULL_MAX }}
            dragElastic={detached ? 0.09 : { top: 0, bottom: 0.08 }}
            dragMomentum={detached}
            dragTransition={{ power: 0.16, timeConstant: 200, bounceStiffness: 190, bounceDamping: 24 }}
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
