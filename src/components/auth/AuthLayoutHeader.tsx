import { getLocalizedPath } from '@/helper/pathHelper';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AuthLayoutHeader = ({
  title,
  paragraph
}: {
  title: string;
  paragraph?: string | React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <Link dir="ltr" to={getLocalizedPath("", i18n.language)} className="flex gap-2 items-center cursor-pointer">
        <img
          src="/fxpayout-blue.svg"
          alt="logo fx payout"
          className="w-5 lg:w-6 3xl:w-8"
        />
        <span className="text-xl 3xl:text-3xl font-bold text-primary">
          FXPAYOUT
        </span>
      </Link>
      <h1 className="text-2xl font-medium">
        {title}
      </h1>
      {paragraph ?
        <p className="text-base">
          {paragraph}
        </p>: <></>
      }
    </div>
  )
}

export default AuthLayoutHeader;
