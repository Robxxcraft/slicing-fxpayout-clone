import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { featuredNews } from "@/utils/news";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const HeroNews = () => {
  const { t } = useTranslation(["common"]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const selectedNews = featuredNews[activeIndex];

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-6 md:pt-10">
      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Pagination]}
          className="mySwiper relative w-full lg:w-[440px] 2xl:w-[660px] h-[400px] md:h-[440px] lg:h-[300px] 2xl:h-[440px]"
        >
          {featuredNews.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="relative w-full h-full rounded-xl overflow-hidden"
            >
              <div className="absolute px-3 2xl:px-6 py-1 2xl:py-2.5 w-fit flex items-center gap-2.5 border-white bg-primary rounded-full top-5 left-5">
                <img src="/star-circle-icon.svg" alt="Star Icon"
                  loading="lazy"
                  className="scale-80 2xl:scale-100" />
                <span className="text-xs 2xl:text-sm font-semibold text-white">FEATURED</span>
              </div>
              <img src={`/news/${item.cover}`} alt={`Cover ${item.title}`} 
                className="w-full h-full object-cover object-center" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={`/news/${selectedNews.user.profile}`} alt="profil"
                className="size-6 md:size-8 2xl:size-10 aspect-square rounded-full object-contain bg-primary" />
              <p className="text-base md:text-xl lg:text-base 2xl:text-xl font-medium">
                {selectedNews.user.username}
              </p>
            </div>
            <div className="h-5 w-0.5 bg-black/50" />
            <p className="text-base md:text-xl lg:text-base 2xl:text-xl font-semibold text-primary">
              {t(`newspage:category.${selectedNews.category}`)}
            </p>
            <div className="h-5 w-0.5 bg-black/50" />
            <p className="text-base md:text-xl lg:text-base 2xl:text-xl">
              {t(`${selectedNews.createdAt}`, { time: 12 })}
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-2xl md:text-4xl lg:text-2xl 2xl:text-4xl font-medium leading-[180%]">
              {selectedNews.title}
            </h3>
            <div>
              <p className="mb-2 md:mb-4 text-base md:text-xl lg:text-lg 2xl:text-xl leading-[163%] line-clamp-3">
                {selectedNews.excerpt}
              </p>
              <Link to={selectedNews.url} className="flex items-center gap-1 text-base md:text-xl lg:text-lg 2xl:text-xl font-medium text-primary hover:underline">
                <span>{t("text.readMore")}</span>
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroNews;
