export type Language = {
  code: string;
  label: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "en", label: "English", flag: "flag-en.png" },
  { code: "id", label: "Indonesia", flag: "flag-id.png" },
  { code: "jp", label: "Japanese", flag: "flag-jp.png" },
  { code: "zh-cn", label: "简体中文", flag: "flag-zh.png" },
  { code: "th", label: "ไทย", flag: "flag-th.png" },
  { code: "vi", label: "Tiếng Việt", flag: "flag-vi.png" },
  { code: "pt", label: "Português", flag: "flag-pt.png" },
  { code: "es", label: "Español", flag: "flag-es.png" },
  { code: "ar", label: "العربية", flag: "flag-ar.png" },
  { code: "ko", label: "한국어", flag: "flag-ko.png" },
];

export const SUPPORT_LANGUAGE = languages.filter((item) => item.code !== "en").map(item => item.code);
export const DEFAULT_LANGUAGE = "en";

export const RTL_LANG = ["ar"];
