const dictionaries = {
  en: () =>
    import("@/app/dictionaries/en/translation.json").then(
      (module) => module.default
    ),
  vi: () =>
    import("@/app/dictionaries/vi/translation.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale) => dictionaries[locale]();
