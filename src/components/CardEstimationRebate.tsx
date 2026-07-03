import { useState, type ChangeEvent } from "react";
import { IoIosCalculator } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { brokers } from "@/utils/dataBroker/brokers";
import { supportPairs } from "@/utils/pairs";
import { formattedUsd } from "@/helper/formHelper";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

const CardEstimationRebate = () => {
  const { t, i18n} = useTranslation(["homepage"]);
  const [lotperMonth, setLotperMoth] = useState<string>('1');
  const [selectedPair, setSelectedPair] = useState<string>(
    Object.values(brokers)[0].rebateProgram[0].pair
  );
  const [selectedBroker, setSelectedBroker] = useState<string>(
    Object.values(brokers)[0].name
  );
  const allBrokers = Object.values(brokers).sort((a, b) => a.name.localeCompare(b.name));

  const handleChangeLotperMonth = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    setLotperMoth(num);
  };

  const selectedDetailBroker = allBrokers.find(broker => broker.name.toLocaleLowerCase() === selectedBroker.toLocaleLowerCase());
  const estimate = selectedDetailBroker?.rebateProgram.find((rebate) => 
    rebate.pair === selectedPair
  );

  let pairValue = 0;
  if (selectedDetailBroker && estimate !== undefined) {
    pairValue = typeof estimate.estimate === "number" ? estimate.estimate : estimate.estimate.min;
  }
  const estimationRebate = formattedUsd(Number(lotperMonth) * pairValue);

  const handleChangeBroker = (e: ChangeEvent<HTMLSelectElement>) => {
    const brokerName = e.target.value;
    setSelectedBroker(brokerName);
    const selectedDetailBroker = allBrokers.find(broker => broker.name.toLocaleLowerCase() === brokerName.toLocaleLowerCase());
    if (selectedDetailBroker) {
      setSelectedPair(selectedDetailBroker?.rebateProgram[0].pair);
    }
  }

  return (
    <div className="relative w-full lg:w-fit">
        <div className="absolute -top-[25%] start-1/2 bg-[#ABF3DB] size-[140px] rounded-full blur-[60px]"></div>
        <div className="absolute top-0 start-[10%] bg-[#ABF3DB] size-[300px] rounded-full blur-[120px]"></div>

        <div className="px-6 py-8 relative z-9999 flex flex-col gap-2 md:gap-4 h-full w-full max-w-full lg:max-w-[470px] rounded-[20px] bg-white">
          <div>
            <div className="flex gap-3 items-center mb-2">
              <IoIosCalculator className="text-primary text-2xl xl:text-4xl" />
              <p className="text-2xl font-semibold">{t("homepage:hero.estimateRebate.title")}</p>
            </div>
            <p className="text-sm md:text-base font-medium text-[rgba(0,0,0,0.5)] 3xl:leading-[178%]">
              {t("homepage:hero.estimateRebate.subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="broker"
                className="text-sm md:text-base lg:text-sm font-medium text-[#344054]">
                {t("homepage:hero.estimateRebate.broker")}
              </label>
              <div className="relative w-full">
                <select
                  name="broker"
                  id="broker"
                  value={selectedBroker}
                  onChange={handleChangeBroker}
                  className="_select-no-arrow px-4 py-3 w-full border border-[#D0D5DD] rounded-lg">
                  {allBrokers.map((broker, idx) => (
                    <option key={idx} value={broker.name}>
                      {broker.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex max-w-1/2 flex-col gap-1.5">
                <label
                  htmlFor="lotpermonth"
                  className="text-sm md:text-base lg:text-sm font-medium text-[#344054]">
                  {t("homepage:hero.estimateRebate.lotPerMonth")}
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
                  {t("homepage:hero.estimateRebate.pair")}
                </label>
                <div className="w-full relative">
                  <select
                    name="pair"
                    id="pair"
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    className="_select-no-arrow px-4 py-3 w-full border border-[#D0D5DD] rounded-lg">
                    {selectedDetailBroker === undefined ? [] 
                      : Array.from(new Set(
                        selectedDetailBroker.rebateProgram.map((rebate) => rebate.pair)
                        .filter((reb) => supportPairs.includes(reb)))).map((pair, idx) => (
                      <option key={idx} value={pair}>
                        {pair}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="text-base font-medium text-[rgba(16,24,40,0.8)]">
              <p className="leading-[19px]">
                {t("homepage:hero.estimateRebate.estimation.0")}
              </p>
              <p className="leading-[19px]">
                {t("homepage:hero.estimateRebate.estimation.1")}
              </p>
            </div>
            <p className="primary-scrollbar max-w-[70%] overflow-auto text-[32px] md:text-[40px] font-semibold text-my-dark-purple leading-12">{estimationRebate}</p>
          </div>
          <div className="w-full flex items-center gap-2 flex-wrap md:flex-nowrap">
            <Button buttonType="link" urlTo={`${getLocalizedPath("/register", i18n.language)}`} variant="primary-light" size="md" className="px-4! md:px-0! flex md:block flex-1 text-center text-nowrap text-base! font-medium!">
              {t("homepage:hero.estimateRebate.register")}
            </Button>
            <Button buttonType="link" urlTo={`${getLocalizedPath("/broker", i18n.language)}`} variant="outline" size="md" className="px-4! md:px-0! flex md:block flex-1 text-center text-nowrap text-base! font-medium!">
              {t("homepage:hero.estimateRebate.claim")}
            </Button>
          </div>
          <div className="w-full h-[0.5px] bg-black/20"></div>
          <div className="p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
            <span className="flex shrink-0 items-center justify-center size-6 3xl:size-[30px] border border-primary rounded-full">
              <TiInfoLarge className="text-base 3xl:text-[20px] text-primary" />
            </span>
            <p className="w-fit text-[12px] md:text-base lg:text-[12px] font-medium text-[rgba(0,0,0,0.8)] leading-[178%]">
              {t("homepage:hero.estimateRebate.info")}
            </p>
          </div>
        </div>
      </div>
  )
}

export default CardEstimationRebate