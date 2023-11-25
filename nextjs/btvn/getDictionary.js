import "server-only";

const dictionaries = {
  en: () =>
    import("./src/app/[lang]/dictionaries/en/translation.json").then(
      (module) => module.default
    ),
  vi: () =>
    import("./src/app/[lang]/dictionaries/vi/translation.json").then(
      (module) => module.default
    ),
};

export const getDictionary = (locale) => dictionaries[locale]();
