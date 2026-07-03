import { type ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { CiFilter, CiSearch } from "react-icons/ci";
import Button from "../ui/Button";
import { BsSortDown } from "react-icons/bs";
import SelectDropdown from "../ui/SelectDropdown";
import type { EnumBrokerCategory, EnumSortingBroker } from "@/types/databroker.type";

const categories = [
  { key: "all", keyTranslate: "title_all", text: "All" }, 
  { key: "local", keyTranslate: "title_local", text: "Local"},
  { key: "international", keyTranslate: "title_international", text: "International" },
  { key: "profirm", text: "Profirm" },
  { key: "crypto", text: "Crypto Exchange" }
];

const FilterBroker = ({
  query, 
  onHandleSearch,
  totalBrokers = 0,
  selectedCategory,
  onChangeCategory,
  selectedSort,
  onChangeSort,
  onShowFilter
}: {
  query?: string; 
  onHandleSearch?: ChangeEventHandler<HTMLInputElement>;
  totalBrokers?: number;
  selectedCategory: EnumBrokerCategory;
  onChangeCategory: (key: string) => void;
  selectedSort: EnumSortingBroker;
  onChangeSort: (key: string) => void;
  onShowFilter: (status: boolean) => void;
}) => {
  const { t } = useTranslation(["common", "brokerpage"]);
  const selectInputs = [
    {
      key: "new",
      value: t("text.title_newest")
    },
    {
      key: "recommendation",
      value: t("text.title_recommendation")
    },
    {
      key: "highest_rebate",
      value: t("text.highest_rebate")
    },
    {
      key: "lowest_rebate",
      value: t("text.lowest_rebate")
    },
    {
      key: "name_asc",
      value: `${t("text.title_name")} (A–Z)`
    },
    {
      key: "name_desc",
      value: `${t("text.title_name")} (Z–A)`
    }
  ];

  return (
    <>
    <div className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 flex flex-col items-center justify-center text-center">
      <div className="_no-scrollbar mt-6 md:mt-10 p-1 md:p-2 w-full lg:w-fit bg-primary/8 border border-primary rounded-full overflow-auto">
        <div className="flex gap-1 md:gap-6">
          {categories.map((category, index) => (
            <div key={index}
              onClick={() => onChangeCategory(category.key)}
              className={`py-3 2xl:py-4 px-5 md:px-3 lg:px-8 2xl:px-12 flex justify-center items-center w-full lg:w-fit rounded-full cursor-pointer transition-all duration-300
                ${selectedCategory === category.key ? "bg-linear-to-t from-dark-primary to-primary" : "bg-transparent"}
            `}>
              <p className={`text-sm md:text-base lg:text-lg 2xl:text-2xl font-medium text-wrap xl:text-nowrap
                ${selectedCategory === category.key ? "text-white" : "text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text"}
              `}>
                {category.keyTranslate ? t(`text.${category.keyTranslate}`) : category.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 lg:mt-6 w-full flex items-center gap-2 md:gap-4 lg:gap-6">
        {query !== undefined && onHandleSearch !== undefined &&
          <div className="py-4 2xl:py-6 px-5 flex items-center gap-4 w-full bg-white border border-[#D0D5DD] rounded-full">
            <label htmlFor="search" className="cursor-pointer">
              <CiSearch className="text-2xl text-[#7E7E7E]" />
            </label>
            <input
              id="search"
              name="search"
              placeholder={t("brokerpage:header.searchPlaceholder")}
              value={query}
              onChange={onHandleSearch}
              type="text"
              className="w-full text-base placeholder:text-[rgba(0,0,0,0.8)] focus:outline-0"
            />
          </div>
        }
        <Button 
          variant="outline"
          onClick={() => onShowFilter(true)}
          icon={<CiFilter className="scale-x-[-1] text-2xl" />}
          className="py-4! 2xl:py-6! px-4! md:px-8! shrink-0"
        >
          <p className="hidden md:block text-base 2xl:text-xl leading-6 font-normal">
            {t("brokerpage:header.filter_brokers")}
          </p>
        </Button>
      </div>

      <div className="mt-4 lg:mt-6 w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2.5">
        <p className="text-base 2xl:text-xl leading-6">
          {t("brokerpage:header.total_brokers")} : {" "}
          <span className="font-medium text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
            {totalBrokers}
          </span>
        </p>
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-fit">
          <div className="shrink-0 flex items-center gap-2">
            <BsSortDown className="text-lg 2xl:text-2xl" />
            <p className="text-base 2xl:text-xl leading-6 text-black/80">
              {t("brokerpage:header.sort_by")}
            </p>
          </div>

          <SelectDropdown 
            selectedInput={selectedSort} 
            handleChangeInput={(key) => onChangeSort(key)} 
            wrapperCL="lg:px-4! h-10! lg:h-15! w-full! md:w-[220px]! border-black!"
            inputCL="w-full! md:w-[220px]! text-start!"
            textInputCL="lg:px-4! py-4!"
            objectInput={selectInputs} />
        </div>
      </div>

    </div>
    </>
  )
}

export default FilterBroker;
