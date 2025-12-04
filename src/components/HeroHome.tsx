import { useState, type ChangeEvent } from "react";
import { IoIosCalculator } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa6";
import { brokerPartners } from "../utils/brokerPartner";
import Button from "./ui/Button";

const HeroHome = () => {
  const [lotperMonth, setLotperMoth] = useState<number>(1);
  const [selectedBroker, setSelectedBroker] = useState<string>(
    brokerPartners[0].username
  );

  const handleChangeLotperMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num > 0) {
      setLotperMoth(num);
    }
  };

  return (
    <header className="relative bg-primary px-5 xl:px-24 2xl:px-56 py-26 md:py-32 2xl:py-40 flex flex-col xl:flex-row gap-y-12 gap-8 items-center justify-between rounded-b-[80px]">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[90px] -left-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <img
        src="/heroCircle.png"
        alt="hero circle"
        className="z-1 absolute bottom-0 right-0 w-[450px]"
      />

      {/* MAIN HERO */}
      <div className="z-999 flex flex-col gap-4 md:gap-5 2xl:gap-8 max-w-full xl:max-w-[60%] text-white">
        <div className="py-2 px-4 md:px-5 2xl:px-6 flex items-center gap-2.5 w-fit border border-white bg-[rgba(255,255,255,0.2)] rounded-full">
          <img src="/badgeCirclePercent.svg" alt="badge percent" />
          <span className="text-sm 2xl:text-xl font-medium text-light-gray">
            Dapatkan Rebate 80% Untuk Trader
          </span>
        </div>
        <h1 className="font-wix-madefor-display font-bold text-[36px] md:text-[50px] 2xl:text-[64px] leading-[120%]">
          Trading Lebih Untung — Rebate Hingga 80% untuk Trader Indonesia.
        </h1>
        <p className="text-base 2xl:text-2xl font-medium text-light-gray md:leading-[200%] md:mb-3 2xl:mb-6">
          RebateFX adalah platform rebate forex terpercaya yang memberikan
          cashback hingga 80% dari komisi broker langsung kepada trader.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button variant="light" size="xl" className="py-4! 2xl:py-6! text-base! font-medium!">
            Daftar Sekarang
          </Button>
          <Button variant="outline-light" size="xl" className="py-4! 2xl:py-6! text-base! font-medium!">
            Hitung Rebate
          </Button>
        </div>
      </div>

      {/* CARD */}
      <div className="relative">
        <div className="absolute -top-[25%] left-1/2 bg-[#ABF3DB] size-[140px] rounded-full blur-[60px]"></div>
        <div className="absolute top-0 left-[10%] bg-[#ABF3DB] size-[300px] rounded-full blur-[120px]"></div>

        <div className="px-5 md:px-6 py-6 md:py-8 relative z-9999 flex flex-col gap-2 2xl:gap-4 h-full w-full max-w-[470px] rounded-[20px] bg-white">
          <div>
            <div className="flex gap-2 2xl:gap-3 items-center mb-2">
              <IoIosCalculator className="text-primary text-4xl" />
              <p className="text-2xl font-semibold">Estimasi Rebate</p>
            </div>
            <p className="text-base font-medium text-[rgba(0,0,0,0.5)] 2xl:leading-[178%]">
              Pilih broker dan masukkan lot per bulang untuk estimasi cepat
            </p>
          </div>
          <div className="flex flex-col gap-2 2xl:gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="broker"
                className="text-sm font-medium text-[#344054]">
                Broker
              </label>
              <div className="relative w-full">
                <select
                  name="broker"
                  id="broker"
                  value={selectedBroker}
                  onChange={(e) => setSelectedBroker(e.target.value)}
                  className="_select-no-arrow px-4 py-3 w-full border border-[#D0D5DD] rounded-lg">
                  {brokerPartners.map((broker, idx) => (
                    <option key={idx} value={broker.username}>
                      {broker.username}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lotpermonth"
                className="text-sm font-medium text-[#344054]">
                Lot per Bulan
              </label>
              <input
                type="number"
                name="lotpermonth"
                id="lotpermonth"
                value={lotperMonth}
                onChange={handleChangeLotperMonth}
                className="px-4 py-3 border border-[#D0D5DD] rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-base font-medium text-[rgba(16,24,40,0.8)]">
              <p>Estimasi</p>
              <p>Perkiraan</p>
            </div>
            <p className="text-[40px] font-semibold text-[#101828]">$6.00</p>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center gap-2">
            <Button variant="primary-light" size="md" className="px-0! w-full! text-sm! 2xl:text-base font-medium!">
              Daftar & Dapatkan
            </Button>
            <Button variant="outline" size="md" className="px-0! w-full! text-sm! 2xl:text-base font-medium!">
              Klaim Manual
            </Button>
          </div>
          <div className="mt-4 2xl:mt-8 p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
            <span className="flex items-center justify-center size-6 2xl:size-[30px] border border-primary rounded-full">
              <TiInfoLarge className="text-base 2xl:text-[20px] text-primary" />
            </span>
            <p className="w-fit text-[12px] font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
              Kami mengembalikan hingga 80% komisi IB kepada trader. Proses
              cepat, aman, dan transparan tanpa mengubah spread atau kondisi
              trading.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroHome;
