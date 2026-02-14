export const getLocalizedPath = (path: string, currentLng: string) => {
  // 1. Bersihkan path dari prefix bahasa yang sudah ada (mencegah /id/id/broker)
  const cleanPath = path.replace(/^\/(id|en|jp|fr)\//, '/').replace(/^\/(id|en|jp|fr)$/, '/');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  if (currentLng === "en") {
    return normalizedPath;
  }
  return `/${currentLng}${normalizedPath === '/' ? '' : normalizedPath}`;
};
