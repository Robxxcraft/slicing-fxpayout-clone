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
      <Link to={getLocalizedPath("", i18n.language)} className="flex gap-2 items-center cursor-pointer">
        <img
          src="/fxpayout-blue.svg"
          alt="logo fx payout"
          className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
        />
        <span className="text-xl 2xl:text-3xl font-medium text-primary">
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
