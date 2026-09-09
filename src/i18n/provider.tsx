import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionary, type Lang } from "./dictionary";
import { I18nContext } from "./context";

const STORAGE_KEY = "gs-lang";

const readInitialLang = (): Lang => {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
};

const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — preference just won't persist */
    }
  }, []);

  const t = dictionary[lang];

  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang;
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", t.meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.meta.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", t.meta.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", t.meta.description);
  }, [t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
