import { jobs } from "../../data/profile";
import { useI18n } from "../../i18n/context";

const Profile = () => {
  const { lang, t } = useI18n(); const pt = lang === "pt";
  return <div className="editorial-wrap">
    <section id="about" className="editorial-section about-section">
      <p className="section-label">01 / {pt ? "SOBRE" : "ABOUT"}</p>
      <p className="about-copy">{pt ? "Sou desenvolvedor Full Stack. Trabalho no desenvolvimento e na evolução de plataformas web e de e-commerce, depois de alguns anos construindo aplicativos mobile." : "I'm a Full Stack Developer. I build and evolve web and e-commerce platforms, after a few years building mobile applications."}</p>
      <p className="about-meta">5+ {pt ? "ANOS DE EXPERIÊNCIA" : "YEARS OF EXPERIENCE"}<br />{pt ? "CIÊNCIA DA COMPUTAÇÃO / UFPR" : "COMPUTER SCIENCE / UFPR"}<br />CURITIBA / BR</p>
    </section>
    <section id="experience" className="editorial-section">
      <div className="section-heading"><p className="section-label">02 / {pt ? "EXPERIÊNCIA" : "EXPERIENCE"}</p><span>2021 — {pt ? "ATUAL" : "NOW"}</span></div>
      <div className="work-list">{jobs.map((job, index) => {
        const copy = t.jobs[job.id];
        return <article className="work-row" key={job.id}>
          <span className="work-index">0{jobs.length - index}</span>
          <div>
            <h2>{job.company}</h2>
            <p className="work-role">{copy.role}</p>
            <p>{copy.summary}</p>
            <p className="work-tech">{job.tech.join(" · ")}</p>
          </div>
          <time>{copy.period}</time>
        </article>;
      })}</div>
    </section>
  </div>;
};
export default Profile;
