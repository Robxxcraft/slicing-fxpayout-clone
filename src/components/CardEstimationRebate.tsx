import { useEffect, useState, type ChangeEvent } from "react";
import { IoIosCalculator } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { brokers } from "@/utils/dataBroker/brokers";

const supportPairs = ["EUR/USD", "XAU/USD", "CRYPTO"];

const CardEstimationRebate = () => {
  const [lotperMonth, setLotperMoth] = useState<string>('1');
  const [selectedPair, setSelectedPair] = useState<string>("EUR/USD");
  const [selectedBroker, setSelectedBroker] = useState<string>(
    Object.values(brokers)[0].name
  );
  const [estimationRebate, setEstimationRebate] = useState<string>('0');
  const allBrokers = Object.values(brokers);

  const handleChangeLotperMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    setLotperMoth(num);
  };

  useEffect(() => {
    const selectedDetailBroker = allBrokers.find(broker => broker.name.toLocaleLowerCase() === selectedBroker.toLocaleLowerCase());
    const pairIdx = supportPairs.findIndex(pair => pair === selectedPair);
    if (selectedDetailBroker === undefined || pairIdx === -1) return;
    const pairValue = typeof selectedDetailBroker.rebateProgram[pairIdx].estimate === "number" ?
        selectedDetailBroker.rebateProgram[pairIdx].estimate : selectedDetailBroker.rebateProgram[pairIdx].estimate.min;
    
    const calculationEstimate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Number(lotperMonth) * pairValue);
    setEstimationRebate(calculationEstimate);
  }, [allBrokers, lotperMonth, selectedBroker, selectedPair]);

  return (
    <div className="relative w-full lg:w-fit">
        <div className="absolute -top-[25%] left-1/2 bg-[#ABF3DB] size-[140px] rounded-full blur-[60px]"></div>
        <div className="absolute top-0 left-[10%] bg-[#ABF3DB] size-[300px] rounded-full blur-[120px]"></div>

        <div className="px-6 py-8 relative z-9999 flex flex-col gap-2 md:gap-4 h-full w-full max-w-full lg:max-w-[470px] rounded-[20px] bg-white">
          <div>
            <div className="flex gap-3 items-center mb-2">
              <IoIosCalculator className="text-primary text-2xl xl:text-4xl" />
              <p className="text-2xl font-semibold">Estimasi Rebate</p>
            </div>
            <p className="text-sm md:text-base font-medium text-[rgba(0,0,0,0.5)] 2xl:leading-[178%]">
              Pilih broker dan masukkan lot per bulang untuk estimasi cepat
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="broker"
                className="text-sm md:text-base lg:text-sm font-medium text-[#344054]">
                Broker
              </label>
              <div className="relative w-full">
                <select
                  name="broker"
                  id="broker"
                  value={selectedBroker}
                  onChange={(e) => setSelectedBroker(e.target.value)}
                  className="_select-no-arrow px-4 py-3 w-full border border-[#D0D5DD] rounded-lg">
                  {allBrokers.map((broker, idx) => (
                    <option key={idx} value={broker.name}>
                      {broker.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex max-w-1/2 flex-col gap-1.5">
                <label
                  htmlFor="lotpermonth"
                  className="text-sm md:text-base lg:text-sm font-medium text-[#344054]">
                  Lot per Bulan
                </label>
                <input
                  type="number"
                  name="lotpermonth"
                  id="lotpermonth"
                  min='0'
                  value={lotperMonth}
                  onChange={handleChangeLotperMonth}
                  className="px-4 py-3 border border-[#D0D5DD] rounded-lg"
                />
              </div>
              <div className="flex max-w-1/2 w-full flex-col gap-1.5">
                <label
                  htmlFor="pair"
                  className="text-sm md:text-base lg:text-sm font-medium text-[#344054]">
                  Pair
                </label>
                <div className="w-full relative">
                  <select
                    name="pair"
                    id="pair"
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    className="_select-no-arrow px-4 py-3 w-full border border-[#D0D5DD] rounded-lg">
                    {supportPairs.map((pair, idx) => (
                      <option key={idx} value={pair}>
                        {pair}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-base font-medium text-[rgba(16,24,40,0.8)]">
              <p className="leading-[19px]">Estimasi</p>
              <p className="leading-[19px]">Perkiraan</p>
            </div>
            <p className="max-w-[70%] overflow-auto text-[32px] md:text-[40px] font-semibold text-[#101828] leading-12">{estimationRebate}</p>
          </div>
          <div className="w-full flex items-center gap-2 flex-wrap md:flex-nowrap">
            <Button buttonType="link" urlTo="/broker" variant="primary-light" size="md" className="px-4! md:px-0! flex md:block flex-1 text-center text-nowrap text-base! font-medium!">
              Daftar & Dapatkan
            </Button>
            <Button buttonType="link" urlTo="/broker" variant="outline" size="md" className="px-4! md:px-0! flex md:block flex-1 text-center text-nowrap text-base! font-medium!">
              Klaim Manual
            </Button>
          </div>
          <div className="w-full h-[0.5px] bg-black/20"></div>
          <div className="p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
            <span className="flex items-center justify-center size-6 2xl:size-[30px] border border-primary rounded-full">
              <TiInfoLarge className="text-base 2xl:text-[20px] text-primary" />
            </span>
            <p className="w-fit text-[12px] md:text-base lg:text-[12px] font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
              Kami mengembalikan hingga 90% komisi IB kepada trader. Proses
              cepat, aman, dan transparan tanpa mengubah spread atau kondisi
              trading.
            </p>
          </div>
        </div>
      </div>
  )
}

export default CardEstimationRebate