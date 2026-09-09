import { createContext, useContext } from "react";
import { dictionary, type Copy, type Lang } from "./dictionary";

export type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
};

export const I18nContext = createContext<I18nValue>({
  lang: "pt",
  setLang: () => {},
  t: dictionary.pt,
});

export const useI18n = () => useContext(I18nContext);
