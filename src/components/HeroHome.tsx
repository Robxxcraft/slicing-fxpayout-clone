import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { IoIosCalculator } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";

const HeroHome = () => {
  const [lotperMonth, setLotperMoth] = useState<number>(1);

  const handleChangeLotperMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num > 0) {
      setLotperMoth(num);
    }
  };

  return (
    <header className="bg-primary px-56 py-40 flex flex-row items-center justify-between rounded-b-[80px]">
      <div className="flex flex-col gap-8 max-w-[60%] text-white">
        <div className="py-2 px-6 flex items-center gap-2.5 w-fit border border-white bg-[rgba(255,255,255,0.2)] rounded-full">
          <img src="/badgeCirclePercent.svg" alt="badge percent" />
          <span className="text-xl font-medium text-light-gray">
            Dapatkan Rebate 80% Untuk Trader
          </span>
        </div>
        <h1 className="font-bold text-[64px] leading-[120%]">
          Trading Lebih Untung — Rebate Hingga 80% untuk Trader Indonesia.
        </h1>
        <p className="text-2xl font-medium text-light-gray leading-[200%] mb-6">
          RebateFX adalah platform rebate forex terpercaya yang memberikan
          cashback hingga 80% dari komisi broker langsung kepada trader.
        </p>
        <div className="flex gap-4">
          <Link
            to="/"
            className="py-6 px-[60px] bg-white border border-white rounded-full font-medium text-2xl text-black">
            Daftar Sekarang
          </Link>
          <Link
            to="/"
            className="py-6 px-[60px] border border-white rounded-full font-medium text-2xl text-white">
            Hitung Rebate
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6 py-8 h-full w-full max-w-[470px] rounded-[20px] bg-white">
        <div>
          <div className="flex gap-3 items-center mb-2">
            <IoIosCalculator className="text-primary text-4xl" />
            <p className="text-2xl font-semibold">Estimasi Rebate</p>
          </div>
          <p className="text-base font-medium text-[rgba(0,0,0,0.5)] leading-[178%]">
            Pilih broker dan masukkan lot per bulang untuk estimasi cepat
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="broker"
              className="text-sm font-medium text-[#344054]">
              Broker
            </label>
            <select
              name="broker"
              id="broker"
              className="px-4 py-3 border border-[#D0D5DD] rounded-lg">
              <option value="Exness">Exness</option>
              <option value="Exness">Exness</option>
              <option value="Exness">Exness</option>
            </select>
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
        <div className="w-full flex items-center gap-2">
          <button className="py-4 w-full max-w-1/2 bg-primary text-base font-medium text-white border border-white rounded-full cursor-pointer">
            Daftar Sekarang
          </button>
          <button className="py-4 w-full max-w-1/2 text-base font-medium text-black border border-black rounded-full cursor-pointer">
            Klaim Manual
          </button>
        </div>
        <div className="mt-8 p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
          <span className="flex items-center justify-center w-[60px] h-[30px] border border-primary rounded-full">
            <TiInfoLarge className="text-[20px] text-primary" />
          </span>
          <p className="text-[12px] font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
            Kami mengembalkan hingga 80% komisi IB kepada trader. Proses cepat,
            aman, dan transparan tanpa mengubah spread atau kondisi trading.
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeroHome;
