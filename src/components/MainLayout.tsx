import { SUPPORT_LANGUAGE } from '@/utils/languageSupport';
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';

const MainLayout = () => {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const targetLng = SUPPORT_LANGUAGE.includes(lng || '') ? lng : 'en';

    if (i18n.language !== targetLng) {
        i18n.changeLanguage(targetLng);
    }
  }, [i18n, lng]);

  return <Outlet />
}

export default MainLayout;
