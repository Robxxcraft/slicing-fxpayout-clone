export type Language = {
  code: string;
  label: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "zh-cn", label: "China (Simplified)", flag: "flag-zh.png" },
  { code: "en", label: "English", flag: "flag-en.png" },
  { code: "id", label: "Indonesia", flag: "flag-id.png" },
];

export const SUPPORT_LANGUAGE = languages.filter((item) => item.code !== "en").map(item => item.code);
export const DEFAULT_LANGUAGE = "en";
