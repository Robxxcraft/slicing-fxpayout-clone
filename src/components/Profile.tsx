import { useState, type ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { PiStarFill } from "react-icons/pi";

type FeatureProfile = {
  title: string;
  paragraph: string;
};

const featuresProfile: FeatureProfile[] = [
  {
    title: "Rebate Hingga 80%",
    paragraph:
      "Dapatkan cashback hingga 80% dari komisi broker langsung ke akun Anda.",
  },
  {
    title: "Fokus ke trader",
    paragraph: "Cashback langsung tanpa mengubah kondisi trading.",
  },
  {
    title: "Local Support",
    paragraph: "Bahasa Indonesia & jam operasional ramah trader.",
  },
];

const Profile = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className="px-5 xl:px-24 2xl:px-56 pt-18 xl:pt-[120px] 2xl:pt-56">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
        <div className="order-2 xl:order-1 p-4 md:p-8 2xl:p-[42px] w-full bg-[#F9F8F4] rounded-[30px] md:rounded-[40px]">
          <div className="py-3 2xl:py-6 px-3 md:px-4 2xl:px-5 flex items-center gap-2 md:gap-4 w-full bg-white border border-[#D0D5DD] rounded-full">
            <label htmlFor="search" className="cursor-pointer">
              <CiSearch className="text-2xl text-[#7E7E7E]" />
            </label>
            <input
              id="search"
              name="search"
              placeholder="rebate forex Indonesia, cashback trading, IB forex terpercaya..."
              value={query}
              onChange={handleSearch}
              type="text"
              className="w-full text-base placeholder:text-primary focus:outline-0"
            />
          </div>
          <div className="my-4 md:my-5 2xl:my-6 flex flex-wrap gap-x-2 gap-y-2">
            {[
              "Rebate Forex Indonesia",
              "Cashback Trading",
              "Rebate FBS",
              "Rebate Exness",
              "Rebate XM",
              "IB Forex Terpercaya",
            ].map((item, idx) => (
              <div
                key={idx}
                className="px-4 md:px-5 2xl:px-6 py-2 md:py-3 bg-my-light-blue border border-primary rounded-full">
                <p className="text-sm bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:gap-3 2xl:gap-4">
            {featuresProfile.map((item, idx) => (
              <div
                key={idx}
                className="p-3 2xl:p-4 flex gap-3 md:gap-4 w-full bg-[rgba(11,24,37,0.02)] border border-[rgba(0,0,0,0.1)] rounded-2xl">
                <img src="/check.svg" alt="check icon" />
                <div>
                  <h3 className="text-base md:text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 xl:order-2">
          <div className="px-4 md:px-5 2xl:px-6 py-4 flex flex-col md:flex-row items-center gap-x-4 gap-y-2 bg-primary rounded-2xl md:rounded-full w-fit">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <PiStarFill
                  key={idx}
                  className="text-2xl md:text-lg 2xl:text-xl text-[#FFC250]"
                />
              ))}
            </div>
            <p className="text-base 2xl:text-xl font-medium text-[#E9E9E9] text-center">
              Dipercaya komunitas trader Indonesia
            </p>
          </div>
          <h2 className="font-wix-madefor-display my-5 md:my-6 2xl:my-8 text-center md:text-left text-[28px] md:text-[50px] 2xl:text-[64px] font-bold leading-[120%]">
            RebateFX, rujukan utama rebate forex bagi trader Indonesia.
          </h2>
          <p className="text-center md:text-left text-base md:text-lg 2xl:text-2xl font-medium text-[rgba(0,0,0,0.8)] leading-[200%]">
            RebateFX dikenal sebagai platform rebate forex Indonesia yang
            mengembalikan hingga 80% komisi broker, memprioritaskan pembayaran
            cepat dan layanan support lokal untuk para trader.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
