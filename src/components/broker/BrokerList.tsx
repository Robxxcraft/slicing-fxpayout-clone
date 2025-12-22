import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BrokerItem from "./BrokerItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { brokerPartners } from "../../utils/brokerPartner";
import { useNavigationToTop } from "../../hooks/useNavigationToTop";

const BrokerList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(6);
  const [searchParams] = useSearchParams();
  const navigateToTop = useNavigationToTop();

  const TOTAL_PAGES = Math.ceil(brokerPartners.length / itemsPerPage);

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (!Number.isNaN(page)) {
      if (page <= 0) {
        navigateToTop("/broker?page=1");
      } else {
        setCurrentPage(page);
      }
    }
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(currentPage * itemsPerPage);
    
  }, [currentPage, itemsPerPage, navigateToTop, searchParams]);

  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      navigateToTop(`/broker?page=${currentPage - 1}`);
    }
  }
  const handleClickNextButton = () => {
    if (currentPage < TOTAL_PAGES) {
      navigateToTop(`/broker?page=${currentPage + 1}`);
    }
  }
  const handleClickPagination = (page: number) => {
    navigateToTop(`/broker?page=${page}`);
  }

  const getPagination = (maxButtons = 5) => {
    const half = Math.floor(maxButtons / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxButtons;
    }
    if (end > TOTAL_PAGES) {
      end = TOTAL_PAGES;
      start = TOTAL_PAGES - maxButtons + 1;
    }
    start = Math.max(1, start);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }


  return (
    <>
      <div className="mt-6 lg:mt-8 2xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 2xl:gap-6">
        {brokerPartners.slice(startIndex, endIndex).map((item, idx) => (
          <BrokerItem key={idx} item={item} />
        ))}
      </div>
      <div className="mt-6 md:mt-8 2xl:mt-10 px-5 w-full flex items-center justify-center gap-3 md:gap-4">
        {currentPage > 1 &&
          <button
            onClick={handleClickPrevButton}
            className="size-10 text-base flex justify-center items-center border-[rgba(255,255,255,0.5)] rounded-[15px] cursor-pointer">
            <FaChevronLeft color="#425EEC" />
          </button>
        } 

        {getPagination().map((item) => {
          if (item === currentPage) {
            return (
              <button
                onClick={() => handleClickPagination(item)}
                key={item}
                className="size-10 flex justify-center items-center bg-linear-to-t from-dark-primary to-primary border border-[rgba(255,255,255,0.5)] text-base font-semibold text-white rounded-[15px] cursor-pointer">
                {item}
              </button>
            );
          }

          return (
            <button
              onClick={() => handleClickPagination(item)}
              key={item}
              className="size-10 flex justify-center items-center rounded-[15px] cursor-pointer 
             bg-[rgba(64,95,251,0.07)] border border-[rgba(255,255,255,0.5)]">
              <span
                className="font-semibold bg-linear-to-t from-dark-primary to-primary 
                   text-transparent bg-clip-text text-base ">
                {item}
              </span>
            </button>
          );
        })}

        {currentPage < TOTAL_PAGES &&
          <button
            onClick={handleClickNextButton}
            className="size-10 text-base flex justify-center items-center border-[rgba(255,255,255,0.5)] rounded-[15px] cursor-pointer">
            <FaChevronRight color="#425EEC" />
          </button>
        }
      </div>
    </>
  );
};

export default BrokerList;
