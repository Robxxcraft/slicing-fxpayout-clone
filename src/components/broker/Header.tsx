import type { ChangeEventHandler } from "react";
import { CiSearch } from "react-icons/ci";

const Header = ({query, onHandleSearch}: {query: string; onHandleSearch: ChangeEventHandler<HTMLInputElement>}) => {

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-[120px] lg:pt-[150px] 2xl:pt-[200px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
          <img src="/people_money.svg" alt="Reg broker"
            className="scale-90 md:scale-100" />
          <span className="text-base md:text-xl font-medium text-white">
            DAFTAR BROKER
          </span>
        </div>
        <h1 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
          Broker Partner dan Detail
        </h1>
        <p className="text-base md:text-xl leading-[160%] max-w-[786px]">
          Broker pilihan dengan eksekusi terbaik dan skema rebate hingga 90%.
          bandingkan detail instrumen dan pilih broker yang paling cocok untuk
          strategi trading Anda.
        </p>
        <div className="mt-4 py-4 2xl:py-6 px-5 flex items-center gap-4 w-full bg-white border border-[#D0D5DD] rounded-full max-w-[786px]">
          <label htmlFor="search" className="cursor-pointer">
            <CiSearch className="text-2xl text-[#7E7E7E]" />
          </label>
          <input
            id="search"
            name="search"
            placeholder="Cari broker disini"
            value={query}
            onChange={onHandleSearch}
            type="text"
            className="w-full text-base placeholder:text-[rgba(0,0,0,0.8)] focus:outline-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
