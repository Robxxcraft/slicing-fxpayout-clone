import Table from "@/components/TableLayout";
import { getPagination } from "@/helper/pagination";
import { getLocalizedPath } from "@/helper/pathHelper";
import { brokers } from "@/utils/dataBroker/brokers";
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const supportEntry = [5, 10, 20, 50];

const ScheduleSection = ({
  sectionsRef
}: {
  sectionsRef: React.RefObject<Record<string, HTMLElement | null>>
}) => {
  const { t, i18n } = useTranslation(["common", "claimrebatepage"]);
  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState<"ASC" | "DESC">("ASC");
  const [totalEntry, setTotalEntry] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showIndex, setShowIndex] = useState({
    start: 0,
    end: 10
  });
  const allBrokers = Object.values(brokers).map((broker) => ({
    name: broker.name,
    schedule: broker.detailUrl
  }));

  // Transformasi & Filter Data
  const filteredBrokers = useMemo(() => {
    if (query.length < 2) return allBrokers;
    
    return allBrokers.filter((broker) => 
      broker.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, allBrokers]);

  // Sorting Data
  const sortedBroker = useMemo(() => {
    return [...filteredBrokers].sort((a, b) => {
      const compare = a.name.localeCompare(b.name);
      return sorting === "ASC" ? compare : -compare;
    })
  }, [filteredBrokers, sorting]);

  // Pagination 
  const TOTAL_PAGES = Math.ceil(filteredBrokers.length / totalEntry);
  const showBroker = useMemo(() => {
    return sortedBroker.slice(showIndex.start, showIndex.end);
  }, [showIndex, sortedBroker]);

  useEffect(() => {
    // Ketika ada perubahan query atau totalEntry => reset page ke 1
    setCurrentPage(1);
    setShowIndex({
      start: 0,
      end: totalEntry
    });
  }, [query, totalEntry]);

  const handleChangePagination = (value: number) => {
    setCurrentPage(value);
    setShowIndex({
      start: (value - 1) * totalEntry,
      end: value * totalEntry
    });
  }
  const handleClickNextButton = () => {
    if (currentPage < TOTAL_PAGES) {
      handleChangePagination(currentPage + 1);
    }
  }
  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      handleChangePagination(currentPage - 1);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  const toggleSorting = () => {
    setSorting((prev) => prev === "ASC" ? "DESC" : "ASC");
  }

  return (
    <section
      id="schedule"
      ref={el => {sectionsRef.current["scehdule"] = el}}
      className="pt-8 md:pt-10 xl:pt-20 scroll-mt-[66px] lg:scroll-mt-9 border-t xl:border-0 border-[#E5E5E5]"
    >
      <div className="px-6 md:px-11 xl:px-0 xl:pe-24 2xl:pe-56">
        <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
          {t("claimrebatepage:schedule.title")}
        </h2>
        <p className="mb-4 md:mb-6 mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          {t("claimrebatepage:schedule.paragraph")}
        </p>
        <div className="px-4 md:px-6 py-6 flex flex-col gap-4 md:gap-6 bg-[#F9F9F9] border border-[#D0D0D0] shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] rounded-3xl">
          <h3 className="font-medium text-xl md:text-2xl">
            {t("claimrebatepage:schedule.card.title")}
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="flex items-center gap-1.5 text-[#212529]">
              <span className="text-base 2xl:text-xl">{t("claimrebatepage:schedule.card.showEntry.0")}</span>
              <select 
                name="entry" 
                id="entry" 
                value={totalEntry}
                onChange={(e) => setTotalEntry(Number(e.target.value))}
                className="px-3 py-2 text-base 2xl:text-xl text-[#495057] bg-white border border-[#CED4DA] rounded-md"
              >
                {supportEntry.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <span className="text-base 2xl:text-xl">{t("claimrebatepage:schedule.card.showEntry.1")}</span>
            </div>
            <div className="py-4 px-4 md:px-8 flex items-center gap-4 w-full bg-white border border-[#D0D5DD] rounded-xl max-w-[400px]">
              <label htmlFor="search" className="cursor-pointer">
                <CiSearch className="text-2xl text-[#7E7E7E]" />
              </label>
              <input
                id="search"
                name="search"
                placeholder={t("claimrebatepage:schedule.card.searchPlaceholder")}
                value={query}
                onChange={handleSearch}
                type="text"
                className="w-full text-base placeholder:text-[rgba(0,0,0,0.8)] focus:outline-0"
              />
            </div>
          </div>
          <Table className="mt-0!">
            <Table.Heading>
              <Table.HeadingItem className="text-nowrap">
                <div
                  onClick={toggleSorting}
                  className="flex gap-2 items-center w-fit cursor-pointer">
                  <span>{t("claimrebatepage:schedule.card.brokerName")}</span>
                  <FaArrowDown size={14} className={`${sorting === "ASC" ? "rotate-0" : "rotate-180"}`} />
                </div>
              </Table.HeadingItem>
              <Table.HeadingItem className="text-center! text-nowrap">
                {t("claimrebatepage:schedule.card.schedule")}
              </Table.HeadingItem>
            </Table.Heading>

            <Table.Body>
              {showBroker.map((row, rowIdx) => (
                <Table.Row key={rowIdx}>
                  <Table.Cell rowIndex={rowIdx}>
                    {row.name}
                  </Table.Cell>
                  <Table.Cell rowIndex={rowIdx}>
                    <Link 
                      to={row.schedule === undefined ? 
                        getLocalizedPath("#", i18n.language) : getLocalizedPath(`/schedule/${row.schedule}`, i18n.language)} 
                      className="flex items-center justify-center gap-1 text-primary text-nowrap">
                      <span>{t("claimrebatepage:schedule.card.viewSchedule")}</span>
                      <FaArrowRight size={18} className="rtl:scale-x-[-1]" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <p className="text-sm 2xl:text-xl  text-[#212529]">
              {t("claimrebatepage:schedule.card.showList", {
                startIndex: showIndex.start + 1,
                endIndex: showIndex.end < filteredBrokers.length ? showIndex.end : filteredBrokers.length,
                totalIndex: filteredBrokers.length 
              })}
            </p>
            <div className="flex items-center justify-center w-full md:w-fit">
              <button 
                onClick={handleClickPrevButton}
                className={`${currentPage > 1 && "hover:bg-black/5"} px-3 py-2 bg-white border border-[#DEE2E6] rounded-l-sm cursor-pointer`}>
                <span 
                  className={`${currentPage > 1 ? "bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text" 
                    : "text-[#6C757D]"} text-sm md:text-base`}>
                  {t("text.previous")}
                </span>
              </button>
              {getPagination({maxButtons: 4, currentPage, TOTAL_PAGES}).map((page, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleChangePagination(page)}
                  className={`${page === currentPage ? "bg-linear-to-t from-dark-primary to-primary text-white": "hover:bg-black/5"}
                  px-3 py-2 w-10 border border-[#DEE2E6] cursor-pointer`}>
                  <span className={`${page !== currentPage && "bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text"}`}>
                    {page}
                  </span>
                </button>
              ))}
              <button 
                onClick={handleClickNextButton}
                className={`${currentPage < TOTAL_PAGES && "hover:bg-black/5"} px-3 py-2 bg-white border border-[#DEE2E6] rounded-l-sm cursor-pointer`}>
                <span 
                  className={`${currentPage < TOTAL_PAGES ? "bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text" 
                    : "text-[#6C757D]"} text-sm md:text-base`}>
                  {t("text.next")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSection;
