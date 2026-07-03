/* eslint-disable @typescript-eslint/no-explicit-any */
const idModules = import.meta.glob("../locale/id/**/*.json", { eager: true });
const enModules = import.meta.glob("../locale/en/**/*.json", { eager: true });
const zhCNModules = import.meta.glob("../locale/zh-cn/**/*.json", { eager: true });
const jpModules = import.meta.glob("../locale/jp/**/*.json", { eager: true });
const koModules = import.meta.glob("../locale/ko/**/*.json", { eager: true });
const thModules = import.meta.glob("../locale/th/**/*.json", { eager: true });
const viModules = import.meta.glob("../locale/vi/**/*.json", { eager: true });
const esModules = import.meta.glob("../locale/es/**/*.json", { eager: true });
const ptModules = import.meta.glob("../locale/pt/**/*.json", { eager: true });
const arModules = import.meta.glob("../locale/ar/**/*.json", { eager: true });

function formatModules(modules: Record<string, any>) {
  const result: Record<string, any> = {};

  Object.entries(modules).forEach(([path, module]) => {
    const key = path
      .replace(/^.*\/(id|en|zh-cn|jp|ko|th|vi|es|pt|ar)\//, "")   // hapus prefix locale
      .replace(/^brokers\//, "")      // hapus folder brokers
      .replace(/\.json$/, "")
      .replace(/\//g, ".");

    result[key] = module.default;
  });

  return result;
}


export const resources = {
  id: formatModules(idModules),
  en: formatModules(enModules),
  "zh-cn": formatModules(zhCNModules),
  "jp": formatModules(jpModules),
  "ko": formatModules(koModules),
  "th": formatModules(thModules),
  "vi": formatModules(viModules),
  "es": formatModules(esModules),
  "pt": formatModules(ptModules),
  "ar": formatModules(arModules),
};

export const namespace = Object.keys(resources.id);

