import { Link } from "react-router-dom";
import BrokerItem from "./BrokerItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { brokerPartners } from "../../utils/brokerPartner";

const BrokerList = () => {
  return (
    <>
      <div className="mt-6 md:mt-8 2xl:mt-10 px-5 xl:px-24 2xl:px-56 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-6">
        {brokerPartners.map((item, idx) => (
          <BrokerItem key={idx} item={item} />
        ))}
      </div>
      <div className="mt-6 md:mt-8 2xl:mt-10 px-5 w-full flex items-center justify-center gap-3 md:gap-4">
        <Link
          to="#"
          className="size-10 text-sm md:text-base flex justify-center items-center border-[rgba(255,255,255,0.5)] rounded-[15px]">
          <FaChevronLeft color="#425EEC" />
        </Link>

        {["1", "2", "...", "4"].map((item) => {
          if (item === "1") {
            return (
              <Link
                to="#"
                key={item}
                className="size-10 flex justify-center items-center bg-linear-to-t from-dark-primary to-primary border border-[rgba(255,255,255,0.5)] text-sm md:text-base font-semibold text-white rounded-[15px]">
                {item}
              </Link>
            );
          }

          return (
            <Link
              to="#"
              key={item}
              className="size-10 flex justify-center items-center rounded-[15px] 
             bg-[rgba(64,95,251,0.07)] border border-[rgba(255,255,255,0.5)]">
              <span
                className="font-semibold bg-linear-to-t from-dark-primary to-primary 
                   text-transparent bg-clip-text text-sm md:text-base ">
                {item}
              </span>
            </Link>
          );
        })}

        <Link
          to="#"
          className="size-10 text-sm md:text-base flex justify-center items-center border-[rgba(255,255,255,0.5)] rounded-[15px]">
          <FaChevronRight color="#425EEC" />
        </Link>
      </div>
    </>
  );
};

export default BrokerList;
