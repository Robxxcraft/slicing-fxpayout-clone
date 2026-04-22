import { navigateChangeLng } from '@/helper/pathHelper';
import { SUPPORT_LANGUAGE } from '@/utils/languageSupport';
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getLocalStorage } from '@/services/apiClient';

const MainLayout = () => {
  const { lng } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let finalLng: string; // value 2 huruf: id atau en
    const rawStorageLng = getLocalStorage("i18nextLng");
    const storageLng = SUPPORT_LANGUAGE.includes(rawStorageLng || '') ? rawStorageLng as string : 'en';
    const rawBrowserLng = navigator.language.split("-")[0]; 
    const browserLng = SUPPORT_LANGUAGE.includes(rawBrowserLng || '') ? rawBrowserLng : 'en';
    const targetLng = SUPPORT_LANGUAGE.includes(lng || '') ? lng as string : 'en';

    if (rawStorageLng) {
      finalLng = storageLng;
    } else if (rawBrowserLng) {
      finalLng = browserLng;
    } else {
      finalLng = targetLng;
    }

    navigateChangeLng(finalLng, navigate, pathname);
    if (i18n.language !== finalLng) {
        i18n.changeLanguage(finalLng);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n, lng]);

  return <Outlet />
}

export default MainLayout;
