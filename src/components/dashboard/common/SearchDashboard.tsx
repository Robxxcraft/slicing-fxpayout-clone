import type React from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchDashboard = ({
  query,
  onQuery,
  placeholder,
  containerCL
}: {
  query: string;
  onQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  containerCL?: string
}) => {
  return (
    <div className={`h-9 2xl:h-12 py-2 md:py-0 px-2 2xl:px-4 flex flex-1 items-center gap-2 2xl:gap-4 w-full bg-white border border-[#D2CEE1] rounded-lg max-w-full lg:max-w-[456px] 2xl:max-w-[640px] ${containerCL}`}>
      <label htmlFor="search" className="cursor-pointer">
        <CiSearch className="text-2xl 2xl:text-3xl text-[#7E7E7E]" />
      </label>
      <input
        id="search"
        name="search"
        placeholder={placeholder}
        value={query}
        onChange={onQuery}
        type="text"
        autoComplete="off"
        className="w-full text-base 2xl:text-xl placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0 placeholder:text-ellipsis placeholder:line-clamp-1"
      />
    </div>
  )
}

export default SearchDashboard;
