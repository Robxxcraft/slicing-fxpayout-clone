import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { breakingNews, commodityNews, cryptoNews } from "@/utils/news";
import CardNews from "./ui/CardNews";
import { useTranslation } from "react-i18next";

const CategorySection = () => {
  const { t } = useTranslation(["common", "newspage"]);
  return (
    <>
      <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
        <div className="flex justify-between">
          <h2 className="text-xl md:text-[32px] lg:text-3xl 3xl:text-[32px] font-semibold leading-[132%]">
            {t(`newspage:category.breakingNews`)}
          </h2>
          <Link 
            to="#" 
            className="flex gap-2 items-center text-primary hover:underline">
            <span className="text-base md:text-xl lg:text-base 3xl:text-xl font-medium">{t(`text.seeAll`)}</span>
            <HiArrowLongRight className="text-xl md:text-2xl lg:text-xl 3xl:text-2xl rtl:scale-x-[-1]" />
          </Link>
        </div>
        <div className="mt-5 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-6 3xl:gap-10">
          {breakingNews.map((item, idx) => (
            <CardNews key={idx} item={item}/>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-15 lg:gap-6 3xl:gap-10">
          <div>
            <div className="flex justify-between">
              <h2 className="text-xl md:text-[32px] lg:text-3xl 3xl:text-[32px] font-semibold leading-[132%]">
                {t(`newspage:category.crypto`)}
              </h2>
              <Link 
                to="#" 
                className="flex gap-2 items-center text-primary hover:underline">
                <span className="text-base md:text-xl lg:text-base 3xl:text-xl font-medium">{t(`text.seeAll`)}</span>
                <HiArrowLongRight className="text-xl 3xl:text-2xl rtl:scale-x-[-1]" />
              </Link>
            </div>
            <div className="mt-5 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-6 3xl:gap-10">
              {cryptoNews.map((item, idx) => (
                <CardNews key={idx} item={item}/>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h2 className="text-xl md:text-[32px] lg:text-3xl 3xl:text-[32px] font-semibold leading-[132%]">
                {t(`newspage:category.commodity`)}
              </h2>
              <Link 
                to="#" 
                className="flex gap-2 items-center text-primary hover:underline">
                <span className="text-base md:text-xl lg:text-base 3xl:text-xl font-medium">{t(`text.seeAll`)}</span>
                <HiArrowLongRight className="text-xl 3xl:text-2xl rtl:scale-x-[-1]" />
              </Link>
            </div>
            <div className="mt-5 3xl:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-6 3xl:gap-10">
              {commodityNews.map((item, idx) => (
                <CardNews key={idx} item={item}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CategorySection;
