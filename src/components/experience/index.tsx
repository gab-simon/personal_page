import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { jobs } from "../../data/profile";
import { useI18n } from "../../i18n/context";
import type { JobId } from "../../data/profile";

const Experience = () => {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<JobId | null>("nestle");

  return (
    <div className="exp-list">
      {jobs.map((job) => {
        const copy = t.jobs[job.id];
        const isOpen = openId === job.id;

        return (
          <article key={job.id} className="exp-item">
            <button
              type="button"
              className="exp-trigger"
              aria-expanded={isOpen}
              aria-controls={`exp-${job.id}`}
              onClick={() => setOpenId(isOpen ? null : job.id)}
            >
              <span className={`status-led${isOpen ? "" : " dim"}`} aria-hidden="true" />

              <span className="min-w-0 flex-1">
                <h3>{job.company}</h3>
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
                  {copy.role}
                </span>
              </span>

              <time className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
                {copy.period}
              </time>

              <ChevronDown
                className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                aria-hidden="true"
              />
              <span className="sr-only">{isOpen ? t.experience.collapse : t.experience.expand}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`exp-${job.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="exp-detail overflow-hidden"
                >
                  <div className="space-y-3 pb-5 pl-[18px] pr-1">
                    <p className="text-[15px] leading-relaxed text-foreground/85">{copy.summary}</p>

                    {copy.details.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {copy.platforms.length > 0 && (
                      <div className="pt-1">
                        <p className="panel-label text-primary">{t.experience.platformsLabel}</p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {copy.platforms.map((platform) => (
                            <div key={platform.name} className="platform-block">
                              <p className="font-display text-xl text-foreground">{platform.name}</p>
                              <p className="mt-1 text-[13px] leading-relaxed text-foreground/65">
                                {platform.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {job.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.tech.map((item) => (
                          <span key={item} className="chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
};

export default Experience;
