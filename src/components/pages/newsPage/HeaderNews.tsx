import { listNavigationNews } from "@/utils/listNavigation";
import { useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const HeaderNews = () => {
  const { t } = useTranslation(["newspage"]);
  const [query, setQuery] = useState<string>("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const valueQuery = e.target.value;
    setQuery(valueQuery);
  };

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-[120px] lg:pt-[150px] 2xl:pt-[200px]">
      <div className="flex justify-between items-start lg:items-end flex-col lg:flex-row w-full">
        <div>
          <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
            <img src="/people_money.svg" alt="Reg broker"
              className="scale-90 md:scale-100" />
            <span className="text-base md:text-xl font-medium text-white">
              NEWS
            </span>
          </div>  
          <h1 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[100%]">
            FXPayout News
          </h1>
        </div>
        <div className="py-4 2xl:py-6 px-5 flex items-center gap-4 w-full bg-white border border-[#D0D5DD] rounded-full lg:max-w-[440px]">
          <label htmlFor="search" className="cursor-pointer">
            <CiSearch className="text-2xl text-[#7E7E7E]" />
          </label>
          <input
            id="search"
            name="search"
            placeholder={t("newspage:header.searchPlaceholder")}
            value={query}
            onChange={handleSearch}
            type="text"
            className="w-full text-base placeholder:text-[rgba(0,0,0,0.8)] focus:outline-0"
          />
        </div>
      </div>

      <div className="_no-scrollbar mt-4 md:mt-6 px-2 md:px-6 py-4 flex justify-between items-center gap-8 md:gap-10 lg:gap-4 border-b border-t border-[rgba(206,206,206,1)] overflow-auto">
        {listNavigationNews.map((item) => (
          <Link 
            key={item.code}
            to={item.url}
            className="text-sm md:text-lg lg:text-base 2xl:text-xl hover:underline text-nowrap"
          >
            {t(`newspage:category.${item.code}`)}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HeaderNews;
