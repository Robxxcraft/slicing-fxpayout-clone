import type { NewsState } from "@/utils/news"
import { useTranslation } from "react-i18next"
import { FaChevronRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const CardNews = ({ item }: { item: NewsState }) => {
  const { t } = useTranslation(["common", "newspage"]);
  return (
    <div className="group w-full">
      {item.cover !== undefined &&
        <div className="w-full max-h-[280px] aspect-4/3 rounded-xl overflow-hidden">
          <img src={`/news/${item.cover}`} alt={`Cover ${item.title}`} 
            className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-300" 
          />
        </div>
      }
      <div className="mt-4 2xl:mt-6 flex items-center gap-3 lg:gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <img src={`/news/${item.user.profile}`} alt="profil"
            loading="lazy"
            className="size-7 md:size-6 2xl:size-8 aspect-square rounded-full object-contain bg-primary" />
          <p className="text-[15px] md:text-base lg:text-sm 2xl:text-base font-medium">
            {item.user.username}
          </p>
        </div>
        <div className="h-4 w-0.5 bg-black/50" />
        <p className="text-[15px] md:text-base lg:text-sm 2xl:text-base font-semibold text-primary">
          {t(`newspage:category.${item.category}`)}
        </p>
        <div className="h-4 w-0.5 bg-black/50" />
        <p className="text-[15px] md:text-base lg:text-sm 2xl:text-base">
          {t(`${item.createdAt.split(",")[1]}`, { time: item.createdAt.split(",")[0] })}
        </p>
      </div>
      <div className="mt-3 2xl:mt-4 flex flex-col gap-2 2xl:gap-4">
        <h3 className="text-2xl lg:text-xl 2xl:text-2xl font-medium leading-[180%]">
          {item.title}
        </h3>
        <div>
          <p className="mb-2 md:mb-4 text-base md:text-xl lg:text-base 2xl:text-xl leading-[163%] line-clamp-3">
            {item.excerpt}
          </p>
          <Link to={item.url} className="flex items-center gap-1 text-base md:text-xl lg:text-base 2xl:text-xl font-medium text-primary hover:underline">
            <span>{t(`text.readMore`)}</span>
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardNews