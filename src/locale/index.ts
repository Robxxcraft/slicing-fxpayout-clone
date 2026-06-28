/* eslint-disable @typescript-eslint/no-explicit-any */
const idModules = import.meta.glob("../locale/id/**/*.json", { eager: true });
const enModules = import.meta.glob("../locale/en/**/*.json", { eager: true });
const zhCNModules = import.meta.glob("../locale/zh-cn/**/*.json", { eager: true });

function formatModules(modules: Record<string, any>) {
  const result: Record<string, any> = {};

  Object.entries(modules).forEach(([path, module]) => {
    const key = path
      .replace(/^.*\/(id|en|zh-cn)\//, "")   // hapus prefix locale
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
};

export const namespace = Object.keys(resources.id);

