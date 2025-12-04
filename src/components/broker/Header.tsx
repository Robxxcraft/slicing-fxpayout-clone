import { useState, type ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className="px-5 xl:px-24 2xl:px-56 pt-[130px] md:pt-[150px] 2xl:pt-[200px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="px-4 md:px-5 2xl:px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
          <img src="/people_money.svg" alt="Reg broker"
            className="scale-90 md:scale-100" />
          <h3 className="text-sm md:text-base 2xl:text-xl font-semibold text-white">
            DAFTAR BROKER
          </h3>
        </div>
        <h2 className="my-2 md:my-3 2xl:my-4 text-[28px] md:text-[36px] 2xl:text-[44px] font-bold leading-[132%]">
          Broker Partner dan Detail
        </h2>
        <p className="text-base 2xl:text-xl leading-[160%] max-w-[786px]">
          Broker pilihan dengan eksekusi terbaik dan skema rebate hingga 80%.
          bandingkan detail instrumen dan pilih broker yang paling cocok untuk
          strategi trading Anda.
        </p>
        <div className="mt-2 md:mt-3 2xl:mt-4 py-3 2xl:py-6 px-3 md:px-4 2xl:px-5 flex items-center gap-2 md:gap-3 2xl:gap-4 w-full bg-white border border-[#D0D5DD] rounded-full max-w-[786px]">
          <label htmlFor="search" className="cursor-pointer">
            <CiSearch className="text-2xl text-[#7E7E7E]" />
          </label>
          <input
            id="search"
            name="search"
            placeholder="Cari broker disini"
            value={query}
            onChange={handleSearch}
            type="text"
            className="w-full text-base placeholder:text-[rgba(0,0,0,0.8)] focus:outline-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
