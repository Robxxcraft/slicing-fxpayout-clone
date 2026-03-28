import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BrokerItem from "./BrokerItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";
import { useNavigationToTop } from "@/hooks/useNavigationToTop";
import { getPagination } from "@/helper/pagination";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const BrokerList = ({
  brokerPartners,
  pathUrl
}: {
  brokerPartners: BrokerStruc[];
  pathUrl: string
}) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(6);
  const [searchParams] = useSearchParams();
  const navigateToTop = useNavigationToTop();
  const navigate = useNavigate();

  const TOTAL_PAGES = Math.ceil(brokerPartners.length / itemsPerPage);

  useEffect(() => {
    if (pathUrl === "broker") {
      const page = Number(searchParams.get("p"));
      if (!Number.isNaN(page)) {
        if (page <= 0) {
          const path = getLocalizedPath(`/${pathUrl}?p=1`, i18n.language);
          navigateToTop(path);
        } else {
          setCurrentPage(page);
        }
      }
      setStartIndex((currentPage - 1) * itemsPerPage);
      setEndIndex(currentPage * itemsPerPage);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [currentPage, i18n.language, itemsPerPage, navigateToTop, pathUrl, searchParams]);

  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      const path = getLocalizedPath(`/${pathUrl}?p=${currentPage - 1}`, i18n.language);
      if (pathUrl === "") {
        navigate(path);
      } else {
        navigateToTop(path);
      }
    }
  }
  const handleClickNextButton = () => {
    if (currentPage < TOTAL_PAGES) {
      const path = getLocalizedPath(`/${pathUrl}?p=${currentPage + 1}`, i18n.language);
      if (pathUrl === "") {
        navigate(path);
      } else {
        navigateToTop(path);
      }
    }
  }
  const handleClickPagination = (page: number) => {
    const path = getLocalizedPath(`/${pathUrl}?p=${page}`, i18n.language);
    if (pathUrl === "") {
        navigate(path);
      } else {
        navigateToTop(path);
      }
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="mt-6 lg:mt-8 2xl:mt-10 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 2xl:gap-6">
        {brokerPartners.slice(startIndex, endIndex).map((item, idx) => (
          <BrokerItem key={idx} item={item} />
        ))}
      </div>
      {pathUrl === "broker" &&
      <div className="mt-6 md:mt-8 2xl:mt-10 px-5 w-full flex items-center justify-center gap-3 md:gap-4">
        {currentPage > 1 &&
          <button
            onClick={handleClickPrevButton}
            className="size-10 text-base flex justify-center items-center border-[rgba(255,255,255,0.5)] rounded-[15px] cursor-pointer">
            <FaChevronLeft color="#425EEC" />
          </button>
        } 

        {getPagination({currentPage, TOTAL_PAGES}).map((item) => {
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
      }
    </>
  );
};

export default BrokerList;
