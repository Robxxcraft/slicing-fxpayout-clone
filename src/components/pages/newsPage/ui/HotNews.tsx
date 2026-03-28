import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HotNews = () => {
  const { t } = useTranslation(["common", "newspage"]);
  return (
    <div className="p-5 md:p-10 relative w-full min-h-[470px] rounded-xl overflow-hidden bg-[url('/news/a6a30dfd6bffeb2ee9a2d236f310e96f5a70450f.png')] bg-cover bg-center">
      <div className="absolute w-full h-full top-0 left-0 bg-linear-to-b from-black-10 to-black/80"></div>
      <div className="p-5 md:p-8 2xl:p-10 absolute inset-0 z-999 flex flex-col justify-between">
        <div className="px-4 2xl:px-6 py-2 2xl:py-2.5 w-fit flex items-center gap-2.5 border border-white bg-primary rounded-full">
          <img src="/fire-icon.svg" alt="Hot News"
            className="scale-80 2xl:scale-100" />
          <span className="text-sm font-semibold text-white">HOT NEWS</span>
        </div>
        <div>
          <div className="flex flex-wrap items-center text-white">
            <div className="pr-4 flex items-center gap-2">
              <img src={`/news/FXPayout.png`} alt="profil"
                loading="lazy"
                className="size-7 md:size-8 aspect-square rounded-full object-contain bg-primary" />
              <p className="text-[15px] md:text-base font-medium">
                FX Payout
              </p>
            </div>
            <p className="border-x border-white px-4 text-[15px] md:text-base font-semibold">
              {t(`newspage:category.crypto`)}
            </p>
            <p className="pl-4 text-[15px] md:text-base">
              {t(`newspage:time.march`, { time: 10 })}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4 text-white">
            <h3 className="text-xl md:text-2xl font-medium leading-[180%]">
              Global Forex Market Volatility Increases Ahead of Central Bank Decisions
            </h3>
            <div>
              <p className="mb-2 md:mb-4 w-full lg:max-w-3xl text-base md:text-lg 2xl:text-xl leading-[163%] line-clamp-3">
                Forex markets are experiencing increased volatility as traders await interest rate decisions from major central banks this week.
              </p>
              <Link to="#" className="flex items-center gap-1 text-base md:text-lg 2xl:text-xl font-medium hover:underline">
                <span>{t(`text.readMore`)}</span>
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotNews;
