import { getLocalizedPath } from "@/helper/pathHelper";
import type { EnumBrokerCategory } from "@/types/databroker.type";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const categories = [
    { key: "international", keyTranslate: "title_international", text: "International" },
    { key: "local", keyTranslate: "title_local", text: "Local"},
];

const FilterBroker = ({
  selectedCategory,
  onChangeCategory
}: {
  selectedCategory: EnumBrokerCategory;
  onChangeCategory: (key: string) => void;
}) => {
  const { t, i18n } = useTranslation(["common", "brokerpage"]);

  return (
    <div className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 flex flex-col items-center justify-center text-center">
      <div className="_no-scrollbar mt-6 md:mt-10 p-1 md:p-2 w-full lg:w-fit bg-primary/8 border border-primary rounded-full overflow-auto">
        <div className="flex gap-1 md:gap-6">
          {categories.map((category, index) => (
            <div key={index}
              onClick={() => onChangeCategory(category.key)}
              className={`py-3 3xl:py-4 px-5 md:px-3 lg:px-8 3xl:px-12 flex justify-center items-center w-full lg:w-fit rounded-full cursor-pointer transition-all duration-300
                ${selectedCategory === category.key ? "bg-linear-to-t from-dark-primary to-primary" : "bg-transparent"}
            `}>
              <p className={`text-sm md:text-base lg:text-lg 3xl:text-2xl font-medium text-wrap xl:text-nowrap
                ${selectedCategory === category.key ? "text-white" : "text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"}
              `}>
                {category.keyTranslate ? t(`text.${category.keyTranslate}`) : category.text}
              </p>
            </div>
          ))}
          <Link
            to={getLocalizedPath("broker", i18n.language)}
            className="py-3 3xl:py-4 px-5 md:px-3 lg:px-8 3xl:px-12 flex justify-center items-center w-full lg:w-fit rounded-full cursor-pointer transition-all duration-300 bg-transparent"
          >
            <p className="text-sm md:text-base lg:text-lg 3xl:text-2xl font-medium text-wrap xl:text-nowrap text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              {t("brokerpage:card.detail")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FilterBroker;
